<?php
// Detect current page
$currentPage = basename($_SERVER['PHP_SELF']);

// Group table-related pages
$tablePages = ['Tables.php', 'Sortable.php', 'Datatables.php'];
$isTableActive = in_array($currentPage, $tablePages);
?>

<nav class="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white" id="sidenav-main">
  <div class="scrollbar-inner">

    <!-- Brand -->
    <div class="sidenav-header d-flex align-items-center">
      <a class="navbar-brand pl-5 ml-3 mt-4" href="Home.php">
        <b class=""><img src="assets/img/brand/logo-3.png" width="70px"></b>
      </a>

      <div class="ml-auto">
        <div class="sidenav-toggler d-none d-xl-block" data-action="sidenav-unpin" data-target="#sidenav-main">
          <div class="sidenav-toggler-inner">
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="navbar-inner">
      <div class="collapse navbar-collapse" id="sidenav-collapse-main">

        <!-- =============================
                  Nav Items
        ============================= -->
        <ul class="navbar-nav">

          <!-- Dashboard - All roles can see -->
          <li class="nav-item">
            <a class="nav-link <?php echo ($currentPage == 'Home.php') ? 'active' : ''; ?>" href="Home.php">
              <i class="ni ni-shop text-primary"></i>
              <span class="nav-link-text">Dashboard</span>
            </a>
          </li>

          <!-- Datatable - Hidden by default -->
          <li class="nav-item d-none">
            <a class="nav-link <?php echo ($currentPage == 'Datatables.php') ? 'active' : ''; ?>" href="Datatables.php">
              <i class="ni ni-bullet-list-67 text-success"></i>
              <span class="nav-link-text">Datatable</span>
            </a>
          </li>

          <?php if($_SESSION['userrole'] == 'admin'): ?>
          <!-- Admin-only menu items -->
          
          <!-- Manage Roles -->
          <li class="nav-item">
            <a class="nav-link <?php echo ($currentPage == 'ManageRoles.php') ? 'active' : ''; ?>"
              href="ManageRoles.php">
              <i class="ni ni-tag text-primary"></i>
              <span class="nav-link-text">Manage Designation</span>
            </a>
          </li>

          <!-- Manage Category -->
          <li class="nav-item">
            <a class="nav-link <?php echo ($currentPage == 'ManageCategory.php') ? 'active' : ''; ?>"
              href="ManageCategory.php">
              <i class="ni ni-badge text-warning"></i>
              <span class="nav-link-text">Manage TradeCategory</span>
            </a>
          </li>

          <!-- Manage User -->
          <li class="nav-item">
            <a class="nav-link <?php echo ($currentPage == 'ManageUser.php') ? 'active' : ''; ?>"
              href="ManageUser.php">
              <i class="ni ni-circle-08 text-info"></i>
              <span class="nav-link-text">Manage User</span>
            </a>
          </li>

          <!-- Manage LeaderShip -->
          <li class="nav-item">
            <a class="nav-link <?php echo ($currentPage == 'ManageLeadership.php') ? 'active' : ''; ?>"
              href="ManageLeadership.php">
              <i class="ni ni-single-02 text-success"></i>
              <span class="nav-link-text">Manage Leaders</span>
            </a>
          </li>

          <!-- Manage Meetings -->
          <li class="nav-item">
            <a class="nav-link <?php echo ($currentPage == 'ManageMeetings.php') ? 'active' : ''; ?>"
              href="ManageMeetings.php">
              <i class="ni ni-calendar-grid-58 text-primary"></i>
              <span class="nav-link-text">Manage Meetings</span>
            </a>
          </li>

          <!-- Manage Attendence -->
          <li class="nav-item">
            <a class="nav-link <?php echo ($currentPage == 'ManageAttendence.php') ? 'active' : ''; ?>"
              href="ManageAttendence.php">
              <i class="ni ni-check-bold text-success"></i>
              <span class="nav-link-text">Manage Attendence</span>
            </a>
          </li>

          <!-- New Joins -->
          <li class="nav-item">
            <a class="nav-link <?php echo ($currentPage == 'NewJoins.php') ? 'active' : ''; ?>" href="NewJoins.php">
              <i class="ni ni-fat-add text-success"></i>
              <span class="nav-link-text">New Joins</span>
            </a>
          </li>

          <!-- Bussiness Dealings -->
          <li class="nav-item">
            <a class="nav-link <?php echo ($currentPage == 'BussinessDealings.php') ? 'active' : ''; ?>" href="BussinessDealings.php">
              <i class="ni ni-collection text-primary"></i>
              <span class="nav-link-text">Bussiness Dealings</span>
            </a>
          </li>

          <!-- Thanks Giving Note -->
          <li class="nav-item">
            <a class="nav-link <?php echo ($currentPage == 'ThanksGivingNote.php') ? 'active' : ''; ?>" href="ThanksGivingNote.php">
              <i class="ni ni-like-2 text-primary"></i>
              <span class="nav-link-text">Thanks Giving Note</span>
            </a>
          </li>
          
          <!-- Manage Contact -->
          <li class="nav-item">
            <a class="nav-link <?php echo ($currentPage == 'ManageContact.php') ? 'active' : ''; ?>"
              href="ManageContact.php">
              <i class="ni ni-email-83 text-info"></i>
              <span class="nav-link-text">Manage Contacts</span>
            </a>
          </li>

          <!-- Manage Logs -->
          <li class="nav-item">
            <a class="nav-link <?php echo ($currentPage == 'ManageLogs.php') ? 'active' : ''; ?>" href="ManageLogs.php">
              <i class="ni ni-bullet-list-67 text-dark"></i>
              <span class="nav-link-text">Manage Logs</span>
            </a>
          </li>

          <!-- Manage Footer -->
          <li class="nav-item">
            <a class="nav-link <?php echo ($currentPage == 'ManageFooter.php') ? 'active' : ''; ?>"
              href="ManageFooter.php">
              <i class="ni ni-ui-04 text-danger"></i>
              <span class="nav-link-text">Manage Footer</span>
            </a>
          </li>
          
          <?php elseif($_SESSION['userrole'] == 'member'): ?>
          <!-- Manage Roles -->
          <li class="nav-item">
            <a class="nav-link <?php echo ($currentPage == 'ManageRoles.php') ? 'active' : ''; ?>"
              href="ManageRoles.php">
              <i class="ni ni-tag text-primary"></i>
              <span class="nav-link-text">Manage Designation</span>
            </a>
          </li>

          <!-- Manage Category -->
          <li class="nav-item">
            <a class="nav-link <?php echo ($currentPage == 'ManageCategory.php') ? 'active' : ''; ?>"
              href="ManageCategory.php">
              <i class="ni ni-badge text-warning"></i>
              <span class="nav-link-text">Manage TradeCategory</span>
            </a>
          </li>

          <!-- Manage User -->
          <li class="nav-item">
            <a class="nav-link <?php echo ($currentPage == 'ManageUser.php') ? 'active' : ''; ?>"
              href="ManageUser.php">
              <i class="ni ni-circle-08 text-info"></i>
              <span class="nav-link-text">Manage User</span>
            </a>
          </li>

          <!-- Manage LeaderShip -->
          <li class="nav-item">
            <a class="nav-link <?php echo ($currentPage == 'ManageLeadership.php') ? 'active' : ''; ?>"
              href="ManageLeadership.php">
              <i class="ni ni-single-02 text-success"></i>
              <span class="nav-link-text">Manage Leaders</span>
            </a>
          </li>

          <!-- Manage Meetings -->
          <li class="nav-item">
            <a class="nav-link <?php echo ($currentPage == 'ManageMeetings.php') ? 'active' : ''; ?>"
              href="ManageMeetings.php">
              <i class="ni ni-calendar-grid-58 text-primary"></i>
              <span class="nav-link-text">Manage Meetings</span>
            </a>
          </li>

          <!-- New Joins -->
          <li class="nav-item">
            <a class="nav-link <?php echo ($currentPage == 'NewJoins.php') ? 'active' : ''; ?>" href="NewJoins.php">
              <i class="ni ni-fat-add text-success"></i>
              <span class="nav-link-text">New Joins</span>
            </a>
          </li>

          <!-- Bussiness Dealings -->
          <li class="nav-item">
            <a class="nav-link <?php echo ($currentPage == 'BussinessDealings.php') ? 'active' : ''; ?>" href="BussinessDealings.php">
              <i class="ni ni-collection text-primary"></i>
              <span class="nav-link-text">Bussiness Dealings</span>
            </a>
          </li>

          <!-- Thanks Giving Note -->
          <li class="nav-item">
            <a class="nav-link <?php echo ($currentPage == 'ThanksGivingNote.php') ? 'active' : ''; ?>" href="ThanksGivingNote.php">
              <i class="ni ni-like-2 text-primary"></i>
              <span class="nav-link-text">Thanks Giving Note</span>
            </a>
          </li>
          
          <?php endif; ?>
          
          <!-- Logout - All roles can see -->
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0);" onclick="logoutUser()">
              <i class="ni ni-user-run text-danger"></i>
              <span class="nav-link-text">Logout</span>
            </a>
          </li>

          <!-- Tables Collapse - Admin only -->
          <?php if($_SESSION['userrole'] == 'admin'): ?>
          <li class="nav-item d-none">
            <a class="nav-link <?php echo $isTableActive ? '' : 'collapsed'; ?>" href="#navbar-tables"
              data-toggle="collapse" role="button" aria-expanded="<?php echo $isTableActive ? 'true' : 'false'; ?>"
              aria-controls="navbar-tables">
              <i class="ni ni-align-left-2 text-default"></i>
              <span class="nav-link-text">Tables</span>
            </a>

            <div class="collapse <?php echo $isTableActive ? 'show' : ''; ?>" id="navbar-tables">
              <ul class="nav nav-sm flex-column">

                <li class="nav-item">
                  <a class="nav-link <?php echo ($currentPage == 'Tables.php') ? 'active' : ''; ?>" href="Tables.php">
                    <span class="sidenav-mini-icon">T</span>
                    <span class="sidenav-normal">Tables</span>
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link <?php echo ($currentPage == 'Sortable.php') ? 'active' : ''; ?>"
                    href="Sortable.php">
                    <span class="sidenav-mini-icon">S</span>
                    <span class="sidenav-normal">Sortable</span>
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link <?php echo ($currentPage == 'Datatables.php') ? 'active' : ''; ?>"
                    href="Datatables.php">
                    <span class="sidenav-mini-icon">D</span>
                    <span class="sidenav-normal">Datatables</span>
                  </a>
                </li>

              </ul>
            </div>
          </li>
          <?php endif; ?>

        </ul>
      </div>
    </div>
  </div>
</nav>