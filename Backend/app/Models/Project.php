<?php namespace App\Models;

/**
 * Created by PhpStorm.
 * User: Temp
 * Date: 01-Sep-15
 * Time: 2:49 PM
 */
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{

	use SoftDeletes;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = "projects";

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = array( 'name' , 'user_id' , 'organization_id' , 'location' , 'thumb' , 'preset_id' );

	public function User()
	{
		return $this->belongsTo( 'App\Models\User' , 'user_id' );
	}

	public function Organization()
	{
		return $this->belongsTo( 'App\Models\Organization' , 'organization_id' );
	}

	public function Preset()
	{
		return $this->belongsTo( 'App\Models\Preset' , 'preset_id' );
	}
}