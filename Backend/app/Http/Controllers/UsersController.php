<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\ChangeProfileRequest;
use App\Http\Requests\ChangePasswordRequest;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{

	public function postSave( ChangeProfileRequest $request ){
		if( $request->has('id') ){
			$id = $request->input('id');
			$oUser = User::with('Organization')->where('id','=',$id)->first();

			if( !$oUser )
				return response()->json(array("message"=>"Can't find user"),404);

			$oUser->email = $request->input('email');
			$oUser->firstname = $request->input('organization')['name'];
			if( $oUser->Roles()->first()->role_name == "Owner" )
				$oUser->Organization()->update(array('email'=>$request->input('email'),'name'=>$request->input('organization')['name']));
			$oUser->save();
			return response()->json($oUser->toArray());
		}
		return response()->json(array("message"=>"Something went wrong,please try again"),404);
	}

	public function postIsExist( Request $request )
	{
		if ( $request->has( 'email' ) ) {
			$oUser = User::with( 'Organization' )
				->where( 'email' , $request->input( 'email' ) )
				->whereHas( 'Roles' , function ( $q ) {
					$q->where( 'role_name' , '=' , 'Owner' );
				} )->first();

			if ( $oUser ) {
				return response()->json( [ 'user' => $oUser ] );
			}
		}
		return response()->json( array( 'user' => false ,	 'error' => "Unable to get user" ) );
	}

	public function postChangePassword(ChangePasswordRequest $request ){
		if( $request->has('id') ){
			$id = $request->input('id');
			$oUser = User::find($id);
			if( !Hash::check($request->input('old_password'),$oUser->password) )
				return response()->json(array('password'=>'Old password is not valid'),500);
			$oUser->password = bcrypt($request->input('password'));
			$oUser->save();
			return response()->json($oUser->toArray());
		}
		return response()->json(array('error'=>"Something went wrong,please try again"),500);
	}
}
