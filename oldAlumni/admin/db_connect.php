<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $conn = new mysqli('localhost', 'u104975519_alumni_db25', 'Kitsalumni@2025', 'u104975519_alumni_db');
    $conn->set_charset('utf8mb4');
} catch(Exception $e) {
    error_log("Connection failed: " . $e->getMessage());
    die("Connection failed: " . $e->getMessage());
}
?>
