<?php namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Organization;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\Registrar;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Http\Request;
use App\Models\User;


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

	public function postLogin( Request $reqeust )
	{
		$this->validate( $reqeust , [
			'email' => 'required|email' , 'password' => 'required' , 'subdomain' => 'required'
		] );

		$oOrganization = Organization::where( 'subdomain' , $reqeust->input( 'subdomain' ) )->first();
		if ( !$oOrganization )
			return response()->json( array( 'error' => "Invalid subdomain" ) , 500 );

		$credentials = $reqeust->only( 'email' , 'password' );
		$credentials[ 'organization_id' ] = $oOrganization->id;
		if ( $this->auth->attempt( $credentials , $reqeust->has( 'remember' ) ) ) {
			$oUsr = $this->auth->user();
			$oUsr->last_logged_in = date( 'Y-m-d H:i:s' );
			if( !$oUsr->token )
			{
				$oUsr->token = str_random(120);
			}
			$oUsr->save();
			$oUsr = User::where( 'id' , $oUsr->id )
				->with( array( 'Organization' , 'Roles' ) )
				->first();
			return response()->json( $oUsr->toArray() );
		}
		return response()->json( array( 'error' => "Invalid username or password" ) , 500 );
	}

	public function getTokenInfo($token)
	{
		$oUser = User::where('token',$token)->first();
		if( ! $oUser )
			return $this->error('Invalid Token',403);

		$oUser->token = $token->token;

		return response()->json($oUser->toArray());
	}
}
