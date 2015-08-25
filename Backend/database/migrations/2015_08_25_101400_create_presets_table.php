<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePresetsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('presets',function(Blueprint $table){
			$table->increments('id');
			$table->string('name')->nullable()->default(null);
			$table->string('zip_location')->nullable()->default(null);
			$table->string('thumb')->nullable()->default(null);
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
		Schema::drop('presets');
	}

}
