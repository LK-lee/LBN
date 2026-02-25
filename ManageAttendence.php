<!-- =============================
            Header Start
================================= -->
<?php include("Components/Header.php"); ?>
<!-- =============================
            Header End
================================= -->
<style>
    /* Table styling - NO SCROLL */
    #reports-datatable {
        width: 100% !important;
        table-layout: fixed !important;
    }
    
    #reports-datatable th,
    #reports-datatable td {
        padding: 12px 4px !important;
        vertical-align: middle !important;
        white-space: normal !important;
        word-wrap: break-word !important;
        text-align: center !important;
    }
    
    #reports-datatable thead th {
        font-size: 0.8rem !important;
        font-weight: 600 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.5px !important;
        text-align: center !important;
    }
    
    #reports-datatable tbody td {
        font-size: 0.85rem !important;
    }
    
    /* Equal width for all columns - 20% each */
    #reports-datatable th,
    #reports-datatable td {
        width: 20% !important;
    }
    
    /* Override any specific column widths */
    #reports-datatable th:nth-child(1),
    #reports-datatable td:nth-child(1),
    #reports-datatable th:nth-child(2),
    #reports-datatable td:nth-child(2),
    #reports-datatable th:nth-child(3),
    #reports-datatable td:nth-child(3),
    #reports-datatable th:nth-child(4),
    #reports-datatable td:nth-child(4),
    #reports-datatable th:nth-child(5),
    #reports-datatable td:nth-child(5) {
        width: 20% !important;
    }
    
    /* Remove table-responsive scrolling */
    .table-responsive {
        overflow-x: hidden !important;
        overflow-y: hidden !important;
    }
    
    /* Badge styling */
    .badge {
        padding: 4px 8px !important;
        font-size: 0.75rem !important;
        min-width: 35px;
    }
    
    .badge-success {
        background-color: #2dce89 !important;
        color: white;
    }
    
    .badge-danger {
        background-color: #f5365c !important;
        color: white;
    }
    
    /* Button group */
    .btn-group-sm .btn {
        padding: 0.25rem 0.5rem !important;
        font-size: 0.75rem !important;
    }
    
    .btn-group-sm .btn i {
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
    
    /* Text truncation for meeting title */
    #reports-datatable td:nth-child(2) div {
        display: inline-block;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    /* Center all content */
    .text-center {
        text-align: center !important;
    }
    
    .d-flex.justify-content-center {
        display: flex !important;
        justify-content: center !important;
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
                            <h6 class="h2 text-white mb-0">Manage Attendance Reports</h6>
                            <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                                    <li class="breadcrumb-item">
                                        <a href="Home.php"><i class="fas fa-home"></i></a>
                                    </li>
                                    <li class="breadcrumb-item">
                                        <a href="Home.php">Home</a>
                                    </li>
                                    <li class="breadcrumb-item active" aria-current="page">
                                        Manage Attendance Reports
                                    </li>
                                </ol>
                            </nav>
                        </div>
                        <div class="col-lg-6 col-5 text-right">
                            <a href="Add_Attendence.php" class="btn bg-warning text-white">
                                Add Attendance
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
            <div class="row">
                <div class="col">
                    <div class="card">
                        <!-- Card Header -->
                        <div class="card-header">
                            <h3 class="mb-0">Attendance Summary</h3>
                            <!-- <p class="text-sm mb-0">
                                Click on the eye icon to view detailed attendance for each meeting.
                            </p> -->
                        </div>

                        <!-- Table - No Scroll -->
                        <div class="table-responsive py-4">
                            <table class="table align-items-center table-flush" id="reports-datatable" style="width: 100%; table-layout: fixed;">
                                <thead class="thead-light">
                                    <tr>
                                        <th style="width: 20%;">S.No</th>
                                        <th style="width: 20%;">Meeting Title</th>
                                        <th style="width: 20%;">Meeting Date</th>
                                        <th style="width: 20%;">Attendance</th>
                                        <th style="width: 20%;">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- DataTables will populate this dynamically -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
        </div>
    </div>

    <!-- =============================
            Footer Scripts
    ============================= -->
    <?php include("Components/FooterLinks.php"); ?>

<script src="assets/js/manageattendence.js"></script>

</body>
</html>