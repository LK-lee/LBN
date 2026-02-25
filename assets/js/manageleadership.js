// =====================================
// Dummy Leaders Data
// =====================================
let leadersData = [
    {
        id: 1,
        name: "Krishna",
        designation: "Admin",
        status: true
    },
    {
        id: 2,
        name: "Ramesh",
        designation: "Accountant",
        status: false
    },
    {
        id: 3,
        name: "Suresh",
        designation: "Manager",
        status: true
    }
];

// =====================================
// Initialize Page
// =====================================
$(document).ready(function () {
    loadLeadersTable();

    $("#refreshBtn").click(function () {
        toastr.info("Refreshing table...");
        loadLeadersTable();
    });

    $("#saveAllBtn").click(function () {
        toastr.success("All changes updated successfully!");
        console.log(leadersData); // Later connect to API
    });
});

// =====================================
// Load Table
// =====================================
function loadLeadersTable() {

    if ($.fn.DataTable.isDataTable('#leadersTable')) {
        $('#leadersTable').DataTable().destroy();
    }

    let rows = "";

    leadersData.forEach((leader, index) => {

        let statusLabelClass = leader.status ? "present" : "absent";
        let statusText = leader.status ? "Active" : "Inactive";
        let checked = leader.status ? "checked" : "";

        rows += `
        <tr>
            <td>${index + 1}</td>
            <td>${leader.name}</td>
            <td>
                <select class="form-control col-8"
                        onchange="changeDesignation(${leader.id}, this.value)">
                    <option value="">=== select designation ===</option>
                    <option value="Admin" ${leader.designation === "Admin" ? "selected" : ""}>Admin</option>
                    <option value="Accountant" ${leader.designation === "Accountant" ? "selected" : ""}>Accountant</option>
                    <option value="Manager" ${leader.designation === "Manager" ? "selected" : ""}>Manager</option>
                </select>
            </td>
            <td>
                <div class="attendance-toggle-wrapper">
                    <div class="attendance-toggle">
                        <input type="checkbox"
                               id="attendance_${leader.id}"
                               ${checked}
                               onchange="toggleStatus(${leader.id})"
                               class="attendance-checkbox">
                        <label for="attendance_${leader.id}" class="toggle-switch m-0"></label>
                    </div>
                    <span class="toggle-status-label ${statusLabelClass}"
                          id="status_${leader.id}">
                          ${statusText}
                    </span>
                </div>
            </td>
        </tr>
        `;
    });

    $("#leadersTableBody").html(rows);

    $('#leadersTable').DataTable({
        pageLength: 5,
        searching: true,
        ordering: true,
        responsive: true
    });
}

// =====================================
// Toggle Status
// =====================================
function toggleStatus(id) {

    let leader = leadersData.find(l => l.id === id);
    if (!leader) return;

    leader.status = !leader.status;

    let label = $("#status_" + id);

    if (leader.status) {
        label.removeClass("absent")
             .addClass("present")
             .text("Active");
        toastr.success("Leader Activated");
    } else {
        label.removeClass("present")
             .addClass("absent")
             .text("Inactive");
        toastr.warning("Leader Deactivated");
    }
}

// =====================================
// Change Designation
// =====================================
function changeDesignation(id, value) {

    let leader = leadersData.find(l => l.id === id);
    if (!leader) return;

    leader.designation = value;

    toastr.info("Designation updated to " + value);
}