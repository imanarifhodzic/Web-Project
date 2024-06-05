
<?php

require 'vendor/autoload.php';
require 'rest/routes/middleware_routes.php';
require 'rest/routes/consultations_routes.php';
require 'rest/routes/pets_routes.php';
require 'rest/routes/services_routes.php';
require 'rest/routes/feedback_routes.php';
require 'rest/routes/users_routes.php';


// Start the framework
Flight::start();