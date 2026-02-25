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
       ROLE SELECTION
    ===================== */
    const roleBadges = document.querySelectorAll('.role-badge');
    const selectedRoleInput = document.getElementById('selectedRole');

    roleBadges.forEach(badge => {
        badge.addEventListener('click', function () {
            roleBadges.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedRoleInput.value = this.dataset.role;
        });
    });

    /* =====================
       PASSWORD TOGGLE
    ===================== */
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword) {
        togglePassword.addEventListener('click', function () {
            passwordInput.type =
                passwordInput.type === 'password' ? 'text' : 'password';

            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    /* =====================
       FORM ELEMENTS
    ===================== */
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const emailWrapper = document.getElementById('emailWrapper');
    const passwordWrapper = document.getElementById('passwordWrapper');

    /* =====================
       VALIDATION HELPERS
    ===================== */
    const validateEmail = email =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    let lastErrorMessage = "";

    function showError(wrapper, message) {
        wrapper.classList.add('error');
        wrapper.classList.remove('success');

        if (lastErrorMessage !== message) {
            toastr.error(message);
            lastErrorMessage = message;
        }

        wrapper.querySelector('input')?.focus();
    }

    function showSuccess(wrapper) {
        wrapper.classList.remove('error');
        wrapper.classList.add('success');
        lastErrorMessage = "";
    }

    function validateField(input, wrapper) {
        const value = input.value.trim();

        /* ===== EMAIL ===== */
        if (input.id === 'email') {
            if (!value) {
                showError(wrapper, "Email address is required");
                return false;
            }

            if (!validateEmail(value)) {
                showError(
                    wrapper,
                    "Please enter a valid email address (example@domain.com)"
                );
                return false;
            }
        }

        /* ===== PASSWORD ===== */
        if (input.id === 'password') {
            if (!value) {
                showError(wrapper, "Password is required");
                return false;
            }

            if (value.length < 6) {
                showError(
                    wrapper,
                    "Password must be at least 6 characters long"
                );
                return false;
            }
        }

        showSuccess(wrapper);
        return true;
    }

    /* =====================
       LIVE VALIDATION
    ===================== */
    emailInput.addEventListener('blur', () =>
        validateField(emailInput, emailWrapper)
    );

    passwordInput.addEventListener('blur', () =>
        validateField(passwordInput, passwordWrapper)
    );

    /* =====================
       FORM SUBMIT
    ===================== */
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const isEmailValid = validateField(emailInput, emailWrapper);
        const isPasswordValid = validateField(passwordInput, passwordWrapper);

        if (!isEmailValid || !isPasswordValid) return;

        const submitBtn = this.querySelector('.btn-login');
        submitBtn.classList.add('loading');

        const formData = {
            role: selectedRoleInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };

        try {
            const response = await fetch(
                "http://localhost:3000/api/user/memberlogin",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();
            submitBtn.classList.remove('loading');

            if (response.ok && data.token) {
                const sessionResponse = await fetch("set_session.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: data.email || formData.email,
                        role: data.role || formData.role,
                        token: data.token
                    })
                });

                const sessionData = await sessionResponse.json();

                if (sessionData.success) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("userEmail", data.email);

                    toastr.success("Login successful! Redirecting...");

                    setTimeout(() => {
                        window.location.href = "Home.php";
                    }, 1200);
                } else {
                    toastr.error("Session setup failed");
                }
            } else {
                toastr.warning(
                    data.message || "Invalid login credentials"
                );
            }
        } catch (error) {
            submitBtn.classList.remove('loading');
            toastr.error("Server error. Please try again later.");
            console.error(error);
        }
    });
});
