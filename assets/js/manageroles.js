// ===============================
// Dummy Roles Data
// ===============================
let rolesData = [
    {
        id: 1,
        name: "Super Admin",
        description: "Full access to all modules and settings."
    },
    {
        id: 2,
        name: "Admin",
        description: "Manage users, meetings and reports."
    },
    {
        id: 3,
        name: "Moderator",
        description: "Can manage members and meetings only."
    },
    {
        id: 4,
        name: "Member",
        description: "Basic dashboard access."
    },
    {
        id: 5,
        name: "Guest",
        description: "Read only access."
    }
];

let table;

// ===============================
// Initialize Page
// ===============================
$(document).ready(function () {
    loadRolesTable();
});


// ===============================
// Load Roles Into DataTable
// ===============================
function loadRolesTable() {

    // Destroy if already exists
    if ($.fn.DataTable.isDataTable('#roles-datatable')) {
        $('#roles-datatable').DataTable().destroy();
    }

    let rows = "";

    rolesData.forEach((role, index) => {
        rows += `
            <tr>
                <td>${index + 1}</td>
                <td>${role.name}</td>
                <td>${role.description}</td>
                <td>
                    

                    <button class="btn btn-sm btn-warning" onclick="editRole(${role.id})">
                        <i class="fas fa-edit"></i>
                    </button>

                    <button class="btn btn-sm btn-danger" onclick="deleteRole(${role.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    $("#rolesTableBody").html(rows);

    // Initialize DataTable
    table = $('#roles-datatable').DataTable({
        pageLength: 5,
        lengthChange: true,
        ordering: true,
        searching: true,
        responsive: true
    });
}


// ===============================
// ACTION 1 → VIEW ROLE
// ===============================
function viewRole(id) {
    let role = rolesData.find(r => r.id === id);

    toastr.info(
        `<b>${role.name}</b><br>${role.description}`,
        "Role Details"
    );
}


// ===============================
// ACTION 2 → EDIT ROLE (Dummy)
// ===============================
function editRole(id) {
    let role = rolesData.find(r => r.id === id);

    toastr.warning("Redirecting to edit page...");

    // Dummy redirect (you can create Edit_Roles.php later)
    setTimeout(() => {
        window.location.href = "Edit_Role.php?id=" + id;
    }, 800);
}


// ===============================
// ACTION 3 → DELETE ROLE
// ===============================
function deleteRole(id) {

    if (!confirm("Are you sure you want to delete this role?"))
        return;

    // Remove from array
    rolesData = rolesData.filter(role => role.id !== id);

    toastr.success("Role deleted successfully");

    // Reload table
    loadRolesTable();
}
