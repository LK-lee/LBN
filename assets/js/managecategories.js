$(document).ready(function () {

    /* =========================
       TOASTR CONFIG
    ========================= */
    toastr.options = {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-top-right",
        timeOut: 3000,
        preventDuplicates: true
    };

    /* =========================
       DATATABLE INIT
    ========================= */
    const table = $('#categories-datatable').DataTable({
        pageLength: 10,
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        autoWidth: false,
        processing: true,
        dom: '<"top"lf>rt<"bottom"ip>',
        language: {
            searchPlaceholder: "Search categories...",
            paginate: {
                previous: '<i class="fas fa-angle-left"></i>',
                next: '<i class="fas fa-angle-right"></i>'
            }
        },
        columns: [
            {
                data: null,
                orderable: false,
                searchable: false,
                render: (d, t, r, meta) =>
                    `<span class="text-muted">${meta.row + meta.settings._iDisplayStart + 1}</span>`
            },
            {
                data: "name",
                render: name => `<span title="${name}">${name}</span>`
            },
            {
                data: "id",
                orderable: false,
                searchable: false,
                className: "text-center",
                render: (id, t, row) => `
                    <div class="btn-group btn-group-sm">
                        
                        <a href="Edit_Category.php?id=${id}&type=Edit"
                           class="btn btn-warning" title="Edit">
                            <i class="fas fa-edit"></i>
                        </a>&ensp;&ensp;
                        <button class="btn btn-danger delete-category"
                                data-id="${id}"
                                data-name="${row.name}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `
            }
        ],
        data: []
    });

    loadCategories(table);

    /* =========================
       DELETE HANDLER
    ========================= */
    $('#categories-datatable').on('click', '.delete-category', function () {
        const id = $(this).data('id');
        const name = $(this).data('name');

        if (!confirm(`Delete "${name}"?`)) return;

        deleteCategory(id, name, table);
    });
});

/* =========================
   LOAD CATEGORIES
========================= */
async function loadCategories(table) {
    try {
        const res = await fetch('http://localhost:3000/api/user/getallcategories');
        const result = await res.json();

        const data = result.data || result.categories || [];

        table.clear();

        if (!data.length) {
            toastr.info("No categories found");
            table.draw();
            return;
        }

        table.rows.add(data).draw();

    } catch (err) {
        console.error(err);
        toastr.error("Failed to load categories");
    }
}

/* =========================
   DELETE CATEGORY
========================= */
async function deleteCategory(id, name, table) {
    try {
        const userEmail = localStorage.getItem("userEmail");

        const res = await fetch(
            `http://localhost:3000/api/user/deletecategory/${id}?useremail=${encodeURIComponent(userEmail)}`,
            { method: "DELETE" }
        );

        // 🔥 IMPORTANT FIX — check HTTP status first
        if (!res.ok) {
            const errorText = await res.text(); // backend may not send JSON
            throw new Error(errorText || "Delete request failed");
        }

        // Try to read JSON if exists (optional)
        let result = {};
        try {
            result = await res.json();
        } catch {
            // ignore if no JSON returned
        }

        toastr.success(`Category "${name}" deleted successfully`);

        // reload table
        loadCategories(table);

    } catch (err) {
        console.error(err);
        toastr.error("Failed to delete category");
    }
}
