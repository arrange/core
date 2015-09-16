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
		$aResponse = json_decode( file_get_contents( env( 'SS_SERVER_URL' ) . '?mode=screenshot&input=' . env( 'SS_BASE_URL' ) . $source . "&output=" . $destination ) , true );
		if ( isset( $aResponse[ 'success' ] ) AND $aResponse[ 'success' ] )
			return $aResponse[ 'success' ];
		return false;
	}

	public function getHtmlFile( $path )
	{
		if ( file_exists( $path . "index.html" ) )
			return array( $path , "index.html" );
		else if ( file_exists( $path . "home.html" ) )
			return array( $path , "home.html" );
		else {
			$files = glob( $path . '*.html' );
			foreach( $files as $file ) {
				return array( $path , $file );
			}
		}
		return array();
	}

	public function removeFolder($path)
	{
		if (is_dir($path) === true)
		{
			$files = array_diff(scandir($path), array('.', '..'));

			foreach ($files as $file)
			{
				$this->removeFolder(realpath($path) . '/' . $file);
			}

			return rmdir($path);
		}

		else if (is_file($path) === true)
		{
			return unlink($path);
		}

		return false;
	}
}

