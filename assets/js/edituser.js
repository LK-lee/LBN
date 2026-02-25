// ==========================================
// ADD USER FORM VALIDATION + TOASTR
// ==========================================

$(document).ready(function () {
    // Initialize Toastr
    toastr.options = {
        "closeButton": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "timeOut": "3000",
        "extendedTimeOut": "1000"
    };

    // Submit form
    $("#userForm").on("submit", function (e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        let isValid = validateUserForm();

        if (!isValid) {
            toastr.error("Please fix the errors in the form");
            return;
        }

        // If using AJAX to submit form data including files
        submitUserForm();
    });

    // Toggle Referred By field based on Refer Type
    $("#refer_type").on("change", function() {
        if ($(this).val() === "Yes") {
            $("#referredByCol").removeClass("d-none");
            $("#referred_by").prop("required", true);
        } else {
            $("#referredByCol").addClass("d-none");
            $("#referred_by").prop("required", false).val("");
            // Clear any errors on referred_by when hidden
            $("#referred_by").removeClass("input-error");
            $("#referred_by").closest(".form-group").find(".error-message").remove();
        }
    });

    // Load trade categories on page load
    loadTradeCategories();

    // Load members for referral dropdown
    loadMembers();

    // Set max date for DOB (must be 18 years or older)
    setMaxDateForDOB();

    // LIVE VALIDATION (user typing)
    $("#userForm input, #userForm select, #userForm textarea").on("keyup change", function() {
        let field = $(this);
        
        if (field.val().trim() !== "") {
            field.removeClass("input-error");
            field.closest(".form-group").find(".error-message").remove();
        }
    });

    // File input change event to update label and validate
    $(".custom-file-input").on("change", function() {
        let fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        
        // Remove error when file is selected
        $(this).removeClass("input-error");
        $(this).closest(".form-group").find(".error-message").remove();
    });
});

// ==========================================
// CLEAR ERRORS FUNCTION
// ==========================================
function clearErrors() {
    $(".input-error").removeClass("input-error");
    $(".error-message").remove();
}

// ==========================================
// MAIN VALIDATION FUNCTION
// ==========================================
function validateUserForm() {
    let isValid = true;

    // Validate all required fields
    $("#userForm [required]").each(function() {
        let field = $(this);
        let fieldValue = field.val().trim();
        let fieldName = getFieldLabel(field);
        let fieldType = field.attr("type");

        // Skip hidden fields
        if (field.closest(".d-none").length > 0) {
            return true; // continue
        }

        // Check if empty
        if (fieldValue === "") {
            // Special handling for file inputs
            if (fieldType === "file") {
                if (field[0].files.length === 0) {
                    showFieldError(field, `${fieldName} is required`);
                    isValid = false;
                }
            } else {
                showFieldError(field, `${fieldName} is required`);
                isValid = false;
            }
            return true; // continue to next field
        }

        // Field-specific validations
        switch (field.attr("id")) {
            case "email":
                if (!isValidEmail(fieldValue)) {
                    showFieldError(field, "Please enter a valid email address");
                    isValid = false;
                }
                break;

             case "mobile":
              if (!isValidIndianMobile(fieldValue)) {
                  showFieldError(
                      field,
                      "Please enter a valid Indian mobile number (10 digits starting with 6/7/8/9)"
                  );
                  isValid = false;
                }
                break;

            case "password":
                if (!isStrongPassword(fieldValue)) {
                    showFieldError(field, "Password must be at least 8 characters with uppercase, lowercase, number and special character");
                    isValid = false;
                }
                break;

            case "dob":
                if (!isValidAge(fieldValue)) {
                    showFieldError(field, "You must be at least 18 years old");
                    isValid = false;
                }
                break;

            case "name":
                if (fieldValue.length < 3) {
                    showFieldError(field, "Full name must be at least 3 characters");
                    isValid = false;
                }
                break;

            case "address":
                if (fieldValue.length < 10) {
                    showFieldError(field, "Address must be at least 10 characters");
                    isValid = false;
                }
                break;
        }
    });

    // Validate social media URLs if provided
    validateUrlField("instagram_link", "Instagram");
    validateUrlField("linkedin_link", "LinkedIn");
    validateUrlField("whatsapp_link", "WhatsApp");

    // Validate file fields
    if ($("#profile_image")[0].files.length > 0) {
        let profileFile = $("#profile_image")[0].files[0];
        if (!validateImageFile(profileFile, "profile_image")) {
            isValid = false;
        }
    } else if ($("#profile_image").prop("required") && !$("#profile_image").closest(".d-none").length) {
        showFieldError($("#profile_image"), "Profile image is required");
        isValid = false;
    }

    if ($("#company_logo")[0].files.length > 0) {
        let logoFile = $("#company_logo")[0].files[0];
        if (!validateImageFile(logoFile, "company_logo")) {
            isValid = false;
        }
    } else if ($("#company_logo").prop("required") && !$("#company_logo").closest(".d-none").length) {
        showFieldError($("#company_logo"), "Company logo is required");
        isValid = false;
    }

    return isValid;
}

// ==========================================
// URL VALIDATION HELPER
// ==========================================
function validateUrlField(fieldId, fieldName) {
    let field = $(`#${fieldId}`);
    let value = field.val().trim();
    
    if (value && !isValidUrl(value)) {
        showFieldError(field, `Please enter a valid ${fieldName} URL`);
        return false;
    }
    return true;
}

// ==========================================
// FIELD VALIDATION HELPERS
// ==========================================
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


function isValidIndianMobile(mobile) {
  let clean = mobile.replace(/\D/g, '');

  if (clean.length === 12 && clean.startsWith('91')) {
    clean = clean.substring(2);
  }

  if (clean.length === 11 && clean.startsWith('0')) {
    clean = clean.substring(1);
  }

  return /^[6-9]\d{9}$/.test(clean);
}

function isStrongPassword(password) {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}

function isValidAge(dob) {
    let birthDate = new Date(dob);
    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18;
}

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function validateImageFile(file, fieldId) {
    // Check file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
        showFieldError($(`#${fieldId}`), "File size must be less than 2MB");
        return false;
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
        showFieldError($(`#${fieldId}`), "Only JPG, PNG, and GIF images are allowed");
        return false;
    }

    return true;
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function getFieldLabel(field) {
    let label = field.closest(".form-group").find("label").first().text();
    // Remove asterisk and trim
    return label.replace('*', '').trim();
}

function showFieldError(field, message) {
    // Add error class to field
    field.addClass("input-error");
    
    // Remove any existing error message for this field
    field.closest(".form-group").find(".error-message").remove();
    
    // Add error message below the field
    if (field.hasClass("custom-file-input")) {
        // For file inputs, add error after the custom-file div
        field.closest(".custom-file").after(`<small class="error-message text-danger">${message}</small>`);
    } else {
        // For regular inputs, add error after the field
        field.after(`<small class="error-message text-danger">${message}</small>`);
    }
    
    // Show toastr notification for the first error only (to avoid spam)
    if ($(".error-message").length === 1) {
        toastr.error(message);
    }
}

// ==========================================
// FORM SUBMISSION WITH AJAX
// ==========================================
function submitUserForm() {
    let formData = new FormData(document.getElementById("userForm"));

    // Show loading indicator
    toastr.info("Saving user data...", "Please wait");
    
    // Disable submit button to prevent double submission
    $("#submitBtn").prop("disabled", true).html('<i class="fas fa-spinner fa-spin"></i> Saving...');

    $.ajax({
        url: 'save_user.php', // Your server endpoint
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            toastr.success("User Updated Successfully!");
            
            // Clear form
            $("#userForm")[0].reset();
            
            // Clear image previews
            $("#profile_preview").hide().attr("src", "#");
            $("#logo_preview").hide().attr("src", "#");
            
            // Reset file inputs labels
            $(".custom-file-label").html("Choose file").removeClass("selected");

            // Optional redirect after save
            setTimeout(() => {
                window.location.href = "ManageUser.php";
            }, 1500);
        },
        error: function(xhr, status, error) {
            let errorMessage = "Failed to add user";
            if (xhr.responseJSON && xhr.responseJSON.message) {
                errorMessage = xhr.responseJSON.message;
            }
            toastr.error(errorMessage);
            console.error("Error:", error);
            
            // Re-enable submit button
            $("#submitBtn").prop("disabled", false).html('<i class="fas fa-save"></i> Save User');
        }
    });
}

// ==========================================
// DYNAMIC DATA LOADING
// ==========================================
function loadTradeCategories() {
    // Simulate API call - replace with actual AJAX
    $.ajax({
        url: 'get_trade_categories.php',
        method: 'GET',
        success: function(response) {
            // Parse response and populate dropdown
            let categories = response; // Assuming response is already parsed
            
            let options = '<option value="">--- Select Trade Category ---</option>';
            categories.forEach(cat => {
                options += `<option value="${cat.id}">${cat.name}</option>`;
            });

            $("#trade_category").html(options);
        },
        error: function() {
            console.error("Failed to load trade categories");
            // Fallback to static data
            let categories = [
                { id: 1, name: "IT & Software" },
                { id: 2, name: "Healthcare" },
                { id: 3, name: "Education" },
                { id: 4, name: "Manufacturing" },
                { id: 5, name: "Retail" },
                { id: 6, name: "Construction" }
            ];

            let options = '<option value="">--- Select Trade Category ---</option>';
            categories.forEach(cat => {
                options += `<option value="${cat.id}">${cat.name}</option>`;
            });

            $("#trade_category").html(options);
        }
    });
}

function loadMembers() {
    // Simulate API call - replace with actual AJAX
    $.ajax({
        url: 'get_members.php',
        method: 'GET',
        success: function(response) {
            // Parse response and populate dropdown
            let members = response; // Assuming response is already parsed
            
            let options = '<option value="">--- Select Member ---</option>';
            members.forEach(member => {
                options += `<option value="${member.id}">${member.name}</option>`;
            });

            $("#referred_by").html(options);
        },
        error: function() {
            console.error("Failed to load members");
            // Fallback to static data
            let members = [
                { id: 101, name: "John Doe" },
                { id: 102, name: "Jane Smith" },
                { id: 103, name: "Bob Johnson" },
                { id: 104, name: "Alice Brown" }
            ];

            let options = '<option value="">--- Select Member ---</option>';
            members.forEach(member => {
                options += `<option value="${member.id}">${member.name}</option>`;
            });

            $("#referred_by").html(options);
        }
    });
}

function setMaxDateForDOB() {
    // Set max date to 18 years ago from today
    let today = new Date();
    let maxDate = new Date(today.setFullYear(today.getFullYear() - 18));
    let maxDateStr = maxDate.toISOString().split('T')[0];
    $("#dob").attr("max", maxDateStr);
}

// ==========================================
// IMAGE PREVIEW FUNCTION (called from onchange)
// ==========================================
function previewImage(event, previewId) {
    let input = event.target;
    let reader = new FileReader();
    
    reader.onload = function() {
        let preview = document.getElementById(previewId);
        preview.src = reader.result;
        preview.style.display = "block";
    };
    
    if (input.files && input.files[0]) {
        reader.readAsDataURL(input.files[0]);
    }
}