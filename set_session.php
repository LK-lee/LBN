<?php
session_start();
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['email']) && isset($input['role'])) {
    $_SESSION['useremail'] = $input['email'];
    $_SESSION['userrole'] = $input['role'];
    $_SESSION['logged_in'] = true;
    
    if (isset($input['token'])) {
        $_SESSION['token'] = $input['token'];
    }
    
    echo json_encode(['success' => true, 'message' => 'Session created successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Missing required data']);
}
?>