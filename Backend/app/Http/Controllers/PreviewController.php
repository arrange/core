<?php namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Auth\Guard;
use App\Services\FileManager\SnapshotGenerator;

class PreviewController extends Controller
{
	public function getFile( Request $request , Guard $auth )
	{
		$oUser = $auth->user();
		$name = $request->input( 'name' );
		$sFile = CLIENTS_BASE_PATH. $oUser->organization_id . DIRECTORY_SEPARATOR . $oUser->id . DIRECTORY_SEPARATOR . $name;
		if ( file_exists( $sFile ) )
			return file_get_contents( $sFile );
		return response()->json( array( 'error' => 'File not found' ) , 500 );
	}

	public function postSaveSnapshot( Request $request , Guard $auth )
	{
		$oUser = $auth->user();
		// Extract thumb
		$oSnpShotGenerator = new SnapshotGenerator();
		$iProjectId = $request->input( 'id' );
		$oProject = Project::where( 'id' , '=' , $iProjectId )->first();
		$sSrc = "Backend/clients/" . $oUser->Organization->id . "/" . $oUser->id . "/" . str_replace("\\","",str_replace('/',"",$oProject->location)) . "/index1.html";
		$sDest = CLIENTS_BASE_PATH . $oUser->Organization->id . DIRECTORY_SEPARATOR . $oUser->id . DIRECTORY_SEPARATOR . str_replace("\\","",str_replace('/',"",$oProject->location)) . ".png";		//return response()->json([$sSrc,$sDest]);
		$sThumbPath = $oSnpShotGenerator->getAndSavePreview( $sSrc , $sDest );
		return response()->json(array($sThumbPath));
	}
}
