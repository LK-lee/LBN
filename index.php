<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zenin - Login</title>

    <!-- Bootstrap 5 -->
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

        <!-- BRAND SECTION -->
        <div class="brand-section">
            <div class="brand-content text-center">
                <img src="assets/img/brand/logo.png" width="300" alt="Zenin Logo">
                <p class="brand-tagline">Your Gateway to Excellence</p>

                <ul class="feature-list">
                    <li><i class="fas fa-shield-alt"></i> Enterprise-grade security</li>
                    <li><i class="fas fa-bolt"></i> Lightning-fast performance</li>
                    <li><i class="fas fa-globe"></i> Access from anywhere</li>
                </ul>
            </div>
        </div>

        <!-- LOGIN SECTION -->
        <div class="login-section">
            <div class="login-header">
                <h2>Welcome Back</h2>
                <p>Please enter your credentials to continue</p>
            </div>

            <form id="loginForm" novalidate>

                <!-- ROLE -->
                <div class="role-selection mb-3">
                    <label class="form-label">Select Role</label>
                    <div class="role-badges">
                        <button type="button" class="role-badge active" data-role="admin">Admin</button>
                        <button type="button" class="role-badge" data-role="member">Member</button>
                    </div>
                    <input type="hidden" id="selectedRole" value="admin">
                </div>

                <!-- EMAIL -->
                <div class="mb-3">
                    <label class="form-label">Email Address</label>
                    <div class="input-group" id="emailWrapper">
                        <span class="input-group-text">
                            <i class="fas fa-envelope"></i>
                        </span>
                        <input type="email" id="email" class="form-control" placeholder="you@example.com">
                    </div>
                </div>

                <!-- PASSWORD -->
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <div class="input-group" id="passwordWrapper">
                        <span class="input-group-text">
                            <i class="fas fa-lock"></i>
                        </span>
                        <div class="password-wrapper">
                            <input type="password" id="password" class="form-control" placeholder="Enter password">
                            <i class="fas fa-eye-slash password-toggle" id="togglePassword"></i>
                        </div>
                    </div>
                </div>

                <!-- OPTIONS -->
                <div class="form-options">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="rememberMe">
                        <label class="form-check-label">Remember me</label>
                    </div>
                    <a href="ForgotPassword.php" class="forgot-link">Forgot Password?</a>
                </div>

                <!-- SUBMIT -->
                <button type="submit" class="btn-login">
                    <span>Sign In</span>
                </button>
            </form>
        </div>

    </div>
</div>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- Toastr -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>

<!-- Login JS -->
<script src="assets/js/login.js"></script>
</body>
</html>
