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
Route::post('stripe/payment-failed', 'Laravel\Cashier\WebhookController@handleWebhook');
Route::post('stripe/payment-success', 'WebhookController@handleInvoicePaymentSucceeded');
Route::get( 'home' , 'HomeController@index' );
Route::group( [ 'middleware' => 'cors' ] , function () {
	Route::resource( 'register' , 'Auth\RegistrationController' , array( 'only' => array( 'store' ) ) );

	Route::post( 'auth' , 'Auth\AuthController@postLogin' );
	Route::post( 'forgot-password' , 'Auth\PasswordController@postEmail' );
	Route::get( 'user/{token}' , 'Auth\AuthController@getTokenInfo' );
	Route::post( 'reset' , 'Auth\PasswordController@postReset' );
	Route::post( 'users/is-exist' , 'UsersController@postIsExist' );
	Route::get( 'valid-subdomain' , 'Auth\AuthController@getValidSubdomain' );

	Route::group( [ 'middleware' => 'token' ] , function () {
		Route::controller( 'users' , 'UsersController' );
		Route::resource( 'projects' , 'ProjectsController' );
		Route::resource( 'admin-presets' , 'PresetsController' );
		Route::controller( 'preview' , 'PreviewController' );
		Route::controller( 'stripe' , 'StripeController' );
		Route::any( 'files/files' , 'FilesController@anyFiles' );
		Route::get( 'preset-thumb' , 'FilesController@getThumb' );
		Route::any( 'handler' , 'FilesController@anyHandler');
		Route::post('handler1', 'FilesController@postUploadFile');
	} );

} );

