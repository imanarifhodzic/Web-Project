<?php
require_once __DIR__ . '/rest/services/services_service.class.php';

$services_service = new ServicesService();
$data = $services_service->get_services();
header('Content-Type: application/json');
echo json_encode($data);