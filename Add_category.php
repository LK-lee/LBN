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
============================== -->
<?php include("Components/Sidebar.php"); ?>
<!-- =============================
        Sidebar End
============================== -->

<!-- =============================
        Main Content Start
============================== -->
<div class="main-content" id="panel">

    <!-- =============================
            Top Navbar Start
    ============================== -->
    <?php include("Components/Navbar.php"); ?>
    <!-- =============================
            Top Navbar End
    ============================== -->

    <!-- =============================
            Page Header
    ============================== -->
    <div class="header bg-default pb-6">
        <div class="container-fluid">
            <div class="header-body">

                <!-- Breadcrumb -->
                <div class="row align-items-center py-4">
                    <div class="col-lg-6 col-7">
                        <h6 class="h2 text-white mb-0">Add Category</h6>

                        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                            <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                                <li class="breadcrumb-item">
                                    <a href="Home.php"><i class="fas fa-home"></i></a>
                                </li>
                                <li class="breadcrumb-item">
                                    <a href="ManageCategory.php">Manage Category</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">
                                    Add Category
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
    ============================== -->
    <div class="container-fluid mt--6">
        <div class="row">
            <div class="col-xl-12 col-md-12">
                <div class="card">

                    <div class="card-header bg-transparent">
                        <h5 class="h3 text-default mb-0">Add Category</h5>
                    </div>

                    <div class="card-body">
                        <form id="categoryForm" method="POST" novalidate>

                            <div class="row">
                                <div class="col-md-6">
                                    <label for="name" class="form-label">Category Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        class="form-control"
                                        placeholder="Enter category name"
                                        autocomplete="off"
                                    >
                                </div>
                            </div>

                            <!-- ACTION BUTTONS -->
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

                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>

</div>
<!-- =============================
        Main Content End
============================== -->

<!-- =============================
        Footer Scripts
============================== -->
<?php include("Components/FooterLinks.php"); ?>

<!-- Page JS -->
<script src="assets/js/addcategory.js"></script>

</body>
</html>
