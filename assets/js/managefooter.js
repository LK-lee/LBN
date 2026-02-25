document.addEventListener("DOMContentLoaded", function () {

    const footerTableBody = document.getElementById("footerTableBody");
    const refreshBtn = document.getElementById("refreshBtn");

    let dataTable = null;

    // ===============================
    // 🔹 Dummy Data
    // ===============================
    let footerData = [
        {
            id: 1,
            email: "admin@gmail.com",
            address: "6-145 MainRoad",
            number: "8888888888",
            map: "https://www.google.com/maps?q=Hyderabad&output=embed"
        },
        {
            id: 2,
            email: "admin@gmail.com",
            address: "6-145 MainRoad",
            number: "8888888888",
            map: "https://www.google.com/maps?q=Mumbai&output=embed"
        },
        {
            id: 3,
            email: "admin@gmail.com",
            address: "6-145 MainRoad",
            number: "8888888888",
            map: "https://www.google.com/maps?q=Chennai&output=embed"
        }
    ];

    // ===============================
    // 🔹 Load Table
    // ===============================
    function loadTable() {

        // Destroy previous DataTable
        if ($.fn.DataTable.isDataTable("#footerTable")) {
            $("#footerTable").DataTable().destroy();
        }

        footerTableBody.innerHTML = "";

        footerData.forEach((item, index) => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.email}</td>
                <td>${item.address}</td>
                <td>${item.number}</td>
                <td>
                    <a href="#" onclick="viewMap('${item.map}')" class="text-primary">
                        https://google/maps.xyz
                    </a>
                </td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewMap('${item.map}')">
                        <i class="fas fa-eye"></i>
                    </button>

                    <button class="btn btn-sm btn-warning" onclick="editFooter(${item.id})">
                        <i class="fas fa-edit"></i>
                    </button>

                    <button class="btn btn-sm btn-danger" onclick="deleteFooter(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;

            footerTableBody.appendChild(row);
        });

        // Initialize DataTable (same style as screenshot)
        dataTable = $("#footerTable").DataTable({
            pageLength: 10,
            responsive: false,
            autoWidth: false,
            scrollX: false,
            ordering: true,
            searching: true
        });
    }

    // ===============================
    // 🔹 View Map (Modal)
    // ===============================
    window.viewMap = function (mapUrl) {

        const container = document.getElementById("mapIframeContainer");

        container.innerHTML = `
            <iframe 
                src="${mapUrl}" 
                width="100%" 
                height="400" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy">
            </iframe>
        `;

        $("#mapModal").modal("show");
    };

    // ===============================
    // 🔹 Edit
    // ===============================
    window.editFooter = function (id) {
        alert("Redirecting to edit page for ID: " + id);
        // Later:
        // window.location.href = "Edit_Footer.php?id=" + id;
    };

    // ===============================
    // 🔹 Delete
    // ===============================
    window.deleteFooter = function (id) {

        if (!confirm("Are you sure you want to delete this footer record?")) return;

        footerData = footerData.filter(item => item.id !== id);

        loadTable();
    };

    // ===============================
    // 🔹 Refresh
    // ===============================
    refreshBtn.addEventListener("click", function () {
        loadTable();
    });

    // Initial Load
    loadTable();

});