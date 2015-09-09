<?php namespace App\Services\FileManager;

use Illuminate\Support\Facades\File;

class SnapshotGenerator
{
	public function hasIndexFile( $source )
	{
		if ( file_exists( $source . "index.html" ) )
			return $source . "index.html";
		return false;
	}

	public function getFileUniqueName( $sDestinationPath , $sFileName , $sExtension )
	{
		$sThumbFile = $sFileName . "." . $sExtension;
		$counter = 1;
		while ( File::exists( $sDestinationPath . $sThumbFile ) )
			$sThumbFile = $sFileName . "_" . $counter ++ . "." . $sExtension;

		return $sThumbFile;
	}

	public function getAndSavePreview( $source , $destination )
	{
		$aResponse = json_decode( file_get_contents( 'http://localhost:5000?mode=screenshot&input=http://screenshot.server/' . $source . "&output=" . $destination ) ,true );
		if ( isset( $aResponse[ 'success' ] ) AND $aResponse[ 'success' ] )
			return $aResponse[ 'success' ];
		return false;
	}
}

