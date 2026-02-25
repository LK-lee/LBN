document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("categoryForm");

  if (!form) {
    toastr.error("Form not found. Please refresh the page.");
    return;
  }

  /* =========================
     TOASTR CONFIG
  ========================= */
  toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: "toast-top-right",
    timeOut: 3000,
    preventDuplicates: true
  };

  /* =========================
     SUBMIT HANDLER
  ========================= */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    clearValidation();

    if (!validateForm(form)) return;

    toggleLoading(true);

    const payload = {
      name: form.elements["name"].value.trim()
    };

    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) payload.useremail = userEmail;

    fetch("http://localhost:3000/api/user/addcategory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        toggleLoading(false);

        if (data.status === "success") {
          toastr.success(data.message || "Category added successfully");

          form.reset();
          clearValidation();

          setTimeout(() => {
            window.location.href = "ManageCategory.php";
          }, 1500);
        } else {
          toastr.error(data.message || "Failed to add category");
        }
      })
      .catch(() => {
        toggleLoading(false);
        toastr.error("Network error. Please try again.");
      });
  });

  /* =========================
     REAL-TIME VALIDATION
  ========================= */
  const nameField = form.elements["name"];
  if (nameField) {
    nameField.addEventListener("input", () => validateField(nameField));
    nameField.addEventListener("blur", () => validateField(nameField));
  }
});

/* =========================
   VALIDATION LOGIC
========================= */
function validateForm(form) {
  const nameField = form.elements["name"];
  const name = nameField.value.trim();

  if (!name) {
    markInvalid(nameField);
    toastr.error("Category name is required");
    return false;
  }

  if (name.length < 2) {
    markInvalid(nameField);
    toastr.error("Category name must be at least 2 characters");
    return false;
  }

  markValid(nameField);
  return true;
}

function validateField(field) {
  const value = field.value.trim();

  if (!value || value.length < 2) {
    markInvalid(field);
    return false;
  }

  markValid(field);
  return true;
}

/* =========================
   UI HELPERS
========================= */
function markInvalid(field) {
  field.classList.add("is-invalid");
  field.classList.remove("is-valid");
}

function markValid(field) {
  field.classList.remove("is-invalid");
  field.classList.add("is-valid");
}

function clearValidation() {
  document.querySelectorAll(".is-valid, .is-invalid").forEach(el => {
    el.classList.remove("is-valid", "is-invalid");
  });
}

/* =========================
   LOADING STATE
========================= */
function toggleLoading(isLoading) {
  const submitBtn = document.querySelector('button[type="submit"]');

  if (!submitBtn) return;

  if (isLoading) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Saving...`;
  } else {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `Save`;
  }
}
