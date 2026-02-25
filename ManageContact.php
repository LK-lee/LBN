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
              <h6 class="h2 text-white mb-0">Manage Contacts</h6>

              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item">
                    <a href="Home.php"><i class="fas fa-home"></i></a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="Home.php">Home</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Manage Contacts
                  </li>
                </ol>
              </nav>
            </div>

            <!-- <div class="col-lg-6 col-5 text-right ">
              <a href="Add_Meetings.php" class="btn bg-warning text-white">Add Meetings</a>
            </div> -->

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
              <h3 class="mb-0">Manage Contacts</h3>
              <!-- <p class="text-sm mb-0">
                This is an example of datatable using the well-known
                datatables.net plugin. This is a minimal setup to get
                started quickly.
              </p> -->
            </div>

            <!-- Table - No Scroll -->
            <div class="table-responsive mt-4" style="overflow-x: hidden; overflow-y: hidden;">
              <table class="table align-items-center table-flush" id="contact-datatable" style="width: 100%; table-layout: fixed;">
                <thead class="thead-light">
                  <tr>
                    <th style="width: 5%;">S.No</th>
                    <th style="width: 15%;">Contact Name</th>
                    <th style="width: 20%;">Email</th>
                    <th style="width: 25%;">Trade</th>
                    <th style="width: 35%;">Message</th>
                    <th style="width: 10%;">Actions</th>
                  </tr>
                </thead>

                <tbody id="contactTableBody">
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
    /* Table styling - NO SCROLL */
    #contact-datatable {
      width: 100% !important;
      table-layout: fixed !important;
    }
    
    #contact-datatable th,
    #contact-datatable td {
      padding: 12px 6px !important;
      vertical-align: middle !important;
      white-space: normal !important;
      word-wrap: break-word !important;
    }
    
    #contact-datatable thead th {
      font-size: 0.8rem !important;
      font-weight: 600 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.5px !important;
    }
    
    #contact-datatable tbody td {
      font-size: 0.85rem !important;
    }
    
    /* Column width overrides */
    #contact-datatable th:nth-child(1),
    #contact-datatable td:nth-child(1) {
      width: 8% !important;
      text-align: center !important;
    }
    
    #contact-datatable th:nth-child(2),
    #contact-datatable td:nth-child(2) {
      width: 17% !important;
    }
    
    #contact-datatable th:nth-child(3),
    #contact-datatable td:nth-child(3) {
      width: 20% !important;
      word-break: break-all !important;
    }
    
    #contact-datatable th:nth-child(4),
    #contact-datatable td:nth-child(4) {
      width: 12% !important;
      text-align: center !important;
    }
    
    #contact-datatable th:nth-child(5),
    #contact-datatable td:nth-child(5) {
      width: 33% !important;
    }
    
    #contact-datatable th:nth-child(6),
    #contact-datatable td:nth-child(6) {
      width: 10% !important;
      text-align: center !important;
    }
    
    /* Remove table-responsive scrolling */
    .table-responsive {
      overflow-x: hidden !important;
      overflow-y: hidden !important;
    }
    
    /* Text truncation for long content */
    #contact-datatable td:nth-child(2),
    #contact-datatable td:nth-child(3),
    #contact-datatable td:nth-child(5) {
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
    }
    
    #contact-datatable td:nth-child(2):hover,
    #contact-datatable td:nth-child(3):hover,
    #contact-datatable td:nth-child(5):hover {
      white-space: normal !important;
      overflow: visible !important;
      background-color: #f8f9fe !important;
      position: relative;
      z-index: 10;
    }
    
    /* Button styling */
    .btn-group .btn {
      padding: 0.25rem 0.5rem !important;
      font-size: 0.75rem !important;
      margin-right: 2px !important;
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
    
    /* Fix typo */
    th:nth-child(2) {
      text-transform: uppercase;
    }
  </style>

  <script>
    $(document).ready(function() {
        // Check if DataTable is already initialized
        if (!$.fn.dataTable.isDataTable('#contact-datatable')) {
            // Initialize DataTable with NO SCROLLING
            const usersTable = $('#contact-datatable').DataTable({
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
                    searchPlaceholder: "Search contacts...",
                    lengthMenu: "Show _MENU_ entries",
                    info: "Showing _START_ to _END_ of _TOTAL_ entries",
                    emptyTable: "No contacts found in the system",
                    zeroRecords: "No matching contacts found",
                    infoEmpty: "No contacts to show",
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
                        data: "first_name",
                        render: function(data) {
                            return data ? `<span title="${data}">${truncateText(data, 20)}</span>` : '<span class="text-muted">No name</span>';
                        }
                    },
                    { 
                        data: "email",
                        render: function(data) {
                            return data ? `<span title="${data}">${truncateText(data, 25)}</span>` : '<span class="text-muted">No email</span>';
                        }
                    },
                    { 
                        data: "trade",
                        render: function(data) {
                            return data ? `<span>${truncateText(data, 50)}</span>` : '<span class="text-muted">-</span>';
                        }
                    },
                    { 
                        data: "message",
                        render: function(data) {
                            return data ? `<span title="${data}">${truncateText(data, 40)}</span>` : '<span class="text-muted">No message</span>';
                        }
                    },
                    { 
                        data: "id",
                        orderable: false,
                        searchable: false,
                        render: function(data, type, row) {
                            return `
                                <div class="btn-group" role="group">
                                    <button class="btn btn-sm btn-danger delete-user" 
                                            data-id="${data}" 
                                            data-name="${row.first_name || 'Unnamed User'}"
                                            title="Delete">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            `;
                        }
                    }
                ],
                data: []
            });
            
            loadUsersFromBackend(usersTable);
            
            $('#contact-datatable').on('click', '.delete-user', function(e) {
                e.preventDefault();
                const userId = $(this).data('id');
                const userName = $(this).data('name');
                
                if (confirm(`Delete contact "${userName}"? This action cannot be undone.`)) {
                    deleteUser(userId, userName, usersTable);
                }
            });
        }
    });

    // Helper function to truncate text
    function truncateText(text, length) {
        if (!text) return '';
        return text.length > length ? text.substring(0, length) + '...' : text;
    }

    async function loadUsersFromBackend(table) {
        showLoading(true, 'Loading contacts...');
        
        try {
            table.clear();
            const response = await fetch('http://localhost:3000/api/user/getcontacts', {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                }
            });
            
            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = 'login.php';
                    return;
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            let usersData = [];
            
            if (result.status === 'success') {
                usersData = result.data || result.users || [];
            } else if (Array.isArray(result)) {
                usersData = result;
            } else {
                usersData = result.data || result.users || [];
            }
            
            if (!Array.isArray(usersData)) throw new Error('Invalid data format');
            
            // Format data
            const formattedData = usersData.map(user => ({
                id: user.id || user._id,
                first_name: user.first_name || user.username || user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown',
                email: user.email || '',
                trade: user.trade || user.phone || user.contactNumber || '',
                message: user.message || user.location || user.streetmessage || user.description || ''
            }));
            
            if (formattedData.length === 0) {
                table.clear().draw();
                showAlert('info', 'No contacts found in the system');
            } else {
                table.rows.add(formattedData).draw();
            }
            
        } catch (error) {
            console.error('Error loading contacts:', error);
            showAlert('danger', `Failed to load contacts: ${error.message}`);
            table.clear().draw();
        } finally {
            showLoading(false);
        }
    }

    async function deleteUser(userId, userName, table) {
        showLoading(true, `Deleting contact "${userName}"...`);
        
        try {
            const response = await fetch(`http://localhost:3000/api/user/deletecontact/${userId}`, {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                }
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = 'login.php';
                    return;
                }
                throw new Error(result.message || result.error || 'Delete failed');
            }
            
            if (result.status === 'success') {
                showAlert('success', `Contact deleted successfully`);
                await loadUsersFromBackend(table);
            } else {
                throw new Error(result.message || result.errors || 'Delete failed');
            }
            
        } catch (error) {
            showAlert('danger', error.message);
        } finally {
            showLoading(false);
        }
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