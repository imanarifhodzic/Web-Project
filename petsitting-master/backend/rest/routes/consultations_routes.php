<?php
require_once __DIR__ . "/../services/consultations_service.class.php";

Flight::set('consultations_service', new ConsultationsService());
/**
 * @OA\Post(
 *      path="/consultations/add",
 *      tags={"consultations"},
 *      summary="Add a new consultation",
 *      @OA\Response(
 *          response=200,
 *          description="Log in the user and return the user data or 401 if the user does not exist",
 *      ),
 *      @OA\Response(
 *          response=401,
 *          description="Invalid name"
 *     ),
 *      @OA\RequestBody(
 *          description="Consultation object that needs to be added to the database",
 *          @OA\JsonContent(
 *              @OA\Property(property="name", type="string", example="Luka Bartula", description="Users name"),
 *              @OA\Property(property="date", type="Date", example="2021-01-01", description="Date of the consultation"),
 *              @OA\Property(property="time", type="Time", example="12:00", description="Time of the consultation"),
 *              @OA\Property(property="message", type="string", example="message", description="Message of the consultation"),
 *        )
 *      )
 * )
 */

Flight::route('POST /consultations/add', function(){
    $payload = Flight::request();
    $data = $payload->data->getData();
    Flight::get('consultations_service')->add_consultations($data);
    Flight::json(["message" => "Consultations added successfully" , "data" => $payload]); 


    
});