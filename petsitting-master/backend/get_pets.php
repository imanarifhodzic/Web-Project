<?php
require_once __DIR__ . '/rest/services/pets_service.class.php';

$pets_service = new PetsService();
$data = $pets_service->get_pets();
header('Content-Type: application/json');
echo json_encode($data);