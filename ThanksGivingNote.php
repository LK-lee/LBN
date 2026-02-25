<?php
/* =============================
   FETCH THANK NOTES (GET)
============================= */

$url = "http://localhost:3000/api/user/getthanksnote";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);
$notes = [];

if (isset($result['status']) && $result['status'] === "success") {
    $notes = $result['data'];
}
?>

<?php include("Components/Header.php"); ?>

<body>

<?php include("Components/Sidebar.php"); ?>

<div class="main-content" id="panel">

<?php include("Components/Navbar.php"); ?>

<!-- =============================
        Page Header
============================= -->
<div class="header bg-default pb-6">
<div class="container-fluid">
<div class="header-body">
<div class="row align-items-center py-4">

<div class="col-lg-6 col-7">
    <h6 class="h2 text-white mb-0">Thanks Giving Note</h6>
    <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
        <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
          <li class="breadcrumb-item">
            <a href="Home.php"><i class="fas fa-home"></i></a>
          </li>
          <li class="breadcrumb-item">
            <a href="Home.php">Home</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Thanks Giving Note
          </li>
        </ol>
    </nav>
</div>

<div class="col-lg-6 col-5 text-right">
<a href="Add_Note.php" class="btn bg-warning text-white">Add Note</a>
</div>

</div>
</div>
</div>
</div>

<!-- =============================
        Page Content
============================= -->
<div class="container-fluid mt--6">

<div class="row">
<div class="col">
<div class="card">

<!-- Card Header -->
<div class="card-header">
  <h3 class="mb-0">Thanks Giving Note</h3>
  <!-- <p class="text-sm mb-0">
    This is an example of datatable using the well-known
    datatables.net plugin. This is a minimal setup to get
    started quickly.
  </p> -->
</div>
<div class="table-responsive py-4">

<table class="table table-flush" id="datatable-basic">

<thead class="thead-light">
<tr>
<th>S.No</th>
<th>Meeting</th>
<th>Given By</th>
<th>Given To</th>
<th>Description</th>
<th>Amount</th>
<th>Date</th>
</tr>
</thead>

<tbody>

<?php if (!empty($notes)) { 
$i = 1;
foreach ($notes as $row) { ?>

<tr>

<td><?= $i++ ?></td>

<td><?= htmlspecialchars($row['meeting_title']) ?></td>

<td><?= htmlspecialchars($row['given_by_name']) ?></td>

<td><?= htmlspecialchars($row['given_to_name']) ?></td>

<td><?= htmlspecialchars($row['notes']) ?></td>

<td>₹ <?= htmlspecialchars($row['amount']) ?></td>

<td>
<?= isset($row['created_at']) 
    ? date("d-m-Y", strtotime($row['created_at'])) 
    : "-" ?>
</td>

</tr>

<?php } 
} else { ?>

<tr>
<td colspan="7" class="text-center">No Data Found</td>
</tr>

<?php } ?>

</tbody>

</table>

</div>
</div>
</div>
</div>


</div>
</div>

<?php include("Components/FooterLinks.php"); ?>

</body>
</html>
