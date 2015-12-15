<?php namespace App\Services\FileManager;


class FileManager extends FtpService {

	public function downloadTemp($path)
	{
		$localPath = tempnam(sys_get_temp_dir(), 'fmanager_');
		if ($this->download($path, $localPath)) {
			return $localPath;
		}
	}

	public function getContent($path)
	{
		$localPath = $this->downloadTemp($path);
		if ($localPath) {
			return @file_get_contents($localPath);
		}
	}
}