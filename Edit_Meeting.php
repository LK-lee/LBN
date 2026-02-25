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
      box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
  }

  .input-error:focus {
      border-color: #dc3545 !important;
      box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
  }

  .error-message {
      font-size: 80%;
      color: #dc3545;
      margin-top: 0.25rem;
      display: block;
      width: 100%;
      font-weight: normal;
  }

  /* Loading spinner animation */
  @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
  }

  .fa-spinner {
      animation: spin 1s linear infinite;
  }

  /* Toastr custom positioning */
  .toast-top-right {
      top: 70px !important;
      right: 12px !important;
  }

  /* Form field required star */
  .text-danger {
      color: #dc3545 !important;
      font-weight: bold;
  }

  /* Button styles */
  .btn.bg-success {
      background-color: #28a745 !important;
      border-color: #28a745 !important;
  }

  .btn.bg-success:hover {
      background-color: #218838 !important;
      border-color: #1e7e34 !important;
  }

  .btn.bg-danger {
      background-color: #dc3545 !important;
      border-color: #dc3545 !important;
  }

  .btn.bg-danger:hover {
      background-color: #c82333 !important;
      border-color: #bd2130 !important;
  }

  /* Form spacing */
  .form-group, .col-md-6, .col-md-12 {
      margin-bottom: 1rem;
  }

  /* Required field indicator */
  label .text-danger {
      margin-left: 2px;
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
              <h6 class="h2 text-white mb-0">Edit Meetings</h6>

              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item">
                    <a href="#"><i class="fas fa-home"></i></a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="ManageMeetings.php">Manage Meetings</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Edit Meetings
                  </li>
                </ol>
              </nav>
            </div>

            <div class="col-lg-6 col-5 text-right d-none">
              <a href="#" class="btn btn-sm btn-neutral">New</a>
              <a href="#" class="btn btn-sm btn-neutral">Filters</a>
            </div>
          </div>

          <!-- =============================
                Stats Cards
          ============================= -->

        </div>
      </div>
    </div>

    <!-- =============================
            Page Content
    ============================= -->
    <div class="container-fluid mt--6">
      <div class="row">
        <!-- Sales Chart -->
        <div class="col-xl-12 col-md-12">
          <div class="card">
            <div class="card-header bg-transparent">
              <h5 class="h3 text-default mb-0">Meeting Details</h5>
            </div>
            <div class="card-body">
              <form id="meetingsForm" method="POST" autocomplete="off" enctype="multipart/form-data">
                <div class="row">
                  <div class="col-md-6 ">
                    <label>Meeting Type <span class="text-danger">*</span></label>
                    <select name="meeting_type" id="meeting_type" class="form-control">
                      <option value="">Select Type</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Special">Special</option>
                    </select>
                  </div>

                  <div class="col-md-6">
                    <label>Meeting Title <span class="text-danger">*</span></label>
                    <input type="text" name="meeting_title" id="meeting_title" class="form-control">
                  </div>

                  <div class="col-md-6">
                    <label>Meeting Date <span class="text-danger">*</span></label>
                    <input type="date" name="meeting_date" id="meeting_date" class="form-control"
                      >
                  </div>

                  <div class="col-md-6">
                    <label>Meeting Mode <span class="text-danger">*</span></label>
                    <select name="meeting_mode" id="meeting_mode" class="form-control">
                      <option value="">Select Mode</option>
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                    </select>
                  </div>


                  <div class="col-md-6 mt-3">
                    <label>Meeting Time <span class="text-danger">*</span></label>
                    <input type="time" name="meeting_time" id="meeting_time" class="form-control"
                      >
                  </div>                  

                  <div class="col-md-6 mt-3">
                    <label>Meeting Status <span class="text-danger">*</span></label>
                    <select name="status" id="status" class="form-control">
                      <option value="">Select Status</option>
                      <option value="Opened">Opened</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  <div class="col-md-12 mt-3 ">
                    <label>Location <span class="text-danger">*</span></label>
                    <textarea rows="2" class="form-control" id="meeting_place" name="meeting_place"></textarea>
                  </div>

                </div>
                <!-- Buttons -->
                <div class="row mt-4">
                  <div class="col-md-6">
                    <a href="ManageMeetings.php" class="btn bg-danger btn-block text-white"><i class="fas fa-arrow-left"></i>&ensp;Back</a>
                  </div>
                  <div class="col-md-6">
                    <button type="submit" class="btn bg-success btn-block text-white"><i class="fas fa-save"></i>&ensp;Update</button>
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
            Footer Scripts
  ============================= -->
  <?php include("Components/FooterLinks.php"); ?>
<script src="assets/js/editmeetings.js"></script>
</body>

</html>