<?php namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Organization;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use App\Http\Requests\SignUpRequest;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store( SignUpRequest $request )
	{
		$aInputOrganizationData = $request->only( array( 'name' , 'subdomain' , 'email' ) );

		if ( $request->has( 'google_sign_up' ) ) {
			$aInputUserData = $request->only( 'email' );
			$aInputUserData[ 'google_sign_up' ] = 1;
		} else {
			$aInputUserData = $request->only( 'email' , 'password' );
			$aInputUserData[ 'google_sign_up' ] = 0;
			$aInputUserData[ 'password' ] = bcrypt( $aInputUserData[ 'password' ] );
		}

		// Insert Organization
		$oOrganization = Organization::create( $aInputOrganizationData );
		if ( !$oOrganization )
			return response()->json( array( 'error' => 'Something went wrong,please try again' ) , 500 );

		$aInputUserData[ 'organization_id' ] = $oOrganization->id;
		$aInputUserData[ 'firstname' ] = $request->input( 'name' );
		$aInputUserData[ 'token' ] = str_random( 120 );

		// Get Owner role's row
		$oRole = Role::where( 'role_name' , 'Owner' )->first();

		$aInputUserData[ 'trial_ends_at' ] = Carbon::now()->addDays( 14 );
		// Insert User
		$oUser = User::create( $aInputUserData );

		// Attach Role with User
		if ( $oUser ) {
			if ( $oRole )
				$oUser->roles()->attach( $oRole->id );

			$oOrganization = Organization::where( 'id' , '=' , $oOrganization->id )->with( array(
				'Users' => function ( $q ) {
					$q->with( 'Roles' );
				}
			) )->first();


		}
		return response()->json( $oOrganization , 200 );
	}
}
