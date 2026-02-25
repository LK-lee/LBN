<?php include("Components/Header.php"); ?>
<style>
    /* Form validation styles */
    .input-error {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
    }

    .input-error:focus {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
    }

    .error-message {
        font-size: 80%;
        color: #dc3545;
        margin-top: 0.25rem;
        display: block;
        font-weight: normal;
    }

    /* Loading spinner */
    .fa-spinner {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    /* Toastr customization */
    .toast-top-right {
        top: 70px !important;
        right: 12px !important;
    }

    /* Form group spacing */
    .form-group {
        margin-bottom: 1.5rem;
    }

    /* Required field indicator */
    label .text-danger {
        margin-left: 2px;
    }
</style>

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
                    <h6 class="h2 text-white mb-0">Add Referrals</h6>

                    <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                        <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                            <li class="breadcrumb-item">
                                <a href="Home.php"><i class="fas fa-home"></i></a>
                            </li>
                            <li class="breadcrumb-item">
                                <a href="Home.php">Home</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                <a href="NewJoins.php">Manage Referrals</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                Add Referrals
                            </li>
                        </ol>
                    </nav>
                </div>

                <div class="col-lg-6 col-5 text-right d-none">
                    <button id="refreshBtn" class="btn bg-info text-white mr-2">
                        <i class="fas fa-sync-alt"></i> Refresh
                    </button>
                    <a href="Add_Joins.php" class="btn bg-warning text-white">Add Referral</a>
                </div>

            </div>
        </div>
    </div>
</div>

<div class="container-fluid mt--6">

<div class="card">
<div class="card-header">
<h3 id="pageTitle">Add Referral</h3>
</div>

<div class="card-body">

<form action="#" method="POST" id="referralForm" novalidate>

<!-- Referred By -->
<div class="form-group">
<label>Referred By <span class="text-danger">*</span></label>
<select id="referred_by" class="form-control" required>
    <option value="">Select Member</option>
    <option value="member1">Deepak</option>
    <option value="member2">Lokesh</option>
    <option value="member1">Lee</option>
</select>
</div>

<!-- Name -->
<div class="form-group">
<label>Name <span class="text-danger">*</span></label>
<input type="text" id="name" class="form-control" placeholder="Enter Name" required>
</div>

<!-- Mobile -->
<div class="form-group">
<label>Mobile <span class="text-danger">*</span></label>
<input type="text" id="mobile" class="form-control" placeholder="Enter Mobile Number" required>
</div>

<!-- Meeting ID - Display Name, Store ID -->
<div class="form-group">
<label>Meeting <span class="text-danger">*</span></label>
<select id="meeting_id" class="form-control" required>
<option value="">Select Meeting</option>
<option value="meet1">Online</option>
<option value="meet2">Offline</option>
</select>
</div>

<!-- Status -->
<div class="form-group">
<label>Status <span class="text-danger">*</span></label>
<select id="status" class="form-control" required>
<option value="">Select Status</option>
<option value="invited">Invited</option>
<option value="joined">Joined</option>
<option value="not_interested">Not Interested</option>
</select>
</div>

<div class="d-flex justify-content-between align-items-center">
<button type="button" class="btn btn-danger col-md-6" onclick="window.location.href='NewJoins.php'">
<i class="fas fa-arrow-left"></i>&ensp;Back
</button>
<button type="submit" class="btn btn-success col-md-6" id="submitBtn">
<i class="fas fa-save"></i>&ensp;Add Referral
</button>
</div>

</form>

</div>
</div>

</div>

</div>

<?php include("Components/FooterLinks.php"); ?>

<!-- Custom Script for Referrals Form -->
<script src="assets/js/addreferrals.js"></script>

</body>
</html>