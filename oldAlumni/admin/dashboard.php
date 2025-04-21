<?php
session_start();
if(!isset($_SESSION['user_id']) || $_SESSION['user_type'] != 'admin') {
    header("Location: ../login.html");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>
    <div class="sidebar">
        <nav>
            <a href="dashboard.php" class="sidebar-link active">
                <i class="fas fa-tachometer-alt me-2"></i> Dashboard
            </a>
            <a href="users.php" class="sidebar-link">
                <i class="fas fa-users me-2"></i> Users
            </a>
            <a href="settings.php" class="sidebar-link">
                <i class="fas fa-cogs me-2"></i> Settings
            </a>
            <a href="../logout.php" class="sidebar-link">
                <i class="fas fa-sign-out-alt me-2"></i> Logout
            </a>
        </nav>
    </div>
    <div class="main-content">
        <h1>Welcome to the Admin Dashboard</h1>
        <p>Manage users, settings, and more.</p>
    </div>
</body>
</html>