$(document).ready(function () {

    /* =======================
       TOASTR CONFIG
    ======================= */
    toastr.options = {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-top-right",
        timeOut: "3000"
    };

    /* =======================
       PASSWORD TOGGLE
    ======================= */
    $('.password-toggle').on('click', function () {
        const input = $(this).siblings('input');
        const type = input.attr('type') === 'password' ? 'text' : 'password';
        input.attr('type', type);

        $(this).toggleClass('fa-eye fa-eye-slash');
    });

    /* =======================
       RESET PASSWORD CLICK
    ======================= */
    $('.btn-reset').on('click', function () {
        handleResetPassword();
    });

});

/* =======================
   PASSWORD VALIDATION
======================= */
function isStrongPassword(password) {
    // Minimum 6 chars, at least one letter & one number
    return /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password);
}

/* =======================
   RESET PASSWORD HANDLER
======================= */
async function handleResetPassword() {

    const email = localStorage.getItem('forgotuseremail');
    const newPassword = $('#newPassword');
    const confirmPassword = $('#confirmPassword');
    const btn = $('.btn-reset');

    // Reset states
    newPassword.removeClass('is-invalid is-valid');
    confirmPassword.removeClass('is-invalid is-valid');

    /* ---------- SESSION CHECK ---------- */
    if (!email) {
        toastr.error('Session expired. Please restart the reset process.');
        setTimeout(() => window.location.href = 'index.php', 2000);
        return;
    }

    /* ---------- VALIDATIONS ---------- */
    if (!newPassword.val()) {
        newPassword.addClass('is-invalid');
        toastr.error('New password is required');
        return;
    }

    if (!isStrongPassword(newPassword.val())) {
        newPassword.addClass('is-invalid');
        toastr.error('Password must be at least 6 characters with a letter and number');
        return;
    }

    if (!confirmPassword.val()) {
        confirmPassword.addClass('is-invalid');
        toastr.error('Please confirm your password');
        return;
    }

    if (newPassword.val() !== confirmPassword.val()) {
        confirmPassword.addClass('is-invalid');
        toastr.error('Passwords do not match');
        return;
    }

    newPassword.addClass('is-valid');
    confirmPassword.addClass('is-valid');

    /* ---------- LOADING ---------- */
    btn.prop('disabled', true);
    btn.html('<i class="fas fa-spinner fa-spin"></i> Updating...');

    try {
        const response = await fetch('http://localhost:3000/api/user/resetpassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                newpassword: newPassword.val(),
                confirmpassword: confirmPassword.val()
            })
        });

        const result = await response.json();

        if (response.ok && result.status === 'success') {
            toastr.success('Password updated successfully');
            localStorage.removeItem('forgotuseremail');

            setTimeout(() => {
                window.location.href = 'index.php';
            }, 2000);
        } else {
            toastr.error(result.message || 'Failed to reset password');
        }

    } catch (error) {
        console.error(error);
        toastr.error('Network error. Please try again');
    } finally {
        btn.prop('disabled', false);
        btn.html('<span>Update Password</span>');
    }
}
