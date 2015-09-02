<?php namespace App\Services;

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
		if ( $oZipArchive->open( $this->source ) === TRUE ) {
			$oZipArchive->extractTo( $this->destination );
			$oZipArchive->close();
			return true;
		}
		return false;
	}
}