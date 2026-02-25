<?php
session_start();

/* =========================
   SECURITY HEADERS
========================= */
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header("Expires: 0");
header("X-Frame-Options: SAMEORIGIN");
header("X-Content-Type-Options: nosniff");
header("Referrer-Policy: strict-origin-when-cross-origin");

/* =========================
   AUTH CHECK
========================= */
if (!isset($_SESSION['useremail']) || !isset($_SESSION['token'])) {
    session_unset();
    session_destroy();
    header("Location: index.php");
    exit();
}

$user_email = $_SESSION['useremail'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>LBN Dashboard</title>

    <!-- Meta -->
    <meta name="description" content="LBN Admin Dashboard">
    <meta name="author" content="LBN">

    <!-- Favicon -->
    <link rel="icon" href="assets/img/brand/favicon.png" type="image/png">

    <!-- Google Fonts -->
    <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700">

    <!-- Icons -->
    <link rel="stylesheet" href="assets/vendor/nucleo/css/nucleo.css">
    <link rel="stylesheet" href="assets/vendor/@fortawesome/fontawesome-free/css/all.min.css">

    <!-- Argon CSS (Bootstrap 4) -->
    <link rel="stylesheet" href="assets/css/argon.min23cd.css">

    <!-- Custom Styles -->
    <link rel="stylesheet" href="assets/css/style.css">

    <!-- DataTables -->
    <link rel="stylesheet" href="assets/vendor/datatables.net-bs4/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="assets/vendor/datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css">
    <link rel="stylesheet" href="assets/vendor/datatables.net-select-bs4/css/select.bootstrap4.min.css">

    <!-- Bootstrap Switch -->
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap-switch-button@1.1.0/css/bootstrap-switch-button.min.css">

    <!-- Toastr -->
    <link rel="stylesheet"href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">

</head>
<style>
    /*.top,.bottom{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 15px;
    }*/
</style>