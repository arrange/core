<?php namespace App\Models;
/**
 * Created by PhpStorm.
 * User: Temp
 * Date: 25-Aug-15
 * Time: 4:10 PM
 */

use Illuminate\Database\Eloquent\Model;

Class Role extends Model{

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = "roles";

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = array( 'role_name' );

	public function  Users()
	{
		return $this->belongsToMany('App\Models\User','user_roles','role_id','user_id');
	}
}
