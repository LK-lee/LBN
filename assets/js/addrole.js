// ==========================================
// ADD ROLE FORM VALIDATION + TOASTR
// ==========================================

$(document).ready(function () {

    // Submit form
    $("#roleForm").on("submit", function (e) {
        e.preventDefault();

        let isValid = validateForm();

        if (!isValid) return;

        // Get values
        let roleName = $("#name").val().trim();
        let description = $("#description").val().trim();

        // Dummy success (later replace with AJAX)
        toastr.success("Role added successfully!");

        // Clear form
        $("#roleForm")[0].reset();

        // Optional redirect after save
        setTimeout(() => {
            window.location.href = "ManageRoles.php";
        }, 1200);
    });

});


// ==========================================
// MAIN VALIDATION FUNCTION
// ==========================================
function validateForm() {

    let isValid = true;

    // Clear previous errors
    $(".input-error").removeClass("input-error");

    // Loop through all labels that have red star (*)
    $("#roleForm label").each(function () {

        if ($(this).find(".text-danger").length > 0) {

            let input = $(this).next("input");

            if (input.length && input.val().trim() === "") {
                showError(input, `${$(this).text().replace('*','')} is required`);
                isValid = false;
            }
        }
    });

    return isValid;
}


// ==========================================
// ERROR HANDLER
// ==========================================
function showError(input, message) {

    input.addClass("input-error");

    toastr.error(message);
}


// ==========================================
// OPTIONAL LIVE VALIDATION (user typing)
// ==========================================
$("#roleForm input").on("keyup", function () {
    if ($(this).val().trim() !== "") {
        $(this).removeClass("input-error");
    }
});
