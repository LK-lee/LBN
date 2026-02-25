<!-- =============================
            Header Start
================================= -->
<?php include("Components/Header.php"); ?>
<!-- =============================
            Header End
================================= -->
<style>
    .input-error {
        border: 1px solid #dc3545 !important;
    }

    .error-message {
        font-size: 13px;
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
              <h6 class="h2 text-white mb-0">Manage Footer</h6>

              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item">
                    <a href="Home.php"><i class="fas fa-home"></i></a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="Home.php">Home</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Manage Footer
                  </li>
                </ol>
              </nav>
            </div>

            <div class="col-lg-6 col-5 text-right ">
              <a href="Add_Footer.php" class="btn bg-warning text-white">Add Footer</a>
              <button id="refreshBtn" class="btn btn-info ml-2">
                <i class="fas fa-sync-alt"></i> Refresh
              </button>
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
                Datatable Card
      ============================= -->
      <div class="row">
        <div class="col">
          <div class="card">

            <!-- Card Header -->
            <div class="card-header">
              <h3 class="mb-0">Manage Footer</h3>
<!--               <p class="text-sm mb-0" id="statusMessage">
                Status messages will appear here
              </p> -->
            </div>

            <!-- Table -->
            <div class="table-responsive py-4">
              <table class="table table-flush" id="footerTable">
                <thead class="thead-light">
                  <tr>
                    <th>S.No</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Number</th>
                    <th>Map</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody id="footerTableBody">
                  <!-- Data will be loaded here dynamically -->
                  <tr>
                    <td colspan="6" class="text-center">
                      <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                      <p class="mt-2">Loading footer data...</p>
                    </td>
                  </tr>
                </tbody>
              </table>
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

  <!-- Modal for Viewing Map -->
  <div class="modal fade" id="mapModal" tabindex="-1" role="dialog" aria-labelledby="mapModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="mapModalLabel">View Map</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div id="mapIframeContainer" style="width: 100%; height: 400px;">
            <!-- Map iframe will be loaded here -->
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <!-- JavaScript for Loading Data -->
  <!-- JavaScript for Loading Data -->
<script src="assets/js/managefooter.js"></script>

</body>

</html>