<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zenin - OTP Verification</title>

    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Toastr -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="assets/css/login.css">

    <style>
        .otp-container {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-bottom: 15px;
        }
        .otp-input {
            width: 42px;
            height: 42px;
            text-align: center;
            font-size: 18px;
            font-weight: 600;
            border: 2px solid #ccc;
            border-radius: 6px;
            transition: all 0.2s ease;
        }
        .otp-input:focus {
            border-color: #4f46e5;
            box-shadow: 0 0 0 2px rgba(79,70,229,0.2);
        }
        .otp-timer {
            text-align: center;
            font-weight: 600;
            margin-bottom: 10px;
        }
        .otp-timer.green { color: #198754; }
        .otp-timer.red { color: #dc3545; }

        .resend-link {
            display: none;
            text-align: center;
            margin-bottom: 10px;
        }
        .resend-link a {
            cursor: pointer;
            text-decoration: none;
            font-weight: 600;
        }
    </style>
</head>

<body>
<div class="main-container">
    <div class="login-wrapper">

        <!-- BRAND -->
        <div class="brand-section">
            <div class="brand-content text-center">
                <img src="assets/img/brand/logo.png" width="300">
                <p class="brand-tagline">Your Gateway to Excellence</p>
            </div>
        </div>

        <!-- FORM -->
        <div class="login-section">
            <div class="login-header mb-4">
                <h1>OTP Verification</h1>
                <p>Enter the 6-digit OTP sent to your registered email.</p>
            </div>

            <form id="otpForm" novalidate>

                <div class="otp-container">
                    <input class="otp-input" maxlength="1">
                    <input class="otp-input" maxlength="1">
                    <input class="otp-input" maxlength="1">
                    <input class="otp-input" maxlength="1">
                    <input class="otp-input" maxlength="1">
                    <input class="otp-input" maxlength="1">
                </div>

                <!-- TIMER -->
                <div id="otpTimer" class="otp-timer green">
                    OTP expires in <span id="timerValue">01:00</span>
                </div>

                <!-- RESEND -->
                <div class="resend-link" id="resendWrapper">
                    Didn’t receive OTP?
                    <a id="resendOtp">Resend OTP</a>
                </div>

                <button type="submit" class="btn-login mb-3" id="verifyBtn" disabled>
                    Verify OTP
                </button>

                <p class="text-center">
                    <a href="index.php" style="text-decoration:none;">Back to Login</a>
                </p>
            </form>
        </div>
    </div>
</div>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- Toastr -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>

<!-- OTP JS -->
<script src="assets/js/verifyotp.js"></script>
</body>
</html>
