<!-- =============================
        AUTH GUARD
============================== -->
<script>
(function () {
    if (!localStorage.getItem('token') || !localStorage.getItem('userEmail')) {
        fetch('clear_session.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).finally(() => {
            window.location.href = 'index.php';
        });
        throw new Error('Authentication failed');
    }
})();
</script>

<!-- =============================
        CORE JS
============================== -->
<script src="assets/vendor/jquery/dist/jquery.min.js"></script>
<script src="assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script>

<!-- =============================
        PLUGINS
============================== -->
<script src="assets/vendor/js-cookie/js.cookie.js"></script>
<script src="assets/vendor/jquery.scrollbar/jquery.scrollbar.min.js"></script>
<script src="assets/vendor/jquery-scroll-lock/dist/jquery-scrollLock.min.js"></script>

<!-- =============================
        TOASTR (FIX)
============================== -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>


 <script>
    // Configure Toastr
    toastr.options = {
      "closeButton": true,
      "progressBar": true,
      "positionClass": "toast-top-right",
      "timeOut": "3000",
      "extendedTimeOut": "1000"
    };
  </script>

<!-- =============================
        OPTIONAL / CHARTS
============================== -->
<script src="assets/vendor/chart.js/dist/Chart.min.js"></script>
<script src="assets/vendor/chart.js/dist/Chart.extension.js"></script>

<!-- =============================
        DATATABLES
============================== -->
<script src="assets/vendor/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="assets/vendor/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
<script src="assets/vendor/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
<script src="assets/vendor/datatables.net-buttons-bs4/js/buttons.bootstrap4.min.js"></script>
<script src="assets/vendor/datatables.net-buttons/js/buttons.html5.min.js"></script>
<script src="assets/vendor/datatables.net-buttons/js/buttons.flash.min.js"></script>
<script src="assets/vendor/datatables.net-buttons/js/buttons.print.min.js"></script>
<script src="assets/vendor/datatables.net-select/js/dataTables.select.min.js"></script>

<!-- =============================
        ARGON
============================== -->
<script src="assets/js/argon.min23cd.js?v=1.2.1"></script>

<!-- Demo JS (Optional – remove in production) -->
<script src="assets/js/demo.min.js"></script>

<!-- =============================
        LOGOUT
============================== -->

<script>
function logoutUser() {
    localStorage.clear();
    window.location.href = "index.php";
}
</script>