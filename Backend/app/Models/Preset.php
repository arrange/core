<?php namespace App\Models;
/**
 * Created by PhpStorm.
 * User: Temp
 * Date: 01-Sep-15
 * Time: 3:43 PM
 */
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Preset extends Model{

	use SoftDeletes;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = "Presets";

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = array( 'name' , 'zip_location' , 'thumb' );

	public function Projects()
	{
		return $this->hasMany('App\Models\Project','preset_id');
	}
}