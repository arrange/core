<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Services\Extractor;
use App\Models\Preset;
use App\Models\Project;
use App\Services\FileManager\SnapshotGenerator;
use Illuminate\Auth\Guard;

class ProjectsController extends Controller
{

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index( Guard $auth )
	{
		$oUser = $auth->user();
		$aProjects = Project::where( 'user_id' , '=' , $oUser->id )->get();
		return response()->json( $aProjects );
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
	public function store( Request $request , Guard $auth )
	{
		$oUser = $auth->user();

		if ( !$request->input( 'name' ) )
			return response()->json( array( 'error' => "Project title required" ) , 500 );

		$aProject = Project::where( 'name' , '=' , $request->input( 'name' ) )->where( 'user_id' , '=' , $oUser->id )->get();

		if ( count($aProject) > 0 )
			return response()->json( array( 'error' => 'Project name already exists' ) , 500 );

		if( $request->has('folder_name') )
			$aProject = Project::Where('location','LIKE','%'.$request->input('folder_name').'%')->where( 'user_id' , '=' , $oUser->id )->get();

		if ( count($aProject) > 0 )
			return response()->json( array( 'error' => 'Folder name already exists' ) , 500 );

		$aInputData = $request->only( 'name' );
		$aInputData[ 'organization_id' ] = $oUser->organization_id;
		$aInputData[ 'user_id' ] = $oUser->id;

		// Save project data in project table
		$oProject = Project::create( $aInputData );
		if ( !$oProject )
			return response()->json( array( 'error' => "Unable to create project" ) , 500 );

		$sProjectFolder = $request->input( 'folder_name' , $oProject->id );
		$sDestinationPath = CLIENTS_BASE_PATH . $oUser->Organization->id . DIRECTORY_SEPARATOR . $oUser->id . DIRECTORY_SEPARATOR . $sProjectFolder . DIRECTORY_SEPARATOR;

		// Create Destination Dir
		if ( !file_exists( $sDestinationPath ) )
			File::makeDirectory( $sDestinationPath , $permissions = intval( "0777" , 8 ) , true );

		$oProject->location = $sProjectFolder . DIRECTORY_SEPARATOR;

		// Extract preset's zip file in project_id folder
		if ( $request->has( 'preset_id' ) ) {
			$oPreset = Preset::find( $request->input( 'preset_id' ) );
			if ( $oPreset ) {
				$oProject->preset_id = $request->input( 'preset_id' );
				$sSource = PRESETS_BASE_PATH . $oPreset->zip_location;
				$oExtractor = new Extractor( $sSource , $sDestinationPath );
				$oExtractor->extract( $sSource , $sDestinationPath );
				if ( !$oExtractor ) {
					$oProject->delete();
					File::deleteDirectory( $sDestinationPath );
					return response()->json( array( 'error' => "Unable to extract template" ) , 500 );
				}
			}
		}

		// Extract thumb
		$oSnpShotGenerator = new SnapshotGenerator();
		$sSrc = env( 'FTP_BASEPATH_PREFIX' ) . "/" . $oUser->Organization->id . "/" . $oUser->id . "/" . $sProjectFolder . "/index1.html";
		$sDest = CLIENTS_BASE_PATH . $oUser->Organization->id . DIRECTORY_SEPARATOR . $oUser->id . DIRECTORY_SEPARATOR . $sProjectFolder . ".png";
		$sThumbPath = $oSnpShotGenerator->getAndSavePreview( $sSrc , $sDest );
		if ( $sThumbPath ) {
			$oProject->thumb = $sProjectFolder . ".png";
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
	public function show( $id , Guard $auth )
	{
		$oUser = $auth->user();
		$oProject = Project::where( 'user_id' , '=' , $oUser->id )->where( 'id' , '=' , $id )->first();
		if ( !$oProject )
			return response()->json( array( 'error' => "Unable to find project" ) , 404 );
		return response()->json( $oProject );
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
