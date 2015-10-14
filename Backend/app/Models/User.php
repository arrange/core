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
use Laravel\Cashier\Billable;
use Laravel\Cashier\Contracts\Billable as BillableContract;

class User extends Model implements AuthenticatableContract , CanResetPasswordContract , BillableContract
{
	use Billable;
	use Authenticatable , CanResetPassword;
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
	protected $guarded = [ 'id' ];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = [ 'password' , 'remember_token' ];

	protected $dates = ['trial_ends_at', 'subscription_ends_at'];

	public function Organization()
	{
		return $this->belongsTo( 'App\Models\Organization' , 'organization_id' );
	}

	public function Roles()
	{
		return $this->belongsToMany( 'App\Models\Role' , 'user_roles' , 'user_id' , 'role_id' );
	}

	public function Projects()
	{
		return $this->hasMany( 'App\Models\Project' , 'user_id' );
	}

	public function getTrialEndsAtTimestampAttribute()
	{
		if( $this->trial_ends_at )
			return strtotime($this->trial_ends_at) * 1000;

		return null;
	}

	public function getSubscriptionEndsAtTimestampAttribute($value)
	{
		if( $this->subscription_ends_at )
			return strtotime($this->subscription_ends_at) * 1000;

		return null;

	}

	public function getOnTrialAttribute(){
		return $this->onTrial();
	}

	public function getCancelledAttribute(){
		return $this->cancelled();
	}

	public function getOnGracePeriodAttribute(){
		return $this->onGracePeriod();
	}

	public function getEverSubscribedAttribute(){
		return $this->everSubscribed();
	}

	public function getSubscribedAttribute(){
		return $this->subscribed();
	}

	public function getExpiredAttribute(){
		return $this->expired();
	}

	public function toArray() {
		$arr = parent::toArray();
		$arr['trial_ends_at_timestamp'] = $this->trial_ends_at_timestamp;
		$arr['on_trial'] = $this->on_trial;
		$arr['cancelled'] = $this->cancelled();
		$arr['subscribed'] = $this->subscribed;
		$arr['ever_subscribed'] = $this->ever_subscribed;
		$arr['expired'] = $this->expired;
		return $arr;
	}
}