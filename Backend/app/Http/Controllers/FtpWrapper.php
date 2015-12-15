<?php namespace app\Http\Controllers;

/**
 * Created by PhpStorm.
 * User: Temp
 * Date: 08-Dec-15
 * Time: 3:18 PM
 */
use Illuminate\Http\Request;
use Illuminate\Auth\Guard;
use App\Services\FileManager\FileManager;

class FtpWrapper extends Controller
{

	private $ftp;

	public function __construct()
	{
		$oFtp = new FileManager( array(
			'hostname' => env( 'FTP_HOST' ) ,
			'username' => env( 'FTP_USERNAME' ) ,
			'password' => env( 'FTP_PASSWORD' )
		) );
		if ( !$oFtp->connect() ) {
			return response()->json( array( 'error' => 'Unable to connect to ftp' ) );
		}
		$this->ftp = $oFtp;
	}

	public function anyHandler( Request $request , Guard $auth )
	{
		if ( $request->has( 'mode' ) && $request->has( 'path' ) ) {
			if ( $full_path = $this->isValidUser( $request->input( 'path' ) , $auth ) ) {
				if ( $request->input( 'mode' ) === 'savefile' && $request->has( 'content' ) ) {
					file_put_contents( base_path( "clients" . $full_path ) , $request->input( 'content' ) );
					return response()->json( array( 'result' => 'true' ) );
				}
				if ( $request->input( 'mode' ) === 'list' ) {
					$extensions = array();
					if ( $request->has( 'extension' ) ) {
						$extensions[ ] = $request->input( 'extension' );
					}
					$list = $this->ftp->listFilesRaw( $full_path , false , array( "." , ".." ) , $extensions );
					$list = is_array( $list ) ? $list : array();
					$list = array_map( function ( $item ) {
						$date = new \DateTime( 'now' );
						$item[ 'date' ] = $date->format( 'Y-m-d H:i:s' );
						return $item;
					} , $list );
					return response()->json( array( 'result' => $list ) );
				}
				if ( $request->input( 'mode' ) === 'editfile' ) {
					return response()->json( array( 'result' => $this->ftp->getContent( $full_path ) ) );
				}
				if ( $request->input( 'mode' ) === 'rename' ) {
					$path = $full_path;
					$newPath = $request->input( 'newPath' );
					$result = $this->ftp->move( $path , $newPath );
					if ( !$result ) {
						throw new Exception( "Unknown error renaming this folder" );
					}
					return response()->json( array( 'result' => $result ) );
				}
				if ( $request->input( 'mode' ) === 'delete' ) {
					$path = $full_path;
					$result = $this->ftp->delete( $path );
					if ( !$result ) {
						return response()->json( array( "errors" => "Unknown error removing this item" ) );
					}
					return response()->json( array( 'result' => $result ) );
				}
				if ( $request->input( 'mode' ) === 'addfolder' ) {
					$path = Request::getApiParam( 'path' );
					$name = Request::getApiParam( 'name' );
					$result = $this->ftp->mkdir( $path . '/' . $name );
					if ( !$result ) {
						return response()->json( array( "errors" => "Unknown error creating this folder" ) );
					}
					return response()->json( array( 'result' => $result ) );
				}
				if ( $request->input( 'mode' ) === 'compress' || $request->input( 'mode' ) === 'extract' ) {
					return response()->json( true );
				}
				if ( $request->input( 'mode' ) === 'download' ) {
					$download = $request->input( 'preview' ) === 'true' ? '' : 'attachment;';
					$filePath = $full_path;
					$fileName = explode( '/' , $filePath );
					$fileName = end( $fileName );
					$tmpFilePath = $this->ftp->downloadTemp( $filePath );
					if ( $fileContent = @file_get_contents( $tmpFilePath ) ) {
						return response()->json( $fileContent );
						$oResponse->setHeaders( array(
							'Content-Type' => @mime_content_type( $tmpFilePath ) ,
							'Content-disposition' => sprintf( '%s filename="%s"' , $download , $fileName )
						) );
					}
				}
			} else {
				return response()->json( array( 'error' => 'Project not exist' ) );
			}
			if ( !empty( $_FILES ) && $request->has( 'destination' ) ) {
					$dest = $request->input( 'destination' );
					$errors = array();
					foreach ( $request->file() as $file ) {
						$filePath = $file[ 'tmp_name' ];
						$destPath = $dest . '/' . $file[ 'name' ];
						$result = $this->ftp->upload( $filePath , $destPath );
						if ( !$result ) {
							$errors[ ] = $file[ 'name' ];
						}
					}

					if ( $errors ) {
						return response()->json( array( 'errors' => "Unknown error uploading: \n\n" . implode( ", \n" , $errors ) ) );
					}

					return response()->json( $result );
			}
		}
		return response()->json( array( 'error' => 'Invalid input' ) );
	}

	private function isValidUser( $project , Guard $auth )
	{
		$oUser = $auth->user();
		if ( $oUser ) {
			if ( file_exists( base_path() . DIRECTORY_SEPARATOR . 'clients' . DIRECTORY_SEPARATOR . $oUser->Organization()->first()->id . DIRECTORY_SEPARATOR . $oUser->id . DIRECTORY_SEPARATOR . $project ) )
				return DIRECTORY_SEPARATOR . $oUser->Organization()->first()->id . DIRECTORY_SEPARATOR . $oUser->id . DIRECTORY_SEPARATOR . $project;
		}
		return false;
	}

}