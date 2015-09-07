<?php namespace App\Services\FileManager;

use Illuminate\Support\Facades\File;

class SnapshotGenerator
{

	public function getPreview( $source )
	{
		$client = new GuzzleHttp\Client();
		$res = $client->request( 'POST' , 'screenshot.local' , [
			'source' => $source
		] );
		if ( $res->getStatusCode() ) {
			$aResp = json_decode( $res->getBody() , true );
			if ( isset( $aResp[ 'screenshot' ] ) ) {
				return $aResp[ 'screenshot' ];
			}
		}
		return false;
	}

	public function hasIndexFile( $source )
	{
		if ( file_exists( $source . "index.html" ) )
			return $source . "index.html";
		return false;
	}

	public function saveSnapshot( $source , $snapshot )
	{
		return file_put_contents( $source , $snapshot );
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
		if ( $this->hasIndexFile( $source ) ) {
			if ( $screenShot = $this->getPreview( $source ) ) {
				$filename = $this->getFileUniqueName( $destination , str_random() , ".jpeg" );
				$destination .= $filename;
				$this->saveSnapshot( $destination , $screenShot );
				return $destination;
			}
		}
		return false;
	}
}

