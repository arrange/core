<?php namespace App\Services;

use App\Services\FileManager\SnapshotGenerator;

class Extractor
{

	private $source;


	private $destination;


	public function __construct( $source = '' , $destination = '' )
	{
		if ( empty( $source ) || file_exists( $source ) ) {
			return false;
		}

		$this->source = $source;

		if ( !empty( $destination ) ) {
			$this->destination = $destination;
		}
	}

	public function extract( $source = '' , $destination = '' )
	{
		if ( empty( $destination ) && empty( $this->destination ) ) {
			return false;
		}

		if ( empty( $source ) && empty( $this->source ) ) {
			return false;
		}

		if ( !empty( $source ) ) {
			$this->source = $source;
		}

		if ( !empty( $destination ) ) {
			$this->destination = $destination;
		}

		$extension = pathinfo( $this->source , PATHINFO_EXTENSION );

		switch ( $extension ) {
			case "zip" :
				return $this->extractZip();
				break;
			default :
				return false;
		}
	}

	protected function extractZip()
	{
		$oZipArchive = new \ZipArchive();
		if ( $oZipArchive->open( $this->source ) ) {
			try {
				$oZipArchive->extractTo( $this->destination );
				$oZipArchive->close();
				$this->arrangeStructure( $this->destination );
				return true;
			} catch ( \Exception $e ) {
				var_dump( $e->getMessage() );
			}
		}
		return false;
	}

	public function  arrangeStructure( $destination )
	{
		if ( empty( $destination ) ) {
			return false;
		}

		if ( !glob( $destination . '*.html' ) ) {
			$files = array_diff( scandir( $destination ) , array( '.' , '..' ) );
			if ( count( $files ) == 1 ) {
				foreach( $files as $file ) {
					$folder = $file;
					break;
				}
				$this->recurse_copy( $destination . $folder . DIRECTORY_SEPARATOR , $destination );
				$oSnapshot = new SnapshotGenerator();
				$oSnapshot->removeFolder( $destination . $folder );
			}
		}
	}

	public function recurse_copy( $src , $dst )
	{
		$dir = opendir( $src );
		@mkdir( $dst );
		while ( false !== ( $file = readdir( $dir ) ) ) {
			if ( ( $file != '.' ) && ( $file != '..' ) ) {
				if ( is_dir( $src . '/' . $file ) ) {
					$this->recurse_copy( $src . '/' . $file , $dst . '/' . $file );
				} else {
					copy( $src . '/' . $file , $dst . '/' . $file );
				}
			}
		}
		closedir( $dir );
	}
}