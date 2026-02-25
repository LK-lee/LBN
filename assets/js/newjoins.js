document.addEventListener('DOMContentLoaded', function() {
    const tableContainer = document.getElementById('tableContainer');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const noDataMessage = document.getElementById('noDataMessage');
    const referralsTableBody = document.getElementById('referralsTableBody');
    const refreshBtn = document.getElementById('refreshBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    
    let dataTable = null;
    let currentDeleteId = null;
    let userEmail = localStorage.getItem('userEmail') || 'lokesh95531@gmail.com';

    // Function to get badge class based on status
    function getStatusBadgeClass(status) {
        if (!status) return 'badge-secondary';
        
        const statusLower = status.toLowerCase();
        if (statusLower.includes('joined')) {
            return 'badge-success';
        } else if (statusLower.includes('invited')) {
            return 'badge-primary';
        } else if (statusLower.includes('not interested')) {
            return 'badge-danger';
        } else if (statusLower.includes('pending')) {
            return 'badge-warning';
        } else if (statusLower.includes('contacted')) {
            return 'badge-info';
        }
        return 'badge-secondary';
    }

    // Function to format status for display
    function formatStatus(status) {
        if (!status) return 'Unknown';
        
        const statusLower = status.toLowerCase();
        if (statusLower === 'not interested') {
            return 'Not Interested';
        } else if (statusLower === 'joined') {
            return 'Joined';
        } else if (statusLower === 'invited') {
            return 'Invited';
        } else if (statusLower === 'pending') {
            return 'Pending';
        } else if (statusLower === 'contacted') {
            return 'Contacted';
        }
        
        // Capitalize first letter of each word
        return status.replace(/\b\w/g, char => char.toUpperCase());
    }

    // Function to initialize DataTable
    function initializeDataTable() {
        // Properly destroy existing DataTable
        if (dataTable) {
            dataTable.destroy();
            dataTable = null;
            // Clear the table body completely
            referralsTableBody.innerHTML = '';
        }
        
        // Check if the table element exists and is valid
        if ($.fn.DataTable.isDataTable('#datatable-basic')) {
            $('#datatable-basic').DataTable().destroy();
            $('#datatable-basic tbody').empty();
        }
        
        // Initialize new DataTable
        dataTable = $('#datatable-basic').DataTable({
            pageLength: 10,
            lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
            language: {
                paginate: {
                    previous: '<i class="fas fa-angle-left"></i>',
                    next: '<i class="fas fa-angle-right"></i>'
                },
                lengthMenu: "Show _MENU_ entries",
                info: "Showing _START_ to _END_ of _TOTAL_ entries",
                search: "Search:",
                zeroRecords: "No matching records found",
                infoEmpty: "Showing 0 to 0 of 0 entries",
                infoFiltered: "(filtered from _MAX_ total entries)"
            },
            dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>' +
                '<"row"<"col-sm-12"tr>>' +
                '<"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
            responsive: true,
            order: [[0, 'asc']], // Sort by S.No ascending
            columnDefs: [
                { orderable: true, targets: '_all' },
                { className: "text-center", targets: [0, 3, 4, 5] },
                { className: "text-left", targets: [1, 2] }
            ],
            // Add draw callback to reattach event listeners
            drawCallback: function() {
                addActionButtonListeners();
            }
        });
        
        // Style the search and length inputs
        $('.dataTables_length select').addClass('form-control-sm');
        $('.dataTables_filter input').addClass('form-control-sm');
    }

    // Function to fetch and display referrals
    function fetchReferrals() {
        // Show loading, hide others
        loadingSpinner.classList.remove('d-none');
        tableContainer.classList.add('d-none');
        errorMessage.classList.add('d-none');
        noDataMessage.classList.add('d-none');
        
        // Clear table body
        referralsTableBody.innerHTML = '';
        
        // Properly destroy existing DataTable
        if (dataTable) {
            dataTable.destroy();
            dataTable = null;
        }
        
        if ($.fn.DataTable.isDataTable('#datatable-basic')) {
            $('#datatable-basic').DataTable().destroy();
            $('#datatable-basic tbody').empty();
        }
        
        // Fetch referrals from API
        fetch('http://localhost:3000/api/user/getreferrals')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Hide loading spinner
                loadingSpinner.classList.add('d-none');
                
                // Check if data is valid
                if (data && data.status === 'success' && Array.isArray(data.data)) {
                    const referrals = data.data;
                    
                    if (referrals.length === 0) {
                        // Show no data message
                        noDataMessage.classList.remove('d-none');
                        return;
                    }
                    
                    // Populate table
                    referrals.forEach((referral, index) => {
                        const row = document.createElement('tr');
                        
                        const statusBadgeClass = getStatusBadgeClass(referral.status);
                        const formattedStatus = formatStatus(referral.status);
                        
                        row.innerHTML = `
                            <td>${index + 1}</td>
                            <td>${referral.username || 'N/A'}</td>
                            <td>${referral.name || 'N/A'}</td>
                            <td>${referral.mobile || 'N/A'}</td>
                            <td>
                                <span class="badge ${statusBadgeClass}">${formattedStatus}</span>
                            </td>
                            <td>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-sm btn-info view-btn mr-1" data-id="${referral.id}" title="View">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button type="button" class="btn btn-sm btn-warning edit-btn mr-1" data-id="${referral.id}" title="Edit">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button type="button" class="btn btn-sm btn-danger delete-btn mr-1" data-id="${referral.id}" title="Delete">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        `;
                        
                        referralsTableBody.appendChild(row);
                    });
                    
                    // Show table
                    tableContainer.classList.remove('d-none');
                    
                    // Initialize DataTable with a slight delay to ensure DOM is ready
                    setTimeout(() => {
                        initializeDataTable();
                    }, 100);
                    
                } else {
                    // Invalid data structure
                    errorText.textContent = data?.message || 'Invalid data format received from server';
                    errorMessage.classList.remove('d-none');
                }
            })
            .catch(error => {
                // Hide loading spinner
                loadingSpinner.classList.add('d-none');
                
                // Show error message
                errorText.textContent = `Failed to load referrals: ${error.message}`;
                errorMessage.classList.remove('d-none');
                
                console.error('Error fetching referrals:', error);
            });
    }

    // Function to add event listeners to action buttons
    function addActionButtonListeners() {
        // Remove existing event listeners first (using jQuery off method)
        $('.view-btn').off('click');
        $('.edit-btn').off('click');
        $('.delete-btn').off('click');
        
        // View buttons
        $('.view-btn').on('click', function() {
            const id = $(this).data('id');
            viewReferral(id);
        });
        
        // Edit buttons
        $('.edit-btn').on('click', function() {
            const id = $(this).data('id');
            editReferral(id);
        });
        
        // Delete buttons
        $('.delete-btn').on('click', function() {
            const id = $(this).data('id');
            showDeleteConfirmation(id);
        });
    }

    // Function to view referral
    // function viewReferral(id) {
    //     fetch(`http://localhost:3000/api/user/getreferralbyid/${id}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             const modal = document.getElementById('responseModal');
    //             const responseMessage = document.getElementById('responseMessage');
                
    //             if (data.status === 'success' && data.data && data.data.length > 0) {
    //                 const referral = data.data[0];
                    
    //                 responseMessage.innerHTML = `
    //                     <div class="alert alert-primary">
    //                         <h5 class="mt-2">Referral Details</h5>
    //                         <hr>
    //                         <p><strong>Referred By:</strong> ${referral.username || 'N/A'}</p>
    //                         <p><strong>Name:</strong> ${referral.name || 'N/A'}</p>
    //                         <p><strong>Mobile:</strong> ${referral.mobile || 'N/A'}</p>
    //                         <p><strong>Status:</strong> <span class="badge ${getStatusBadgeClass(referral.status)}">${formatStatus(referral.status)}</span></p>
    //                     </div>
    //                 `;
    //             } else {
    //                 responseMessage.innerHTML = `
    //                     <div class="alert alert-danger">
    //                         <i class="fas fa-exclamation-circle"></i>
    //                         <h5 class="mt-2">Error</h5>
    //                         <p class="mb-0">${data.message || 'Failed to load referral details'}</p>
    //                     </div>
    //                 `;
    //             }
                
    //             $('#responseModal').modal('show');
    //         })
    //         .catch(error => {
    //             const responseMessage = document.getElementById('responseMessage');
    //             responseMessage.innerHTML = `
    //                 <div class="alert alert-danger">
    //                     <i class="fas fa-exclamation-circle"></i>
    //                     <h5 class="mt-2">Error</h5>
    //                     <p class="mb-0">${error.message || 'Failed to load referral details'}</p>
    //                 </div>
    //             `;
    //             $('#responseModal').modal('show');
    //         });
    // }

    // Function to edit referral
    function viewReferral(id) {
        // Redirect to edit page with ID
        window.location.href = `Edit_Joins.php?id=${id}&type=edit`;
    }

    // Function to edit referral
    function editReferral(id) {
        // Redirect to edit page with ID
        window.location.href = `Edit_Joins.php?id=${id}&type=edit`;
    }

    // Function to show delete confirmation
    function showDeleteConfirmation(id) {
        currentDeleteId = id;
        $('#deleteModal').modal('show');
    }

    // Function to delete referral
    function deleteReferral(id) {
        // Get user email from localStorage
        const userEmail = localStorage.getItem('userEmail');
        
        fetch(`http://localhost:3000/api/user/deletereferral/${id}?useremail=${encodeURIComponent(userEmail)}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            const modal = document.getElementById('responseModal');
            const responseMessage = document.getElementById('responseMessage');
            
            if (data.status === 'success') {
                responseMessage.innerHTML = `
                    <div class="alert alert-success">
                        <i class="fas fa-check-circle fa-lg"></i>
                        <h5 class="mt-2">Deleted Successfully!</h5>
                        <p class="mb-0">${data.message || 'Referral has been deleted.'}</p>
                    </div>
                `;
                
                // Refresh the table
                fetchReferrals();
            } else {
                responseMessage.innerHTML = `
                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-circle fa-lg"></i>
                        <h5 class="mt-2">Delete Failed</h5>
                        <p class="mb-0">${data.message || data.errors || 'Failed to delete referral.'}</p>
                    </div>
                `;
            }
            
            $('#responseModal').modal('show');
            $('#deleteModal').modal('hide');
        })
        .catch(error => {
            const responseMessage = document.getElementById('responseMessage');
            responseMessage.innerHTML = `
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-circle fa-lg"></i>
                    <h5 class="mt-2">Error</h5>
                    <p class="mb-0">${error.message || 'Failed to delete referral.'}</p>
                </div>
            `;
            $('#responseModal').modal('show');
            $('#deleteModal').modal('hide');
        });
    }

    // Confirm delete button handler
    confirmDeleteBtn.addEventListener('click', function() {
        if (currentDeleteId) {
            deleteReferral(currentDeleteId);
            currentDeleteId = null;
        }
    });

    // Refresh button click handler
    refreshBtn.addEventListener('click', function() {
        fetchReferrals();
        
        // Add loading animation to button
        const icon = this.querySelector('i');
        icon.classList.add('fa-spin');
        
        // Remove animation after 1 second
        setTimeout(() => {
            icon.classList.remove('fa-spin');
        }, 1000);
    });

    // Initial fetch
    fetchReferrals();

    // Auto-refresh every 60 seconds
    setInterval(fetchReferrals, 60000);
});