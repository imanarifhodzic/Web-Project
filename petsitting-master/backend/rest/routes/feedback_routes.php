<?php

require_once __DIR__ . "/../services/feedback_service.class.php";

Flight::set('feedback_service', new FeedbackService());

/**
 * @OA\Get(
 *      path="/feedback",
 *      tags={"feedback"},
 *      summary="Get feedbacks",
 *      
 *      @OA\Response(
 *          response=200,
 *          description="Array of feedbacks in the database",
 *      ),
 *     @OA\Response(
 *        response=401,
 *       description="Unauthorized",
 *   )
 * )
 */

Flight::route('GET /feedback', function(){
    $data = Flight::get('feedback_service')->get_feedback();

    Flight::json($data);
});