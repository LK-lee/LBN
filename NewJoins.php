<!-- =============================
            Header Start
================================= -->
<?php include("Components/Header.php"); ?>
<!-- =============================
            Header End
================================= -->
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600&family=Syne:wght@600;700&display=swap');

  #responseModal .modal-content {
    border: none;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 24px 64px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06);
    font-family: 'DM Sans', sans-serif;
    background: #ffffff;
  }

  #responseModal .modal-header {
    background: #ffffff;
    border-bottom: 1px solid #f0f2f5;
    padding: 20px 26px 18px;
  }

  #responseModal .modal-title {
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: #111827;
    letter-spacing: 0.02em;
  }

  #responseModal .modal-header .close {
    color: #9ca3af;
    text-shadow: none;
    font-size: 1.3rem;
    opacity: 1;
    transition: color 0.2s, transform 0.2s;
    padding: 0;
    margin: 0;
    line-height: 1;
    background: #f3f4f6;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #responseModal .modal-header .close:hover {
    color: #374151;
    background: #e5e7eb;
    transform: rotate(90deg);
  }

  #responseModal .modal-body {
    padding: 22px 24px;
    background: #f9fafb;
  }

  #responseModal .modal-footer {
    background: #ffffff;
    border-top: 1px solid #f0f2f5;
    padding: 14px 24px 18px;
    justify-content: flex-end;
  }

  #responseModal .modal-footer .btn-secondary {
    background: #111827;
    border: none;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 0.875rem;
    padding: 10px 26px;
    border-radius: 10px;
    letter-spacing: 0.02em;
    transition: background 0.2s, transform 0.15s;
  }

  #responseModal .modal-footer .btn-secondary:hover {
    background: #1f2937;
    transform: translateY(-1px);
  }

  /* ── Referral Card ── */
  .referral-card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }

  .referral-card-header {
    padding: 14px 20px;
    background: linear-gradient(135deg, #f8faff 0%, #f1f4fd 100%);
    border-bottom: 1px solid #e8ecf6;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .referral-card-header .header-icon {
    width: 28px;
    height: 28px;
    background: #e8ecf6;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4f63c4;
    font-size: 0.85rem;
  }

  .referral-card-header span {
    font-family: 'Syne', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    color: #374151;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .referral-rows {
    padding: 8px 0;
  }

  .referral-row-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 20px;
    transition: background 0.15s;
    border-bottom: 1px solid #f3f4f6;
  }

  .referral-row-item:last-child {
    border-bottom: none;
  }

  .referral-row-item:hover {
    background: #fafbff;
  }

  .row-icon {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 0.85rem;
  }

  .row-icon.icon-ref    { background: #fef3c7; color: #d97706; }
  .row-icon.icon-name   { background: #dbeafe; color: #2563eb; }
  .row-icon.icon-mobile { background: #dcfce7; color: #16a34a; }
  .row-icon.icon-status { background: #ede9fe; color: #7c3aed; }

  .row-text {
    display: flex;
    flex-direction: column;
    gap: 1px;
    flex: 1;
  }

  .row-label {
    font-size: 0.7rem;
    font-weight: 600;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }

  .row-value {
    font-size: 0.9rem;
    font-weight: 500;
    color: #111827;
  }

  .badge-invited {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: #ede9fe;
    color: #6d28d9;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 20px;
    border: 1px solid #ddd6fe;
  }

  .badge-invited::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #7c3aed;
    display: inline-block;
  }

  /* Modal entrance animation */
  #responseModal .modal-content {
    animation: modalIn 0.32s cubic-bezier(0.34, 1.5, 0.64, 1) both;
  }

  @keyframes modalIn {
    from { opacity: 0; transform: translateY(18px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
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
                            <h6 class="h2 text-white mb-0">Manage Referrals</h6>

                            <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                                    <li class="breadcrumb-item">
                                        <a href="Home.php"><i class="fas fa-home"></i></a>
                                    </li>
                                    <li class="breadcrumb-item">
                                        <a href="Home.php">Home</a>
                                    </li>
                                    <li class="breadcrumb-item active" aria-current="page">
                                        Manage Referrals
                                    </li>
                                </ol>
                            </nav>
                        </div>

                        <div class="col-lg-6 col-5 text-right">
                            <button id="refreshBtn" class="btn bg-info text-white mr-2">
                                <i class="fas fa-sync-alt"></i> Refresh
                            </button>
                            <a href="Add_Joins.php" class="btn bg-warning text-white">Add Referral</a>
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
                        <div class="card-header">
                            <h3 class="mb-0">Referrals List</h3>
                            <!-- <p class="text-sm mb-0">
                                Showing all referrals fetched from the system.
                            </p> -->
                        </div>

                        <!-- Loading Spinner -->
                        <div id="loadingSpinner" class="text-center py-5">
                            <div class="spinner-border text-primary" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <p class="mt-2">Loading referrals...</p>
                        </div>

                        <!-- Error Message -->
                        <div id="errorMessage" class="alert alert-danger m-3 d-none" role="alert">
                            <i class="fas fa-exclamation-triangle"></i> <span id="errorText"></span>
                        </div>

                        <!-- No Data Message -->
                        <div id="noDataMessage" class="alert alert-info m-3 d-none" role="alert">
                            <i class="fas fa-info-circle"></i> No referrals found in the system.
                        </div>

                        <!-- Table -->
                        <div class="table-responsive py-4 d-none" id="tableContainer">
                            <table class="table table-flush" id="datatable-basic">
                                <thead class="thead-light">
                                    <tr>
                                        <th>S.No</th>
                                        <th>Referred By</th>
                                        <th>Name</th>
                                        <th>Mobile Number</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody id="referralsTableBody">
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

    <!-- Delete Confirmation Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="deleteModalLabel">Confirm Delete</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete this referral?</p>
                    <p class="text-danger"><strong>This action cannot be undone.</strong></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Delete</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Response Modal -->


<div class="modal fade" id="responseModal" tabindex="-1" role="dialog" aria-labelledby="responseModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">

      <div class="modal-header">
        <h5 class="modal-title" id="responseModalLabel">Operation Status</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body" id="responseMessage">
        <div class="referral-card">

          <div class="referral-card-header">
            <div class="header-icon">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <span>Referral Details</span>
          </div>

          <div class="referral-rows">

            <div class="referral-row-item">
              <div class="row-icon icon-ref">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.828 14.828a4 4 0 015.656 0l-4 4a4 4 0 01-5.656-5.656l1.1-1.1"/>
                </svg>
              </div>
              <div class="row-text">
                <span class="row-label">Referred By</span>
                <span class="row-value">N/A</span>
              </div>
            </div>

            <div class="referral-row-item">
              <div class="row-icon icon-name">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <div class="row-text">
                <span class="row-label">Name</span>
                <span class="row-value">lokesh</span>
              </div>
            </div>

            <div class="referral-row-item">
              <div class="row-icon icon-mobile">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div class="row-text">
                <span class="row-label">Mobile</span>
                <span class="row-value">9678234567</span>
              </div>
            </div>

            <div class="referral-row-item">
              <div class="row-icon icon-status">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="row-text">
                <span class="row-label">Status</span>
                <span class="row-value"><span class="badge-invited">Invited</span></span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
</div>
<script src="assets/js/newjoins.js"></script>

</body>

</html>