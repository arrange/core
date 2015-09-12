<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{

	public function postIsExist( Request $request )
	{
		if ( $request->has( 'email' ) AND $request->has( 'google_sign_up' ) ) {
			$oUser = User::with( 'Organization' )
				->where( 'email' , $request->input( 'email' ) )
				->where( 'google_sign_up' , '=' , $request->input( 'google_sign_up' ) )
				->whereHas( 'Roles' , function ( $q ) {
					$q->where( 'role_name' , '=' , 'Owner' );
				} )->first();


			if ( $oUser ) {
				return response()->json( [ 'user' => $oUser ] );
			}
		}
		return response()->json( array( 'user' => false ,	 'error' => "Unable to get user" ) );
	}

}
