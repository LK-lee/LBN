<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zenin - Reset Password</title>

    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Toastr -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="assets/css/login.css">
</head>

<body>

<div class="main-container">
    <div class="login-wrapper">

        <!-- BRAND -->
        <div class="brand-section">
            <div class="brand-content text-center">
                <img src="assets/img/brand/logo.png" width="300" alt="Zenin Logo">
                <p class="brand-tagline">Secure Your Account</p>

                <ul class="feature-list">
                    <li><i class="fas fa-shield-alt"></i> Strong password protection</li>
                    <li><i class="fas fa-lock"></i> Encrypted credentials</li>
                    <li><i class="fas fa-user-check"></i> Verified access</li>
                </ul>
            </div>
        </div>

        <!-- RESET PASSWORD -->
        <div class="login-section">
            <div class="login-header">
                <h2>Reset Password</h2>
                <p>Create a new password to continue</p>
            </div>

            <form id="resetPasswordForm" novalidate>

                <!-- NEW PASSWORD -->
                <div class="mb-3">
                    <label class="form-label">New Password</label>
                    <div class="input-group">
                        <span class="input-group-text">
                            <i class="fas fa-lock"></i>
                        </span>
                        <div class="password-wrapper">
                            <input type="password" id="newPassword" class="form-control"
                                   placeholder="Min 6 chars, letter & number">
                            <i class="fas fa-eye-slash password-toggle"></i>
                        </div>
                    </div>
                </div>

                <!-- CONFIRM PASSWORD -->
                <div class="mb-4">
                    <label class="form-label">Confirm Password</label>
                    <div class="input-group">
                        <span class="input-group-text">
                            <i class="fas fa-lock"></i>
                        </span>
                        <div class="password-wrapper">
                            <input type="password" id="confirmPassword" class="form-control"
                                   placeholder="Re-enter new password">
                            <i class="fas fa-eye-slash password-toggle"></i>
                        </div>
                    </div>
                </div>

                <!-- SUBMIT -->
                <button type="button" class="btn-login btn-reset">
                    <span>Update Password</span>
                </button>

            </form>
        </div>

    </div>
</div>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- Toastr -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>

<!-- Reset Password JS -->
<script src="assets/js/resetpassword.js"></script>
</body>
</html>
