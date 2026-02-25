document.addEventListener('DOMContentLoaded', function () {

    const tableContainer = document.getElementById('tableContainer');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const noDataMessage = document.getElementById('noDataMessage');
    const logsTableBody = document.getElementById('logsTableBody');

    const refreshBtn = document.getElementById('refreshBtn');
    const filterBtn = document.getElementById('filterBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const fromDateInput = document.getElementById('fromDate');
    const toDateInput = document.getElementById('toDate');

    let dataTable = null;
    let allLogs = [];

    // =====================
    // FORMAT DATE
    // =====================
    function formatDateTime(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString();
    }

    // =====================
    // BADGE COLOR
    // =====================
    function getBadgeClass(action) {
        if (!action) return 'badge-secondary';

        action = action.toLowerCase();

        if (action.includes('add')) return 'badge-success';
        if (action.includes('update')) return 'badge-warning';
        if (action.includes('delete')) return 'badge-danger';
        if (action.includes('login')) return 'badge-primary';

        return 'badge-secondary';
    }

    // =====================
    // DISPLAY LOGS
    // =====================
    function displayLogs(logs) {

        // Destroy existing table safely
        if ($.fn.DataTable.isDataTable('#datatable-basic')) {
            $('#datatable-basic').DataTable().clear().destroy();
        }

        logsTableBody.innerHTML = '';

        if (logs.length === 0) {
            noDataMessage.classList.remove('d-none');
            tableContainer.classList.add('d-none');
            return;
        }

        noDataMessage.classList.add('d-none');

        // Sort latest first
        logs.sort((a, b) =>
            new Date(b.created_at) - new Date(a.created_at)
        );

        logs.forEach((log, index) => {

            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${log.user_type || 'N/A'}</td>
                <td>${log.username || 'N/A'}</td>
                <td>${log.member_id || 'N/A'}</td>
                <td>
                    <span class="badge ${getBadgeClass(log.action)}">
                        ${log.action || 'N/A'}
                    </span>
                </td>
                <td>${log.description || 'N/A'}</td>
                <td>${log.reference_table || 'N/A'}</td>
                <td>${log.reference_id || 'N/A'}</td>
                <td>${log.ip_address || 'N/A'}</td>
                <td>${formatDateTime(log.created_at)}</td>
            `;

            logsTableBody.appendChild(row);
        });

        tableContainer.classList.remove('d-none');

        // Initialize DataTable properly
        setTimeout(() => {

            dataTable = $('#datatable-basic').DataTable({

                pageLength: 10,

                responsive: true,
                autoWidth: false,

                scrollX: false,
                scrollCollapse: false,

                columnDefs: [
                    { targets: 0, width: "60px" },
                    { targets: 4, width: "150px" },
                    { targets: 9, width: "180px" }
                ],

                language: {
                    emptyTable: "No logs available"
                }

            });

            dataTable.columns.adjust().draw();

        }, 100);
    }

    // =====================
    // FETCH LOGS
    // =====================
    function fetchLogs() {

        loadingSpinner.classList.remove('d-none');
        tableContainer.classList.add('d-none');
        errorMessage.classList.add('d-none');

        fetch('http://localhost:3000/api/user/getapplog')
            .then(res => res.json())
            .then(data => {

                loadingSpinner.classList.add('d-none');

                if (data.status === 'success') {
                    allLogs = data.data || [];
                    displayLogs(allLogs);
                } else {
                    errorText.textContent = data.message || "Failed to load logs";
                    errorMessage.classList.remove('d-none');
                }

            })
            .catch(err => {
                loadingSpinner.classList.add('d-none');
                errorText.textContent = err.message;
                errorMessage.classList.remove('d-none');
            });
    }

    // =====================
    // FILTER LOGS
    // =====================
    filterBtn.addEventListener("click", () => {

        const fromDate = fromDateInput.value;
        const toDate = toDateInput.value;

        if (!fromDate && !toDate) {
            displayLogs(allLogs);
            return;
        }

        const filtered = allLogs.filter(log => {

            const logDate = new Date(log.created_at);

            if (fromDate) {
                if (logDate < new Date(fromDate)) return false;
            }

            if (toDate) {
                const to = new Date(toDate);
                to.setHours(23, 59, 59, 999);
                if (logDate > to) return false;
            }

            return true;
        });

        displayLogs(filtered);
    });

    // =====================
    // DELETE LOGS BY DATE
    // =====================
    deleteBtn.addEventListener("click", async () => {

        const fromDate = fromDateInput.value;
        const toDate = toDateInput.value;

        if (!fromDate || !toDate) {
            alert("Please select both From Date and To Date");
            return;
        }

        if (!confirm("Are you sure you want to delete logs between selected dates?")) {
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:3000/api/user/deletelogsbydate",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        startDate: fromDate,
                        endDate: toDate
                    })
                }
            );

            const result = await response.json();

            if (result.status === "success") {
                alert(result.message);
                fetchLogs();
            } else {
                alert(result.message || "Delete failed");
            }

        } catch (error) {
            alert(error.message);
        }

    });

    // =====================
    // REFRESH BUTTON
    // =====================
    refreshBtn.addEventListener('click', () => {

        fromDateInput.value = '';
        toDateInput.value = '';

        fetchLogs();
    });

    // Initial Load
    fetchLogs();

});