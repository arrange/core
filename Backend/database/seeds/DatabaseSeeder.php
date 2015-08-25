<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Organization;
use App\Models\Role;


class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Model::unguard();
		$this->call('RoleTableSeeder');
		$this->call('OrganizationTableSeeder');
		$this->call('UserTableSeeder');
	}

}

class UserTableSeeder extends Seeder {

	public function run()
	{
		$oUser = User::create(array(
			'firstname' => 'Super',
			'lastname' => 'Admin',
			'email' => 'bhaumikwork@gmail.com',
			'password' => bcrypt('admin123'),
			'organization_id' => 1
		));
		\Illuminate\Support\Facades\DB::table('user_roles')->insert(
			array(	'user_id'  => $oUser->id  ,  'role_id'	=> 1   )
		);
	}
}

class OrganizationTableSeeder extends Seeder{

	public function run(){
		Organization::create(array(
			'name' => 'Notrie',
			'subdomain' => 'admin',
			'email' => 'bhaumikwork@gmail.com',
			'logo' => '',
			'base_path' => ''
		));
	}
}

class RoleTableSeeder extends Seeder{

	public function run()
	{
		Role::create(array(
			'role_name' => 'SuperAdmin',
		));
		Role::create(array(
			'role_name' => 'Owner',
		));
	}
}