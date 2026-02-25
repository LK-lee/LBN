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

<!-- =============================
          Page Header
============================= -->
<div class="header bg-default pb-6">
  <div class="container-fluid">
    <div class="header-body">

      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white mb-0">Home</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
              <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item"><a href="Home.php"><i class="fas fa-home"></i></a></li>
                  <li class="breadcrumb-item"><a href="Home.php">Home</a></li>
                  <!-- <li class="breadcrumb-item active" aria-current="page">Manage Roles</li> -->
              </ol>
          </nav>
        </div>
      </div>

      <!-- =============================
            Stats Cards
      ============================= -->
      <div class="row">

        <!-- TOTAL USERS -->
        <div class="col-xl-3 col-md-6">
          <div class="card card-stats">
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5 class="card-title text-uppercase text-muted mb-0">
                    Total Users
                  </h5>

                  <span class="h2 font-weight-bold" id="totalUsers">
                    Loading...
                  </span>
                </div>

                <div class="col-auto">
                  <div class="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                    <i class="ni ni-single-02"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TOTAL AMOUNT -->
        <div class="col-xl-3 col-md-6">
          <div class="card card-stats">
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5 class="card-title text-uppercase text-muted mb-0">
                    Total Amount
                  </h5>

                  <span class="h2 font-weight-bold" id="totalAmount">
                    Loading...
                  </span>
                </div>

                <div class="col-auto">
                  <div class="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                    <i class="ni ni-money-coins"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TOTAL MEETINGS -->
        <div class="col-xl-3 col-md-6">
          <div class="card card-stats">
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5 class="card-title text-uppercase text-muted mb-0">
                    Total Meetings
                  </h5>

                  <span class="h2 font-weight-bold" id="totalMeetings">
                    Loading...
                  </span>
                </div>

                <div class="col-auto">
                  <div class="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                    <i class="ni ni-calendar-grid-58"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        
            <!-- Performance -->
            <div class="col-xl-3 col-md-6">
              <div class="card card-stats">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">
                        Performance
                      </h5>
                      <span class="h2 font-weight-bold">49.65%</span>
                    </div>
                    
                    <div class="col-auto">
                      <div class="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                        <i class="ni ni-chart-bar-32"></i>
                      </div>
                    </div>
                </div>
              </div>
            </div>

      </div>

    </div>
  </div>
</div>

<!-- =============================
        Page Content
============================= -->

</div>

<?php include("Components/FooterLinks.php"); ?>

<!-- =============================
        API Fetch Script
============================= -->

<script>

document.addEventListener("DOMContentLoaded", function () {

  /* ---------------- TOTAL USERS ---------------- */
  fetch("http://localhost:3000/api/user/totalusers")
    .then(res => res.json())
    .then(data => {
      document.getElementById("totalUsers").innerText =
        data?.data || 0;
    })
    .catch(() => {
      document.getElementById("totalUsers").innerText = "Error";
    });



  /* ---------------- TOTAL AMOUNT ---------------- */
  fetch("http://localhost:3000/api/user/getthanksnoteamount")
    .then(res => res.json())
    .then(data => {
      document.getElementById("totalAmount").innerText =
        data?.data || 0;
    })
    .catch(() => {
      document.getElementById("totalAmount").innerText = "Error";
    });



  /* ---------------- TOTAL MEETINGS ---------------- */
  fetch("http://localhost:3000/api/user/countofmeetings")
    .then(res => res.json())
    .then(data => {
      document.getElementById("totalMeetings").innerText =
        data?.data || 0;
    })
    .catch(() => {
      document.getElementById("totalMeetings").innerText = "Error";
    });

});

</script>

</body>
</html>
