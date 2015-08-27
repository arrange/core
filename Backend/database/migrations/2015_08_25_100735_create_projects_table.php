<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('projects',function(Blueprint $table){
			$table->increments('id');
			$table->string('name')->nullable()->default(null);
			$table->string('location')->nullable()->default(null);
			$table->integer('organization_id')->nullable()->default(0);
			$table->integer('user_id')->nullable()->default(0);
			$table->integer('preset_id')->nullable()->default(0);
			$table->softDeletes();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('projects');
	}

}
