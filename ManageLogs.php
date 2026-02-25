<!-- =============================
            Header Start
================================= -->
<?php include("Components/Header.php"); ?>
<!-- =============================
            Header End
================================= -->

<body>

<?php include("Components/Sidebar.php"); ?>

<div class="main-content" id="panel">

<?php include("Components/Navbar.php"); ?>

<div class="header bg-default pb-6">
  <div class="container-fluid">
    <div class="header-body">
      <div class="row align-items-center py-4">

        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white mb-0">Manage Logs</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
              <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                <li class="breadcrumb-item">
                  <a href="Home.php"><i class="fas fa-home"></i></a>
                </li>
                <li class="breadcrumb-item">
                  <a href="Home.php">Home</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Manage Logs
                </li>
              </ol>
          </nav>
        </div>

        <!-- ⭐ FILTER CONTROLS -->
        <div class="col-lg-6 col-5 text-right">

          <div class="d-flex justify-content-end flex-wrap">

            <input type="date" id="fromDate"
              class="form-control mr-2 mb-2"
              style="max-width:160px;">

            <input type="date" id="toDate"
              class="form-control mr-2 mb-2"
              style="max-width:160px;">
<button id="filterBtn"
  class="btn btn-success mr-2 mb-2">
  <i class="fas fa-filter"></i> Filter
</button>

<button id="deleteBtn"
  class="btn btn-danger mr-2 mb-2">
  <i class="fas fa-trash"></i> Delete
</button>

            <button id="refreshBtn"
              class="btn bg-info text-white mb-2">
              <i class="fas fa-sync-alt"></i> Refresh
            </button>

          </div>

        </div>

      </div>
    </div>
  </div>
</div>


<!-- =============================
        Page Content
================================= -->
<div class="container-fluid mt--6">

<div class="row">
<div class="col">
<div class="card">

<div class="card-header">
  <h3 class="mb-0">Manage Logs</h3>
</div>

<div id="loadingSpinner" class="text-center py-5">
  <div class="spinner-border text-primary"></div>
</div>

<div id="errorMessage"
  class="alert alert-danger m-3 d-none">
  <span id="errorText"></span>
</div>

<div class="table-responsive py-4 d-none"
  id="tableContainer">

<table class="table table-flush"
  id="datatable-basic">

<thead class="thead-light">
<tr>
  <th>Sno</th>
  <th>User Type</th>
  <th>User ID</th>
  <th>Member ID</th>
  <th>Action</th>
  <th>Description</th>
  <th>Reference Table</th>
  <th>Reference ID</th>
  <th>IP Address</th>
  <th>Date & Time</th>
</tr>
</thead>

<tbody id="logsTableBody"></tbody>

</table>
</div>

<div id="noDataMessage"
  class="alert alert-info m-3 d-none">
  No logs found.
</div>

</div>
</div>
</div>


</div>
</div>

<?php include("Components/FooterLinks.php"); ?>

<script src="assets/js/managelogs.js"></script>

</body>
</html>
