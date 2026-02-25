document.addEventListener('DOMContentLoaded', function () {

    /* =====================
       TOASTR CONFIG
    ===================== */
    toastr.options = {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-top-right",
        timeOut: "3000"
    };

    /* =====================
       ELEMENTS
    ===================== */
    const form = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('email');
    const emailWrapper = document.getElementById('emailWrapper');
    const submitBtn = document.getElementById('btnSendOtp');

    /* =====================
       HELPERS
    ===================== */
    const validateEmail = email =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    let lastErrorMessage = "";

    function showError(message) {
        emailWrapper.classList.add('error');

        if (lastErrorMessage !== message) {
            toastr.error(message);
            lastErrorMessage = message;
        }

        emailInput.focus();
    }

    function clearError() {
        emailWrapper.classList.remove('error');
        lastErrorMessage = "";
    }

    /* =====================
       SUBMIT HANDLER
    ===================== */
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = emailInput.value.trim();

        // Validation
        if (!email) {
            showError("Email address is required");
            return;
        }

        if (!validateEmail(email)) {
            showError("Please enter a valid email address");
            return;
        }

        clearError();

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            const response = await fetch(
                "http://localhost:3000/api/user/forgotpassword",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email })
                }
            );

            const data = await response.json();

            if (response.ok) {
                toastr.success(
                    "OTP sent successfully! Please check your email."
                );

                localStorage.setItem("forgotuseremail", email);

                setTimeout(() => {
                    window.location.href = "VerifyOTP.php";
                }, 1200);
            } else {
                showError(
                    data.message || "Failed to send OTP. Please try again."
                );
            }
        } catch (error) {
            console.error(error);
            showError(
                "Network error. Please check your connection and try again."
            );
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Send OTP";
        }
    });

    /* =====================
       CLEAR ERROR ON INPUT
    ===================== */
    emailInput.addEventListener('input', clearError);
});
