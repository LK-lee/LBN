// ==========================================
// ADD LEADER FORM VALIDATION + TOASTR
// ==========================================

$(document).ready(function () {

    // Initialize Toastr
    toastr.options = {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-top-right",
        timeOut: "3000",
        extendedTimeOut: "1000"
    };

    // Submit Form
    $("#leaderForm").on("submit", function (e) {
        e.preventDefault();

        clearErrors();

        let isValid = validateLeaderForm();

        if (!isValid) {
            toastr.error("Please fix the errors in the form");
            return;
        }

        submitLeaderForm();
    });

    // Live validation (remove error while selecting)
    $("#leaderForm select").on("change", function () {
        if ($(this).val() !== "") {
            $(this).removeClass("input-error");
            $(this).closest(".form-group").find(".error-message").remove();
        }
    });

});

// ==========================================
// CLEAR ERRORS
// ==========================================

function clearErrors() {
    $(".input-error").removeClass("input-error");
    $(".error-message").remove();
}

// ==========================================
// MAIN VALIDATION
// ==========================================

function validateLeaderForm() {

    let isValid = true;

    // Member Validation
    let member = $("#memberSelect").val();
    if (member === "") {
        showFieldError($("#memberSelect"), "Please select a member");
        isValid = false;
    }

    // Designation Validation
    let designation = $("#designationSelect").val();
    if (designation === "") {
        showFieldError($("#designationSelect"), "Please select a designation");
        isValid = false;
    }

    // Status Validation
    let status = $("#statusSelect").val();
    if (status === "") {
        showFieldError($("#statusSelect"), "Please select status");
        isValid = false;
    }

    return isValid;
}

// ==========================================
// SHOW FIELD ERROR
// ==========================================

function showFieldError(field, message) {

    field.addClass("input-error");

    // Remove existing error
    field.closest(".form-group").find(".error-message").remove();

    // Add error message below field
    field.after(`<small class="error-message text-danger">${message}</small>`);

    // Show only first toastr error
    if ($(".error-message").length === 1) {
        toastr.error(message);
    }
}

// ==========================================
// AJAX SUBMIT (Optional)
// ==========================================

function submitLeaderForm() {

    let formData = $("#leaderForm").serialize();

    toastr.info("Saving leader...", "Please wait");

    $("#submitBtn")
        .prop("disabled", true)
        .html('<i class="fas fa-spinner fa-spin"></i> Saving...');

    $.ajax({
        url: "#",  // Change if needed
        method: "POST",
        data: formData,
        success: function (response) {

            toastr.success("Leader added successfully!");

            setTimeout(() => {
                window.location.href = "ManageLeadership.php";
            }, 1500);
        },
        error: function () {

            toastr.error("Failed to add leader");

            $("#submitBtn")
                .prop("disabled", false)
                .html('<i class="fas fa-save"></i> Save Leader');
        }
    });
}