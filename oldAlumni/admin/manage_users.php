<?php
session_start();
include 'db_connect.php';

if(!isset($_SESSION['user_id']) || $_SESSION['user_type'] != 'admin') {
    header("Location: login.php");
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Manage Users</title>
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h2>Manage Users</h2>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $query = $conn->query("SELECT * FROM users WHERE user_type='student'");
                    while($row = $query->fetch_assoc()):
                    ?>
                    <tr>
                        <td><?php echo $row['firstname'].' '.$row['lastname'] ?></td>
                        <td><?php echo $row['email'] ?></td>
                        <td><?php echo $row['user_type'] ?></td>
                        <td><?php echo $row['status'] ?></td>
                        <td>
                            <?php if($row['status'] != 'blocked'): ?>
                                <button class="btn btn-danger btn-sm" onclick="blockUser(<?php echo $row['id'] ?>)">Block User</button>
                            <?php else: ?>
                                <button class="btn btn-success btn-sm" onclick="unblockUser(<?php echo $row['id'] ?>)">Unblock User</button>
                            <?php endif; ?>
                        </td>
                    </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>
    </div>

    <script src="../admin/assets/vendor/jquery/jquery.min.js"></script>
    <script>
    function blockUser(userId) {
        updateUserStatus(userId, 'blocked');
    }

    function unblockUser(userId) {
        updateUserStatus(userId, 'approved');
    }

    function updateUserStatus(userId, status) {
        $.ajax({
            url: 'ajax.php',
            method: 'POST',
            data: {
                action: 'update_user_status',
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
