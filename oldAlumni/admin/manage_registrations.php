<?php
session_start();
include 'db_connect.php';

// Check if user is admin
if(!isset($_SESSION['user_id']) || $_SESSION['user_type'] != 'admin') {
    header("Location: login.php");
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Manage Registrations</title>
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h2>Pending Registrations</h2>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Reg Number</th>
                        <th>Email</th>
                        <th>Batch Year</th>
                        <th>Branch</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $query = $conn->query("SELECT * FROM users WHERE status='pending' AND user_type='student'");
                    while($row = $query->fetch_assoc()):
                    ?>
                    <tr>
                        <td><?php echo $row['firstname'].' '.$row['lastname'] ?></td>
                        <td><?php echo $row['reg_number'] ?></td>
                        <td><?php echo $row['email'] ?></td>
                        <td><?php echo $row['batch_year'] ?></td>
                        <td><?php echo $row['branch'] ?></td>
                        <td>
                            <button class="btn btn-success btn-sm" onclick="updateStatus(<?php echo $row['id'] ?>, 'approved')">Approve</button>
                            <button class="btn btn-danger btn-sm" onclick="updateStatus(<?php echo $row['id'] ?>, 'rejected')">Reject</button>
                        </td>
                    </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>
    </div>

    <script src="../admin/assets/vendor/jquery/jquery.min.js"></script>
    <script>
    function updateStatus(userId, status) {
        $.ajax({
            url: 'ajax.php',
            method: 'POST',
            data: {
                action: 'update_registration',
                user_id: userId,
                status: status
            },
            success: function(response) {
                let res = JSON.parse(response);
                alert(res.message);
                if(res.status) location.reload();
            }
        });
    }
    </script>
</body>
</html>
