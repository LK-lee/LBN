<?php include("Components/Header.php"); ?>

<style>
  /* Form validation styles */
    .input-error {
        border-color: #dc3545 !important;
        /*box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;*/
    }

    .input-error:focus {
        border-color: #dc3545 !important;
        /*box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;*/
    }

    .error-message {
        font-size: 80%;
        color: #dc3545;
        margin-top: 0.25rem;
        display: block;
        width: 100%;
    }

    /* Custom file input error styling */
    .custom-file-input.input-error ~ .custom-file-label {
        border-color: #dc3545;
    }

    .custom-file-input.input-error ~ .custom-file-label::after {
        background-color: #dc3545;
        color: white;
    }

    /* Loading spinner animation */
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .fa-spinner {
        animation: spin 1s linear infinite;
    }
</style>

<body>

<?php include("Components/Sidebar.php"); ?>

<div class="main-content" id="panel">

<?php include("Components/Navbar.php"); ?>

<div class="header bg-default pb-6">
  <div class="container-fluid">
    <div class="header-body">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white mb-0">Add Note</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
              <li class="breadcrumb-item">
                <a href="Home.php"><i class="fas fa-home"></i></a>
              </li>
              <li class="breadcrumb-item">
                <a href="Home.php">Home</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                <a href="ThanksGivingNote.php">Thanks Giving Note</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Add Note
              </li>
            </ol>
        </nav>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="container-fluid mt--6">
  <div class="row">
    <div class="col-xl-12">
      <div class="card">

        <div class="card-header">
          <h5>Add Thank You Note</h5>
        </div>

        <div class="card-body">

          <form action="#" method="POST" id="addNoteForm" novalidate>

            <input type="hidden" name="useremail" id="useremail">

            <div class="row">

              <!-- Meeting Dropdown -->
              <div class="col-md-6 mt-3">
                <label>Meeting <span class="text-danger">*</span></label>
                <select name="meeting_id" id="meeting_id" class="form-control" required>
                  <option value="">Select Meeting</option>
                  <option value="meeting1">Meeting-one</option>
                  <option value="meeting2">Meeting-two</option>
                </select>
              </div>

              <!-- Given By Dropdown -->
              <div class="col-md-6 mt-3">
                <label>Given By <span class="text-danger">*</span></label>
                <select name="given_by" id="given_by" class="form-control" required>
                  <option value="">Select Member</option>
                  <option value="member1">Lokesh</option>
                  <option value="member2">Lee</option>
                </select>
              </div>

              <!-- Given To Dropdown -->
              <div class="col-md-6 mt-3">
                <label>Given To <span class="text-danger">*</span></label>
                <select name="given_to" id="given_to" class="form-control" required>
                  <option value="">Select Member</option>
                  <option value="member1">Lokesh</option>
                  <option value="member2">Lee</option>
                </select>
              </div>

              <!-- Amount -->
              <div class="col-md-6 mt-3">
                <label>Amount <span class="text-danger">*</span></label>
                <input type="number" name="amount" id="amount" class="form-control" required>
              </div>

              <!-- Description -->
              <div class="col-md-12 mt-3">
                <label>Description <span class="text-danger">*</span></label>
                <input type="text" name="notes" id="notes" class="form-control" required>
              </div>

            </div>

            <div class="row mt-4">

              <div class="col-md-6">
                <a href="ThanksGivingNote.php" class="btn bg-danger btn-block text-white">
                  <i class="fas fa-arrow-left"></i>&ensp;Back
                </a>
              </div>

              <div class="col-md-6">
                <button type="submit" class="btn bg-success btn-block text-white">
                  <i class="fas fa-save"></i>&ensp;Save
                </button>
              </div>

            </div>

          </form>

        </div>
      </div>
    </div>
  </div>
</div>

</div>

<?php include("Components/FooterLinks.php"); ?>

<script src="assets/js/addnote.js"></script>

</body>
</html>