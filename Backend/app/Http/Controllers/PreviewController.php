<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Auth\Guard;

class PreviewController extends Controller
{
	public function getFile( Request $request , Guard $auth )
	{
		$oUser = $auth->user();
		$name = $request->input( 'name' );
		$sFile = base_path() . DIRECTORY_SEPARATOR . 'clients' . DIRECTORY_SEPARATOR . $oUser->organization_id . DIRECTORY_SEPARATOR . $oUser->id . DIRECTORY_SEPARATOR . $name;
		if ( file_exists( $sFile ) )
			return file_get_contents( $sFile );
		return response()->json( array( 'error' => 'File not found' ) , 500 );
	}
}
