<?php
return [
	'supportsCredentials' => false,
	'allowedOrigins' => ['*'],
	//'allowedHeaders' => ['Content-Type', 'Accept','Token','X-Requested-With'],
	'allowedHeaders' => ['*'],
	'allowedMethods' => ['GET', 'POST', 'PUT',  'DELETE'],
	'exposedHeaders' => [],
	'maxAge' => 0,
	'hosts' => [],
];