document.addEventListener("DOMContentLoaded", function () {

    /* =====================
       TOASTR CONFIG
    ===================== */
    toastr.options = {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-top-right",
        timeOut: "3000"
    };

    const inputs = document.querySelectorAll(".otp-input");
    const verifyBtn = document.getElementById("verifyBtn");
    const form = document.getElementById("otpForm");
    const timerEl = document.getElementById("otpTimer");
    const timerValue = document.getElementById("timerValue");
    const resendWrapper = document.getElementById("resendWrapper");
    const resendBtn = document.getElementById("resendOtp");

    let countdown;
    let timeLeft = 60;

    startTimer();

    /* =====================
       OTP INPUT HANDLING
    ===================== */
    inputs.forEach((input, index) => {

        input.addEventListener("input", () => {
            input.value = input.value.replace(/\D/g, "");
            if (input.value && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
            checkCompletion();
        });

        input.addEventListener("keydown", e => {
            if (e.key === "Backspace" && !input.value && index > 0) {
                inputs[index - 1].focus();
            }
            setTimeout(checkCompletion, 10);
        });

        input.addEventListener("paste", e => {
            e.preventDefault();
            const pasted = e.clipboardData.getData("text");
            if (/^\d{6}$/.test(pasted)) {
                inputs.forEach((i, idx) => i.value = pasted[idx]);
                inputs[5].focus();
                checkCompletion();
            }
        });
    });

    function checkCompletion() {
        verifyBtn.disabled = ![...inputs].every(i => i.value);
    }

    /* =====================
       TIMER
    ===================== */
    function startTimer() {
        clearInterval(countdown);
        timeLeft = 60;
        timerEl.style.display = "block";
        resendWrapper.style.display = "none";
        updateTimerUI();

        countdown = setInterval(() => {
            timeLeft--;
            updateTimerUI();

            if (timeLeft <= 0) {
                clearInterval(countdown);
                timerEl.style.display = "none";
                resendWrapper.style.display = "block";
            }
        }, 1000);
    }

    function updateTimerUI() {
        const min = String(Math.floor(timeLeft / 60)).padStart(2, "0");
        const sec = String(timeLeft % 60).padStart(2, "0");
        timerValue.textContent = `${min}:${sec}`;

        if (timeLeft <= 30) {
            timerEl.classList.remove("green");
            timerEl.classList.add("red");
        } else {
            timerEl.classList.add("green");
            timerEl.classList.remove("red");
        }
    }

    /* =====================
       VERIFY OTP
    ===================== */
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = localStorage.getItem("forgotuseremail");
        if (!email) {
            toastr.error("Session expired. Please request OTP again.");
            window.location.href = "ForgotPassword.php";
            return;
        }

        const otp = [...inputs].map(i => i.value).join("");
        if (otp.length !== 6) {
            toastr.warning("Please enter all 6 digits of OTP");
            return;
        }

        verifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
        verifyBtn.disabled = true;

        try {
            const response = await fetch("http://localhost:3000/api/user/verifyotp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, enteredotp: otp })
            });

            const data = await response.json();

            if (response.ok && data.status === "success") {
                toastr.success("OTP is valid ✔");
                clearInterval(countdown);

                setTimeout(() => {
                    window.location.href = "ResetPassword.php";
                }, 1200);
            } else {
                toastr.error(data.message || "Invalid OTP. Please try again.");
                resetOtp();
            }
        } catch (err) {
            toastr.error("Network error. Please try again.");
            resetOtp();
        }
    });

    /* =====================
       RESEND OTP
    ===================== */
    resendBtn.addEventListener("click", async function () {
        const email = localStorage.getItem("forgotuseremail");
        if (!email) return;

        try {
            await fetch("http://localhost:3000/api/user/forgotpassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            toastr.success("OTP resent successfully");
            resetOtp();
            startTimer();
        } catch {
            toastr.error("Failed to resend OTP. Try again.");
        }
    });

    function resetOtp() {
        inputs.forEach(i => i.value = "");
        inputs[0].focus();
        verifyBtn.innerHTML = "Verify OTP";
        verifyBtn.disabled = true;
    }
});
