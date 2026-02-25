<?php include("Components/Header.php"); ?>

<style>
    /* =============================================
       ATTENDANCE PAGE - CUSTOM STYLES (Argon Base)
       ============================================= */

    /* ── Meeting Info Cards ── */
    .meeting-info-card {
        background: #172b4d;
        border-radius: 10px;
        padding: 14px 18px;
        display: flex;
        align-items: center;
        gap: 14px;
        border: 1px solid rgba(255,255,255,0.08);
    }

    .meeting-info-icon {
        width: 42px;
        height: 42px;
        background: rgba(94, 114, 228, 0.25);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: #a29bfe;
        flex-shrink: 0;
    }

    .meeting-info-sub {
        font-size: 10px;
        font-weight: 700;
        color: rgba(255,255,255,0.4);
        text-transform: uppercase;
        letter-spacing: 0.8px;
        margin-bottom: 4px;
    }

    .meeting-info-value {
        font-size: 15px;
        font-weight: 700;
        color: #ffffff;
        min-height: 20px;
    }

    /* Shimmer loading */
    @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }

    .shimmer-block {
        display: inline-block;
        background: linear-gradient(90deg,
            rgba(255,255,255,0.06) 25%,
            rgba(255,255,255,0.14) 50%,
            rgba(255,255,255,0.06) 75%);
        background-size: 200% 100%;
        animation: shimmer 1.4s infinite;
        border-radius: 4px;
        height: 15px;
        width: 110px;
        vertical-align: middle;
    }

    /* ── Section Banner ── */
    .attendance-banner {
        background: linear-gradient(135deg, #5e72e4 0%, #825ee4 100%);
        border-radius: 10px 10px 0 0;
        padding: 18px 22px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        overflow: hidden;
    }

    .attendance-banner::after {
        content: '';
        position: absolute;
        top: -25px; right: -25px;
        width: 100px; height: 100px;
        background: rgba(255,255,255,0.08);
        border-radius: 50%;
    }

    .attendance-banner h4 {
        font-size: 15px;
        font-weight: 700;
        color: #fff;
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        gap: 9px;
        position: relative;
        z-index: 1;
    }

    .attendance-banner p {
        font-size: 12.5px;
        color: rgba(255,255,255,0.72);
        margin: 0;
        padding-left: 27px;
        position: relative;
        z-index: 1;
    }

    .live-badge {
        display: none;
        align-items: center;
        gap: 6px;
        padding: 5px 12px;
        background: rgba(255,255,255,0.18);
        border: 1px solid rgba(255,255,255,0.28);
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        color: #fff;
        position: relative;
        z-index: 1;
    }

    .live-dot {
        width: 7px;
        height: 7px;
        background: #86efac;
        border-radius: 50%;
        animation: pulse-dot 1.8s infinite;
    }

    @keyframes pulse-dot {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.35; }
    }

    /* ── Attendance Table ── */
    .attendance-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 0;
    }

    .attendance-table thead tr {
        background: #f8f9fc;
        border-bottom: 2px solid #e8edf2;
    }

    .attendance-table thead th {
        padding: 13px 16px;
        font-size: 10.5px;
        font-weight: 700;
        color: #8898aa;
        text-transform: uppercase;
        letter-spacing: 1px;
        border: none;
    }

    .attendance-table tbody tr {
        border-bottom: 1px solid #f4f6f9;
        transition: background 0.12s;
    }

    .attendance-table tbody tr:last-child {
        border-bottom: none;
    }

    .attendance-table tbody tr:hover {
        background: #f8f9fc;
    }

    .attendance-table tbody td {
        padding: 14px 16px;
        border: none;
        vertical-align: middle;
    }

    .serial-number {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        background: rgba(94, 114, 228, 0.1);
        color: #5e72e4;
        border-radius: 7px;
        font-size: 12px;
        font-weight: 700;
    }

    .member-name-text {
        font-size: 14px;
        font-weight: 500;
        color: #32325d;
        margin: 0;
    }

    /* ── Toggle Switch ── */
    .attendance-toggle-wrapper {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .attendance-toggle {
        position: relative;
        width: 52px;
        height: 27px;
        flex-shrink: 0;
    }

    .attendance-toggle input[type="checkbox"] {
        opacity: 0;
        width: 0;
        height: 0;
        position: absolute;
    }

    .toggle-switch {
        position: absolute;
        cursor: pointer;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: #f5365c;
        transition: .28s;
        border-radius: 27px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.18);
    }

    .toggle-switch:before {
        position: absolute;
        content: "";
        height: 21px;
        width: 21px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: .28s;
        border-radius: 50%;
        box-shadow: 0 1px 4px rgba(0,0,0,0.22);
    }

    .attendance-toggle input[type="checkbox"]:checked + .toggle-switch {
        background-color: #2dce89;
    }

    .attendance-toggle input[type="checkbox"]:checked + .toggle-switch:before {
        transform: translateX(25px);
    }

    .toggle-status-label {
        font-size: 12.5px;
        font-weight: 600;
        padding: 3px 12px;
        border-radius: 6px;
        transition: all 0.25s;
        min-width: 64px;
        text-align: center;
        border: 1.5px solid transparent;
    }

    .toggle-status-label.present {
        color: #1aae6f;
        background-color: rgba(45, 206, 137, 0.1);
        border-color: rgba(45, 206, 137, 0.22);
    }

    .toggle-status-label.absent {
        color: #f5365c;
        background-color: rgba(245, 54, 92, 0.08);
        border-color: rgba(245, 54, 92, 0.2);
    }

    /* ── Empty States ── */
    .empty-state-box {
        text-align: center;
        padding: 52px 20px;
    }

    .empty-state-icon {
        width: 66px;
        height: 66px;
        background: #f4f6f9;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26px;
        color: #8898aa;
        margin: 0 auto 18px;
    }

    .empty-state-box h5 {
        font-size: 16px;
        font-weight: 700;
        color: #32325d;
        margin-bottom: 6px;
    }

    .empty-state-box p {
        font-size: 13px;
        color: #8898aa;
        margin-bottom: 20px;
    }

    /* Loading spinner row */
    .loading-row td {
        text-align: center;
        padding: 44px 16px;
        color: #8898aa;
        font-size: 13.5px;
    }

    /* ── Action Buttons ── */
    .btn-att-back {
        background: #f5365c;
        border: none;
        color: #fff;
        font-weight: 600;
        font-size: 14px;
        padding: 13px 20px;
        border-radius: 8px;
        width: 100%;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        text-decoration: none;
    }

    .btn-att-back:hover {
        background: #d42b4f;
        color: #fff;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(245,54,92,0.3);
    }

    .btn-att-save {
        background: #2dce89;
        border: none;
        color: #fff;
        font-weight: 600;
        font-size: 14px;
        padding: 13px 20px;
        border-radius: 8px;
        width: 100%;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        cursor: pointer;
        font-family: inherit;
        box-shadow: 0 2px 8px rgba(45,206,137,0.25);
    }

    .btn-att-save:hover:not(:disabled) {
        background: #24a46d;
        transform: translateY(-1px);
        box-shadow: 0 4px 14px rgba(45,206,137,0.35);
    }

    .btn-att-save:disabled {
        opacity: 0.45;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }

    .btn-spinner {
        display: inline-block;
        width: 16px; height: 16px;
        border: 2px solid rgba(255,255,255,0.3);
        border-top-color: #fff;
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
        vertical-align: middle;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    .d-none { display: none !important; }
</style>

<body>
    <?php include("Components/Sidebar.php"); ?>

    <div class="main-content" id="panel">

        <?php include("Components/Navbar.php"); ?>

        <!-- Page Header (Argon standard) -->
        <div class="header bg-default pb-6">
            <div class="container-fluid">
                <div class="header-body">
                    <div class="row align-items-center py-4">
                        <div class="col-lg-6 col-7">
                            <h6 class="h2 text-white mb-0">Add Attendance</h6>
                            <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                                    <li class="breadcrumb-item">
                                        <a href="#"><i class="fas fa-home"></i></a>
                                    </li>
                                    <li class="breadcrumb-item">
                                        <a href="ManageAttendence.php">Manage Attendance</a>
                                    </li>
                                    <li class="breadcrumb-item active" aria-current="page">
                                        Add Attendance
                                    </li>
                                </ol>
                            </nav>
                        </div>
                        <div class="col-lg-6 col-5 text-right">
                            <button class="btn btn-sm btn-neutral" onclick="refreshMeeting()">
                                <i class="fas fa-sync-alt mr-1"></i> Refresh Meeting
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Page Content -->
        <div class="container-fluid mt--6">
            <div class="row">
                <div class="col-xl-12 col-md-12">

                    <div class="card shadow border-0">

                        <!-- ── Banner Header ── -->
                        <div class="attendance-banner">
                            <div>
                                <h4><i class="fas fa-calendar-check"></i> Today's Meeting Attendance</h4>
                                <p>Toggle the switch to mark members as Present or Absent</p>
                            </div>
                            <div class="live-badge" id="liveBadge">
                                <div class="live-dot"></div> Live
                            </div>
                        </div>

                        <!-- ── Card Body ── -->
                        <div class="card-body">
                            <form id="attendanceForm" autocomplete="off">

                                <!-- Meeting Info Row -->
                                <div class="row mb-4">
                                    <div class="col-md-4 mb-3 mb-md-0">
                                        <label class="form-control-label text-muted text-uppercase" style="font-size:11px;letter-spacing:.8px;font-weight:700;">Meeting Title</label>
                                        <div class="meeting-info-card mt-1">
                                            <div class="meeting-info-icon">
                                                <i class="fas fa-bookmark"></i>
                                            </div>
                                            <div>
                                                <div class="meeting-info-sub">Current Meeting</div>
                                                <div class="meeting-info-value" id="meeting_id_input_value">
                                                    <span class="shimmer-block"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <label class="form-control-label text-muted text-uppercase" style="font-size:11px;letter-spacing:.8px;font-weight:700;">Meeting Date</label>
                                        <div class="meeting-info-card mt-1">
                                            <div class="meeting-info-icon">
                                                <i class="fas fa-calendar-day"></i>
                                            </div>
                                            <div>
                                                <div class="meeting-info-sub">Current Meeting Date</div>
                                                <div class="meeting-info-value" id="meeting_date_input_value">
                                                    <span class="shimmer-block"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Hidden inputs -->
                                <input type="hidden" id="meeting_id_input" name="meeting_id" value="">
                                <input type="hidden" id="meeting_id_hidden" value="">

                                <hr style="border-color:#f0f2f5; margin: 0 0 20px;">

                                <!-- Attendance Table -->
                                <div class="table-responsive">
                                    <table class="attendance-table" id="membersTable">
                                        <thead>
                                            <tr>
                                                <th width="10%">S.No</th>
                                                <th width="50%">Member Name</th>
                                                <th width="40%">Attendance Status</th>
                                            </tr>
                                        </thead>
                                        <tbody id="membersTableBody">
                                            <tr class="loading-row">
                                                <td colspan="3">
                                                    <div class="spinner-border spinner-border-sm text-primary mr-2" role="status"></div>
                                                    Loading meeting details...
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <!-- No Members -->
                                    <div id="noMembersMessage" class="empty-state-box d-none">
                                        <div class="empty-state-icon"><i class="fas fa-user-slash"></i></div>
                                        <h5>No Members Found</h5>
                                        <p>There are no active members in the system.</p>
                                    </div>

                                    <!-- No Meeting -->
                                    <div id="noMeetingMessage" class="empty-state-box d-none">
                                        <div class="empty-state-icon"><i class="fas fa-calendar-times"></i></div>
                                        <h5>No Meeting Scheduled</h5>
                                        <p>There is no meeting scheduled for today.</p>
                                        <button type="button" class="btn btn-primary btn-sm mt-1" onclick="refreshMeeting()">
                                            <i class="fas fa-sync-alt mr-1"></i> Check Again
                                        </button>
                                    </div>
                                </div>

                                <!-- Action Buttons -->
                                <div class="row mt-4">
                                    <div class="col-md-6 mb-3 mb-md-0">
                                        <a href="ManageAttendence.php" class="btn-att-back">
                                            <i class="fas fa-arrow-left"></i>&ensp;Back
                                        </a>
                                    </div>
                                    <div class="col-md-6">
                                        <button type="submit" class="btn-att-save" id="submitBtn" disabled>
                                            <span id="submitText">
                                                <i class="fas fa-save"></i>&ensp;Save Attendance
                                            </span>
                                            <span id="submitSpinner" class="d-none">
                                                <span class="btn-spinner"></span>
                                                Saving...
                                            </span>
                                        </button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div><!-- /main-content -->

    <?php include("Components/FooterLinks.php"); ?>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script>
    let allMembers = [];
    let currentMeeting = null;

    document.addEventListener('DOMContentLoaded', function() {
        loadTodaysMeeting();
        document.getElementById('attendanceForm').addEventListener('submit', saveAttendance);
    });

    function loadTodaysMeeting() {
        setShimmer();
        resetTable();
        disableSubmit();
        document.getElementById('liveBadge').style.display = 'none';
        document.getElementById('noMeetingMessage').classList.add('d-none');

        fetch('http://localhost:3000/api/user/getmeetingid')
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                if (data.status === 'success' && data.data) {
                    currentMeeting = data.data;
                    displayMeetingInfo(currentMeeting);
                    loadMembersForMeeting(currentMeeting.id);
                } else {
                    showNoMeetingMessage();
                }
            })
            .catch(error => {
                console.error('Error loading meeting:', error);
                showNoMeetingMessage();
            });
    }

    function setShimmer() {
        document.getElementById('meeting_id_input_value').innerHTML = '<span class="shimmer-block"></span>';
        document.getElementById('meeting_date_input_value').innerHTML = '<span class="shimmer-block"></span>';
    }

    function resetTable() {
        document.getElementById('membersTableBody').innerHTML = `
            <tr class="loading-row">
                <td colspan="3">
                    <div class="spinner-border spinner-border-sm text-primary mr-2" role="status"></div>
                    Loading meeting details...
                </td>
            </tr>`;
        document.getElementById('membersTable').classList.remove('d-none');
        document.getElementById('noMembersMessage').classList.add('d-none');
        document.getElementById('noMeetingMessage').classList.add('d-none');
    }

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
                const timezoneOffset = date.getTimezoneOffset() * 60000;
                const localDate = new Date(date.getTime() - timezoneOffset);
                return `${String(localDate.getDate()).padStart(2,'0')}/${String(localDate.getMonth()+1).padStart(2,'0')}/${localDate.getFullYear()}`;
            }
            const date = new Date(dateString);
            if (!isNaN(date.getTime())) {
                return `${String(date.getDate()).padStart(2,'0')}/${String(date.getMonth()+1).padStart(2,'0')}/${date.getFullYear()}`;
            }
            return dateString;
        } catch (error) {
            return dateString;
        }
    }

    function displayMeetingInfo(meeting) {
        document.getElementById('meeting_id_input').value = meeting.meeting_title || `Meeting #${meeting.id}`;
        document.getElementById('meeting_id_hidden').value = meeting.id;
        document.getElementById('meeting_id_input_value').textContent = meeting.meeting_title || `Meeting #${meeting.id}`;
        document.getElementById('meeting_date_input_value').textContent = formatDateForDisplay(meeting.meeting_date);
        document.getElementById('liveBadge').style.display = 'flex';
    }

    function loadMembersForMeeting(meetingId) {
        resetTable();
        disableSubmit();

        fetch('http://localhost:3000/api/user/getusers')
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                if (data.status === 'success' && data.data && data.data.length > 0) {
                    allMembers = data.data;
                    renderMembers(allMembers);
                    enableSubmit();
                } else {
                    document.getElementById('membersTableBody').innerHTML = '';
                    document.getElementById('membersTable').classList.add('d-none');
                    document.getElementById('noMembersMessage').classList.remove('d-none');
                    allMembers = [];
                    disableSubmit();
                }
            })
            .catch(error => {
                console.error('Error loading members:', error);
                document.getElementById('membersTableBody').innerHTML = `
                    <tr class="loading-row">
                        <td colspan="3" class="text-danger">
                            <i class="fas fa-exclamation-triangle mr-2"></i>
                            Error loading members. Please try again.
                            <button onclick="loadMembersForMeeting(${meetingId})" class="btn btn-sm btn-primary ml-3">
                                <i class="fas fa-redo mr-1"></i> Retry
                            </button>
                        </td>
                    </tr>`;
                disableSubmit();
            });
    }

    function renderMembers(members) {
        const tableBody = document.getElementById('membersTableBody');
        tableBody.innerHTML = '';

        members.forEach((member, index) => {
            const row = document.createElement('tr');
            row.className = 'member-row';
            row.dataset.memberId = member.id;

            let memberName = 'N/A';
            if (member.name) memberName = member.name;
            else if (member.full_name) memberName = member.full_name;
            else if (member.first_name && member.last_name) memberName = `${member.first_name} ${member.last_name}`;
            else if (member.username) memberName = member.username;

            row.innerHTML = `
                <td><span class="serial-number">${index + 1}</span></td>
                <td><p class="member-name-text">${memberName}</p></td>
                <td>
                    <div class="attendance-toggle-wrapper">
                        <div class="attendance-toggle">
                            <input type="checkbox" id="attendance_${member.id}"
                                   name="attendance_status[${member.id}]"
                                   checked
                                   data-member-id="${member.id}"
                                   class="attendance-checkbox">
                            <label for="attendance_${member.id}" class="toggle-switch m-0"></label>
                        </div>
                        <span class="toggle-status-label present" id="status_${member.id}">Present</span>
                    </div>
                </td>`;

            tableBody.appendChild(row);
        });

        initializeToggleListeners();
    }

    function initializeToggleListeners() {
        document.getElementById('membersTableBody').addEventListener('change', function(e) {
            if (e.target && e.target.classList.contains('attendance-checkbox')) {
                const memberId = e.target.dataset.memberId;
                const statusLabel = document.getElementById('status_' + memberId);
                if (e.target.checked) {
                    statusLabel.textContent = 'Present';
                    statusLabel.classList.remove('absent');
                    statusLabel.classList.add('present');
                } else {
                    statusLabel.textContent = 'Absent';
                    statusLabel.classList.remove('present');
                    statusLabel.classList.add('absent');
                }
            }
        });
    }

    function showNoMeetingMessage() {
        document.getElementById('meeting_id_input_value').textContent = '—';
        document.getElementById('meeting_date_input_value').textContent = '—';
        document.getElementById('membersTableBody').innerHTML = '';
        document.getElementById('membersTable').classList.add('d-none');
        document.getElementById('noMeetingMessage').classList.remove('d-none');
        allMembers = [];
        disableSubmit();
    }

    function refreshMeeting() {
        loadTodaysMeeting();
    }

    function enableSubmit() {
        document.getElementById('submitBtn').disabled = false;
    }

    function disableSubmit() {
        document.getElementById('submitBtn').disabled = true;
    }

    function saveAttendance(event) {
        event.preventDefault();

        if (!currentMeeting) {
            Swal.fire({ icon: 'error', title: 'Error!', text: 'No meeting selected. Please refresh the page.' });
            return;
        }

        const attendanceData = [{ meeting_id: currentMeeting.id }];

        document.querySelectorAll('.member-row').forEach(row => {
            const memberId = row.dataset.memberId;
            const checkbox = document.querySelector(`#attendance_${memberId}`);
            if (checkbox) {
                attendanceData.push({
                    member_id: parseInt(memberId),
                    status: checkbox.checked ? 'present' : 'absent'
                });
            }
        });

        const submitBtn = document.getElementById('submitBtn');
        document.getElementById('submitText').classList.add('d-none');
        document.getElementById('submitSpinner').classList.remove('d-none');
        submitBtn.disabled = true;

        const userEmail = localStorage.getItem("userEmail");

        fetch('http://localhost:3000/api/user/addattendance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ useremail: userEmail, attendance_data: attendanceData })
        })
        .then(async response => {
            let errorData = null;
            try { errorData = await response.json(); } catch(e) { errorData = await response.text(); }
            if (!response.ok) throw new Error("Attendance already exists for this meeting");
            return errorData;
        })
        .then(data => {
            document.getElementById('submitText').classList.remove('d-none');
            document.getElementById('submitSpinner').classList.add('d-none');
            submitBtn.disabled = false;

            if (data.status === 'success') {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Attendance added successfully',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#2dce89',
                    timer: 3000,
                    timerProgressBar: true
                }).then(() => {
                    document.querySelectorAll('.attendance-checkbox').forEach(toggle => {
                        toggle.checked = true;
                        const statusLabel = document.getElementById('status_' + toggle.dataset.memberId);
                        statusLabel.textContent = 'Present';
                        statusLabel.classList.remove('absent');
                        statusLabel.classList.add('present');
                    });
                });
            } else if (data.status === 'error') {
                Swal.fire({ icon: 'error', title: 'Error!', text: data.message || data.errors || 'Error saving attendance' });
            } else {
                Swal.fire({ icon: 'warning', title: 'Warning!', text: 'Unexpected response from server' });
            }
        })
        .catch(error => {
            document.getElementById('submitText').classList.remove('d-none');
            document.getElementById('submitSpinner').classList.add('d-none');
            submitBtn.disabled = false;
            Swal.fire({ icon: 'error', title: 'Error!', text: error.message });
        });
    }
    </script>
</body>
</html>