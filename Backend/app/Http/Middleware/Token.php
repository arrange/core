<?php namespace App\Http\Middleware;
use Closure;
use Illuminate\Auth\Guard;
use App\Models\User;
class Token {
	/**
	 * The Guard implementation.
	 *
	 * @var Guard
	 */
	protected $auth;


	public function __construct(Guard $auth)
	{
		$this->auth = $auth;
	}


	public function handle($request, Closure $next)
	{
		//return $next($request);
		$token = $request->header( 'Token' );

		if ( empty( $token ) )
		{
			if( $request->has('token') )
				$token = $request->input('token');
			else
				return response()->json ( [ 'status'=>'error', 'error'=>['message' => 'Please Login to continue!' ]] , 403 );
		}

		$oUser = User::where ( 'token' , '=' , $token )->first ();
		if ( ! $oUser )
		{
			return response()->json ( [ 'status'=>'error', 'error'=>['message' => 'token is missing' ]] , 403 );
		}
		$this->auth->setUser( $oUser );
		return $next($request);
	}

}
