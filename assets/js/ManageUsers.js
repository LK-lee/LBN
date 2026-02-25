// =====================================
// Dummy Users Data
// =====================================
let usersData = [
    {
        id: 1,
        name: "Matta Leela Krishna",
        email: "gamingsun27@gmail.com",
        profile: "https://i.pravatar.cc/80?img=12",
        companyLogo: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
        mobile: "6300492751"
    },
    {
        id: 2,
        name: "Lee",
        email: "kleela106@gmail.com",
        profile: "https://i.pravatar.cc/80?img=3",
        companyLogo: "https://cdn-icons-png.flaticon.com/512/732/732200.png",
        mobile: "6300492757"
    },
    {
        id: 3,
        name: "Deepak",
        email: "deepudeepak6287@gmail.com",
        profile: "https://i.pravatar.cc/80?img=5",
        companyLogo: "https://cdn-icons-png.flaticon.com/512/5968/5968853.png",
        mobile: "9542921539"
    }
];

let table;

// =====================================
// Initialize Page
// =====================================
$(document).ready(function () {
    loadUsersTable();
});


// =====================================
// Load Table
// =====================================
function loadUsersTable() {

    if ($.fn.DataTable.isDataTable('#user-datatable')) {
        $('#users-datatable').DataTable().destroy();
    }

    let rows = "";

    usersData.forEach((user, index) => {
        rows += `
        <tr>
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>

            <td>
                <img src="${user.profile}" class="avatar rounded-circle shadow" width="45">
            </td>

            <td>
                <img src="${user.companyLogo}" class="rounded shadow-sm" width="45">
            </td>

            <td>${user.mobile}</td>

            <td>
                <button class="btn btn-sm btn-info" onclick="viewUser(${user.id})">
                    <i class="fas fa-eye"></i>
                </button>

                <button class="btn btn-sm btn-warning" onclick="editUser(${user.id})">
                    <i class="fas fa-edit"></i>
                </button>

                <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    });

    $("#usersTableBody").html(rows);

    $('#user-datatable').DataTable({
        pageLength: 5,
        lengthChange: true,
        ordering: true,
        searching: true,
        autoWidth: false,
        responsive: true,
        columnDefs: [
            { targets: 0, width: "60px" },
            { targets: 3, width: "90px" },
            { targets: 4, width: "120px" },
            { targets: 6, width: "140px" }
        ]
    });
}


// =====================================
// ACTIONS
// =====================================

function viewUser(id) {
    toastr.warning("Redirecting to edit page...");
    setTimeout(() => {
        window.location.href = "Edit_User.php";
    }, 1000);
    
    // let user = usersData.find(u => u.id === id);
    // toastr.info(`<b>${user.name}</b><br>${user.email}<br>${user.mobile}`, "User Details");
}

function editUser(id) {
    toastr.warning("Redirecting to edit page...");
    setTimeout(() => {
        window.location.href = "Edit_User.php";
    }, 1000);
}

function deleteUser(id) {
    if (!confirm("Delete this user?")) return;

    usersData = usersData.filter(u => u.id !== id);
    toastr.success("User deleted successfully");
    loadUsersTable();
}
