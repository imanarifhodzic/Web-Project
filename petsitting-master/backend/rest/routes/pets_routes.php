<?php

require_once __DIR__ . "/../services/pets_service.class.php";

Flight::set('pets_service', new PetsService());

/**
 * @OA\Get(
 *      path="/pets",
 *      tags={"pets"},
 *      summary="Get pets",
 *      
 *      @OA\Response(
 *          response=200,
 *          description="Array of pets in the database",
 *      ),
 *     @OA\Response(
 *        response=401,
 *       description="Unauthorized",
 *   )
 * )
 */

Flight::route('GET /pets', function() {
    $data = Flight::get('pets_service')->get_pets();

    Flight::json($data);
});




