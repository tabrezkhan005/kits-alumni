<?php
session_start();
if(!isset($_SESSION['user_id']) || $_SESSION['user_type'] != 'admin') {
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Admin | KITS</title>
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
    <style>
        /* Copy styles from index.php */
    </style>
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <!-- Copy sidebar from index.php -->
            
            <div class="col-md-9 col-lg-10 main-content">
                <div class="card">
                    <div class="card-header bg-burgundy text-white">
                        <h4>Add New Admin</h4>
                    </div>
                    <div class="card-body">
                        <form id="adminForm" method="POST" action="ajax.php">
                            <input type="hidden" name="action" value="add_admin">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label>First Name</label>
                                        <input type="text" name="firstname" class="form-control" required>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label>Last Name</label>
                                        <input type="text" name="lastname" class="form-control" required>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label>Email</label>
                                <input type="email" name="email" class="form-control" required>
                            </div>
                            <div class="mb-3">
                                <label>Password</label>
                                <input type="password" name="password" class="form-control" required>
                            </div>
                            <button type="submit" class="btn btn-burgundy">Add Admin</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="../admin/assets/vendor/jquery/jquery.min.js"></script>
    <script>
        $('#adminForm').submit(function(e){
            e.preventDefault();
            $.ajax({
                url: $(this).attr('action'),
                method: 'POST',
                data: $(this).serialize(),
                success: function(response){
                    let res = JSON.parse(response);
                    alert(res.message);
                    if(res.status) location.href = 'manage_admins.php';
                }
            });
        });
    </script>
</body>
</html>
