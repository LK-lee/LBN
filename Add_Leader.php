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

          <!-- Breadcrumb -->
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white mb-0">Add New Leader</h6>

              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item">
                    <a href="#"><i class="fas fa-home"></i></a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="ManageLeadership.php">Manage Leaders</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Add Leader
                  </li>
                </ol>
              </nav>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- =============================
            Page Content
    ============================= -->
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-xl-12 col-md-12">
          <div class="card">
            <div class="card-header bg-transparent">
              <h5 class="h3 text-default mb-0">Leader Details</h5>
            </div>
            <div class="card-body">
              <form id="leaderForm" method="POST">

                <!-- Member Selection -->
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Select Member <span class="text-danger">*</span></label>
                  <div class="col-sm-9">
                    <select class="form-control" id="memberSelect" name="member_id">
                      <option value="">Choose a member...</option>
                      <option value="1">John Smith (john.smith@email.com)</option>
                      <option value="2">Sarah Johnson (sarah.j@email.com)</option>
                      <option value="3">Michael Brown (michael.b@email.com)</option>
                      <option value="4">Emily Davis (emily.d@email.com)</option>
                      <option value="5">David Wilson (david.w@email.com)</option>
                    </select>
                  </div>
                </div>

                <!-- Designation Dropdown -->
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Designation <span class="text-danger">*</span></label>
                  <div class="col-sm-9">
                    <select class="form-control" id="designationSelect" name="designation_id">
                      <option value="">Choose a designation...</option>
                      <option value="1">President</option>
                      <option value="2">Vice President</option>
                      <option value="3">Secretary</option>
                      <option value="4">Treasurer</option>
                      <option value="5">Coordinator</option>
                    </select>
                    <small class="text-muted">Note: Coordinator designation can be assigned to multiple leaders</small>
                  </div>
                </div>

                <!-- Status Selection -->
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Status <span class="text-danger">*</span></label>
                  <div class="col-sm-9">
                    <select class="form-control" id="statusSelect" name="status">
                      <option value="">Select status...</option>
                      <option value="active" selected>Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <!-- Buttons -->
                <div class="row mt-4">
                  <div class="col-md-6">
                    <a href="ManageLeadership.php" class="btn bg-danger btn-block text-white">
                      <i class="fas fa-arrow-left"></i>&ensp;Back
                    </a>
                  </div>
                  <div class="col-md-6">
                    <button type="submit" class="btn bg-success btn-block text-white" id="submitBtn">
                      <i class="fas fa-save"></i>&ensp;Save Leader
                    </button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- =============================
            Footer Scripts
  ============================= -->
  <?php include("Components/FooterLinks.php"); ?>
  <script src="assets/js/addleader.js"></script>
</body>

</html>