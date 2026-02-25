<!-- =============================
            Header Start
================================= -->
<?php include("Components/Header.php"); ?>
<!-- =============================
            Header End
================================= -->

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
              <h6 class="h2 text-white mb-0">Change Password</h6>

              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item">
                    <a href="#"><i class="fas fa-home"></i></a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="Home.php">Home</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Change Password
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
        <div class="col-xl-3"></div>
        <div class="col-xl-6 col-md-6">
          <div class="card">
            <div class="card-header bg-transparent">
              <h5 class="h3 text-default mb-0">Change Password</h5>
            </div>
            <div class="card-body">
              <form id="changepasswordForm" method="POST" autocomplete="off" enctype="multipart/form-data">
                <div class="row">
                  <div class="col-md-12 mt-3">
                    <label>Current Password</label>
                    <input type="password" name="oldpassword" id="oldpassword" class="form-control"
                      placeholder="*******">
                  </div>

                  <div class="col-md-12 mt-3">
                    <label>New Password</label>
                    <input type="password" name="newpassword" id="newpassword" class="form-control"
                      placeholder="*******">
                  </div>
                  <div class="col-md-12 mt-3">
                    <label>Confirm Password</label>
                    <input type="password" name="confirmpassword" id="confirmpassword" class="form-control"
                      placeholder="*******">
                  </div>
                </div>
            </div>

            <!-- Buttons -->
            <div class="row p-2 mb-2">
              <div class="col-md-6">
                <a href="Home.php" class="btn bg-danger btn-block text-white">Back</a>
              </div>
              <div class="col-md-6">
                <button type="submit" class="btn bg-success btn-block text-white">Update Password</button>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-xl-3"></div>

    </div>

    <!-- =============================
                Footer
      ============================= -->
    <?php include("Components/Footer.php"); ?>

  </div>
  </div>

  <!-- =============================
            Footer Scripts
  ============================= -->
  <?php include("Components/FooterLinks.php"); ?>
<script src="assets/js/changepassword.js"></script>
</body>

</html>