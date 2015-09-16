<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Preset;
use App\Services\FileManager\SnapshotGenerator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Services\Extractor;

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
	public function create()
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
			$sDestinationPath = PRESETS_BASE_PATH;

			if ( !file_exists( $sDestinationPath ) )
				File::makeDirectory( $sDestinationPath , 0777 , true );

			$aInputData = $request->only( array( 'name' ) );

			if ( !$request->hasFile( 'zip' ) )
				return response()->json( array( 'error' => "Add zip file" ) , 500 );

			$oFile = $request->file( 'zip' );
			$sZipFile = $request->file( 'zip' )->getClientOriginalName();
			$sFileName = pathinfo( $oFile->getClientOriginalName() , PATHINFO_FILENAME );

			$counter = 1;
			while ( File::exists( $sDestinationPath . $sFileName ) ) {
				$sFileName = pathinfo( $oFile->getClientOriginalName() , PATHINFO_FILENAME ) . "_" . $counter ++;
				$sZipFile = $sFileName . "." . pathinfo( $oFile->getClientOriginalName() , PATHINFO_EXTENSION );
			}

			$request->file( 'zip' )->move( $sDestinationPath , $sZipFile );
			$aInputData[ 'zip_location' ] = $sFileName;

			// Extract zip to zip named folder
			$sSourceZip = PRESETS_BASE_PATH . $sZipFile;
			$sDestinationFolder = PRESETS_BASE_PATH . $sFileName . DIRECTORY_SEPARATOR;
			if ( !file_exists( $sDestinationFolder ) )
				File::makeDirectory( $sDestinationFolder , 0777 , true );
			$oExtractor = new Extractor( $sSourceZip , $sDestinationFolder );
			$oExtractor->extract( $sSourceZip , $sDestinationFolder );

			// Generate preview thumb from extracted folder
			$oSnpShotGenerator = new SnapshotGenerator();
			if ( $oExtractor ) {
				$aFile = $oSnpShotGenerator->getHtmlFile( $sDestinationFolder );
				if ( !empty( $aFile ) AND count( $aFile ) > 1 ) {
					$sSrc = "Backend/presets/" . $sFileName . "/" . $aFile[ 1 ];
					$sDest = PRESETS_BASE_PATH . $sFileName . ".png";
					$sThumbPath = $oSnpShotGenerator->getAndSavePreview( $sSrc , $sDest );
					if ( $sThumbPath ) {
						$aInputData[ 'thumb' ] = $sFileName . ".png";
					}
				}
			}

			unlink( $sSourceZip );

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
