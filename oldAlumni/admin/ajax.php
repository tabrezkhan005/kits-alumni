<?php
header('Content-Type: application/json');
include 'db_connect.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

if(isset($_GET['action']) && $_GET['action'] == 'register') {
    try {
        // Validate required fields
        $required = ['firstname', 'lastname', 'email', 'password', 'reg_number', 'batch_year'];
        foreach($required as $field) {
            if(empty($_POST[$field])) {
                throw new Exception("$field is required");
            }
        }

        // Check existing email and registration number
        $email = $conn->real_escape_string($_POST['email']);
        $reg_number = $conn->real_escape_string($_POST['reg_number']);
        
        $check = $conn->query("SELECT id FROM users WHERE email = '$email' OR reg_number = '$reg_number'");
        if($check->num_rows > 0) {
            throw new Exception("Email or Registration number already exists");
        }

        // Process image
        $profile_image = null;
        if(isset($_FILES['profile_image']) && $_FILES['profile_image']['error'] == 0) {
            $image_data = file_get_contents($_FILES['profile_image']['tmp_name']);
            if($image_data === false) {
                throw new Exception("Failed to read image file");
            }
            $profile_image = $image_data;
        }

        // Basic data preparation
        $data = [
            'firstname' => $_POST['firstname'],
            'lastname' => $_POST['lastname'],
            'reg_number' => $reg_number,
            'batch_year' => (int)$_POST['batch_year'],
            'branch' => $_POST['branch'] ?? 'CAI',
            'email' => $email,
            'password' => password_hash($_POST['password'], PASSWORD_DEFAULT),
            'linkedin_url' => $_POST['linkedin_url'] ?? '',
            'profile_image' => $profile_image
        ];

        // Simple insert query
        $sql = "INSERT INTO users SET 
                firstname = ?,
                lastname = ?,
                reg_number = ?,
                batch_year = ?,
                branch = ?,
                email = ?,
                password = ?,
                linkedin_url = ?,
                profile_image = ?,
                user_type = 'student',
                status = 'pending'";

        $stmt = $conn->prepare($sql);
        
        if(!$stmt) {
            throw new Exception("Prepare failed: " . $conn->error);
        }

        $stmt->bind_param("sssisssss", 
            $data['firstname'],
            $data['lastname'],
            $data['reg_number'],
            $data['batch_year'],
            $data['branch'],
            $data['email'],
            $data['password'],
            $data['linkedin_url'],
            $data['profile_image']
        );

        if(!$stmt->execute()) {
            throw new Exception("Execute failed: " . $stmt->error);
        }

        echo json_encode([
            'status' => true,
            'message' => 'Registration successful! Please wait for admin approval.'
        ]);

    } catch(Exception $e) {
        error_log("Registration error: " . $e->getMessage());
        echo json_encode([
            'status' => false,
            'message' => $e->getMessage()
        ]);
    }
    exit;
}

// Improved login handler
if(isset($_POST['action']) && $_POST['action'] == 'login') {
    try {
        // Debug login attempt
        error_log("Login attempt - Email: " . $_POST['email'] . " Type: " . $_POST['user_type']);

        // Validate input
        if(empty($_POST['email']) || empty($_POST['password'])) {
            throw new Exception("Email and password are required");
        }

        $email = $conn->real_escape_string($_POST['email']);
        $password = $_POST['password'];
        $user_type = $_POST['user_type'];

        // Get user details - remove user_type check for debugging
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = ? LIMIT 1");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        // Debug user fetch
        error_log("User found: " . ($user ? "Yes" : "No"));
        if($user) {
            error_log("User type: " . $user['user_type'] . " Status: " . $user['status']);
        }

        if(!$user) {
            throw new Exception("Invalid email address");
        }

        // Debug password verification
        $valid_password = password_verify($password, $user['password']);
        error_log("Password verification: " . ($valid_password ? "Success" : "Failed"));

        if(!$valid_password) {
            throw new Exception("Invalid password");
        }

        // Verify user type after successful password verification
        if($user['user_type'] !== $user_type) {
            throw new Exception("Invalid account type");
        }

        // Check account status
        if($user['status'] !== 'approved') {
            throw new Exception("Account is " . $user['status']);
        }

        // Set session data
        session_start();
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['name'] = $user['firstname'] . ' ' . $user['lastname'];
        $_SESSION['user_type'] = $user['user_type'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['logged_in'] = true;

        // Return success with correct redirect path
        echo json_encode([
            'status' => true,
            'message' => 'Login successful!',
            'redirect' => $user['user_type'] === 'admin' ? 'dashboard.php' : '../student/dashboard.php'
        ]);

    } catch(Exception $e) {
        error_log("Login error: " . $e->getMessage());
        echo json_encode([
            'status' => false,
            'message' => $e->getMessage()
        ]);
    }
    exit;
}

// Add this new section for handling registration updates
if(isset($_POST['action']) && $_POST['action'] == 'update_registration') {
    session_start();
    if(!isset($_SESSION['user_id']) || $_SESSION['user_type'] != 'admin') {
        echo json_encode(['status' => false, 'message' => 'Unauthorized access']);
        exit;
    }

    $user_id = $conn->real_escape_string($_POST['user_id']);
    $status = $conn->real_escape_string($_POST['status']);
    $admin_id = $_SESSION['user_id'];

    $sql = "UPDATE users SET 
            status = '$status',
            approval_date = CURRENT_TIMESTAMP,
            approved_by = '$admin_id'
            WHERE id = '$user_id'";

    if($conn->query($sql)) {
        // Send email notification to user
        $user = $conn->query("SELECT email, firstname FROM users WHERE id = '$user_id'")->fetch_assoc();
        $subject = "Registration " . ucfirst($status);
        $message = "Dear {$user['firstname']},\n\nYour registration has been $status.";
        mail($user['email'], $subject, $message);
        
        echo json_encode(['status' => true, 'message' => 'Registration ' . $status . ' successfully']);
    } else {
        echo json_encode(['status' => false, 'message' => 'Update failed: ' . $conn->error]);
    }
}

// Add this new section for handling user blocking/unblocking
if(isset($_POST['action']) && $_POST['action'] == 'update_user_status') {
    session_start();
    if(!isset($_SESSION['user_id']) || $_SESSION['user_type'] != 'admin') {
        echo json_encode(['status' => false, 'message' => 'Unauthorized access']);
        exit;
    }

    $user_id = $conn->real_escape_string($_POST['user_id']);
    $status = $conn->real_escape_string($_POST['status']);
    $admin_id = $_SESSION['user_id'];

    $sql = "UPDATE users SET 
            status = '$status',
            approval_date = CURRENT_TIMESTAMP,
            approved_by = '$admin_id'
            WHERE id = '$user_id'";

    if($conn->query($sql)) {
        // Send email notification
        $user = $conn->query("SELECT email, firstname FROM users WHERE id = '$user_id'")->fetch_assoc();
        $subject = "Account " . ($status == 'blocked' ? 'Blocked' : 'Unblocked');
        $message = "Dear {$user['firstname']},\n\nYour account has been $status.";
        mail($user['email'], $subject, $message);
        
        echo json_encode(['status' => true, 'message' => 'User ' . $status . ' successfully']);
    } else {
        echo json_encode(['status' => false, 'message' => 'Update failed: ' . $conn->error]);
    }
}

// Add this new section for handling admin addition
if(isset($_POST['action']) && $_POST['action'] == 'add_admin') {
    session_start();
    if(!isset($_SESSION['user_id']) || $_SESSION['user_type'] != 'admin') {
        echo json_encode(['status' => false, 'message' => 'Unauthorized access']);
        exit;
    }

    $firstname = $conn->real_escape_string($_POST['firstname']);
    $lastname = $conn->real_escape_string($_POST['lastname']);
    $email = $conn->real_escape_string($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $reg_number = 'ADMIN' . rand(1000,9999);

    $sql = "INSERT INTO users (firstname, lastname, email, password, user_type, status, reg_number, batch_year, branch) 
            VALUES ('$firstname', '$lastname', '$email', '$password', 'admin', 'approved', '$reg_number', YEAR(CURRENT_DATE), 'ADMIN')";

    if($conn->query($sql)) {
        echo json_encode(['status' => true, 'message' => 'Admin added successfully']);
    } else {
        echo json_encode(['status' => false, 'message' => 'Failed to add admin: ' . $conn->error]);
    }
}
?>
