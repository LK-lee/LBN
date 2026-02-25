<!-- Header -->
<?php include("Components/Header.php"); ?>

<body>
    <!-- Sidebar -->
    <?php include("Components/Sidebar.php"); ?>

    <!-- Main Content -->
    <div class="main-content" id="panel">

        <!-- Top Navbar -->
        <?php include("Components/Navbar.php"); ?>

        <!-- Page Header -->
        <div class="header bg-default pb-6">
            <div class="container-fluid">
                <div class="header-body">
                    <div class="row align-items-center py-4">
                        <div class="col-lg-6 col-7">
                            <h6 class="h2 text-white mb-0">Manage Roles</h6>
                            <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                                    <li class="breadcrumb-item"><a href="Home.php"><i class="fas fa-home"></i></a></li>
                                    <li class="breadcrumb-item"><a href="Home.php">Home</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Manage Roles</li>
                                </ol>
                            </nav>
                        </div>
                        <div class="col-lg-6 col-5 text-right">
                            <a href="Add_Roles.php" class="btn bg-warning text-white">Add Roles</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Page Content -->
        <div class="container-fluid mt--6">

            <!-- Datatable Card -->
            <div class="row">
                <div class="col">
                    <div class="card">
                        
                        <!-- Roles Table -->
                        <div class="table-responsive mt-3">
                            <table class="table align-items-center table-flush" 
                                   id="roles-datatable" 
                                  >
                                <thead class="thead-light">
                                    <tr>
                                        <th style="width: 15%;">S.No</th>
                                        <th style="width: 25%;">Role Name</th>
                                        <th style="width: 45%;">Description</th>
                                        <th style="width: 15%;">Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="rolesTableBody"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Footer -->
            <!-- no footer -->

        </div>
    </div>

    <!-- Footer Scripts -->
    <?php include("Components/FooterLinks.php"); ?>
    <script src="assets/js/manageroles.js"></script>
</body>
</html>