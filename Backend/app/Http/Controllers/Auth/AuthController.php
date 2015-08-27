<?php namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Organization;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\Registrar;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Http\Request;

class AuthController extends Controller
{

	/*
	|--------------------------------------------------------------------------
	| Registration & Login Controller
	|--------------------------------------------------------------------------
	|
	| This controller handles the registration of new users, as well as the
	| authentication of existing users. By default, this controller uses
	| a simple trait to add these behaviors. Why don't you explore it?
	|
	*/

	use AuthenticatesAndRegistersUsers;


	/**
	 * @param Guard $auth
	 * @param Registrar $registrar
	 */
	public function __construct( Guard $auth , Registrar $registrar )
	{
		$this->auth = $auth;
		$this->registrar = $registrar;

		$this->middleware( 'guest' , [ 'except' => 'getLogout' ] );
	}

	public function getValidSubdomain( Request $request )
	{
		$oOrganization = Organization::where( 'subdomain' , '=' , $request->input( 'subdomain' ) )->first();

		if ( !$oOrganization )
			return response()->json( array( 'error' => "couldn't find organization" ) , 500 );

		return response()->json( $oOrganization->toArray() , 200 );
	}
}
