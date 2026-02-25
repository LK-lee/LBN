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
              <h6 class="h2 text-white mb-0">Add Footer</h6>

              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item">
                    <a href="Home.php"><i class="fas fa-home"></i></a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="managefooter.php">Manage Footer</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Add Footer
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
        <!-- Footer Form -->
        <div class="col-xl-12 col-md-12">
          <div class="card">
            <div class="card-header bg-transparent">
              <h5 class="h3 text-default mb-0">ADD Footer Information</h5>
            </div>
            <div class="card-body">
              <form action="#" method="POST" autocomplete="off" id="footerForm" novalidate>
                <div class="row">
                  <div class="col-md-12">
                    <label>Address <span class="text-danger">*</span></label>
                    <textarea name="address" id="address" class="form-control" placeholder="Enter full address" rows="3" required></textarea>
                  </div>

                  <div class="col-md-6 mt-3">
                    <label>Email <span class="text-danger">*</span></label>
                    <input type="email" name="email" id="email" class="form-control" placeholder="Enter email address" required>
                  </div>

                  <div class="col-md-6 mt-3">
                    <label>Phone Number <span class="text-danger">*</span></label>
                    <input type="text" name="number" id="number" class="form-control" placeholder="Enter phone number with country code" required>
                  </div>

                  <div class="col-md-12 mt-3">
                    <label>Google Maps Embed URL <span class="text-danger">*</span></label>
                    <textarea name="map" id="map" class="form-control" placeholder="Enter Google Maps embed URL" rows="3" required></textarea>
                    <small class="form-text text-muted">Paste the embed URL from Google Maps</small>
                  </div>
                </div>
                <!-- Buttons -->
                <div class="row mt-4">
                  <div class="col-md-6">
                    <a href="managefooter.php" class="btn bg-danger btn-block text-white"><i class="fas fa-arrow-left"></i>&ensp;Back</a>
                  </div>
                  <div class="col-md-6">
                    <button type="submit" class="btn bg-success btn-block text-white" id="submitBtn">
                      <span id="submitText"><i class="fas fa-save"></i>&ensp;Save Footer</span>
                      <span id="loadingSpinner" class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
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
            Footer Scripts
  ============================= -->
  <?php include("Components/FooterLinks.php"); ?>
  
  <!-- Success/Error Modal -->
  <div class="modal fade" id="responseModal" tabindex="-1" role="dialog" aria-labelledby="responseModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="responseModalLabel">Response</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="responseMessage">
          <!-- Response message will appear here -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
<script src="assets/js/addfooter.js"></script>

</body>

</html>