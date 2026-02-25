import React from "react"

function Footer() {
  return (
    <footer className="footer fixed-bottom mt-auto">
      <div class="footer-main">
        <div className="container">
          <div className="row g-4">

            <div className="col-lg-3 col-md-6">
              <h3 className="footer-title">Local Business Network</h3>
              <p className="footer-description">
                Local Business Network empowers businesses across all domains through collaboration.
              </p>
              <div className="social-links" style={{ display: "flex", justifyContent: "left" }}>
                <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-link"><i className="fab fa-youtube"></i></a>
                <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
              </div>

            </div>

            <div className="col-lg-3 col-md-6">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li><a href="/"><i class="fas fa-chevron-right"></i> Home</a></li>
                <li><a href="/About"><i class="fas fa-chevron-right"></i> About Us</a></li>
                <li><a href="/Members"><i class="fas fa-chevron-right"></i> Members</a></li>
                <li><a href="/Meetings"><i class="fas fa-chevron-right"></i> Meetings</a></li>
                <li><a href="/Contact"><i class="fas fa-chevron-right"></i> Contact</a></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6">
              <h5 className="footer-title">Our Location</h5>

              <div className="location-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3816.471417125164!2d82.23382777367785!3d16.95134651522317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a382751ad5319b1%3A0x54411bf360b87c8c!2sLocal%20Business%20Network!5e0!3m2!1sen!2sin!4v1767955415620!5m2!1sen!2sin"
                  width="100%"
                  height="150"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="LBN Location"
                />
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <h5 className="footer-title">Contact Info</h5>
              <ul className="contact-info">
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>3rd floor, Somas arcade, 19-1-87, Cinema Rd, opposite mayuri theater,
                    Suryanarayana Puram, Kakinada, Andhra Pradesh 533001</span>
                </li>
                <li>
                  <i className="fas fa-phone"></i>
                  <span>+91 98494 34579</span>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <span>info@localbusinessnetwork.com</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
      <div className="footer-bottom">
          <div className="container">
            <div className="row align-items-center">

              <div className="col-md-6 text-center text-md-start">
                <p className="copyright-text">
                  © 2026 <strong>Local Business Network</strong>. All Rights Reserved. |
                  Designed by{" "}
                  <a
                    href="https://spondias.com/"
                    className="designer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Spondias India Pvt Ltd
                  </a>
                </p>
              </div>

              <div className="col-md-6 text-center text-md-end">
                <a href="#" className="back-to-top" id="backToTop">
                  <i className="fas fa-arrow-up"></i>
                </a>
              </div>

            </div>
          </div>
        </div>
    </footer>
  )
}

export default Footer
