<?php
require_once __DIR__ . '/rest/services/consultations_service.class.php';
$payload = $_REQUEST;
// Parse and format date and time fields from the payload
$payload['date'] = date('Y-m-d', strtotime($payload['date']));
$payload['time'] = date('H:i:s', strtotime($payload['time']));
// Fields directly taken from the form data
$payload['name'] = $_REQUEST['name'];
$payload['service'] = $_REQUEST['service'];
$payload['message'] = $_REQUEST['message'];

// Create a new instance of the consultation service
$consultations_service = new ConsultationsService();
// Add the consultation using the payload data
$data = $consultations_service->add_consultations($payload);

// Set header to return data as JSON
header('Content-Type: application/json');
// Output the response as JSON
echo json_encode($data);
?>
