<!-- =============================
            Header Start
================================= -->
<?php include("Components/Header.php"); ?>
<!-- =============================
            Header End
================================= -->
<style>
  /* Form validation styles */
  .input-error {
      border-color: #dc3545 !important;
      /*box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;*/
  }

  .input-error:focus {
      border-color: #dc3545 !important;
      /*box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;*/
  }

  .error-message {
      font-size: 80%;
      color: #dc3545;
      margin-top: 0.25rem;
      display: block;
      width: 100%;
  }

  /* Custom file input error styling */
  .custom-file-input.input-error ~ .custom-file-label {
      border-color: #dc3545;
  }

  .custom-file-input.input-error ~ .custom-file-label::after {
      background-color: #dc3545;
      color: white;
  }

  /* Loading spinner animation */
  @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
  }

  .fa-spinner {
      animation: spin 1s linear infinite;
  }
</style>
<body>
  <!-- =============================
            Sidebar Start
  ============================= -->
  <?php include("Components/Sidebar.php"); ?>
  <!-- =============================
            Sidebar End
  ============================= -->

  <!-- =============================
            Main Content Start
  ============================= -->
  <div class="main-content" id="panel">

    <!-- =============================
              Top Navbar Start
    ============================= -->
    <?php include("Components/Navbar.php"); ?>
    <!-- =============================
              Top Navbar End


    ============================= -->

    <!-- =============================
              Page Header
    ============================= -->
    <div class="header bg-default pb-6">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">

            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white mb-0">Edit User</h6>

              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item">
                    <a href="#"><i class="fas fa-home"></i></a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="Home.php">Home</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Edit User
                  </li>
                </ol>
              </nav>
            </div>

            <div class="col-lg-6 col-5 text-right">
              <a href="ManageUser.php" class="btn bg-white text-default">
                <i class="fas fa-list"></i> View Users
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- =============================
              Page Content
    ============================= -->
    <div class="container-fluid mt--6">

      <!-- =============================
                Forms
      ============================= -->
      <div class="row">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-header border-0">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">User Registration Form</h3>
                </div>
              </div>
            </div>
            <div class="card-body">
              <form id="userForm" method="POST" enctype="multipart/form-data" novalidate>

                <!-- Personal Information Section -->
                <h6 class="heading-small text-muted mb-4">Personal Information</h6>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="name">Full Name <span class="text-danger">*</span></label>
                      <input type="text" id="name" name="name" class="form-control" placeholder="Enter full name"
                        required minlength="3" maxlength="100">
                      <small class="form-text text-muted">Minimum 3 characters</small>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="dob">Date of Birth <span class="text-danger">*</span></label>
                      <input type="date" id="dob" name="dob" class="form-control" required>
                      <small class="form-text text-muted">You must be at least 18 years old</small>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="email">Email Address <span
                          class="text-danger">*</span></label>
                      <input type="email" id="email" name="email" class="form-control" placeholder="example@domain.com"
                        required maxlength="255">
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="mobile">Mobile Number <span
                          class="text-danger">*</span></label>
                      <input type="tel" id="mobile" name="mobile" class="form-control" placeholder="+91 98765 43210"
                        required maxlength="15">
                      <small class="form-text text-muted">Indian mobile number (10 digits)</small>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label class="form-control-label" for="address">Address <span class="text-danger">*</span></label>
                      <textarea id="address" name="address" class="form-control" rows="3"
                        placeholder="Enter complete address" required minlength="10" maxlength="500"></textarea>
                      <small class="form-text text-muted">Minimum 10 characters</small>
                    </div>
                  </div>
                </div>

                <hr class="my-4">

                <!-- Account Information Section -->
                <h6 class="heading-small text-muted mb-4">Account Information</h6>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="password">Password <span
                          class="text-danger">*</span></label>
                      <input type="password" id="password" name="password" class="form-control"
                        placeholder="Enter password" required minlength="8">
                      <small class="form-text text-muted">At least 8 characters with uppercase, lowercase, number & special character</small>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="role">Role <span class="text-danger">*</span></label>
                      <select id="role" name="role" class="form-control" required>
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="member">Member</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="status">Status <span class="text-danger">*</span></label>
                      <select id="status" name="status" class="form-control" required>
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="join_date">Join Date</label>
                      <input type="date" id="join_date" name="join_date" class="form-control"
                        value="<?php echo date('Y-m-d'); ?>">
                    </div>
                  </div>
                </div>

                <hr class="my-4">

                <!-- Professional Information Section -->
                <h6 class="heading-small text-muted mb-4">Professional Information</h6>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="company_name">Company Name <span class="text-danger">*</span></label>
                      <input type="text" id="company_name" name="company_name" class="form-control"
                        placeholder="Enter company name" required minlength="2" maxlength="255">
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="trade_category">Trade Category <span class="text-danger">*</span></label>
                      <select id="trade_category" name="trade_category" class="form-control" required>
                        <option value="">--- Select Trade Category ---</option>
                        <!-- Categories will be loaded dynamically from API -->
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <!-- Refer Type -->
                  <div class="col-lg-6" id="referTypeCol">
                    <div class="form-group">
                      <label class="form-control-label" for="refer_type">Refer Type <span class="text-danger">*</span></label>
                      <select name="refer_type" id="refer_type" class="form-control" required>
                        <option value="">--- Select Refer Type ---</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>

                  <!-- Referred By -->
                  <div class="col-lg-3 d-none" id="referredByCol">
                    <div class="form-group">
                      <label class="form-control-label" for="referred_by">Referred By <span class="text-danger">*</span></label>
                      <select name="referred_by" id="referred_by" class="form-control">
                        <option value="">--- Select Member ---</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <!-- Social Media -->
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label class="form-control-label" for="instagram_link">Instagram Link</label>
                      <input type="url" name="instagram_link" class="form-control" id="instagram_link" 
                        placeholder="https://instagram.com/username" pattern="https?://.*">
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label class="form-control-label" for="linkedin_link">LinkedIn Link</label>
                      <input type="url" name="linkedin_link" class="form-control" id="linkedin_link"
                        placeholder="https://linkedin.com/in/username" pattern="https?://.*">
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label class="form-control-label" for="whatsapp_link">WhatsApp Link</label>
                      <input type="url" name="whatsapp_link" class="form-control" id="whatsapp_link"
                        placeholder="https://wa.me/1234567890" pattern="https?://.*">
                    </div>
                  </div>
                </div>

                <hr class="my-4">

                <!-- Upload Section -->
                <h6 class="heading-small text-muted mb-4">Upload Images</h6>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="profile_image">Profile Image <span class="text-danger">*</span></label>
                      <div class="custom-file">
                        <input type="file" class="custom-file-input" id="profile_image" name="profile_image"
                          accept=".jpg,.jpeg,.png,.gif" onchange="previewImage(event, 'profile_preview')" required>
                        <label class="custom-file-label" for="profile_image">Choose file</label>
                      </div>
                      <small class="form-text text-muted">Allowed: JPG, PNG, GIF (Max 2MB)</small>
                      <div class="mt-3">
                        <img id="profile_preview" src="#" alt="Profile Preview"
                          style="max-width: 150px; max-height: 150px; display: none;" class="img-thumbnail">
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="company_logo">Company Logo <span class="text-danger">*</span></label>
                      <div class="custom-file">
                        <input type="file" class="custom-file-input" id="company_logo" name="company_logo"
                          accept=".jpg,.jpeg,.png,.gif" onchange="previewImage(event, 'logo_preview')" required>
                        <label class="custom-file-label" for="company_logo">Choose file</label>
                      </div>
                      <small class="form-text text-muted">Allowed: JPG, PNG, GIF (Max 2MB)</small>
                      <div class="mt-3">
                        <img id="logo_preview" src="#" alt="Logo Preview" 
                          style="max-width: 150px; max-height: 150px; display: none;" class="img-thumbnail">
                      </div>
                    </div>
                  </div>
                </div>

                <hr class="my-4">

                <!-- Form Actions -->
                <div class="row">
                  <div class="d-flex justify-content-between col-lg-12">
                    <button type="button" class="btn btn-danger col-md-6" onclick="window.location.href='ManageUser.php'">
                      <i class="fas fa-arrow-left"></i>&ensp;Back
                    </button>
                    <button type="submit" class="btn btn-success col-md-6" id="submitBtn">
                      <i class="fas fa-save"></i>&ensp;Update User
                    </button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- =============================
                Footer
      ============================= -->

    </div>
  </div>

  <!-- =============================
            Scripts
  ============================= -->
  <?php include("Components/FooterLinks.php"); ?>

  

  <!-- Custom Script for User Form -->
  <script src="assets/js/edituser.js"></script>

 

</body>

</html>