<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get( '/' , 'WelcomeController@index' );

Route::get( 'home' , 'HomeController@index' );

Route::group( [ 'middleware' => 'cors' ] , function ( Illuminate\Routing\Router $router ) {
	Route::resource( 'register' , 'Auth\RegistrationController' , array( 'only' => array( 'store' ) ) );

	Route::post( 'auth' , 'Auth\AuthController@postLogin' );
	Route::post( 'forgot-password' , 'Auth\PasswordController@postEmail' );
	Route::get( 'user/{token}' , 'Auth\AuthController@getTokenInfo' );
	Route::post( 'reset' , 'Auth\PasswordController@postReset' );

	Route::get( 'valid-subdomain' , 'Auth\AuthController@getValidSubdomain' );

	Route::group( [ 'middleware' => 'token' ] , function () {
		Route::resource( 'projects' , 'ProjectsController' );
		Route::controller( 'files' , 'FilesController' );
		Route::resource( 'admin-presets' , 'PresetsController' );
		Route::controller( 'preview' , 'PreviewController' );
		Route::get( 'preset-thumb' , function ( Illuminate\Http\Request $request ) {
			$name = $request->input( 'name' );
			return file_get_contents( base_path() . DIRECTORY_SEPARATOR . 'presets' . DIRECTORY_SEPARATOR . $name );
		} );
	} );

} );

