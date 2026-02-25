// =======================
// TOASTR CONFIG
// =======================
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: 3000,
  preventDuplicates: true,
};

let categoryId = null;
let pageType = null;

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  categoryId = params.get("id");
  pageType = params.get("type")?.toLowerCase();
  
  if (!categoryId || !pageType) {
    toastr.error("Invalid access - Missing ID or Type parameter");
    window.location.href = "ManageCategory.php";
    return;
  }

  // Set hidden form fields
  const categoryIdInput = document.getElementById("category_id");
  const pageTypeInput = document.getElementById("page_type");
  
  if (categoryIdInput) categoryIdInput.value = categoryId;
  if (pageTypeInput) pageTypeInput.value = pageType;

  updatePageHeader(pageType);
  fetchCategoryDetails(categoryId);
  handleFormMode(pageType);

  if (pageType === "edit") {
    document.getElementById("categoryForm")
      ?.addEventListener("submit", updateCategory);
  }
});

// =======================
// PAGE HEADER UPDATE
// =======================
function updatePageHeader(type) {
  const pageHeading = document.querySelector('.h2.text-white.mb-0');
  const breadcrumbActive = document.querySelector('.breadcrumb-item.active');
  const actionButtonsContainer = document.querySelector('.col-lg-6.col-5.text-right');
  const cardTitle = document.querySelector('.card-header h3.mb-0');
  
  if (!pageHeading || !breadcrumbActive || !actionButtonsContainer) {
    console.warn("Page header elements not found");
    return;
  }
  
  if (type === 'edit') {
    pageHeading.textContent = 'Edit Category';
    breadcrumbActive.textContent = 'Edit Category';
    if (cardTitle) cardTitle.textContent = 'Edit Category Form';
    
    actionButtonsContainer.innerHTML = `
      <a href="ManageCategory.php" class="btn bg-white text-default mr-2 col-md-6">
        <i class="fas fa-times"></i> Cancel
      </a>
      <button type="submit" form="categoryForm" class="btn btn-success col-md-6">
        <i class="fas fa-save"></i> Update Category
      </button>
    `;
  } else {
    pageHeading.textContent = 'View Category';
    breadcrumbActive.textContent = 'View Category';
    if (cardTitle) cardTitle.textContent = 'Category Details';
    
    actionButtonsContainer.innerHTML = `
      <a href="ManageCategory.php" class="btn bg-white text-default mr-2">
        <i class="fas fa-arrow-left"></i> Back to Categories
      </a>
    `;
  }
}

// =======================
// FETCH CATEGORY
// =======================
function fetchCategoryDetails(id) {
  showLoading(true, "Loading category...");

  fetch(`http://localhost:3000/api/user/getcategorybyid/${id}`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then(data => {
      showLoading(false);

      if (data.status === 'success' && data.data) {
        setValue("name", data.data.name);
      } else {
        toastr.error(data.message || "Category not found");
        setTimeout(() => {
          window.location.href = "ManageCategory.php";
        }, 2000);
      }
    })
    .catch(err => {
      console.error("Error loading category:", err);
      showLoading(false);
      toastr.error("Failed to load category details");
    });
}

// =======================
// UPDATE CATEGORY
// =======================
function updateCategory(e) {
  e.preventDefault();

  const userEmail = localStorage.getItem("userEmail");
  if (!userEmail) {
    toastr.warning("Session expired. Please login again.");
    return;
  }

  const form = document.getElementById("categoryForm");
  if (!validateUpdateForm(form)) return;

  showLoading(true, "Updating category...");

  const formData = {
    name: form.elements['name'].value.trim(),
    useremail: userEmail
  };

  fetch(`http://localhost:3000/api/user/updatecategory/${categoryId}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  .then(async res => {
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Update failed');
    return data;
  })
  .then(data => {
    showLoading(false);
    
    if (data.status === 'success') {
      toastr.success("Category updated successfully");
      setTimeout(() => {
        window.location.href = "ManageCategory.php";
      }, 1500);
    } else {
      toastr.error(data.message || "Failed to update category");
    }
  })
  .catch(err => {
    console.error("Error updating category:", err);
    showLoading(false);
    toastr.error(err.message || "Failed to update category");
  });
}

// =======================
// FORM MODE HANDLER
// =======================
function handleFormMode(type) {
  const fields = document.querySelectorAll(".editable");
  const backLeft = document.getElementById("backLeft");
  const backRight = document.getElementById("backRight");
  const updateRight = document.getElementById("updateRight");

  if (type === "view") {
    fields.forEach(el => {
      el.setAttribute("readonly", true);
      el.classList.add("bg-light");
      el.disabled = true;
    });

    if (backRight) backRight.classList.remove("d-none");
    if (backLeft) backLeft.classList.add("d-none");
    if (updateRight) updateRight.classList.add("d-none");
  }

  if (type === "edit") {
    fields.forEach(el => {
      el.removeAttribute("readonly");
      el.classList.remove("bg-light");
      el.disabled = false;
    });

    if (backLeft) backLeft.classList.remove("d-none");
    if (updateRight) updateRight.classList.remove("d-none");
    if (backRight) backRight.classList.add("d-none");
  }
}

// =======================
// VALIDATION
// =======================
function validateUpdateForm(form) {
  const name = form.elements['name'].value.trim();
  let isValid = true;

  // Clear previous validation
  clearValidation(form);

  if (!name) {
    toastr.error("Category name is required");
    highlightField(form.elements['name'], true);
    showInlineError(form.elements['name'], "Category name is required");
    isValid = false;
  } else if (name.length < 2) {
    toastr.error("Category name must be at least 2 characters");
    highlightField(form.elements['name'], true);
    showInlineError(form.elements['name'], "Category name must be at least 2 characters");
    isValid = false;
  } else {
    highlightField(form.elements['name'], false);
  }

  return isValid;
}

function clearValidation(form) {
  form.querySelectorAll('.is-invalid').forEach(field => {
    field.classList.remove('is-invalid');
  });
  
  form.querySelectorAll('.invalid-feedback').forEach(msg => {
    msg.remove();
  });
}

function highlightField(field, isError) {
  field.classList.toggle("is-invalid", isError);
  field.classList.toggle("is-valid", !isError && field.value.trim());
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
  if (existingError) existingError.remove();
}

// =======================
// UTILITIES
// =======================
function setValue(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value || '';
}

// =======================
// LOADING OVERLAY
// =======================
function showLoading(isLoading, message = "Processing...") {
  const submitButton = document.querySelector('button[type="submit"]');

  if (isLoading) {
    toastr.info(message);

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${message}`;
    }

    if (!document.getElementById("loadingOverlay")) {
      const overlay = document.createElement("div");
      overlay.id = "loadingOverlay";
      overlay.className = "loading-overlay";
      overlay.innerHTML = `
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <p class="mt-2">${message}</p>
      `;
      document.body.appendChild(overlay);
    }

  } else {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = '<i class="fas fa-save"></i> Update Category';
    }
    document.getElementById("loadingOverlay")?.remove();
  }
}

// =======================
// DEBUG FUNCTION
// =======================
window.checkPageHeader = function() {
  console.log("Page Type:", pageType);
  console.log("Category ID:", categoryId);
  console.log("Page Heading:", document.querySelector('.h2.text-white.mb-0')?.textContent);
  console.log("Breadcrumb Text:", document.querySelector('.breadcrumb-item.active')?.textContent);
};

// =======================
// STYLES
// =======================
const style = document.createElement('style');
style.textContent = `
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255,255,255,.95);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-overlay p {
  margin-top: 1rem;
  color: #495057;
  font-size: 1.1rem;
}

.is-valid {
  border-color: #28a745 !important;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

.is-invalid {
  border-color: #dc3545 !important;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

.bg-light {
  background: #f8f9fa !important;
  cursor: not-allowed;
}

.invalid-feedback {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}

.btn {
  transition: all 0.2s ease;
}

.btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
`;
document.head.appendChild(style);

console.log("Category management JS initialized successfully");