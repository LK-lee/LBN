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
          <div class="row align-items-center py-4">

            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white mb-0">Manage User</h6>

              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item">
                    <a href="#"><i class="fas fa-home"></i></a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="Home.php">Home</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Manage User
                  </li>
                </ol>
              </nav>
            </div>

            <div class="col-lg-6 col-5 text-right ">
              <a href="Add_User.php" class="btn bg-warning text-white">Add User</a>
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
            <!-- <div class="card-header d-none">
              <h3 class="mb-0">Datatable</h3>
              <p class="text-sm mb-0">
                This is an example of datatable using the well-known
                datatables.net plugin. This is a minimal setup to get
                started quickly.
              </p>
            </div> -->

            <!-- Table -->
            <div class="table-responsive py-4">
            <table class="table table-flush" id="user-datatable">
                <thead class="thead-light">
                <tr>
                    <th>S.No</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Profile Image</th>
                    <th>Company Logo</th>
                    <th>Mobile number</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody id="usersTableBody">
                <!-- Data will be populated by JavaScript -->
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
  
  <script src="assets/js/ManageUsers.js"></script>

  
 
</body>

</html>