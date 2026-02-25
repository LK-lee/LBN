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

    $("#addNoteForm").on("submit", function (e) {
        e.preventDefault();

        clearErrors();

        let isValid = true;

        let meeting_id = $("#meeting_id").val().trim();
        let given_by   = $("#given_by").val().trim();
        let given_to  = $("#given_to").val().trim();
        let amount     = $("#amount").val().trim();
        let notes     = $("#notes").val().trim();

        // =========================
        // ADDRESS
        // =========================
        if (meeting_id === "") {
            showError($("#meeting_id"), "Meeting is required");
            isValid = false;
        } else if (given_by === "") {
            showError($("#given_by"), "Given By is required");
            isValid = false;
        }
        else if (given_to === ""){
            showError($("#given_to"), "Given to is required");
            isValid = false;
        }
        else if (amount === ""){
            showError($("#amount"), "Amount is required");
            isValid = false;
        }
        else if (notes === ""){
            showError($("#notes"), "Notes is required");
            isValid = false;
        }else if (notes.length < 10) {
            showError($("#notes"), "Notes must be at least 10 characters");
            isValid = false;
        }

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

        submitaddNoteForm();
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

function submitaddNoteForm() {

    $("#submitBtn").prop("disabled", true);
    $("#submitText").text("Saving...");
    $("#loadingSpinner").removeClass("d-none");

    toastr.info("Saving Note data...");

    $.ajax({
        url: "#",
        method: "POST",
        data: $("#addNoteForm").serialize(),
        success: function (response) {

            toastr.success("Note saved successfully!");

            setTimeout(function () {
                window.location.href = "ThanksGivingNote.php";
            }, 1500);
        },
        error: function () {

            toastr.error("Something went wrong!");

            $("#submitBtn").prop("disabled", false);
            $("#submitText").text("Save Note");
            $("#loadingSpinner").addClass("d-none");
        }
    });
}