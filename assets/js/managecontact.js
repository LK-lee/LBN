document.addEventListener("DOMContentLoaded", () => {
    fetchContacts();
});

function fetchContacts() {
    fetch("http://localhost:3000/api/user/getcontacts")
        .then(response => response.json())
        .then(result => {

            const contacts = result.data;

            if (!Array.isArray(contacts) || contacts.length === 0) {
                document.getElementById("contactTableBody").innerHTML =
                    `<tr><td colspan="6" class="text-center">No records found</td></tr>`;
                return;
            }
            
            let rows = "";
            contacts.forEach((contact, index) => {
                rows += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${contact.name}</td>
                        <td>${contact.email}</td>
                        <td>${contact.subject}</td>
                        <td>${contact.message}</td>
                        <td>
                            <a href="#" class="btn btn-sm btn-danger"
                               onclick="return deleteContact(${contact.id})">
                                <i class="fas fa-trash"></i>
                            </a>
                        </td>
                    </tr>
                `;
            });

            document.getElementById("contactTableBody").innerHTML = rows;
        })
        .catch(error => {
            console.error("Error fetching contacts:", error);
        });
}


function deleteContact(id) {
    if (!confirm("Are you sure you want to delete this record?")) return false;

    const userEmail = localStorage.getItem("userEmail");

    fetch(`http://localhost:3000/api/user/deletecontact/${id}?useremail=${encodeURIComponent(userEmail)}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(result => {
        alert(result.message || "Deleted successfully");
        fetchContacts();
    })
    .catch(err => console.error(err));

    return false;
}