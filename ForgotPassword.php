<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zenin - Forgot Password</title>

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

        <!-- FORM SECTION -->
        <div class="login-section">
            <div class="login-header mb-5">
                <h1>Forgot Password</h1>
                <p>
                    No worries! Enter your registered email address and we'll send
                    you a link to reset your password.
                </p>
            </div>

            <form id="forgotPasswordForm" novalidate>

                <!-- EMAIL -->
                <div class="mb-3">
                    <label class="form-label">Email Address</label>
                    <div class="input-group" id="emailWrapper">
                        <span class="input-group-text">
                            <i class="fas fa-envelope"></i>
                        </span>
                        <input
                            type="email"
                            class="form-control"
                            id="email"
                            placeholder="you@example.com"
                        >
                    </div>
                </div>

                <!-- SUBMIT -->
                <button type="submit" class="btn-login" id="btnSendOtp">
                    Send OTP
                </button>

                <p class="text-center mt-3">
                    Already have an account?
                    <a href="index.php" style="text-decoration:none;">Login</a>
                </p>

            </form>
        </div>
    </div>
</div>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- Toastr -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>

<!-- Forgot Password JS -->
<script src="assets/js/forgotpassword.js"></script>
</body>
</html>
