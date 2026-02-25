// ==========================================
// ADD FOOTER FORM VALIDATION + TOASTR
// ==========================================

$(document).ready(function () {

    toastr.options = {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-top-right",
        timeOut: "3000"
    };

    $("#referralForm").on("submit", function (e) {
        e.preventDefault();

        clearErrors();

        let isValid = true;

        let referred_by = $("#referred_by").val().trim();
        let name   = $("#name").val().trim();
        let mobile  = $("#mobile").val().trim();
        let meeting_id     = $("#meeting_id").val().trim();
        let status     = $("#status").val().trim();

        // =========================
        // ADDRESS
        // =========================
        if (referred_by === "") {
            showError($("#referred_by"), "Reffered by is required");
            isValid = false;
        } else if (name === "") {
            showError($("#name"), "Name is required");
            isValid = false;
        }
        else if (mobile === ""){
            showError($("#mobile"), "Mobile is required");
            isValid = false;
        }
        else if (meeting_id === ""){
            showError($("#meeting_id"), "meeting_id is required");
            isValid = false;
        }
        else if (status === ""){
            showError($("#status"), "status is required");
            isValid = false;
        }
        // }else if (status.length < 10) {
        //     showError($("#status"), "status must be at least 10 characters");
        //     isValid = false;
        // }

        // =========================
        // EMAIL
        // =========================
        // if (email === "") {
        //     showError($("#email"), "Email is required");
        //     isValid = false;
        // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        //     showError($("#email"), "Enter a valid email address");
        //     isValid = false;
        // }

        // =========================
        // PHONE NUMBER
        // =========================
        // if (number === "") {
        //     showError($("#number"), "Phone number is required");
        //     isValid = false;
        // } else {
        //     let clean = number.replace(/\D/g, '');

        //     if (clean.length === 12 && clean.startsWith("91")) {
        //         clean = clean.substring(2);
        //     }

        //     if (!/^[6-9]\d{9}$/.test(clean)) {
        //         showError($("#number"), "Enter a valid Indian phone number");
        //         isValid = false;
        //     }
        // }

        // =========================
        // GOOGLE MAP
        // =========================
        // if (map === "") {
        //     showError($("#map"), "Google Maps embed URL is required");
        //     isValid = false;
        // } else if (
        //     !map.includes("google.com/maps") &&
        //     !map.includes("maps.google.com") &&
        //     !map.includes("<iframe")
        // ) {
        //     showError($("#map"), "Enter a valid Google Maps embed URL");
        //     isValid = false;
        // }

        if (!isValid) {
            toastr.error("Please fix the highlighted errors.");
            return;
        }

        submitFooterForm();
    });

    // Live remove error while typing
    $("#addNoteForm input, #addNoteForm textarea").on("keyup change", function () {
        $(this).removeClass("input-error");
        $(this).closest(".col-md-6, .col-md-12")
               .find(".error-message")
               .remove();
    });

});

// ==========================================
// SHOW FIELD ERROR
// ==========================================

function showError(field, message) {

    field.addClass("input-error");

    field.closest(".col-md-6, .col-md-12")
         .find(".error-message")
         .remove();

    field.after(`<small class="error-message text-danger">${message}</small>`);

    if ($(".error-message").length === 1) {
        toastr.error(message);
    }
}


// ==========================================
// CLEAR ERRORS
// ==========================================

function clearErrors() {
    $(".input-error").removeClass("input-error");
    $(".error-message").remove();
}


// ==========================================
// AJAX SUBMIT
// ==========================================

function submitFooterForm() {

    $("#submitBtn").prop("disabled", true);
    $("#submitText").text("Saving...");
    $("#loadingSpinner").removeClass("d-none");

    toastr.info("Saving footer data...");

    $.ajax({
        url: "#",
        method: "POST",
        data: $("#referralForm").serialize(),
        success: function (response) {

            toastr.success("Referral saved successfully!");

            setTimeout(function () {
                window.location.href = "NewJoins.php";
            }, 1500);
        },
        error: function () {

            toastr.error("Something went wrong!");

            $("#submitBtn").prop("disabled", false);
            $("#submitText").text("Save Footer");
            $("#loadingSpinner").addClass("d-none");
        }
    });
}
