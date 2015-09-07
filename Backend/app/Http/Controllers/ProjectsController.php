<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Services\Extractor;
use App\Models\Preset;
use App\Models\Project;

class ProjectsController extends Controller
{

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{

	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{

	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store( Request $request )
	{
		$token = $request->header( 'Token' );

		// get user and organization using token
		$oUser = User::where( 'token' , '=' , $token )->with( array( 'organization' ) )->first();

		if ( !$oUser )
			return response()->json( array( 'error' => "Invalid token" ) , 500 );

		if ( !$request->input( 'name' ) )
			return response()->json( array( 'error' => "Project title required" ) , 500 );

		$aInputData = $request->only( 'name' );
		$aInputData[ 'organization_id' ] = $oUser->Organization->id;
		$aInputData[ 'user_id' ] = $oUser->id;

		// Save project data in project table
		$oProject = Project::create( $aInputData );
		if ( !$oProject )
			return response()->json( array( 'error' => "Unable to create project" ) , 500 );

		$sProjectFolder = $request->input( 'folder_name' , $oProject->id );
		$sDestinationPath = base_path() . DIRECTORY_SEPARATOR . "clients" . DIRECTORY_SEPARATOR . $oUser->Organization->id . DIRECTORY_SEPARATOR . $oUser->id . DIRECTORY_SEPARATOR . $sProjectFolder . DIRECTORY_SEPARATOR;

		// Create Destination Dir
		if ( !file_exists( $sDestinationPath ) )
			File::makeDirectory( $sDestinationPath , 0777 , true );

		$oProject->location = url() . "/clients/" . $oUser->Organization->id . "/" . $oUser->id . "/" . $sProjectFolder . "/";

		// Extract preset's zip file in project_id folder
		if ( $request->has( 'preset_id' ) ) {
			$oPreset = Preset::find( $request->input( 'preset_id' ) );
			if ( $oPreset ) {
				$oProject->preset_id = $request->input( 'preset_id' );
				$sSource = $oPreset->zip_location;
				$oExtractor = new Extractor( $sSource , $sDestinationPath );
				$oExtractor->extract( $sSource , $sDestinationPath );
				//dd($oExtractor);
				if ( !$oExtractor ) {
					$oProject->delete();
					File::deleteDirectory( $sDestinationPath );
					return response()->json( array( 'error' => "Unable to extract template" ) , 500 );
				}
			}

		}

		// Save thumb in projects folder
		if ( $request->hasFile( 'thumb' ) AND $oUser->Organization ) {
			if ( $request->file( 'thumb' )->isValid() ) {

				$sDestinationPath = base_path() . DIRECTORY_SEPARATOR . "clients" . DIRECTORY_SEPARATOR . $oUser->Organization->id . DIRECTORY_SEPARATOR . $oUser->id . DIRECTORY_SEPARATOR;

				$file = $request->file( 'thumb' );
				$sExtension = $file->getClientOriginalExtension();

				$request->file( 'thumb' )->move( $sDestinationPath , $sProjectFolder . "." . $sExtension );

				$oProject->thumb = url() . "/clients/" . $oUser->Organization->id . "/" . $oUser->id . "/" . $sProjectFolder . "." . $sExtension;
			}
		}

		$oProject->save();

		return response()->json( $oProject->toArray() );
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int $id
	 * @return Response
	 */
	public function show( $id )
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int $id
	 * @return Response
	 */
	public function edit( $id )
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int $id
	 * @return Response
	 */
	public function update( $id )
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int $id
	 * @return Response
	 */
	public function destroy( $id )
	{
		//
	}

}
