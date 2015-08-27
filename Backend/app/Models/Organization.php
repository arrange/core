<?php namespace App\Models;
/**
 * Created by PhpStorm.
 * User: Temp
 * Date: 25-Aug-15
 * Time: 3:59 PM
 */
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Organization extends Model{

	use SoftDeletes;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = "organizations";

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = array( 'name' , 'subdomain' , 'email' , 'logo' , 'base_path' );

	public function Users()
	{
		return $this->hasMany('User','organization_id');
	}

}