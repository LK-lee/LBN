<!-- View_attendance.php -->
<?php 
$meeting_id = isset($_GET['id']) ? $_GET['id'] : null;

if (!$meeting_id) {
    header("Location: ManageAttendence.php");
    exit();
}
?>

<?php include("Components/Header.php"); ?>

<body>
    <?php include("Components/Sidebar.php"); ?>
    
    <div class="main-content" id="panel">
        <?php include("Components/Navbar.php"); ?>
        
        <div class="header bg-default pb-6">
            <div class="container-fluid">
                <div class="header-body">
                    <div class="row align-items-center py-4">
                        <div class="col-lg-6 col-7">
                            <h6 class="h2 text-white mb-0">Attendance Details</h6>
                            <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                                    <li class="breadcrumb-item">
                                        <a href="#"><i class="fas fa-home"></i></a>
                                    </li>
                                    <li class="breadcrumb-item">
                                        <a href="Home.php">Home</a>
                                    </li>
                                    <li class="breadcrumb-item">
                                        <a href="ManageAttendence.php">Manage Attendance</a>
                                    </li>
                                    <li class="breadcrumb-item active" aria-current="page">
                                        View Attendance
                                    </li>
                                </ol>
                            </nav>
                        </div>
                        <div class="col-lg-6 col-5 text-right">
                            <a href="ManageAttendence.php" class="btn bg-danger text-white">
                                <i class="fas fa-arrow-left"></i> Back to Reports
                            </a>
                        </div>
                        <div class="col-lg-4">
                            <div class="card mt-2">
                                <div class="card-body">
                                    <div class="form-group mb-0">
                                        <label class="form-control-label text-muted">Meeting Date:</label>
                                        <h4 id="meeting_date_display" class="mb-0 font-weight-bold">Loading...</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="card mt-2">
                                <div class="card-body">
                                    <div class="form-group mb-0">
                                        <label class="form-control-label text-muted">Meeting Title:</label>
                                        <h4 id="meeting_title_display" class="mb-0 font-weight-bold">Loading...</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header bg-success text-white">
                            <h4 class="mb-0 text-white">
                                <i class="fas fa-user-check mr-2"></i>
                                Present Members
                                <span id="present-count" class="badge badge-light ml-2">0</span>
                            </h4>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-hover" id="present-datatable">
                                <thead class="thead-light">
                                    <tr>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody id="present-members">
                                    <!-- Present members will be populated dynamically -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header bg-danger text-white">
                            <h4 class="mb-0 text-white">
                                <i class="fas fa-user-times mr-2"></i>
                                Absent Members
                                <span id="absent-count" class="badge badge-light ml-2">0</span>
                            </h4>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-hover" id="absent-datatable">
                                <thead class="thead-light">
                                    <tr>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody id="absent-members">
                                    <!-- Absent members will be populated dynamically -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    
    <?php include("Components/FooterLinks.php"); ?>
    
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        const meetingId = <?php echo json_encode($meeting_id); ?>;
        
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
                    if (isNaN(date.getTime())) return 'Invalid Date';
                    
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();
                    return `${day}/${month}/${year}`;
                }
                
                return dateString;
            } catch (error) {
                console.error("Error formatting date:", error);
                return dateString;
            }
        }
        
        // Load meeting details
        async function loadMeetingDetails() {
            try {
                const response = await fetch(`http://localhost:3000/api/user/getmeetingbyid/${meetingId}`, {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                    }
                });
                
                if (response.ok) {
                    const result = await response.json();
                    let meetingData = {};
                    
                    if (result.status === 'success') {
                        meetingData = result.data || result.meeting || {};
                    }
                    
                    // Display meeting date
                    const meetingDateElement = document.getElementById('meeting_date_display');
                    if (meetingDateElement) {
                        const meetingDate = meetingData.meeting_date || meetingData.date || '';
                        meetingDateElement.textContent = formatDateForDisplay(meetingDate) || 'Not set';
                    }
                    
                    // Display meeting title
                    const meetingTitleElement = document.getElementById('meeting_title_display');
                    if (meetingTitleElement) {
                        const meetingTitle = meetingData.meeting_title || meetingData.name || 'Meeting';
                        meetingTitleElement.textContent = meetingTitle;
                    }
                }
            } catch (error) {
                console.error('Error loading meeting details:', error);
                const meetingDateElement = document.getElementById('meeting_date_display');
                if (meetingDateElement) meetingDateElement.textContent = 'Error loading date';
                
                const meetingTitleElement = document.getElementById('meeting_title_display');
                if (meetingTitleElement) meetingTitleElement.textContent = 'Error loading title';
            }
        }
        
        // Load attendance details
        async function loadAttendanceDetails() {
            try {
                const response = await fetch(`http://localhost:3000/api/user/getmembersattendance/${meetingId}`, {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                    }
                });
                
                const result = await response.json();
                let attendanceData = [];
                
                if (result.status === 'success') {
                    attendanceData = result.data || result.attendance || result.details || [];
                } else if (Array.isArray(result)) {
                    attendanceData = result;
                }
                
                // Separate present and absent members
                const presentMembers = attendanceData.filter(member => member.status && member.status.toLowerCase() === 'present');
                const absentMembers = attendanceData.filter(member => member.status && member.status.toLowerCase() === 'absent');
                
                // Update counts
                const presentCount = presentMembers.length;
                const absentCount = absentMembers.length;
                const totalCount = presentCount + absentCount;
                
                const presentCountElement = document.getElementById('present-count');
                if (presentCountElement) presentCountElement.textContent = presentCount;
                
                const absentCountElement = document.getElementById('absent-count');
                if (absentCountElement) absentCountElement.textContent = absentCount;
                
                // const totalAttendanceElement = document.getElementById('total_attendance_display');
                // if (totalAttendanceElement) totalAttendanceElement.textContent = totalCount;
                
                // Populate present members table
                const presentTable = document.getElementById('present-members');
                if (presentTable) {
                    presentTable.innerHTML = '';
                    if (presentMembers.length > 0) {
                        presentMembers.forEach((member, index) => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${index + 1}</td>
                                <td><strong>${member.name || member.member_name || 'Unknown'}</strong></td>
                                <td>${member.email || '<span class="text-muted">No email</span>'}</td>
                            `;
                            presentTable.appendChild(row);
                        });
                    } else {
                        const row = document.createElement('tr');
                        row.innerHTML = '<td colspan="3" class="text-center text-muted">No present members</td>';
                        presentTable.appendChild(row);
                    }
                }
                
                // Populate absent members table
                const absentTable = document.getElementById('absent-members');
                if (absentTable) {
                    absentTable.innerHTML = '';
                    if (absentMembers.length > 0) {
                        absentMembers.forEach((member, index) => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${index + 1}</td>
                                <td><strong>${member.name || member.member_name || 'Unknown'}</strong></td>
                                <td>${member.email || '<span class="text-muted">No email</span>'}</td>
                            `;
                            absentTable.appendChild(row);
                        });
                    } else {
                        const row = document.createElement('tr');
                        row.innerHTML = '<td colspan="3" class="text-center text-muted">No absent members</td>';
                        absentTable.appendChild(row);
                    }
                }
                
            } catch (error) {
                console.error('Error loading attendance details:', error);
                alert('Failed to load attendance details');
            }
        }
        
        Promise.all([
            loadMeetingDetails(),
            loadAttendanceDetails()
        ]).catch(error => {
            console.error('Error loading data:', error);
        });
    });
    </script>
</body>
</html>