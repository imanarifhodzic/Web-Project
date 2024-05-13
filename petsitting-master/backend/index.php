use Flight\Engine;
<?php

require 'vendor/autoload.php';


// Include the services
require_once __DIR__ . '/rest/services/consultations_service.class.php';
require_once __DIR__ . '/rest/services/pets_service.class.php';
// Add more services as needed...

// Define a route for the root URL
Flight::route('/', function () {
  echo 'Welcome to my project!';
});

// Include files that define additional routes
require 'rest/routes/consultations_routes.php';
require 'rest/routes/pets_routes.php';
require 'rest/routes/services_routes.php';
require 'rest/routes/feedback_routes.php';
require 'rest/routes/users_routes.php';


// Start the framework
Flight::start();