// change-password.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("changepasswordForm");
  if (!form) {
    console.error("Change password form not found!");
    showAlert("danger", "Form not found. Please refresh the page.");
    return;
  }

  form.addEventListener("submit", handleFormSubmit);
  
  initializeFormValidation();
  
  // Get user info from localStorage
  displayUserInfo();
});

function displayUserInfo() {
  // Display user email if available (for user verification)
  const userEmail = localStorage.getItem("userEmail");
  if (userEmail) {
    const emailDisplay = document.getElementById("userEmailDisplay");
    if (emailDisplay) {
      emailDisplay.textContent = userEmail;
    }
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  
  if (!validateForm(form)) {
    return;
  }
  
  showLoading(true, "Updating password...");
  
  // Get user data from localStorage or token
  const token = localStorage.getItem("token");
  if (!token) {
    showLoading(false);
    showAlert("danger", "Authentication required. Please login again.");
    setTimeout(() => {
      window.location.href = "Login.php";
    }, 2000);
    return;
  }
  
  // Extract user email from JWT token (if stored)
  let userEmail = localStorage.getItem("userEmail");
  
  // If email is not in localStorage, try to decode from token
  if (!userEmail) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userEmail = payload.email || payload.userEmail;
    } catch (err) {
      console.error("Failed to decode token:", err);
    }
  }
  
  // If still no email, show error
  if (!userEmail) {
    showLoading(false);
    showAlert("danger", "User information not found. Please login again.");
    setTimeout(() => {
      window.location.href = "Login.php";
    }, 2000);
    return;
  }
  
  const formData = {
    email: userEmail,
    oldpassword: form.elements['oldpassword'].value.trim(),
    newpassword: form.elements['newpassword'].value.trim(),
    confirmpassword: form.elements['confirmpassword'].value.trim(),
  };
  
  
  fetch("http://localhost:3000/api/user/changepassword", {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    console.log("Response status:", response.status);
    
    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Server returned ${response.status}: ${response.statusText}`);
    }
    
    if (!response.ok) {
      // For 400/401 errors, still parse JSON for error messages
      return response.json().then(data => {
        // Create an error object that includes the response data
        const error = new Error(data.errors || `HTTP error! status: ${response.status}`);
        error.status = response.status;
        error.data = data;
        throw error;
      });
    }
    
    return response.json();
  })
  .then(data => {
    console.log("API Response:", data);
    showLoading(false);
    
    if (data.status === 'success') {
      showAlert("success", data.message || "Password changed successfully!");
      
      // Reset form and clear validation
      form.reset();
      clearValidation(form);
      
      // Clear password fields for security
      document.getElementById('oldpassword').value = '';
      document.getElementById('newpassword').value = '';
      document.getElementById('confirmpassword').value = '';
      
      // Remove validation classes
      const fields = form.querySelectorAll('input');
      fields.forEach(field => {
        field.classList.remove('is-valid');
      });
      
      // Optionally, force logout and redirect to login page
      // (Recommended for security after password change)
      setTimeout(() => {
        
        // Redirect to login
        window.location.href = "Home.php";
      }, 3000);
      
    } else if (data.errors) {
      // Handle validation errors from server
      const errorMessages = Array.isArray(data.errors) 
        ? data.errors.map(err => err.msg || err).join(', ')
        : data.errors;
      showAlert("danger", errorMessages);
    } else {
      showAlert("danger", data.message || "Failed to change password. Please try again.");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    showLoading(false);
    
    if (error.status === 401 || error.message.includes("401")) {
      showAlert("danger", "Session expired or unauthorized. Please login again.");
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        window.location.href = "index.php";
      }, 2000);
    } else if (error.status === 400) {
      // Handle validation errors from server
      if (error.data && error.data.errors) {
        const errorMessages = Array.isArray(error.data.errors) 
          ? error.data.errors.map(err => err.msg || err).join(', ')
          : error.data.errors;
        showAlert("danger", errorMessages);
      } else {
        showAlert("danger", error.message || "Invalid request. Please check your input.");
      }
    } else if (error.status === 404) {
      showAlert("danger", "User not found. Please contact support.");
    } else if (error.message.includes("NetworkError") || error.message.includes("Failed to fetch")) {
      showAlert("danger", "Network error. Please check your internet connection.");
    } else {
      showAlert("danger", "An unexpected error occurred. Please try again.");
    }
  });
}

function validateForm(form) {
  const requiredFields = ['oldpassword', 'newpassword', 'confirmpassword'];
  
  let isValid = true;
  const errors = [];
  
  // Clear previous validation
  clearValidation(form);
  
  // Check required fields
  requiredFields.forEach(fieldName => {
    const field = form.elements[fieldName];
    if (field && !field.value.trim()) {
      isValid = false;
      const fieldLabel = fieldName === 'oldpassword' ? 'Current Password' :
                        fieldName === 'newpassword' ? 'New Password' :
                        'Confirm Password';
      errors.push(`${fieldLabel} is required.`);
      highlightField(field, true);
      showInlineError(field, `This field is required.`);
    } else if (field) {
      highlightField(field, false);
    }
  });
  
  // Validate password match
  const newPassword = form.elements['newpassword'].value.trim();
  const confirmPassword = form.elements['confirmpassword'].value.trim();
  
  if (newPassword && confirmPassword) {
    if (newPassword !== confirmPassword) {
      isValid = false;
      errors.push("New password and confirm password do not match.");
      
      const confirmPasswordField = form.elements['confirmpassword'];
      highlightField(confirmPasswordField, true);
      showInlineError(confirmPasswordField, "Passwords do not match.");
    }
  }
  
  // Validate password strength
  if (newPassword) {
    if (newPassword.length < 8) {
      isValid = false;
      errors.push("New password must be at least 8 characters long.");
      const newPasswordField = form.elements['newpassword'];
      highlightField(newPasswordField, true);
      showInlineError(newPasswordField, "Password must be at least 8 characters.");
    }
    
    // Check for common patterns (optional security enhancement)
    if (newPassword === "password" || newPassword === "12345678" || newPassword === "qwertyui") {
      errors.push("Please choose a stronger password.");
    }
  }
  
  // Check if new password is same as old password
  const oldPassword = form.elements['oldpassword'].value.trim();
  if (oldPassword && newPassword && oldPassword === newPassword) {
    isValid = false;
    errors.push("New password cannot be the same as current password.");
    const newPasswordField = form.elements['newpassword'];
    highlightField(newPasswordField, true);
    showInlineError(newPasswordField, "New password must be different from current password.");
  }
  
  if (!isValid) {
    showFormErrors(errors);
  }
  
  return isValid;
}

function initializeFormValidation() {
  const form = document.getElementById("changepasswordForm");
  if (!form) return;
  
  // Real-time validation for password fields
  const passwordFields = ['oldpassword', 'newpassword', 'confirmpassword'];
  
  passwordFields.forEach(fieldName => {
    const field = form.elements[fieldName];
    if (field) {
      // Clear validation on focus
      field.addEventListener('focus', function() {
        highlightField(this, false);
        hideInlineError(this);
      });
      
      // Validate on input
      field.addEventListener('input', function() {
        validatePasswordField(this);
      });
      
      // Validate on blur
      field.addEventListener('blur', function() {
        validatePasswordField(this);
        
        // Additional validation for confirm password
        if (fieldName === 'confirmpassword') {
          const newPassword = form.elements['newpassword'].value.trim();
          if (this.value.trim() && newPassword && this.value.trim() !== newPassword) {
            highlightField(this, true);
            showInlineError(this, "Passwords do not match.");
          }
        }
      });
    }
  });
  
  // Add password strength indicator for new password
  const newPasswordField = form.elements['newpassword'];
  if (newPasswordField) {
    newPasswordField.addEventListener('input', function() {
      updatePasswordStrength(this.value);
    });
  }
}

function validatePasswordField(field) {
  const form = document.getElementById("changepasswordForm");
  
  if (!field.value.trim()) {
    highlightField(field, true);
    showInlineError(field, "This field is required.");
    return false;
  }
  
  // Field-specific validation
  switch(field.name) {
    case 'newpassword':
      if (field.value.trim().length < 8) {
        highlightField(field, true);
        showInlineError(field, "Password must be at least 8 characters.");
        return false;
      }
      break;
      
    case 'confirmpassword':
      const newPassword = form.elements['newpassword'].value.trim();
      if (field.value.trim() !== newPassword) {
        highlightField(field, true);
        showInlineError(field, "Passwords do not match.");
        return false;
      }
      break;
  }
  
  highlightField(field, false);
  hideInlineError(field);
  return true;
}

function updatePasswordStrength(password) {
  const strengthBar = document.getElementById("passwordStrength");
  const strengthText = document.getElementById("passwordStrengthText");
  
  if (!strengthBar || !strengthText) return;
  
  let strength = 0;
  let color = "bg-danger";
  let text = "Very Weak";
  
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  
  switch(strength) {
    case 1:
      color = "bg-danger"; text = "Very Weak"; break;
    case 2:
      color = "bg-warning"; text = "Weak"; break;
    case 3:
      color = "bg-info"; text = "Fair"; break;
    case 4:
      color = "bg-primary"; text = "Good"; break;
    case 5:
      color = "bg-success"; text = "Strong"; break;
    default:
      color = "bg-secondary"; text = ""; break;
  }
  
  strengthBar.className = `progress-bar ${color}`;
  strengthBar.style.width = `${strength * 20}%`;
  strengthBar.setAttribute("aria-valuenow", strength * 20);
  strengthText.textContent = text;
}

function highlightField(field, isError) {
  if (isError) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
  } else {
    field.classList.remove('is-invalid');
    if (field.value.trim()) {
      field.classList.add('is-valid');
    } else {
      field.classList.remove('is-valid');
    }
  }
}

function showInlineError(field, message) {
  hideInlineError(field);
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'invalid-feedback';
  errorDiv.textContent = message;
  errorDiv.id = `${field.id}_error`;
  
  field.parentNode.appendChild(errorDiv);
}

function hideInlineError(field) {
  const existingError = document.getElementById(`${field.id}_error`);
  if (existingError) {
    existingError.remove();
  }
}

function clearValidation(form) {
  // Clear field highlights
  form.querySelectorAll('.is-valid, .is-invalid').forEach(field => {
    field.classList.remove('is-valid', 'is-invalid');
  });
  
  // Remove error messages
  form.querySelectorAll('.invalid-feedback').forEach(msg => {
    msg.remove();
  });
  
  // Remove error summary
  const errorSummary = document.getElementById('form-error-summary');
  if (errorSummary) {
    errorSummary.remove();
  }
  
  // Reset password strength indicator
  const strengthBar = document.getElementById("passwordStrength");
  const strengthText = document.getElementById("passwordStrengthText");
  if (strengthBar && strengthText) {
    strengthBar.className = "progress-bar bg-secondary";
    strengthBar.style.width = "0%";
    strengthBar.setAttribute("aria-valuenow", "0");
    strengthText.textContent = "";
  }
}

function showFormErrors(errors) {
  // Remove existing error summary
  const existingSummary = document.getElementById('form-error-summary');
  if (existingSummary) {
    existingSummary.remove();
  }
  
  if (errors.length === 0) return;
  
  // Create error summary
  const errorDiv = document.createElement('div');
  errorDiv.id = 'form-error-summary';
  errorDiv.className = 'alert alert-danger alert-dismissible fade show';
  errorDiv.role = 'alert';
  
  let errorHtml = `
    <h5 class="alert-heading"><i class="fas fa-exclamation-triangle mr-2"></i>Please fix the following:</h5>
    <ul class="mb-0">
  `;
  
  const displayErrors = errors.slice(0, 3);
  displayErrors.forEach(error => {
    errorHtml += `<li>${error}</li>`;
  });
  
  // Show count if there are more errors
  if (errors.length > 3) {
    errorHtml += `<li>...and ${errors.length - 3} more issue(s)</li>`;
  }
  
  errorHtml += `
    </ul>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  `;
  
  errorDiv.innerHTML = errorHtml;
  
  // Insert at the top of the form
  const form = document.getElementById("changepasswordForm");
  const cardBody = form.closest('.card-body');
  if (cardBody) {
    cardBody.insertBefore(errorDiv, cardBody.firstChild);
    
    // Scroll to top to show error
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function showAlert(type, message) {
  // Remove existing alerts
  const existingAlerts = document.querySelectorAll('.custom-alert');
  existingAlerts.forEach(alert => alert.remove());
  
  // Create alert element
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} custom-alert alert-dismissible fade show`;
  alertDiv.role = 'alert';
  alertDiv.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} mr-2"></i>
    ${message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  `;
  
  // Insert at the top of the form
  const form = document.getElementById("changepasswordForm");
  if (form) {
    const cardBody = form.closest('.card-body');
    if (cardBody) {
      cardBody.insertBefore(alertDiv, cardBody.firstChild);
      
      // Auto-remove after 5 seconds (except for success messages)
      if (type !== 'success') {
        setTimeout(() => {
          if (alertDiv.parentNode) {
            alertDiv.remove();
          }
        }, 5000);
      }
    }
  }
}

function showLoading(isLoading, message = "Processing...") {
  const submitButton = document.querySelector('button[type="submit"]');
  const backButton = document.querySelector('a[href="Home.php"]');
  
  if (isLoading) {
    // Disable buttons
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>' + message;
      submitButton.classList.add('disabled');
    }
    if (backButton) {
      backButton.classList.add('disabled');
    }
    
    // Show loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loadingOverlay';
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
      <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <p class="mt-3 text-muted">${message}</p>
    `;
    
    document.body.appendChild(loadingOverlay);
    
  } else {
    // Enable buttons
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = '<i class="fas fa-key mr-2"></i>Update Password';
      submitButton.classList.remove('disabled');
    }
    if (backButton) {
      backButton.classList.remove('disabled');
    }
    
    // Remove loading overlay
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
      loadingOverlay.remove();
    }
  }
}

// Add CSS for loading overlay and alerts
const style = document.createElement('style');
style.textContent = `
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.95);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(2px);
  }
  
  .loading-overlay p {
    margin-top: 1rem;
    color: #6c757d;
    font-size: 1rem;
    font-weight: 500;
  }
  
  .custom-alert {
    margin-bottom: 20px;
    animation: slideDown 0.3s ease-out;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .alert-success {
    background-color: #d4edda;
    border-color: #c3e6cb;
    color: #155724;
  }
  
  .alert-danger {
    background-color: #f8d7da;
    border-color: #f5c6cb;
    color: #721c24;
  }
  
  @keyframes slideDown {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .is-valid {
    border-color: #28a745 !important;
    padding-right: calc(1.5em + 0.75rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right calc(0.375em + 0.1875rem) center;
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
  }
  
  .is-invalid {
    border-color: #dc3545 !important;
    padding-right: calc(1.5em + 0.75rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right calc(0.375em + 0.1875rem) center;
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
  }
  
  .invalid-feedback {
    display: block;
    color: #dc3545;
    font-size: 0.875em;
    margin-top: 0.25rem;
  }
  
  /* Password strength indicator */
  .password-strength {
    margin-top: 0.5rem;
  }
  
  .password-strength .progress {
    height: 5px;
    margin-bottom: 5px;
  }
  
  .password-strength small {
    font-size: 0.8rem;
    color: #6c757d;
  }
`;
document.head.appendChild(style);