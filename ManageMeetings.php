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
              <h6 class="h2 text-white mb-0">Manage Meetings</h6>

              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item">
                    <a href="Home.php"><i class="fas fa-home"></i></a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="Home.php">Home</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Manage Meetings
                  </li>
                </ol>
              </nav>
            </div>

            <div class="col-lg-6 col-5 text-right ">
              <a href="Add_Meetings.php" class="btn bg-warning text-white">Add Meetings</a>
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
              <h3 class="mb-0">Manage Meetings</h3>
              <!-- <p class="text-sm mb-0">
                This is an example of datatable using the well-known
                datatables.net plugin. This is a minimal setup to get
                started quickly.
              </p> -->
            </div>

            <!-- Table - No Scroll -->
            <div class="table-responsive mt-3" style="overflow-x: hidden; overflow-y: hidden;">
              <table class="table align-items-center table-flush" id="meetings-datatable" >
                <thead class="thead-light">
                  <tr>
                    <th style="width: 6%;">S.No</th>
                    <th style="width: 18%;">Meeting Name</th>
                    <th style="width: 12%;">Meeting Date</th>
                    <th style="width: 10%;">Meeting Time</th>
                    <th style="width: 18%;">Meeting Place</th>
                    <th style="width: 10%;">Status</th>
                    <th style="width: 26%;">Actions</th>
                  </tr>
                </thead>
                <tbody id="meetingTableBody">
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

  <script>
    $(document).ready(function() {
        // Check if DataTable is already initialized
        if (!$.fn.dataTable.isDataTable('#meetings-datatable')) {
            // Initialize DataTable with NO SCROLLING
            const meetingsTable = $('#meetings-datatable').DataTable({
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
                    searchPlaceholder: "Search meetings...",
                    lengthMenu: "Show _MENU_ entries",
                    info: "Showing _START_ to _END_ of _TOTAL_ entries",
                    emptyTable: "No meetings found in the system",
                    zeroRecords: "No matching meetings found",
                    infoEmpty: "No meetings to show",
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
                            return data ? `<span title="${data}">${truncateText(data, 25)}</span>` : '<span class="text-muted">No Title</span>';
                        }
                    },
                    { 
                        data: "meeting_date",
                        render: function(data) {
                            if (!data) return '<span class="text-muted">N/A</span>';
                            const formattedDate = formatDateForDisplay(data);
                            return `<span>${formattedDate}</span>`;
                        }
                    },
                    { 
                        data: "meeting_time",
                        render: function(data) {
                            if (!data) return '<span class="text-muted">N/A</span>';
                            return `<span>${data}</span>`;
                        }
                    },
                    { 
                        data: "meeting_place",
                        render: function(data) {
                            return data ? `<span title="${data}">${truncateText(data, 25)}</span>` : '<span class="text-muted">Not specified</span>';
                        }
                    },
                    { 
                        data: "status",
                        render: function(data) {
                            let badgeClass = 'badge-secondary';  
                            let badgeText = data || 'Unknown';
                            
                            if (data === 'Opened' || data === 'opened' || data === 'Active') {
                                badgeClass = 'badge-success';
                            } else if (data === 'Closed' || data === 'closed' || data === 'Inactive') {
                                badgeClass = 'badge-danger';
                            } else if (data === 'Pending' || data === 'pending') {
                                badgeClass = 'badge-warning';
                            } else if (data === 'Cancelled' || data === 'cancelled') {
                                badgeClass = 'badge-dark';
                            }
                            
                            return `<span class="badge ${badgeClass} badge-pill">${badgeText}</span>`;
                        }
                    },
                    { 
                        data: "id",
                        orderable: false,
                        searchable: false,
                        render: function(data, type, row) {
                            return `
                                <div class="btn-group" role="group">
                                    <a href="Edit_Meeting.php?id=${data}&type=View" 
                                      class="btn btn-sm btn-info" 
                                      title="View">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    <a href="Edit_Meeting.php?id=${data}&type=Edit" 
                                      class="btn btn-sm btn-warning" 
                                      title="Edit">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                    <button class="btn btn-sm btn-danger delete-meeting" 
                                            data-id="${data}" 
                                            data-name="${row.meeting_title || row.meeting_type || 'Meeting'}"
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
            
            loadMeetingsFromBackend(meetingsTable);
            
            $('#meetings-datatable').on('click', '.delete-meeting', function(e) {
                e.preventDefault();
                const meetingId = $(this).data('id');
                const meetingName = $(this).data('name');
                
                if (confirm(`Delete meeting "${meetingName}"? This action cannot be undone.`)) {
                    deleteMeeting(meetingId, meetingName, meetingsTable);
                }
            });
        }
    });

    // Helper function to truncate text
    function truncateText(text, length) {
        if (!text) return '';
        return text.length > length ? text.substring(0, length) + '...' : text;
    }

    async function loadMeetingsFromBackend(table) {
        showLoading(true, 'Loading meetings...');
        
        try {
            table.clear();
            const response = await fetch('http://localhost:3000/api/user/getmeetings', {
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
            let meetingsData = [];
            
            if (result.status === 'success') {
                meetingsData = result.data || result.meetings || [];
            } else if (Array.isArray(result)) {
                meetingsData = result;
            } else {
                meetingsData = result.data || result.meetings || [];
            }
            
            if (!Array.isArray(meetingsData)) throw new Error('Invalid data format');
            
            // Format data
            const formattedData = meetingsData.map(meeting => ({
                id: meeting.id,
                meeting_title: meeting.meeting_title || meeting.name || 'No Title',
                meeting_type: meeting.meeting_type || 'Meeting',
                meeting_date: meeting.meeting_date || meeting.date,
                meeting_time: meeting.meeting_time || meeting.time,
                meeting_mode: meeting.meeting_mode || meeting.mode || 'Not specified',
                meeting_place: meeting.meeting_place || meeting.location || meeting.place || 'Not specified',
                status: meeting.status || 'Active'
            }));
            
            if (formattedData.length === 0) {
                table.clear().draw();
                showAlert('info', 'No meetings found in the system');
            } else {
                table.rows.add(formattedData).draw();
            }
            
        } catch (error) {
            console.error('Error loading meetings:', error);
            showAlert('danger', `Failed to load meetings: ${error.message}`);
            table.clear().draw();
        } finally {
            showLoading(false);
        }
    }

    async function deleteMeeting(meetingId, meetingName, table) {
        showLoading(true, `Deleting meeting "${meetingName}"...`);
        
        const useremail = localStorage.getItem('userEmail');
        
        if (!useremail) {
            showAlert('danger', 'User email not found. Please login again.');
            return;
        }
        
        try {
            const response = await fetch(`http://localhost:3000/api/user/deletemeeting/${meetingId}?useremail=${encodeURIComponent(useremail)}`, {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                }
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.message || result.error || 'Delete failed');
            }
            
            if (result.status === 'success') {
                showAlert('success', `Meeting "${meetingName}" deleted successfully`);
                await loadMeetingsFromBackend(table);
            } else {
                throw new Error(result.message || result.errors || 'Delete failed');
            }
            
        } catch (error) {
            showAlert('danger', error.message);
        } finally {
            showLoading(false);
        }
    }

    // Format date function
    function formatDateForDisplay(dateString) {
        if (!dateString) return 'N/A';
        
        try {
            if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
                const [year, month, day] = dateString.split('-');
                return `${day}/${month}/${year}`;
            }
            
            if (dateString.includes('T')) {
                const date = new Date(dateString);
                
                if (isNaN(date.getTime())) {
                    return 'Invalid Date';
                }
                
                const timezoneOffset = date.getTimezoneOffset() * 60000;
                const localDate = new Date(date.getTime() - timezoneOffset);
                
                const day = String(localDate.getDate()).padStart(2, '0');
                const month = String(localDate.getMonth() + 1).padStart(2, '0');
                const year = localDate.getFullYear();
                
                return `${day}/${month}/${year}`;
            }
            
            const date = new Date(dateString);
            if (!isNaN(date.getTime())) {
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            }
            
            return dateString;
        } catch (error) {
            console.error("Error formatting date:", error, "for:", dateString);
            return dateString;
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