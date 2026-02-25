<?php include("Components/Header.php"); ?>
<style>
	/* Toggle switch styling */
	.custom-toggle {
	    position: relative;
	    display: inline-block;
	    width: 52px;
	    height: 32px;
	}

	.custom-toggle-slider {
	    position: absolute;
	    cursor: pointer;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    background-color: #ccc;
	    transition: .4s;
	    border-radius: 34px;
	}

	.custom-toggle-slider:before {
	    position: absolute;
	    content: "";
	    height: 24px;
	    width: 24px;
	    left: 4px;
	    bottom: 4px;
	    background-color: white;
	    transition: .4s;
	    border-radius: 50%;
	}

	.custom-control-input:checked + .custom-control-label .custom-toggle-slider {
	    background-color: #2dce89;
	}

	.custom-control-input:checked + .custom-control-label .custom-toggle-slider:before {
	    transform: translateX(20px);
	}

	.status-text {
	    font-weight: 500;
	    transition: color 0.3s ease;
	}

	/* Alternative Toggle Style - Option 2 (Switch Style) */
	.toggle-switch {
	    position: relative;
	    display: inline-block;
	    width: 50px;
	    /*height: 24px;*/
	    margin-right: 10px;
	}

	.toggle-switch input {
	    opacity: 0;
	    width: 0;
	    height: 0;
	}

	.toggle-slider {
	    position: absolute;
	    cursor: pointer;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    background-color: #ccc;
	    transition: .4s;
	    border-radius: 24px;
	}

	.toggle-slider:before {
	    position: absolute;
	    content: "";
	    height: 16px;
	    width: 16px;
	    left: 4px;
	    bottom: 4px;
	    background-color: white;
	    transition: .4s;
	    border-radius: 50%;
	}

	input:checked + .toggle-slider {
	    background-color: #2dce89;
	}

	input:checked + .toggle-slider:before {
	    transform: translateX(26px);
	}

	/* Badge Style Toggle - Option 3 */
	.status-badge {
	    display: inline-flex;
	    align-items: center;
	    cursor: pointer;
	    padding: 5px 12px;
	    border-radius: 20px;
	    font-weight: 600;
	    font-size: 12px;
	    transition: all 0.3s ease;
	    border: 1px solid transparent;
	}

	.status-badge.active {
	    background-color: #2dce89;
	    color: white;
	}

	.status-badge.inactive {
	    background-color: #f5365c;
	    color: white;
	}

	.status-badge i {
	    margin-right: 5px;
	    font-size: 14px;
	}

	/*=========================================*/
	   .attendance-toggle-wrapper {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .attendance-toggle {
        position: relative;
        width: 52px;
        height: 27px;
        flex-shrink: 0;
    }

    .attendance-toggle input[type="checkbox"] {
        opacity: 0;
        width: 0;
        height: 0;
        position: absolute;
    }

    .toggle-switch {
        position: absolute;
        cursor: pointer;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: #f5365c;
        transition: .28s;
        border-radius: 27px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.18);
    }

    .toggle-switch:before {
        position: absolute;
        content: "";
        height: 21px;
        width: 21px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: .28s;
        border-radius: 50%;
        box-shadow: 0 1px 4px rgba(0,0,0,0.22);
    }

    .attendance-toggle input[type="checkbox"]:checked + .toggle-switch {
        background-color: #2dce89;
    }

    .attendance-toggle input[type="checkbox"]:checked + .toggle-switch:before {
        transform: translateX(25px);
    }

    .toggle-status-label {
        font-size: 12.5px;
        font-weight: 600;
        padding: 3px 12px;
        border-radius: 6px;
        transition: all 0.25s;
        min-width: 64px;
        text-align: center;
        border: 1.5px solid transparent;
    }

    .toggle-status-label.present {
        color: #1aae6f;
        background-color: rgba(45, 206, 137, 0.1);
        border-color: rgba(45, 206, 137, 0.22);
    }

    .toggle-status-label.absent {
        color: #f5365c;
        background-color: rgba(245, 54, 92, 0.08);
        border-color: rgba(245, 54, 92, 0.2);
    }
</style>

<body>

    <?php include("Components/Sidebar.php"); ?>

    <div class="main-content" id="panel">

        <?php include("Components/Navbar.php"); ?>

        <div class="header bg-default pb-6">
            <div class="container-fluid">
                <div class="header-body">

                    <div class="row align-items-center py-4">

                        <div class="col-lg-6 col-7">
                            <h6 class="h2 text-white mb-0">Manage Leaders</h6>
                            <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
			                  <li class="breadcrumb-item"><a href="Home.php"><i class="fas fa-home"></i></a></li>
			                  <li class="breadcrumb-item"><a href="Home.php">Home</a></li>
			                  <li class="breadcrumb-item active" aria-current="page">Manage Leaders</li>
			              	</ol>

                            <!-- <button id="saveAllBtn" class="btn btn-success">
                                update all
                            </button> -->

                        </div>

                        <div class="col-lg-6 col-5 text-right ">
                        	<button id="saveAllBtn" class="btn btn-success">
                                update all
                            </button>
                            
                            <button id="refreshBtn" class="btn btn-info ml-2">
                                Refresh
                            </button>
                   
                                <a href="Add_Leader.php" class=" text-white btn bg-warning">Add Leaders</a>
                          

                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="container-fluid mt--6">

            <div class="row">
                <div class="col">
                    <div class="card">

                        <div class="card-header">
                            <h3 class="mb-0">Leaders List</h3>
                        </div>

                        <div class="table-responsive py-4">
                            <table class="table table-flush" id="leadersTable">

                                <thead class="thead-light">
                                    <tr>
                                        <th>S.No</th>
                                        <th>Leader Name</th>
                                        <th>Designation</th>
                                        <th>Status</th>

                                    </tr>
                                </thead>

                                <tbody id="leadersTableBody">
                                    <tr>
                                        <td>1</td>
                                        <td>Krishna</td>
                                        <td>
                                        	<select class="form-control col-6" onchange ="designation()">
                                        		<option value="">=== select designation ===</option>
                                        		<option value="uyy">Admin</option>
                                        		<option value="uyy">Acountant</option>
                                        	</select>
                                        </td>
                                      <td>
					                    <div class="attendance-toggle-wrapper">
					                        <div class="attendance-toggle">
					                            <input type="checkbox" id="attendance_${member.id}"
					                                   name="attendance_status[${member.id}]"
					                                   checked
					                                   data-member-id="${member.id}"
					                                   class="attendance-checkbox">
					                            <label for="attendance_${member.id}" class="toggle-switch m-0"></label>
					                        </div>
					                        <span class="toggle-status-label present" id="status_${member.id}">Active</span>
					                    </div>
					                </td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>

    <?php include("Components/FooterLinks.php"); ?>

    <!-- ================= JS ================= -->

    <script src="assets/js/manageleadership.js"></script>

</body>

</html>