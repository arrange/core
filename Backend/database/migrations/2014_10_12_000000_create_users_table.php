<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create( 'users' , function ( Blueprint $table ) {
			$table->increments( 'id' );
			$table->string( 'firstname' )->nullable()->default( null );
			$table->string( 'lastname' )->nullable()->default( null );
			$table->string( 'email' )->unique();
			$table->string( 'password' , 60 );
			$table->datetime( 'date_of_birth' )->nullable()->default( null );
			$table->datetime( 'last_logged_in' )->nullable()->default( null );
			$table->integer( 'organization_id' )->nullable()->default( 0 );
			$table->string( 'token' )->nullable()->default( null );
			$table->rememberToken();
			$table->softDeletes();
			$table->timestamps();
		} );
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop( 'users' );
	}

}
