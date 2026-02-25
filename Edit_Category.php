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
              <h6 class="h2 text-white mb-0">View Category</h6>

              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item">
                    <a href="#"><i class="fas fa-home"></i></a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="Home.php">Home</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    View Category
                  </li>
                </ol>
              </nav>
            </div>

            <div class="col-lg-6 col-5 text-right d-none">
              <a href="ManageUser.php" class="btn bg-white text-default">
                <i class="fas fa-list"></i> View Category
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
                  <h3 class="mb-0">Trade Category Form</h3>
                </div>
              </div>
            </div>
            <div class="card-body">
              <form id="categoryForm" method="POST" enctype="multipart/form-data">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="name">Name <span class="text-danger">*</span></label>
                      <input type="text" id="name" name="name" class="form-control editable">
                    </div>
                  </div>
                </div>

                <hr class="my-4">

                <!-- Form Actions -->
                <div class="d-flex justify-content-between align-items-center mt-4">
                    <a href="ManageCategory.php"
                       class="btn bg-danger text-white col-md-6">
                       <i class="fas fa-arrow-left"></i>&ensp;Back
                    </a>

                    <button type="submit"
                            class="btn bg-success text-white col-md-6">
                        <i class="fas fa-save"></i>&ensp;Save
                    </button>
                </div>
                <!-- <div class="row" id="formActions">
                    Back button
                    <div class="col-lg-6 col-md-6 text-left" id="backLeft">
                        <a href="ManageCategory.php" class="btn btn-danger mb-5">
                        <i class="fas fa-arrow-left"></i> Back
                        </a>
                    </div>

                    Back button (right only for view)
                    <div class="col-lg-6 text-right" id="backRight">
                        <a href="ManageCategory.php" class="btn btn-danger mb-5">
                        <i class="fas fa-arrow-left"></i> Back
                        </a>
                    </div>

                    Update button
                    <div class="col-lg-6 col-md-6 text-right" id="updateRight">
                        <button type="submit" id="saveBtn" class="btn btn-success mb-5">
                        <i class="fas fa-save"></i> Update Category
                        </button>
                    </div>
                </div> -->

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

  <!-- Custom Script for Edit Role -->
  <!-- <script src="assets/js/editcategory.js"></script>   -->
  <script src="assets/js/addcategory.js"></script>
</body>

</html>