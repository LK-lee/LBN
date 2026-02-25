<!-- =============================
        Header Start
================================= -->
<?php include("Components/Header.php"); ?>
<!-- =============================
        Header End
================================= -->
<style>
    /* Table styling - NO SCROLL */
    #meetings-datatable {
      width: 100% !important;
      table-layout: fixed !important;
    }

    #meetings-datatable th,
    #meetings-datatable td {
      padding: 12px 6px !important;
      vertical-align: middle !important;
      white-space: normal !important;
      word-wrap: break-word !important;
    }

    #meetings-datatable thead th {
      font-size: 0.8rem !important;
      font-weight: 600 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.5px !important;
    }

    #meetings-datatable tbody td {
      font-size: 0.85rem !important;
    }

    /* Column width overrides */
    #meetings-datatable th:nth-child(1),
    #meetings-datatable td:nth-child(1) {
      width: 6% !important;
      text-align: center !important;
    }

    #meetings-datatable th:nth-child(2),
    #meetings-datatable td:nth-child(2) {
      width: 18% !important;
    }

    #meetings-datatable th:nth-child(3),
    #meetings-datatable td:nth-child(3) {
      width: 12% !important;
      text-align: center !important;
    }

    #meetings-datatable th:nth-child(4),
    #meetings-datatable td:nth-child(4) {
      width: 10% !important;
      text-align: center !important;
    }

    #meetings-datatable th:nth-child(5),
    #meetings-datatable td:nth-child(5) {
      width: 18% !important;
    }

    #meetings-datatable th:nth-child(6),
    #meetings-datatable td:nth-child(6) {
      width: 10% !important;
      text-align: center !important;
    }

    #meetings-datatable th:nth-child(7),
    #meetings-datatable td:nth-child(7) {
      width: 26% !important;
      text-align: center !important;
    }

    /* Remove table-responsive scrolling */
    .table-responsive {
      overflow-x: hidden !important;
      overflow-y: hidden !important;
    }

    /* Text truncation for long content */
    #meetings-datatable td:nth-child(2),
    #meetings-datatable td:nth-child(5) {
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
    }

    #meetings-datatable td:nth-child(2):hover,
    #meetings-datatable td:nth-child(5):hover {
      white-space: normal !important;
      overflow: visible !important;
      background-color: #f8f9fe !important;
      position: relative;
      z-index: 10;
    }

    /* Badge styling */
    .badge {
      padding: 5px 10px !important;
      font-size: 0.75rem !important;
      font-weight: 600 !important;
    }

    .badge-success {
      background-color: #2dce89 !important;
      color: white;
    }

    .badge-danger {
      background-color: #f5365c !important;
      color: white;
    }

    .badge-warning {
      background-color: #fb6340 !important;
      color: white !important;
    }

    .badge-dark {
      background-color: #212529 !important;
    }

    .badge-secondary {
      background-color: #858796 !important;
    }

    /* Button group styling */
    .btn-group {
      display: inline-flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .btn-group .btn {
      padding: 0.25rem 0.5rem !important;
      font-size: 0.75rem !important;
      margin: 2px !important;
    }

    .btn-group .btn i {
      font-size: 0.75rem !important;
    }

    /* DataTables controls - ORIGINAL POSITIONS */
    .dataTables_filter {
      float: right !important;
      margin-bottom: 15px !important;
    }

    .dataTables_filter label {
      font-size: 0.85rem !important;
      font-weight: normal !important;
      display: inline-flex !important;
      align-items: center !important;
    }

    .dataTables_filter input {
      border: 1px solid #e9ecef !important;
      border-radius: 4px !important;
      padding: 6px 12px !important;
      font-size: 0.85rem !important;
      width: 200px !important;
      margin-left: 8px !important;
    }

    .dataTables_length {
      float: left !important;
      margin-bottom: 15px !important;
      display: block !important;
    }

    .dataTables_length label {
      font-size: 0.85rem !important;
      font-weight: normal !important;
    }

    .dataTables_length select {
      border: 1px solid #e9ecef !important;
      border-radius: 4px !important;
      padding: 6px 24px 6px 12px !important;
      font-size: 0.85rem !important;
      margin: 0 8px !important;
    }

    .dataTables_info {
      float: left !important;
      font-size: 0.8rem !important;
      color: #6c757d !important;
      padding-top: 8px !important;
    }

    .dataTables_paginate {
      float: right !important;
      margin-top: 0 !important;
    }

    .pagination {
      margin: 0 !important;
    }

    .pagination .page-link {
      padding: 0.3rem 0.6rem !important;
      font-size: 0.8rem !important;
      border: 1px solid #e9ecef !important;
      color: #525f7f !important;
    }

    .pagination .page-link:hover {
      background-color: #f6f9fc !important;
    }

    .pagination .active .page-link {
      background-color: #5e72e4 !important;
      border-color: #5e72e4 !important;
      color: white !important;
    }

    /* Loading overlay */
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      display: none;
    }

    /* Alert animations */
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    /* Clear floats */
    .top:before,
    .top:after,
    .bottom:before,
    .bottom:after {
      content: "";
      display: table;
      clear: both;
    }
</style>

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
            Top Navbar
    ============================== -->
    <?php include("Components/Navbar.php"); ?>

    <!-- =============================
            Page Header
    ============================== -->
    <div class="header bg-default pb-6">
        <div class="container-fluid">
            <div class="header-body">
                <div class="row align-items-center py-4">

                    <div class="col-lg-6 col-7">
                        <h6 class="h2 text-white mb-0">Manage Categories</h6>

                        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                            <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                                <li class="breadcrumb-item">
                                    <a href="Home.php"><i class="fas fa-home"></i></a>
                                </li>
                                <li class="breadcrumb-item">
                                    <a href="Home.php">Home</a>
                                </li>
                                <li class="breadcrumb-item active">Manage Categories</li>
                            </ol>
                        </nav>
                    </div>

                    <div class="col-lg-6 col-5 text-right">
                        <a href="Add_category.php" class="btn bg-warning text-white">
                            Add Category
                        </a>
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
            <div class="col">
                <div class="card">

                  <div class="table-responsive mt-3">
                    <table class="table align-items-center table-flush"
                           id="categories-datatable">
                        <thead class="thead-light">
                            <tr>
                                <th>Sno</th>
                                <th>Category Name</th>
                                <th class="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                  </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- =============================
        Footer Scripts
============================== -->
<?php include("Components/FooterLinks.php"); ?>

<!-- Page JS -->
<script src="assets/js/managecategories.js"></script>
</body>
</html>