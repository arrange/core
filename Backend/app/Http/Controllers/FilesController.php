<?php namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Auth\Guard;
use Illuminate\Http\Request;
use Storage;

class FilesController extends Controller
{
	private $path;
	private $oUser;
	private $base;

	public function __construct( Request $request , Guard $guard )
	{
		$this->oUser = $guard->user();
		$this->base = base_path() . DIRECTORY_SEPARATOR;
		$this->base = str_replace( env( 'FTP_BASEPATH_PREFIX' ) , '' , $this->base );
		$this->path = env( 'FTP_BASEPATH_PREFIX' ) . DIRECTORY_SEPARATOR . CLIENT_FOLDER . DIRECTORY_SEPARATOR . $this->getOrganizationId() . DIRECTORY_SEPARATOR . $this->getUserId() . DIRECTORY_SEPARATOR;

	}

	public function anyFiles(Request $request){
		$filter = "html";
		if( !$request->has('location') )
			return response()->json( array( 'error' => 'Folder name is required' ) , 404 );
		if( $request->has('filter') )
			$filter = $request->input('filter');

		$base = str_replace("\\\\",DIRECTORY_SEPARATOR,str_replace("//",DIRECTORY_SEPARATOR,$this->base)) . $this->path;
		$dir = $base . $request->input('location');
		$results = array();
		if (is_dir($dir)) {
			$iterator = new \RecursiveDirectoryIterator($dir);
			foreach ( new \RecursiveIteratorIterator($iterator, \RecursiveIteratorIterator::CHILD_FIRST) as $file ) {
				if ($file->isFile()) {
					$thispath = str_replace('\\', '/', $file);
					$thispath1 = str_replace($base, "", $file->getPath().DIRECTORY_SEPARATOR);
					$thisfile = utf8_encode($file->getFilename());
					if( strstr($thispath,".".$filter) ) {
						if( preg_match('/'.$filter."$/",$thisfile) )
							$results[] = $thispath1.$thisfile;
					}
				}
			}
		}
		return response()->json($results);
	}

	public function getThumb( Request $request ) {
		$name = $request->input( 'name' );
		return file_get_contents( base_path() . DIRECTORY_SEPARATOR . 'presets' . DIRECTORY_SEPARATOR . $name );
	}

	public function anyHandler( Request $request , Guard $auth )
	{
		if ( $request->has( 'mode' ) && $request->has( 'path' ) ) {
			if ( $full_path = 	$this->isValidUser( $request->input( 'path' ) ) ) {
				switch($request->input('mode')){
					case "savefile":
						if($request->has( 'content' )) {
							Storage::disk('local')->put( $full_path,  $request->input( 'content' ) );
							return response()->json( array( 'result' => 'true' ) );
						}
						break;
					case "list":
						$extensions = array();
						if ( $request->has( 'extension' ) ) {
							$extensions[ ] = $request->input( 'extension' );
						}

						$list1 = $this->listFolders( $full_path );
						$list2 = $this->listFiles( $full_path );
						$list = $this->getInfo( array_merge($list1,$list2) ,$extensions );

						return response()->json( array( 'result' => $list ) );
						break;
					case "editfile":
						return response()->json( array( 'result' => Storage::get($full_path ) ) );
						break;
					case "rename":
						$newPath = $request->input( 'newPath' );
						$result = Storage::move( $full_path , "/".$this->getOrganizationId() ."/". $this->getUserId()."/".$newPath );
						if ( !$result ) {
							throw new Exception( "Unknown error renaming this folder" );
						}
						return response()->json( array( 'result' => $result ) );
						break;
					case "delete":
						if( is_dir($full_path) )
							$result = Storage::deleteDirectory($full_path);
						else
							$result = Storage::delete( $full_path );
						if ( !$result ) {
							return response()->json( array( "errors" => "Unknown error removing this item" ) );
						}
						return response()->json( array( 'result' => $result ) );
						break;
					case "addfolder":
						$name = $request->input('name');
						$result = Storage::makeDirectory( $full_path . '/' . $name );
						if ( !$result ) {
							return response()->json( array( "errors" => "Unknown error creating this folder" ) );
						}
						return response()->json( array( 'result' => $result ) );
						break;
					case "download":
						$fileName = explode( '/' , $full_path );
						$fileName = end( $fileName );
						$headers = array(
							'Content-Type: '.Storage::mimeType( $full_path ),
						);
						return response()->download( base_path('clients'.DIRECTORY_SEPARATOR.$full_path) , $fileName, $headers);
						break;
					case "changepermissions":
						$mode = $this->getPermissions($this->getPermissionCode($request->input('permsCode')));
						$flag = chmod(base_path("clients".DIRECTORY_SEPARATOR.$full_path), $this->getPermissionCode($request->input('permsCode')));
						return response()->json( array( 'result' => $flag ,'mode'=>$mode) );
						break;
				}
			} else {
				return response()->json( array( 'error' => 'Project not exist' ) );
			}
		}
		return response()->json( array( 'error' => 'Invalid input' ) );
	}

	private function isValidUser( $project )
	{
		if ( $this->oUser ) {
			if ( file_exists( base_path() . DIRECTORY_SEPARATOR . 'clients' . DIRECTORY_SEPARATOR . $this->getOrganizationId() . DIRECTORY_SEPARATOR . $this->getUserId() . DIRECTORY_SEPARATOR . $project ) )
				return "/" . $this->getOrganizationId() . "/" . $this->getUserId() . "/" . $project;
		}
		return false;
	}

	public function postUploadFile(Request $request){
		if ( !empty( $_FILES ) && $request->has( 'destination' ) ) {
			$dest = $request->input( 'destination' );
			if($fullpath = $this->isValidUser($dest)) {
				$errors = array();
				foreach ( $_FILES as $key => $file ) {
					$destPath = str_replace( "/", DIRECTORY_SEPARATOR, base_path( 'clients' . DIRECTORY_SEPARATOR . $fullpath ) . DIRECTORY_SEPARATOR );
					$result = $request->file($key)->move($destPath,$file['name']);
					if ( $result == "" ) {
						$errors[ ] = $file[ 'name' ];
					}
				}

				if ( $errors ) {
					return response()->json( array( 'errors' => "Unknown error uploading: \n\n" . implode( ", \n" , $errors ) ) );
				}
			}

			return response()->json( array('result' => $result) );
		}
		return response()->json(array('error'=>'unable to upload'));
	}

	private function getOrganizationId(){
		return $this->oUser->organization_id;
	}

	private function getUserId(){
		return $this->oUser->id;
	}

	private function listFiles($path){
		if( $path ){
			return Storage::files($path);
		}
		return array();
	}

	private function listFolders($path){
		if($path){
			return Storage::directories($path);
		}
		return array();
	}

	private function getInfo($list,$extenstions = array()){
		$aOutput = array();
		if( !empty($list) ){
			foreach( $list as $item ){
				$item = base_path('clients'.DIRECTORY_SEPARATOR.$item);
				if( !is_dir($item) &&  !empty($extenstions) && !in_array(strtolower(pathinfo($item,PATHINFO_EXTENSION)),$extenstions) )
					continue;
				$item_temp = str_replace('/',DIRECTORY_SEPARATOR,$item);
				$item_temp = str_replace('\\',DIRECTORY_SEPARATOR,$item_temp);
				$fileparts = explode(DIRECTORY_SEPARATOR,$item_temp);
				$filename = end($fileparts);
				$aOutput[] = array(
					'date' => date('Y-m-d H:i:s',filemtime($item)),
					'name' => $filename,
					'rights' => $this->getPermissions(fileperms($item)),
					'size' => (is_dir($item)) ? '' : filesize($item),
					'type' => (is_dir($item)) ? 'dir' : 'file'
				);
			}
		}
		return $aOutput;
	}

	private function getPermissions($perms){
		$info = "";
		// Owner
		$info .= (($perms & 0x0100) ? 'r' : '-');
		$info .= (($perms & 0x0080) ? 'w' : '-');
		$info .= (($perms & 0x0040) ?
			(($perms & 0x0800) ? 's' : 'x' ) :
			(($perms & 0x0800) ? 'S' : '-'));

		// Group
		$info .= (($perms & 0x0020) ? 'r' : '-');
		$info .= (($perms & 0x0010) ? 'w' : '-');
		$info .= (($perms & 0x0008) ?
			(($perms & 0x0400) ? 's' : 'x' ) :
			(($perms & 0x0400) ? 'S' : '-'));

		// World
		$info .= (($perms & 0x0004) ? 'r' : '-');
		$info .= (($perms & 0x0002) ? 'w' : '-');
		$info .= (($perms & 0x0001) ?
			(($perms & 0x0200) ? 't' : 'x' ) :
			(($perms & 0x0200) ? 'T' : '-'));

		return $info;
	}

	private function getPermissionCode($permissions){
		$mode = 0;
		if ($permissions[0] == 'r') $mode += 0400;
		if ($permissions[1] == 'w') $mode += 0200;
		if ($permissions[2] == 'x') $mode += 0100;
		else if ($permissions[2] == 's') $mode += 04100;
		else if ($permissions[2] == 'S') $mode += 04000;

		if ($permissions[3] == 'r') $mode += 040;
		if ($permissions[4] == 'w') $mode += 020;
		if ($permissions[5] == 'x') $mode += 010;
		else if ($permissions[5] == 's') $mode += 02010;
		else if ($permissions[5] == 'S') $mode += 02000;

		if ($permissions[6] == 'r') $mode += 04;
		if ($permissions[7] == 'w') $mode += 02;
		if ($permissions[8] == 'x') $mode += 01;
		else if ($permissions[8] == 't') $mode += 01001;
		else if ($permissions[8] == 'T') $mode += 01000;
		return $mode;
	}
}
