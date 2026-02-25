<!-- =============================
            Header Start
================================= -->
<?php include("Components/Header.php"); ?>
<!-- =============================
            Header End
================================= -->

<body>
  <!-- =============================
            Sidebar Start
  ============================= -->
  <?php include("Components/Sidebar.php"); ?>
  <!-- =============================
            Sidebar End
  ============================= -->

  <!-- =============================
            Main Content Start
  ============================= -->
  <div class="main-content" id="panel">

    <!-- =============================
              Top Navbar Start
    ============================= -->
    <?php include("Components/Navbar.php"); ?>
    <!-- =============================
              Top Navbar End
    ============================= -->

    <!-- =============================
              Page Header
    ============================= -->
    <div class="header bg-default pb-6">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white d-inline-block mb-0">Profile Settings</h6>
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                  <li class="breadcrumb-item"><a href="#">Settings</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Profile</li>
                </ol>
              </nav>
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
        
        <!-- Left Sidebar Profile Card -->
        <div class="col-xl-4 order-xl-2">
          <div class="card card-profile">
            <div class="card-header border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              <div class="d-flex justify-content-between">
                <div class=""></div>
                <div class=""></div>
              </div>
            </div>
            <div class="card-body pt-0">
              <div class="row">
                <div class="col">
                  <div class="card-profile-stats d-flex justify-content-center">
                    <!-- Profile Image Section -->
                  </div>
                </div>
              </div>
              <div class="text-center">
                <div class="mb-4">
                  <img src="assets/img/default-avatar.png" class="rounded-circle" style="width: 140px; height: 140px; object-fit: cover; border: 4px solid #fff; box-shadow: 0 0 20px rgba(0,0,0,0.15);" id="profileImagePreview" alt="Profile">
                  <div class="mt-3">
                    <label for="profileImageUpload" class="btn btn-sm btn-primary">
                      <i class="ni ni-camera-compact"></i> Change Photo
                    </label>
                    <input type="file" id="profileImageUpload" accept="image/*" style="display: none;">
                  </div>
                </div>
                
                <!-- Company Logo Section -->
                <hr class="my-4">
                <h6 class="heading-small text-muted mb-3">Company Logo</h6>
                <div class="mb-4">
                  <img src="assets/img/default-company.png" class="rounded" style="width: 180px; height: 100px; object-fit: contain; border: 2px solid #e9ecef; padding: 10px;" id="companyLogoPreview" alt="Company Logo">
                  <div class="mt-3">
                    <label for="companyLogoUpload" class="btn btn-sm btn-outline-primary">
                      <i class="ni ni-building"></i> Upload Logo
                    </label>
                    <input type="file" id="companyLogoUpload" accept="image/*" style="display: none;">
                  </div>
                </div>

                <!-- Quick Stats -->
                <hr class="my-4">
                <div class="card-profile-stats d-flex justify-content-center">
                  <div>
                    <span class="heading">36</span>
                    <span class="description">Opportunities</span>
                  </div>
                  <div>
                    <span class="heading">12</span>
                    <span class="description">Active Deals</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Media Links Card -->
          <div class="card mt-4">
            <div class="card-header">
              <h3 class="mb-0">Social Media Links</h3>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="form-control-label">
                  <i class="fab fa-whatsapp text-success"></i> WhatsApp
                </label>
                <input type="text" class="form-control" name="whatsapp_link" id="whatsapp_link">
              </div>
              <div class="form-group">
                <label class="form-control-label">
                  <i class="fab fa-instagram text-danger"></i> Instagram
                </label>
                <input type="text" class="form-control" name="instagram_link" id="instagram_link">
              </div>
              <div class="form-group mb-0">
                <label class="form-control-label">
                  <i class="fab fa-facebook text-primary"></i> Linkedin
                </label>
                <input type="text" class="form-control" name="linkedin_link" id="linkedin_link">
              </div>
            </div>
          </div>
        </div>

        <!-- Main Profile Form -->
        <div class="col-xl-8 order-xl-1">
          <div class="card">
            <div class="card-header">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Edit Profile</h3>
                </div>
              </div>
            </div>
            <div class="card-body">
              <form id="profileForm">
                
                <!-- Personal Information -->
                <h6 class="heading-small text-muted mb-4">Personal Information</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-name">Full Name <span class="text-danger">*</span></label>
                        <input type="text" id="input-name" class="form-control" placeholder="Enter your name" name="name" required>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-email">Email Address <span class="text-danger">*</span></label>
                        <input type="email" id="input-email" class="form-control" placeholder="name@example.com" name="email" readonly style="background-color: #f7f8f9; cursor: not-allowed;">
                        <small class="form-text text-muted">Email cannot be changed</small>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-mobile">Mobile Number <span class="text-danger">*</span></label>
                        <input type="tel" id="input-mobile" class="form-control" placeholder="+1 (800) 000-0000" name="mobile" required>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-dob">Date of Birth</label>
                        <input type="date" id="input-dob" class="form-control" name="dob">
                      </div>
                    </div>
                  </div>
                </div>

                <hr class="my-4">

                <!-- Professional Information -->
                <h6 class="heading-small text-muted mb-4">Professional Information</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-company">Company Name <span class="text-danger">*</span></label>
                        <input type="text" id="input-company" class="form-control" placeholder="Company Inc." name="company_name" required>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-role">Role <span class="text-danger">*</span></label>
                        <input type="text" id="input-role" class="form-control" placeholder="e.g., Sales Manager" name="role" required>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-trade-category">Trade Category <span class="text-danger">*</span></label>
                        <input type="text" id="input-trade-category" class="form-control" readonly>
                        <input type="hidden" id="hidden-trade-category" name="trade_category">
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-join-date">Join Date</label>
                        <input type="date" id="input-join-date" class="form-control" name="join_date">
                      </div>
                    </div>
                  </div>
                </div>

                <hr class="my-4">

                <!-- Address Information -->
                <h6 class="heading-small text-muted mb-4">Address Information</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label class="form-control-label" for="input-address">Address</label>
                        <textarea id="input-address" class="form-control" rows="3" placeholder="Enter complete address" name="address"></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-md-12">
                      <button type="submit" class="btn btn-primary">
                        <i class="ni ni-check-bold"></i> Update Profile
                      </button>
                      <button type="button" class="btn btn-danger" onclick="window.location.href='Home.php';">
                        <i class="ni ni-fat-remove"></i> Cancel
                      </button>
                    </div>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>

      </div>

      <!-- =============================
                Footer
      ============================= -->
      <div style="margin-top: 3rem;">
        <?php include("Components/Footer.php"); ?>
      </div>

    </div>
  </div>

  <!-- =============================
            Footer Scripts
  ============================= -->
  <?php include("Components/FooterLinks.php"); ?>
<script>
document.addEventListener("DOMContentLoaded", async function() {
    // Check if user is logged in
      const userEmail = localStorage.getItem("userEmail");
      if(!userEmail){
        console.log('User not logged in, redirecting...');
        window.location.href = "index.php";
        return;
      }

    const API_BASE = "http://localhost:3000/api/user";
  
    
    console.log('Loading user profile for:', userEmail);
    
    let storedPassword = "";
    let currentUserId = null;

    // ================= IMAGE LIVE PREVIEW =================
    document.getElementById("profileImageUpload").addEventListener("change", function(e) {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const preview = document.getElementById("profileImagePreview");
                preview.src = event.target.result;
                preview.style.display = "inline";
                // Hide any placeholder icon if you added one
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById("companyLogoUpload").addEventListener("change", function(e) {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const preview = document.getElementById("companyLogoPreview");
                preview.src = event.target.result;
                preview.style.display = "inline";
                // Hide any placeholder icon if you added one
            };
            reader.readAsDataURL(file);
        }
    });

    function formatDateForInput(dateValue) {
        if (!dateValue) return '';
        try {
            const date = new Date(dateValue);
            if (isNaN(date.getTime())) return '';
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        } catch (error) {
            console.error('Error formatting date:', error);
            return '';
        }
    }

    // ================= LOAD PROFILE =================
    async function loadUserProfile() {
        try {
            const res = await fetch(`${API_BASE}/getuserbyemail/${userEmail}`);
            const json = await res.json();

            if(!json.data) {
                alert("Profile load failed");
                return;
            }

            const user = Array.isArray(json.data) ? json.data[0] : json.data;

            storedPassword = user.password || "";
            currentUserId = user.id;

            console.log('User data loaded:', {
                trade_category: user.trade_category,
                trade_name: user.trade_name
            });

            // ===== Fill Inputs =====
            document.getElementById("input-name").value = user.name || "";
            document.getElementById("input-email").value = user.email || "";
            document.getElementById("input-mobile").value = user.mobile || "";
            document.getElementById("input-dob").value = formatDateForInput(user.dob);
            document.getElementById("input-company").value = user.company_name || "";
            document.getElementById("input-role").value = user.role || "";
            
            // ===== Set Trade Category =====
            if(user.trade_name) {
                document.getElementById("input-trade-category").value = user.trade_name;
            } else {
                document.getElementById("input-trade-category").value = 'Not specified';
            }
            
            if(user.trade_category) {
                document.getElementById("hidden-trade-category").value = user.trade_category;
                console.log('Set hidden trade category ID:', user.trade_category);
            }
            
            document.getElementById("input-join-date").value = formatDateForInput(user.join_date);
            document.getElementById("input-address").value = user.address || "";

            document.getElementById("whatsapp_link").value = user.whatsapp_link || "";
            document.getElementById("instagram_link").value = user.instagram_link || "";
            document.getElementById("linkedin_link").value = user.linkedin_link || "";

            // ===== Load Images =====
            const profilePreview = document.getElementById("profileImagePreview");
            if(user.profile_image) {
                profilePreview.src = `http://localhost:3000/uploads/${user.profile_image}?t=${Date.now()}`;
                profilePreview.style.display = "inline";
                // Hide any placeholder icon if you added one
            } else {
                profilePreview.src = "assets/img/default-avatar.png"; // This will still 404 if file missing
                profilePreview.style.display = "inline";
            }

            const companyPreview = document.getElementById("companyLogoPreview");
            if(user.company_logo) {
                companyPreview.src = `http://localhost:3000/uploads/${user.company_logo}?t=${Date.now()}`;
                companyPreview.style.display = "inline";
                // Hide any placeholder icon if you added one
            } else {
                companyPreview.src = "assets/img/default-company.png"; // This will still 404 if file missing
                companyPreview.style.display = "inline";
            }
        } catch(err) {
            console.error(err);
            alert("Profile loading error");
        }
    }

    // ================= UPDATE PROFILE =================
    // In your form submit event listener, update the FormData creation:
    document.getElementById("profileForm").addEventListener("submit", async function(e) {
        e.preventDefault();

        if(!currentUserId) {
            alert("User ID missing");
            return;
        }

        try {
            const form = document.getElementById("profileForm");
            const formData = new FormData(form);

            // Manually add social media links from the left column
            formData.append("whatsapp_link", document.getElementById("whatsapp_link").value || "");
            formData.append("instagram_link", document.getElementById("instagram_link").value || "");
            formData.append("linkedin_link", document.getElementById("linkedin_link").value || "");

            const hiddenTradeCategory = document.getElementById("hidden-trade-category").value;
            console.log('Submitting with trade_category ID:', hiddenTradeCategory);

            formData.append("useremail", userEmail);
            formData.append("password", storedPassword);

            const pImg = document.getElementById("profileImageUpload").files[0];
            if(pImg) {
                formData.append("profile_image", pImg);
            }

            const cImg = document.getElementById("companyLogoUpload").files[0];
            if(cImg) {
                formData.append("company_logo", cImg);
            }

            const res = await fetch(`${API_BASE}/updateuser/${currentUserId}`, {
                method: "PUT",
                body: formData
            });

            const data = await res.json();

            if(data.success || data.status === "success") {
                alert(data.message || "Profile updated successfully");
                loadUserProfile();
            } else {
                alert(data.message || "Update failed");
            }
        } catch(err) {
            console.error(err);
            alert("Server error");
        }
    });

    // ================= INITIAL LOAD =================
    await loadUserProfile();
});
</script>

</body>

</html>