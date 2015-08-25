<?php namespace App\Models;
/**
 * Created by PhpStorm.
 * User: Temp
 * Date: 25-Aug-15
 * Time: 3:50 PM
 */
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract {

	use Authenticatable, CanResetPassword;
	use SoftDeletes;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['firstname' , 'lastname' , 'organization_id' , 'date_of_birth' , 'email', 'password'];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = ['password', 'remember_token'];

	public function Organization()
	{
		return $this->belongsTo('App\Models\Organization','organization_id');
	}

	public function Roles()
	{
		return $this->belongsToMany('App\Models\Role','user_roles','user_id','role_id');
	}
}