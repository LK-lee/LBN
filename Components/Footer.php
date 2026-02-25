<footer class="footer bg-white border-top pt-3 dashboard-footer">


  <div class="row align-items-center justify-content-lg-between">

    <!-- Left Content -->
    <div class="col-lg-6">
      <div class="copyright text-center text-lg-left text-muted">
        &copy; <span id="currentYear"></span>
        <span class="font-weight-bold">Spondias</span>.
        All rights reserved.
      </div>
    </div>

    <!-- Right Content -->
    <div class="col-lg-6">
      <ul class="nav nav-footer justify-content-center justify-content-lg-end">
        <li class="nav-item">
          <span class="nav-link">Designed by K</span>
        </li>
      </ul>
    </div>

  </div>
</footer>

<!-- Dynamic Year Script -->
<script>
  document.getElementById("currentYear").textContent =
    new Date().getFullYear();
</script>
