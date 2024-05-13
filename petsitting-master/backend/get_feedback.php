<?php
require_once __DIR__ . '/rest/services/feedback_service.class.php';

$feedback_service = new FeedbackService();
$data = $feedback_service->get_feedback();
header('Content-Type: application/json');
echo json_encode($data);