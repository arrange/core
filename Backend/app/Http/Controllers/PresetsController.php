<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Preset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class PresetsController extends Controller
{

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$aPresets = Preset::all();
		return response()->json( $aPresets );
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create( )
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store( Request $request )
	{
		if ( $request->has( 'name' ) ) {
			$sDestinationPath = base_path() . "/presets/";

			if( !file_exists($sDestinationPath) )
				File::makeDirectory( $sDestinationPath , 0777 , true );

			$aInputData = $request->only( array( 'name' ) );

			if( !$request->hasFile( 'zip' ) )
				return response()->json( array( 'error' => "Add zip file" ) , 500 );

			$oFile = $request->file( 'zip' );
			$sZipFile = $request->file( 'zip' )->getClientOriginalName();
			$counter = 1;
			while( File::exists($sDestinationPath.$sZipFile) )
				$sZipFile = pathinfo($oFile->getClientOriginalName(),PATHINFO_FILENAME)."_".$counter++.".".pathinfo($oFile->getClientOriginalName(),PATHINFO_EXTENSION);

			$request->file( 'zip' )->move( $sDestinationPath , $sZipFile );
			$aInputData[ 'zip_location' ] = $sDestinationPath . $sZipFile;

			if( $request->hasFile( 'thumb' ) ) {

				$oFile = $request->file( 'thumb' );
				$sThumbFile = $request->file( 'thumb' )->getClientOriginalName();
				$counter = 1;
				while( File::exists($sDestinationPath.$sThumbFile) )
					$sThumbFile = pathinfo($oFile->getClientOriginalName(),PATHINFO_FILENAME)."_".$counter++.".".pathinfo($oFile->getClientOriginalName(),PATHINFO_EXTENSION);

				$request->file( 'thumb' )->move( $sDestinationPath , $sThumbFile );
				$aInputData[ 'thumb' ] = url().'/presets/'. $sThumbFile;
			}

			$oPreset = Preset::create( $aInputData );
			if ( !$oPreset )
				return response()->json( array( 'error' => "Couldn't create presets" ) , 500 );

			return response()->json( $oPreset->toArray() );
		}
		return response()->json( array( 'error' => "Preset name is required" ) , 500 );
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
