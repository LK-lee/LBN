$(document).ready(function() {
    // Initialize DataTable with NO SCROLLING
    const reportsTable = $('#reports-datatable').DataTable({
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
            emptyTable: "No meetings found",
            zeroRecords: "No matching meetings found",
            loadingRecords: "Loading meetings..."
        },
        columns: [
            { 
                data: null,
                orderable: false,
                searchable: false,
                render: function(data, type, row, meta) {
                    return `<div class="text-center"><span class="text-muted">${meta.row + meta.settings._iDisplayStart + 1}</span></div>`;
                }
            },
            { 
                data: "meeting_title",
                render: function(data) {
                    return data ? `<div class="text-center" title="${data}">${truncateText(data, 20)}</div>` : '<div class="text-center"><span class="text-muted">No title</span></div>';
                }
            },
            { 
                data: "meeting_date",
                render: function(data) {
                    if (!data) return '<div class="text-center"><span class="text-muted">N/A</span></div>';
                    return `<div class="text-center">${formatDateForDisplay(data)}</div>`;
                }
            },
            { 
                data: null,
                render: function(data, type, row) {
                    const presentCount = parseInt(row.present_count) || 0;
                    const absentCount = parseInt(row.absent_count) || 0;
                    
                    return `
                        <div class="d-flex justify-content-center align-items-center">
                            <div class="d-flex align-items-center mr-3">
                                <span class="badge badge-success badge-sm">${presentCount}</span>
                                <span class="text-success ml-1">P</span>
                            </div>
                            <div class="d-flex align-items-center">
                                <span class="badge badge-danger badge-sm">${absentCount}</span>
                                <span class="text-danger ml-1">A</span>
                            </div>
                        </div>
                    `;
                }
            },
            { 
                data: "id",
                orderable: false,
                searchable: false,
                render: function(data) {
                    return `
                        <div class="text-center">
                            <div class="btn-group btn-group-sm" role="group">
                                <a href="View_Attendance.php?id=${data}" 
                                   class="btn btn-primary" 
                                   title="View Attendance Details">
                                    <i class="fas fa-eye"></i>
                                </a>
                            </div>
                        </div>
                    `;
                }
            }
        ]
    });

    // Load meetings from API
    loadMeetings();

    // Function to load meetings
    async function loadMeetings() {
        showLoading(true);
        
        try {
            const response = await fetch('http://localhost:3000/api/user/getmeetings', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            let meetingsData = [];
            
            if (result.status === 'success') {
                meetingsData = result.data || result.meetings || [];
            } else if (Array.isArray(result)) {
                meetingsData = result;
            }
            
            if (!Array.isArray(meetingsData)) throw new Error('Invalid data format');
            
            const formattedData = meetingsData.map(meeting => ({
                id: meeting.id,
                meeting_title: meeting.meeting_title || meeting.name,
                meeting_date: meeting.meeting_date || meeting.date,
                present_count: meeting.present_count || 0,
                absent_count: meeting.absent_count || 0
            }));
            
            reportsTable.clear();
            
            if (formattedData.length === 0) {
                reportsTable.draw();
                showAlert('info', 'No meetings found');
            } else {
                reportsTable.rows.add(formattedData).draw();
            }
            
        } catch (error) {
            console.error('Error:', error);
            showAlert('danger', error.message);
        } finally {
            showLoading(false);
        }
    }

    // Helper function to truncate text
    function truncateText(text, length) {
        if (!text) return '';
        return text.length > length ? text.substring(0, length) + '...' : text;
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

    // Loading overlay
    function showLoading(show) {
        let overlay = document.getElementById('loading-overlay');
        
        if (!overlay && show) {
            overlay = document.createElement('div');
            overlay.id = 'loading-overlay';
            overlay.style.cssText = `
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
            `;
            overlay.innerHTML = `
                <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;">
                    <span class="sr-only">Loading...</span>
                </div>
            `;
            document.body.appendChild(overlay);
        }
        
        if (overlay) {
            overlay.style.display = show ? 'flex' : 'none';
        }
    }

    // Alert function
    function showAlert(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9998;
            min-width: 300px;
        `;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="close" data-dismiss="alert">
                <span>&times;</span>
            </button>
        `;
        document.body.appendChild(alertDiv);
        
        setTimeout(() => alertDiv.remove(), 3000);
    }
});
