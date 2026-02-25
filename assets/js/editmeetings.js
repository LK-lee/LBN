// ==========================================
// ADD MEETINGS FORM VALIDATION + TOASTR
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

    // Set minimum date for meeting date (can't be in the past)
    setMinDateForMeeting();

    // Submit form
    $("#meetingsForm").on("submit", function (e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        let isValid = validateMeetingsForm();

        if (!isValid) {
            toastr.error("Please fix the errors in the form");
            return false;
        }

        // If using AJAX to submit form data
        submitMeetingsForm();
    });

    // LIVE VALIDATION (user typing)
    $("#meetingsForm input, #meetingsForm select, #meetingsForm textarea").on("keyup change", function() {
        let field = $(this);
        
        if (field.val().trim() !== "") {
            field.removeClass("input-error");
            field.closest(".col-md-6, .col-md-12").find(".error-message").remove();
        }
    });

    // Special validation for meeting date
    $("#meeting_date").on("change", function() {
        let selectedDate = new Date($(this).val());
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showFieldError($(this), "Meeting date cannot be in the past");
        } else {
            $(this).removeClass("input-error");
            $(this).closest(".col-md-6").find(".error-message").remove();
        }
    });

    // Real-time validation for meeting title
    $("#meeting_title").on("keyup", function() {
        let title = $(this).val().trim();
        if (title.length >= 3) {
            $(this).removeClass("input-error");
            $(this).closest(".col-md-6").find(".error-message").remove();
        }
    });
});

// ==========================================
// SET MINIMUM DATE FOR MEETING
// ==========================================
function setMinDateForMeeting() {
    // Set min date to today (can't select past dates)
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    
    let todayStr = yyyy + '-' + mm + '-' + dd;
    $("#meeting_date").attr("min", todayStr);
}

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
function validateMeetingsForm() {
    let isValid = true;

    // Validate Meeting Type
    let meetingType = $("#meeting_type").val();
    if (!meetingType) {
        showFieldError($("#meeting_type"), "Please select meeting type");
        isValid = false;
    }

    // Validate Meeting Title (NOW REQUIRED with *)
    let meetingTitle = $("#meeting_title").val().trim();
    if (!meetingTitle) {
        showFieldError($("#meeting_title"), "Meeting title is required");
        isValid = false;
    } else if (meetingTitle.length < 3) {
        showFieldError($("#meeting_title"), "Meeting title must be at least 3 characters");
        isValid = false;
    } else if (meetingTitle.length > 200) {
        showFieldError($("#meeting_title"), "Meeting title cannot exceed 200 characters");
        isValid = false;
    } else if (!isValidMeetingTitle(meetingTitle)) {
        showFieldError($("#meeting_title"), "Meeting title contains invalid characters");
        isValid = false;
    }

    // Validate Meeting Date
    let meetingDate = $("#meeting_date").val();
    if (!meetingDate) {
        showFieldError($("#meeting_date"), "Please select meeting date");
        isValid = false;
    } else {
        // Check if date is not in past
        let selectedDate = new Date(meetingDate);
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showFieldError($("#meeting_date"), "Meeting date cannot be in the past");
            isValid = false;
        }
    }

    // Validate Meeting Mode
    let meetingMode = $("#meeting_mode").val();
    if (!meetingMode) {
        showFieldError($("#meeting_mode"), "Please select meeting mode");
        isValid = false;
    }

    // Validate Meeting Time
    let meetingTime = $("#meeting_time").val();
    if (!meetingTime) {
        showFieldError($("#meeting_time"), "Please select meeting time");
        isValid = false;
    } else {
        // If meeting is today, check if time is in the future
        if (meetingDate) {
            let selectedDate = new Date(meetingDate);
            let today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate.getTime() === today.getTime()) {
                // Meeting is today, check time
                let currentTime = new Date();
                let currentHour = currentTime.getHours();
                let currentMinute = currentTime.getMinutes();
                
                let [selectedHour, selectedMinute] = meetingTime.split(':').map(Number);
                
                if (selectedHour < currentHour || (selectedHour === currentHour && selectedMinute <= currentMinute)) {
                    showFieldError($("#meeting_time"), "Meeting time must be in the future for today's date");
                    isValid = false;
                }
            }
        }
    }

    // Validate Status
    let status = $("#status").val();
    if (!status) {
        showFieldError($("#status"), "Please select meeting status");
        isValid = false;
    }

    // Validate Location
    let location = $("#meeting_place").val().trim();
    if (!location) {
        showFieldError($("#meeting_place"), "Please enter meeting location");
        isValid = false;
    } else if (location.length < 5) {
        showFieldError($("#meeting_place"), "Location must be at least 5 characters");
        isValid = false;
    } else if (location.length > 500) {
        showFieldError($("#meeting_place"), "Location cannot exceed 500 characters");
        isValid = false;
    }

    return isValid;
}

// ==========================================
// MEETING TITLE SPECIFIC VALIDATION
// ==========================================
function isValidMeetingTitle(title) {
    // Allow letters, numbers, spaces, and common punctuation
    let titleRegex = /^[a-zA-Z0-9\s\-_.,!?()&]+$/;
    return titleRegex.test(title);
}

// ==========================================
// SHOW FIELD ERROR
// ==========================================
function showFieldError(field, message) {
    // Add error class to field
    field.addClass("input-error");
    
    // Find the closest container (col-md-6 or col-md-12)
    let container = field.closest(".col-md-6, .col-md-12");
    
    // Remove any existing error message in this container
    container.find(".error-message").remove();
    
    // Add error message below the field
    if (field.is("select")) {
        // For select fields, add after the select
        field.after(`<small class="error-message text-danger">${message}</small>`);
    } else if (field.is("textarea")) {
        // For textarea, add after textarea
        field.after(`<small class="error-message text-danger">${message}</small>`);
    } else {
        // For input fields
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
function submitMeetingsForm() {
    let formData = new FormData(document.getElementById("meetingsForm"));

    // Show loading indicator
    toastr.info("Saving meeting data...", "Please wait");
    
    // Disable submit button to prevent double submission
    let submitBtn = $("#meetingsForm button[type='submit']");
    let originalText = submitBtn.html();
    submitBtn.prop("disabled", true).html('<i class="fas fa-spinner fa-spin"></i> Saving...');

    // Log form data for debugging (optional)
    for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    $.ajax({
        url: 'save_meeting.php', // Your server endpoint
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            toastr.success("Meeting Updated Successfully!");
            
            // Clear form
            $("#meetingsForm")[0].reset();

            // Optional redirect after save
            setTimeout(() => {
                window.location.href = "ManageMeetings.php";
            }, 1500);
        },
        error: function(xhr, status, error) {
            let errorMessage = "Failed to add meeting";
            if (xhr.responseJSON && xhr.responseJSON.message) {
                errorMessage = xhr.responseJSON.message;
            } else if (xhr.responseText) {
                try {
                    let response = JSON.parse(xhr.responseText);
                    errorMessage = response.message || errorMessage;
                } catch(e) {
                    // If not JSON, use status text
                    errorMessage = xhr.statusText || errorMessage;
                }
            }
            toastr.error(errorMessage);
            console.error("Error:", error);
            
            // Re-enable submit button
            submitBtn.prop("disabled", false).html(originalText);
        }
    });
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

// Generate a meeting summary (optional feature)
function generateMeetingSummary() {
    let title = $("#meeting_title").val();
    let date = $("#meeting_date").val();
    let time = $("#meeting_time").val();
    let mode = $("#meeting_mode").val();
    
    if (title && date && time && mode) {
        let formattedDate = formatDate(date);
        return `${title} - ${formattedDate} at ${time} (${mode})`;
    }
    return "";
}

// Format date for display
function formatDate(dateString) {
    let date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Check for duplicate meeting titles (would need backend API)
function checkDuplicateTitle(title) {
    // This would typically be an AJAX call to your backend
    // Return true if no duplicate, false if duplicate exists
    return true;
}