/* global toastr */
import React, { useState, useEffect } from "react"
import Banner from "../../components/Banner"
import "./index.css"

const handleEmail = () => {
  window.location.href = "mailto:info@lbn.com";
};

const handleWhatsApp = () => {
  const phoneNumber = "919849434579";
  window.open(`https://wa.me/${phoneNumber}`, "_blank");
};

const handleAddress = () => {
  window.open(`https://maps.app.goo.gl/nYdJ9ufeBBDYLZhq8`, "_blank");
};

function Contact() {

  // ================= STATE =================
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // ================= TOAST CONFIG =================
  useEffect(() => {
    toastr.options = {
      closeButton: true,
      progressBar: true,
      positionClass: "toast-top-right",
      timeOut: "3000",
    };
  }, []);

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // remove error while typing
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  // ================= VALIDATION =================
  const validateForm = () => {
    const newErrors = {};
    const { firstName, lastName, email, phone, subject, message } = formData;

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) newErrors.email = "Enter a valid email address";

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.replace(/\s+/g, "")))
      newErrors.phone = "Enter a valid 10 digit phone number";

    if (!subject.trim()) newErrors.subject = "Trade field is required";
    if (message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!validateForm()) return;

    console.log("Form Data:", formData);

    toastr.success("Message sent successfully! We will contact you soon.");

    // reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    setErrors({});
    setSubmitted(false);
  };

  return (
    <div>
      <Banner title="Contact" />
      {/* <!-- Main Content - Contact Page --> */}
      <main className="contact-page flex-grow-1">
        {/* <!-- Get In Touch Section --> */}
        <section className="get-in-touch">
          <div className="container">
            <h2 className="section-title text-center">Get In Touch</h2>
            <div className="section-underline mx-auto"></div>
            <p className="section-subtitle text-center">Feel free to reach out with any questions about the network, membership, or speaking engagements.</p>

            <div className="row g-4 mt-4">
              {/* <!-- Email Card --> */}
              <div className="col-lg-4 col-md-6" onClick={handleEmail}>
                <div className="card contact-card h-100">
                  <div className="card-body text-center">
                    <div className="card-icon email-icon mx-auto">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <h3 className="card-label">EMAIL</h3>
                    <p className="card-value">info@lbn.com</p>
                  </div>
                </div>
              </div>

              {/* <!-- Phone Card --> */}
              <div className="col-lg-4 col-md-6" onClick={handleWhatsApp}>
                <div className="card contact-card h-100">
                  <div className="card-body text-center">
                    <div className="card-icon phone-icon mx-auto">
                      <i className="fas fa-phone"></i>
                    </div>
                    <h3 className="card-label">PHONE</h3>
                    <p className="card-value">+91 98494 34579</p>
                  </div>
                </div>
              </div>

              {/* <!-- Address Card --> */}
              <div className="col-lg-4 col-md-12" onClick={handleAddress}>
                <div className="card contact-card h-100">
                  <div className="card-body text-center">
                    <div className="card-icon address-icon mx-auto">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <h3 className="card-label">ADDRESS</h3>
                    <p className="card-value">3rd floor, Samas arcade, 19-1-87, Cinema Rd, Kakinada, Andhra Pradesh 533001</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="container">

            {/* Contact Form & Map Section */}
            <div className="row g-4 mt-4">

              {/* Contact Form */}
              <div className="col-lg-12">
                <div className="form-container">
                  <h3 className="form-title">Send Us a Message</h3>
                  <p className="form-subtitle">
                    We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
                  </p>

                  <form id="contactForm" className="contact-form" onSubmit={handleSubmit}>
                    <div className="row g-3">

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="firstName"><i className="fas fa-user"></i> First Name</label>
                          <input
                            type="text"
                            id="firstName"
                            className={`form-control ${submitted && errors.firstName ? "is-invalid" : ""}`}
                            placeholder="Enter first name"
                            value={formData.firstName}
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">{errors.firstName}</div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="lastName"><i className="fas fa-user"></i> Last Name</label>
                          <input
                            type="text"
                            id="lastName"
                            className={`form-control ${submitted && errors.lastName ? "is-invalid" : ""}`}
                            placeholder="Enter last name"
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">{errors.lastName}</div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="email"><i className="fas fa-envelope"></i> Email Address</label>
                          <input
                            type="email"
                            id="email"
                            className={`form-control ${submitted && errors.email ? "is-invalid" : ""}`}
                            placeholder="john.doe@example.com"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">{errors.email}</div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="phone"><i className="fas fa-phone"></i> Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            className={`form-control ${submitted && errors.phone ? "is-invalid" : ""}`}
                            placeholder="+91 98494 34579"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">{errors.phone}</div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="subject"><i className="fas fa-tag"></i> Trade</label>
                          <input
                            type="text"
                            id="subject"
                            className={`form-control ${submitted && errors.subject ? "is-invalid" : ""}`}
                            placeholder="Enter the trade here"
                            value={formData.subject}
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">{errors.subject}</div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="message"><i className="fas fa-comment-dots"></i> Message</label>
                          <textarea
                            id="message"
                            rows="5"
                            className={`form-control ${submitted && errors.message ? "is-invalid" : ""}`}
                            placeholder="Tell us more about your inquiry..."
                            value={formData.message}
                            onChange={handleChange}
                          ></textarea>
                          <div className="invalid-feedback">{errors.message}</div>
                        </div>
                      </div>

                      <div className="col-12">
                        <button type="submit" className="btn btn-submit">
                          <span>Send Message</span>
                          <i className="fas fa-paper-plane"></i>
                        </button>
                      </div>

                    </div>
                  </form>


                </div>
              </div>

              {/* Map */}
              <div className="col-lg-12">
                <div className="map-container">
                  <h3 className="map-title">Find Us Here</h3>
                  <p className="map-subtitle">Visit us at our office location in Kakinada, Andhra Pradesh</p>

                  <div className="map-wrapper">
                    <iframe
                      title="google-map"
                      src="https://www.google.com/maps?q=16.98959,82.23516&z=15&output=embed"
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>

                  <div className="location-details">
                    <div className="detail-item">
                      <i className="fas fa-map-marker-alt"></i>
                      <div>
                        <strong>Address:</strong>
                        <p>3rd floor, Samas arcade, 19-1-97, Cinema Rd, opposite mayuri theater, Suryanarayana Puram, Kakinada, Andhra Pradesh 533001</p>
                      </div>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-clock"></i>
                      <div>
                        <strong>Business Hours:</strong>
                        <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </section>
      </main>
    </div>
  )
}

export default Contact