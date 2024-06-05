<?php

require_once __DIR__ . "/../services/users_service.class.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

Flight::set('users_service', new UserService());

/**
 * @OA\Get(
 *      path="/users",
 *      tags={"users"},
 *      summary="Get users",
 *      
 *      @OA\Response(
 *          response=200,
 *          description="Array of users in the database",
 *      ),
 *     @OA\Response(
 *        response=401,
 *       description="Unauthorized",
 *   )
 * )
 */

Flight::route('GET /users', function(){
    $data = Flight::get('users_service')->get_users();

    Flight::json($data);
});


/**
 * @OA\Post(
 *      path="/users/add",
 *      tags={"users"},
 *      summary="Add a new user",
 *      @OA\Response(
 *          response=200,
 *          description="Log in the user and return the user data or 401 if the user does not exist",
 *      ),
 *      @OA\Response(
 *          response=401,
 *          description="Invalid username or password"
 *     ),
 *      @OA\RequestBody(
 *          description="User object that needs to be added to the database",
 *          @OA\JsonContent(
 *              @OA\Property(property="name", type="string", example="Luka Bartula", description="Users name"),
 *              @OA\Property(property="password", type="string", example="password", description="User password"),
 *              @OA\Property(property="email", type="email", example="email@email.com", description="User email")
 *        )
 *      )
 * )
 */

Flight::route('POST /users/add', function(){
    $payload = Flight::request();
    $data = $payload->data->getData();
    $user = Flight::get('users_service')->add_user($data);
    Flight::json(["message" => "User added successfully" , "data" => $payload]); 


    Flight::json($user);
});

/**
 * @OA\Post(
 *      path="/users/login",
 *      tags={"users"},
 *      summary="Add a new user",
 *      @OA\Response(
 *          response=200,
 *          description="Log in the user and return the user data or 401 if the user does not exist",
 *      ),
 *      @OA\Response(
 *          response=401,
 *          description="Invalid username or password"
 *     ),
 *      @OA\RequestBody(
 *          description="User object that needs to be added to the database",
 *          @OA\JsonContent(
 *              @OA\Property(property="password", type="string", example="123", description="User password"),
 *              @OA\Property(property="email", type="email", example="faris@gmail.com", description="User email")
 *        )
 *      )
 * )
 */
Flight::route('POST /users/login', function(){
    $data = Flight::request()->data->getData();
    $user = Flight::get('users_service')->get_user_by_email($data['email']);
    if(!$user || !password_verify($data['password'], $user['password'])){
        Flight::halt(401, 'Invalid username or password');
    }
    unset($user['password']);
    
    $jwt_payload = [
        'user' => $user,
        'iat' => time(),
        'exp' => time() + (60*60*24),


    ];

    $token = JWT::encode($jwt_payload, Config::JWT_SECRET(), "HS256");

    Flight::json(
        array_merge($user, ['token' => $token])
    );
});