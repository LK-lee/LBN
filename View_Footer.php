<!-- =============================
            Header Start
================================= -->
<?php include("Components/Header.php"); ?>
<!-- =============================
            Header End
================================= -->

<body>

<?php include("Components/Sidebar.php"); ?>

<div class="main-content" id="panel">

<?php include("Components/Navbar.php"); ?>


<!-- =============================
        Page Header
================================= -->
<div class="header bg-default pb-6">
  <div class="container-fluid">
    <div class="header-body">

      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white mb-0">View Footer Details</h6>
        </div>

        <div class="col-lg-6 col-5 text-right">
          <a href="managefooter.php" class="btn btn-sm btn-secondary">
            <i class="fas fa-arrow-left"></i> Back
          </a>
        </div>
      </div>

    </div>
  </div>
</div>


<!-- =============================
        Page Content
================================= -->
<div class="container-fluid mt--6">

<div class="card">
<div class="card-body">

<?php

if (!isset($_GET['id']) || empty($_GET['id'])) {
    echo '<div class="alert alert-danger">Footer ID required</div>';
    exit();
}

$footer_id = $_GET['id'];

$api_url = "http://localhost:3000/api/user/getfooterbyid/{$footer_id}";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);

if ($data['status'] !== 'success') {
    echo '<div class="alert alert-danger">Failed to load data</div>';
    exit();
}

$footer = $data['data'];

?>


<div class="row">

<!-- Address -->
<div class="col-md-12 mb-3">
<label class="form-control-label">Address</label>
<textarea class="form-control" rows="3" readonly>
<?php echo htmlspecialchars($footer['address'] ?? ''); ?>
</textarea>
</div>


<!-- Email -->
<div class="col-md-6 mb-3">
<label class="form-control-label">Email</label>
<input type="text"
class="form-control"
value="<?php echo htmlspecialchars($footer['email'] ?? ''); ?>"
readonly>
</div>


<!-- Phone -->
<div class="col-md-6 mb-3">
<label class="form-control-label">Phone Number</label>
<input type="text"
class="form-control"
value="<?php echo htmlspecialchars($footer['number'] ?? ''); ?>"
readonly>
</div>


<!-- Map Link -->
<div class="col-md-12 mb-3">
<label class="form-control-label">Google Map Link</label>

<input type="text"
class="form-control"
value="<?php echo htmlspecialchars($footer['map'] ?? ''); ?>"
readonly>

<?php if(!empty($footer['map'])) { ?>
<a href="<?php echo htmlspecialchars($footer['map']); ?>"
target="_blank"
class="btn btn-sm btn-info mt-2">
Open Map
</a>
<?php } ?>

</div>

</div>
</div>


<?php include("Components/Footer.php"); ?>

</div>

<?php include("Components/FooterLinks.php"); ?>

</body>
</html>
