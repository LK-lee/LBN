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
              <h6 class="h2 text-white mb-0">Manage bussiness</h6>

              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item">
                    <a href="Home.php"><i class="fas fa-home"></i></a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="Home.php">Home</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Manage Bussiness Dealings
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
              <h3 class="mb-0">Manage Business</h3>
              <!-- <p class="text-sm mb-0">
                This is an example of datatable using the well-known
                datatables.net plugin. This is a minimal setup to get
                started quickly.
              </p> -->
            </div>

            <!-- Table - No Scroll with Equal Widths -->
            <div class="table-responsive py-4" style="overflow-x: hidden; overflow-y: hidden;">
              <table class="table align-items-center table-flush" id="bussiness-datatable" style="width: 100%; table-layout: fixed;">
                <thead class="thead-light">
                  <tr>
                    <th style="width: 15%;">S.No</th>
                    <th style="width: 25%;">Meeting Name</th>
                    <th style="width: 25%;">Given By</th>
                    <th style="width: 25%;">Given To</th>
                    <th style="width: 25%;">Amount</th>
                    <th style="width: 25%;">Status</th>
                  </tr>
                </thead>

                <tbody id="bussinessTableBody">
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
  
  <style>
    /* Table styling - NO SCROLL with EQUAL WIDTHS */
    #bussiness-datatable {
      width: 100% !important;
      table-layout: fixed !important;
    }
    
    #bussiness-datatable th,
    #bussiness-datatable td {
      padding: 12px 8px !important;
      vertical-align: middle !important;
      white-space: normal !important;
      word-wrap: break-word !important;
    }
    
    #bussiness-datatable thead th {
      font-size: 0.8rem !important;
      font-weight: 600 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.5px !important;
    }
    
    #bussiness-datatable tbody td {
      font-size: 0.85rem !important;
    }
    
    /* Equal width for all columns - using percentages */
    #bussiness-datatable th:nth-child(1),
    #bussiness-datatable td:nth-child(1) {
      width: 15% !important;
      text-align: center !important;
    }
    
    #bussiness-datatable th:nth-child(2),
    #bussiness-datatable td:nth-child(2) {
      width: 25% !important;
    }
    
    #bussiness-datatable th:nth-child(3),
    #bussiness-datatable td:nth-child(3) {
      width: 45% !important;
    }
    
    #bussiness-datatable th:nth-child(4),
    #bussiness-datatable td:nth-child(4) {
      width: 15% !important;
      text-align: center !important;
    }
    
    /* Remove table-responsive scrolling */
    .table-responsive {
      overflow-x: hidden !important;
      overflow-y: hidden !important;
    }
    
    /* Text truncation for long description */
    #bussiness-datatable td:nth-child(3) {
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
    }
    
    #bussiness-datatable td:nth-child(3):hover {
      white-space: normal !important;
      overflow: visible !important;
      background-color: #f8f9fe !important;
      position: relative;
      z-index: 10;
    }
    
    /* bussiness name truncation */
    #bussiness-datatable td:nth-child(2) {
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
    }
    
    #bussiness-datatable td:nth-child(2):hover {
      white-space: normal !important;
      overflow: visible !important;
      background-color: #f8f9fe !important;
      position: relative;
      z-index: 10;
    }
    
    /* Compact button group */
    .btn-group.btn-group-sm .btn {
      padding: 0.25rem 0.5rem !important;
      font-size: 0.75rem !important;
      line-height: 1.3 !important;
      margin-right: 2px !important;
    }
    
    .btn-group.btn-group-sm .btn:last-child {
      margin-right: 0 !important;
    }
    
    .btn-group.btn-group-sm .btn i {
      font-size: 0.75rem !important;
    }
    
    /* Loading overlay */
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      display: none;
    }
    
    .loading-overlay p {
      margin-top: 1rem;
      color: white;
      font-size: 1rem;
      font-weight: 500;
    }
    
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
    
    /* Clear floats */
    .top:before,
    .top:after,
    .bottom:before,
    .bottom:after {
      content: "";
      display: table;
      clear: both;
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      #bussiness-datatable th:nth-child(1),
      #bussiness-datatable td:nth-child(1) {
        width: 10% !important;
      }
      
      #bussiness-datatable th:nth-child(2),
      #bussiness-datatable td:nth-child(2) {
        width: 20% !important;
      }
      
      #bussiness-datatable th:nth-child(3),
      #bussiness-datatable td:nth-child(3) {
        width: 50% !important;
      }
      
      #bussiness-datatable th:nth-child(4),
      #bussiness-datatable td:nth-child(4) {
        width: 20% !important;
      }
      
      .btn-group.btn-group-sm .btn {
        padding: 0.2rem 0.4rem !important;
        font-size: 0.7rem !important;
      }
    }
  </style>

  <script>
    // assets/js/managebussiness.js
    $(document).ready(function() {
        // Check if DataTable is already initialized
        if (!$.fn.dataTable.isDataTable('#bussiness-datatable')) {
            // Initialize DataTable with NO SCROLLING
            const bussinessTable = $('#bussiness-datatable').DataTable({
                pageLength: 10,
                lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
                scrollX: false,
                scrollCollapse: false,
                autoWidth: false,
                deferRender: true,
                processing: true,
                dom: '<"top"lf>rt<"bottom"ip>',
                language: {
                    paginate: {
                        previous: '<i class="fas fa-angle-left"></i>',
                        next: '<i class="fas fa-angle-right"></i>'
                    },
                    search: "Search:",
                    searchPlaceholder: "Search business...",
                    lengthMenu: "Show _MENU_ entries",
                    info: "Showing _START_ to _END_ of _TOTAL_ entries",
                    emptyTable: "No business found in the system",
                    zeroRecords: "No matching business found",
                    infoEmpty: "No business to show",
                    loadingRecords: "Loading..."
                },
                columns: [
                    { 
                        data: null,
                        orderable: false,
                        searchable: false,
                        render: function(data, type, row, meta) {
                            return `<span class="text-muted">${meta.row + meta.settings._iDisplayStart + 1}</span>`;
                        }
                    },
                    { 
                        data: "meeting_title",
                        render: function(data) {
                            return `<p>${data || 'N/A'}</p>`;
                        }
                    },
                    { 
                        data: "given_by_name",
                        render: function(data) {
                            return `<p>${data || 'N/A'}</p>`;
                        }
                    },
                    { 
                        data: "given_to_name",
                        render: function(data) {
                            return `<p>${data || 'N/A'}</p>`;
                        }
                    },
                    { 
                        data: "amount",
                        render: function(data) {
                            return `<p>₹${data || 0}</p>`;
                        }
                    },
                    { 
                        data: "status",
                        render: function(data) {
                            return `<p>${data || 'Pending'}</p>`;
                        }
                    }
                ],
                data: []
            });
            
            // Get user role from PHP session (passed via Header.php or inline script)
            const userRole = '<?php echo $_SESSION['userrole'] ?? 'member'; ?>';
            loadBusinessFromBackend(bussinessTable, userRole);
            
            $('#bussiness-datatable').on('click', '.delete-business', function(e) {
                e.preventDefault();
                const businessId = $(this).data('id');
                const businessName = $(this).data('name');
                
                if (confirm(`Delete "${businessName}"?`)) {
                    deleteBusiness(businessId, businessName, businessTable);
                }
            });
        }
    });

    // Helper function to truncate text
    function truncateText(text, length) {
        if (!text) return '';
        return text.length > length ? text.substring(0, length) + '...' : text;
    }

    async function loadBusinessFromBackend(table, userRole) {
        showLoading(true, 'Loading business transactions...');
        
        try {
            table.clear();
            
            let response;
            const loginuser = localStorage.getItem("userEmail");
            
            // Check user role and call appropriate endpoint
            if (userRole === 'admin') {
                // Admin - get all transactions
                console.log('Admin user - loading all transactions');
                response = await fetch('http://localhost:3000/api/user/getalltransactions', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
            } else {
                // Member - get user-specific transactions
                console.log('Member user - loading transactions for:', loginuser);
                response = await fetch(`http://localhost:3000/api/user/getusertransactions?useremail=${loginuser}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const result = await response.json();
            let businessData = [];
            
            if (result.status === 'success') {
                businessData = result.data || result.transactions || [];
            } else if (Array.isArray(result)) {
                businessData = result;
            } else {
                businessData = result.data || result.transactions || [];
            }
            
            if (!Array.isArray(businessData)) throw new Error('Invalid data format');
            
            if (businessData.length === 0) {
                table.clear().draw();
                showAlert('info', userRole === 'admin' ? 'No transactions found in the system' : 'No transactions found for your account');
            } else {
                table.rows.add(businessData).draw();
                showAlert('success', `Loaded ${businessData.length} transaction${businessData.length > 1 ? 's' : ''}`);
            }
            
        } catch (error) {
            console.error('Error:', error);
            showAlert('danger', 'Failed to load transactions: ' + error.message);
            table.clear().draw();
        } finally {
            showLoading(false);
        }
    }

    // Refresh data function
    function refreshBusinessData() {
        const table = $('#bussiness-datatable').DataTable();
        const userRole = '<?php echo $_SESSION['userrole'] ?? 'member'; ?>';
        loadBusinessFromBackend(table, userRole);
    }

    function showLoading(show, message = 'Loading...') {
        let overlay = document.getElementById('loading-overlay') || 
            document.querySelector('.loading-overlay');
        
        if (!overlay && show) {
            overlay = document.createElement('div');
            overlay.id = 'loading-overlay';
            overlay.className = 'loading-overlay';
            overlay.innerHTML = `
                <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;">
                    <span class="sr-only">Loading...</span>
                </div>
                <p class="mt-3 text-white">${message}</p>
            `;
            document.body.appendChild(overlay);
        }
        
        if (overlay) {
            overlay.style.display = show ? 'flex' : 'none';
            if (show && overlay.querySelector('p')) {
                overlay.querySelector('p').textContent = message;
            }
        }
    }

    function showAlert(type, message) {
        const existing = document.querySelector('.custom-alert');
        if (existing) existing.remove();
        
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} custom-alert alert-dismissible fade show`;
        alertDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 
                              type === 'info' ? 'info-circle' : 
                              'exclamation-triangle'} mr-2"></i>
            ${message}
            <button type="button" class="close" data-dismiss="alert">
                <span aria-hidden="true">&times;</span>
            </button>
        `;
        
        Object.assign(alertDiv.style, {
            position: 'fixed', top: '20px', right: '20px', zIndex: '9998',
            minWidth: '300px', animation: 'slideInRight 0.3s ease-out',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '4px'
        });
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            if (alertDiv.parentNode) alertDiv.remove();
        }, 5000);
    }
</script>
</body>

</html>