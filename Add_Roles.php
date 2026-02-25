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
              <h6 class="h2 text-white mb-0">Add Roles</h6>

              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item">
                    <a href="Home.php"><i class="fas fa-home"></i></a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="ManageRoles.php">Manage Roles</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Add Roles
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
              <h5 class="h3 text-default mb-0">ADD Role</h5>
            </div>
            <div class="card-body">
              <form id="roleForm" method="POST" enctype="multipart/form-data">
                <div class="row">
                  <div class="col-md-12">
                    <label>Name<span class="text-danger">*</span></label>
                    <input type="text" name="name" id="name" class="form-control"
                      placeholder="Leader Name">
                  </div>

                  <div class="col-md-12 mt-3 ">
                    <label>Description</label>
                    <input type="text" name="description" id="description" class="form-control"
                      placeholder="Description">
                  </div>
                </div>
                <!-- Buttons -->
                <div class="row mt-4">
                  <div class="col-md-6">
                    <a href="ManageRoles.php" class="btn bg-danger btn-block text-white"><i class="fas fa-arrow-left"></i>&ensp;Back</a>
                  </div>
                  <div class="col-md-6">
                    <button type="submit" class="btn bg-success btn-block text-white"><i class="fas fa-save"></i>&ensp;Save</button>
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
<script src="assets/js/addrole.js"></script>
</body>

</html>