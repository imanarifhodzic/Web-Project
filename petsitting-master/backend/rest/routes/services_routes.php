<?php

require_once __DIR__ . "/../services/services_service.class.php";

Flight::set('services_service', new ServicesService());

/**
 * @OA\Get(
 *      path="/services",
 *      tags={"services"},
 *      summary="Get services",
 *      
 *      @OA\Response(
 *          response=200,
 *          description="Array of services in the database",
 *      ),
 *     @OA\Response(
 *        response=401,
 *       description="Unauthorized",
 *   )
 * )
 */

Flight::route('GET /services', function(){
    $data = Flight::get('services_service')->get_services();

    Flight::json($data);
});