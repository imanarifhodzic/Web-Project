<?php

// Set the reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL ^ (E_NOTICE | E_DEPRECATED));

// Database access credentials
define('DB_NAME', 'pet adoption center');
define('DB_PORT', 3306);
define('DB_USER', 'root');
define('DB_PASSWORD', 'imamelse2203');
define('DB_HOST', '127.0.0.1'); // localhost
define('JWT_SECRET', 'farisnajjaki');