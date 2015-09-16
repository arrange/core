<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Services\FileManager\SnapshotGenerator;
use Illuminate\Auth\Guard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class FilesController extends Controller
{
	private $path;
	private $user;
	private $filemanager;
	private $base;
	private $url;
	private $ftpPath;

	public function __construct( Request $request , Guard $guard )
	{
		$this->filemanager = app( 'FileHandler' );
		$this->filemanager->connect();
		$this->user = $guard->user();
		$this->base = base_path() . DIRECTORY_SEPARATOR;
		$this->base = str_replace( env( 'FTP_BASEPATH_PREFIX' ) , '' , $this->base );

		$this->ftpPath = env( 'FTP_BASEPATH_PREFIX' );

		$this->path = $this->ftpPath . DIRECTORY_SEPARATOR . CLIENT_FOLDER . DIRECTORY_SEPARATOR . $this->user->organization_id . DIRECTORY_SEPARATOR . $this->user->id . DIRECTORY_SEPARATOR;

	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function anyIndex( Request $request )
	{
		if ( !$request->has( 'path' ) )
			return response()->json( array( 'error' => 'Path is required' ) , 404 );

		$this->url = urldecode( $request->input( 'path' ) );
		//$this->path .= urldecode( $request->input( 'path' ) );

		if ( !$request->has( 'mode' ) )
			return response()->json( array( 'error' => 'Provide mode' ) , 500 );

		$response = array( 'error' => 'Something went wrong , please try again' );
		$mode = $request->input( 'mode' );

		switch ( $mode ) {
			case "list" :
				$this->path .= $this->url;
				$bOnlyFolders = $request->input( 'onlyFolders' , false );
				$response = $this->filemanager->listFilesRaw( $this->path , $bOnlyFolders );
				break;
			case "addFolder" :
				$this->path .= $this->url . DIRECTORY_SEPARATOR . urldecode( $request->input( 'name' ) );
				$response = $this->filemanager->mkdir( $this->path );
				break;
			case "removeFolder" :
				$this->path .= $this->url;
				$response = $this->filemanager->deleteDir( $this->path );
				break;
			case "addFile" :
				$path = $this->base . $this->path . $this->url;

				if ( !$request->hasFile( 'newfile' ) )
					return response()->json( array( 'error' => 'File is required' ) , 500 );

				$oFile = $request->file( 'newfile' );
				$this->moveFile( $oFile , $path );
				$response = true;

				break;
			case "editFile" :
				$this->path = $this->base . $this->path;
				$this->path .= $this->url ;
				if( file_exists($this->path) ) {
					return file_get_contents( $this->path );
				}
				else if( strpos($this->path, "index.html") !== false )
				{
					$oSnpShotGen = new SnapshotGenerator();
					$strPath = $this->path;
					$files = $oSnpShotGen->getHtmlFile(str_replace("index.html","",$strPath));
					return file_get_contents($files[0].$files[1]);
				}
				$response = false;
				break;
			case "saveFile" :
				$path = $this->base . $this->path . $this->url;

				if ( !$request->has( 'text' ) )
					return response()->json( array( 'error' => 'Provide file content' ) , 500 );

				$text = urldecode( $request->input( 'text' ) );

				if( file_exists($path) ) {
					file_put_contents( $path , $text );
					$response = true;
				}
				else if( strpos($path, "index.html") !== false )
				{
					$oSnpShotGen = new SnapshotGenerator();
					$strPath = $path;
					$files = $oSnpShotGen->getHtmlFile(str_replace("index.html","",$strPath));
					file_put_contents($files[0].$files[1],$text );
					$response = true;
				}
				else {
					$response = false;
				}
				break;
			case "removeFile" :
				$this->path .= $this->url;
				$response = $this->filemanager->deleteFile( $this->path );
				break;
			case "rename" :

				if ( !$request->has( 'new' ) OR !$request->has( 'old' ) )
					return response()->json( array( 'error' => 'Old name and New name both required' ) , 500 );

				$path = $this->path . $this->url . DIRECTORY_SEPARATOR;
				$oldpath = $path . urldecode( $request->input( 'old' ) );
				$newpath = $path . urldecode( $request->input( 'new' ) );

				if ( !file_exists( $this->base . $oldpath ) )
					return response()->json( array( 'error' => 'File/Folder not exist' ) , 500 );

				$response = $this->filemanager->rename( $oldpath , $newpath );

				break;
			default:
				break;
		}

		if ( $response )
			return response()->json( array( 'success' => $response ) );

		return response()->json( array( 'error' => $response ) , 500 );
	}

	private function moveFile( $oFile , $path )
	{
		$sFile = $oFile->getClientOriginalName();
		$counter = 1;
		while ( File::exists( $path . $sFile ) )
			$sFile = pathinfo( $oFile->getClientOriginalName() , PATHINFO_FILENAME ) . "_" . $counter ++ . "." . pathinfo( $oFile->getClientOriginalName() , PATHINFO_EXTENSION );

		$oFile->move( $path , $sFile );
	}

}
