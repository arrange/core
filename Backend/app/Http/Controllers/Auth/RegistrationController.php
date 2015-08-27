<?php namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Organization;
use App\Models\Role;
use App\Models\User;
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
		$aInputUserData = $request->only( array( 'email' , 'password' ) );

		// Insert Organization
		$oOrganization = Organization::create( $aInputOrganizationData );
		if ( !$oOrganization )
			return response()->json( array( 'error' => 'Something went wrong,please try again' ) , 500 );

		$aInputUserData[ 'organization_id' ] = $oOrganization->id;
		$aInputUserData[ 'firstname' ] = $request->input( 'name' );
		$aInputUserData[ 'password' ] = bcrypt( $aInputUserData[ 'password' ] );
		// Get Owner role's row
		$oRole = Role::where( 'role_name' , 'Owner' )->first();

		// Insert User
		$oUser = User::create( $aInputUserData );

		// Attach Role with User
		if ( $oUser ) {
			if ( $oRole )
				$oUser->roles()->attach( $oRole->id );

			/*// Save Logo
			if ( $request->hasFile( 'logo' ) ) {
				if ( $request::file( 'logo' )->isValid() ) {
					$sDestinationPath = public_path() . "client/" . $oOrganization->id . "/logo/";

					// Create Destination Dir
					$bMakeDir = File::makeDirectory( $sDestinationPath , 0775 , true );

					// Move logo to server
					if ( $bMakeDir ) {

						// Upload logo
						$request->file( 'logo' )->move( $sDestinationPath );

						// Save logo name in organization table
						$sFileName = $request->file( 'logo' )->getClientOriginalName();
						$oOrganization->logo = $sDestinationPath . $sFileName;
						$oOrganization->save();
					}
				}
			}*/

			$oOrganization = Organization::where('id','=',$oOrganization->id)->with(array('Users'=>function($q){
				$q->with('Roles');
			}))->first();


		}
		return response()->json( $oOrganization , 200 );
	}
}
