document.addEventListener("DOMContentLoaded", () => {
    fetchUsers();
});

function fetchUsers() {
    fetch("http://localhost:3000/api/user/getusers")
        .then(response => response.json())
        .then(result => {

            const users = result.data;

            if (!Array.isArray(users) || users.length === 0) {
                document.getElementById("usersTableBody").innerHTML =
                    `<tr><td colspan="6" class="text-center">No records found</td></tr>`;
                return;
            }

            let rows = "";
            users.forEach((user, index) => {
                rows += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.mobile}</td>
                        <td>${user.address}</td>
                        <td>
                            <a href="Edit_User.php?id=${user.id}&type=View"
                               class="btn btn-sm btn-info">
                                <i class="fas fa-eye"></i>
                            </a>

                            <a href="Edit_User.php?id=${user.id}&type=Edit"
                               class="btn btn-sm btn-warning">
                                <i class="fas fa-edit"></i>
                            </a>

                            <a href="#" class="btn btn-sm btn-danger"
                               onclick="return deleteUser(${user.id})">
                                <i class="fas fa-trash"></i>
                            </a>
                        </td>
                    </tr>
                `;
            });

            document.getElementById("usersTableBody").innerHTML = rows;
        })
        .catch(error => {
            console.error("Error fetching users:", error);
        });
}


function deleteUser(id) {
    if (!confirm("Are you sure you want to delete this record?")) return false;

    const userEmail = localStorage.getItem("userEmail");

    fetch(`http://localhost:3000/api/user/deleteuser/${id}?useremail=${encodeURIComponent(userEmail)}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(result => {
        alert(result.message || "Deleted successfully");
        fetchUsers();
    })
    .catch(err => console.error(err));

    return false;
}