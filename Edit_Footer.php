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

          <!-- Breadcrumb -->
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white mb-0">Edit Footer</h6>

              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item">
                    <a href="#"><i class="fas fa-home"></i></a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="managefooter.php">Manage Footer</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="View_Footer.php?id=<?php echo isset($_GET['id']) ? $_GET['id'] : ''; ?>">View Footer</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Edit Footer
                  </li>
                </ol>
              </nav>
            </div>

            <div class="col-lg-6 col-5 text-right">
              <a href="View_Footer.php?id=<?php echo isset($_GET['id']) ? $_GET['id'] : ''; ?>" class="btn btn-sm btn-info">
                <i class="fas fa-eye"></i> View
              </a>
              <a href="managefooter.php" class="btn btn-sm btn-secondary">
                <i class="fas fa-arrow-left"></i> Back to List
              </a>
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
        <div class="col-xl-12">
          <div class="card">
            <div class="card-header bg-transparent">
              <h5 class="h3 text-default mb-0">Edit Footer Information</h5>
            </div>
            <div class="card-body">
              <?php
              // Check if ID is provided
              if (!isset($_GET['id']) || empty($_GET['id'])) {
                echo '<div class="alert alert-danger">Footer ID is required for editing!</div>';
                echo '<a href="managefooter.php" class="btn btn-secondary">Back to List</a>';
                exit();
              }

              $footer_id = $_GET['id'];
              $footer = null;
              
              // Fetch footer data from API
              $api_url = "http://localhost:3000/api/user/getfooterbyid/{$footer_id}";
              
              // Initialize cURL
              $ch = curl_init();
              curl_setopt($ch, CURLOPT_URL, $api_url);
              curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
              curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
              
              $response = curl_exec($ch);
              $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
              
              if (curl_errno($ch)) {
                echo '<div class="alert alert-danger">cURL Error: ' . curl_error($ch) . '</div>';
                echo '<a href="managefooter.php" class="btn btn-secondary">Back to List</a>';
                curl_close($ch);
                exit();
              }
              
              curl_close($ch);
              
              if ($http_code == 200) {
                $data = json_decode($response, true);
                if ($data && isset($data['status']) && $data['status'] == 'success' && isset($data['data'])) {
                  $footer = $data['data'];
                }
              }
              
              if (!$footer) {
                echo '<div class="alert alert-danger">Footer not found or error loading data! HTTP Code: ' . $http_code . '</div>';
                echo '<a href="managefooter.php" class="btn btn-secondary">Back to List</a>';
                exit();
              }
              ?>
              
              <form id="editFooterForm">
                <input type="hidden" id="footer_id" value="<?php echo htmlspecialchars($footer_id); ?>">
                
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="address" class="form-control-label">Address</label>
                      <textarea name="address" id="address" class="form-control" rows="3" required><?php echo htmlspecialchars($footer['address'] ?? ''); ?></textarea>
                      <div class="invalid-feedback" id="addressError"></div>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="email" class="form-control-label">Email</label>
                      <input type="email" name="email" id="email" class="form-control" value="<?php echo htmlspecialchars($footer['email'] ?? ''); ?>" required>
                      <div class="invalid-feedback" id="emailError"></div>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="number" class="form-control-label">Phone Number</label>
                      <input type="text" name="number" id="number" class="form-control" value="<?php echo htmlspecialchars($footer['number'] ?? ''); ?>" required>
                      <div class="invalid-feedback" id="numberError"></div>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="map" class="form-control-label">Google Maps Embed URL</label>
                      <textarea name="map" id="map" class="form-control" rows="3" required><?php echo htmlspecialchars($footer['map'] ?? ''); ?></textarea>
                      
                      <div class="invalid-feedback" id="mapError"></div>
                    </div>
                  </div>
                </div>

                <div class="row mt-4">
                  <div class="col-md-4">
                    <a href="managefooter.php" class="btn btn-secondary btn-block">
                      <i class="fas fa-times"></i> Cancel
                    </a>
                  </div>
                 
                  <div class="col-md-4">
                    <button type="submit" class="btn btn-success btn-block" id="updateBtn">
                      <span id="updateText">
                        <i class="fas fa-save"></i> Update Footer
                      </span>
                      <span id="updateSpinner" class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                    </button>
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
      <div class="mt-5">
        <?php include("Components/Footer.php"); ?>
      </div>

    </div>
  </div>

  <!-- =============================
            Footer Scripts
  ============================= -->
  <?php include("Components/FooterLinks.php"); ?>
  
  <!-- Response Modal -->
  <div class="modal fade" id="responseModal" tabindex="-1" role="dialog" aria-labelledby="responseModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="responseModalLabel">Update Status</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="responseMessage"></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const form = document.getElementById('editFooterForm');
      const updateBtn = document.getElementById('updateBtn');
      const updateText = document.getElementById('updateText');
      const updateSpinner = document.getElementById('updateSpinner');
      
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset validation
        const inputs = form.querySelectorAll('.is-invalid');
        inputs.forEach(input => {
          input.classList.remove('is-invalid');
        });
        
        const errorElements = form.querySelectorAll('.invalid-feedback');
        errorElements.forEach(el => {
          el.textContent = '';
        });
        
        // Show loading state
        updateBtn.disabled = true;
        updateText.classList.add('d-none');
        updateSpinner.classList.remove('d-none');
        
        const formData = {
          address: document.getElementById('address').value,
          email: document.getElementById('email').value,
          number: document.getElementById('number').value,
          map: document.getElementById('map').value
        };
        
        const footerId = document.getElementById('footer_id').value;
        const updateUrl = `http://localhost:3000/api/user/updatefooter/${footerId}`;
        
        fetch(updateUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
          // Reset button state
          updateBtn.disabled = false;
          updateText.classList.remove('d-none');
          updateSpinner.classList.add('d-none');
          
          const modal = document.getElementById('responseModal');
          const responseMessage = document.getElementById('responseMessage');
          
          // Check your API response structure
          if (data.status === 'success' || (data.success === true)) {
            responseMessage.innerHTML = `
              <div class="alert alert-success">
                <i class="fas fa-check-circle fa-lg"></i>
                <h5 class="mt-2">Footer Updated Successfully!</h5>
                <p class="mb-0">${data.message || 'The footer information has been updated.'}</p>
              </div>
            `;
            
            $('#responseModal').modal('show');
            
            // Redirect to view page after 2 seconds
            setTimeout(() => {
              window.location.href = `View_Footer.php?id=${footerId}`;
            }, 2000);
            


          } else {
            // Show error message
            let errorMsg = data.message || 'Error updating footer. Please try again.';
            
            if (data.errors) {
              // Handle validation errors
              Object.keys(data.errors).forEach(field => {
                const input = document.getElementById(field);
                const errorElement = document.getElementById(field + 'Error');
                if (input && errorElement) {
                  input.classList.add('is-invalid');
                  errorElement.textContent = data.errors[field];
                }
              });
              errorMsg = 'Please check the form fields and try again.';
            }
            
            responseMessage.innerHTML = `
              <div class="alert alert-danger">
                <i class="fas fa-exclamation-circle fa-lg"></i>
                <h5 class="mt-2">Update Failed</h5>
                <p class="mb-0">${errorMsg}</p>
              </div>
            `;
            $('#responseModal').modal('show');
          }
        })
        .catch(error => {
          // Reset button state
          updateBtn.disabled = false;
          updateText.classList.remove('d-none');
          updateSpinner.classList.add('d-none');
          
          // Show error message
          const responseMessage = document.getElementById('responseMessage');
          responseMessage.innerHTML = `
            <div class="alert alert-danger">
              <i class="fas fa-exclamation-circle fa-lg"></i>
              <h5 class="mt-2">Network Error</h5>
              <p class="mb-0">${error.message || 'Please check your connection and try again.'}</p>
            </div>
          `;
          $('#responseModal').modal('show');
        });
      });
    });
  </script>

</body>

</html>