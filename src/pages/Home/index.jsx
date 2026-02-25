import React, { useEffect, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import sliderone_1 from "../../assets/Img/slides/slide-1-1.jpeg"
import sliderone_2 from "../../assets/Img/slides/slide-1-2.jpg"
import sliderone_3 from "../../assets/Img/slides/slide-1-3.jpg"

import slidertwo_1 from "../../assets/Img/slides/slide-2-1.jpg"
import slidertwo_2 from "../../assets/Img/slides/slide-2-2.webp"
import slidertwo_3 from "../../assets/Img/slides/slide-2-3.jpg"

import sliderthree_1 from "../../assets/Img/slides/slide-3-1.jpg"
import sliderthree_2 from "../../assets/Img/slides/slide-3-2-1.jpg"
import sliderthree_3 from "../../assets/Img/slides/slide-3-3.png"

import member_1 from "../../assets/Img/leaders/Teja.png"
import member_2 from "../../assets/Img/leaders/Ankur.jpeg"
import member_3 from "../../assets/Img/leaders/Siraj.jpeg"
import member_4 from "../../assets/Img/leaders/Satish.jpeg"
import member_5 from "../../assets/Img/leaders/Surya.jpeg"
import member_6 from "../../assets/Img/leaders/Ankit.jpeg"
import member_7 from "../../assets/Img/leaders/Satyam.png"
import member_8 from "../../assets/Img/leaders/Mahesh.jpeg"


import logo from "../../assets/Img/About/logo1.png";

// import logo from "../assets/Img/logo1.png";
// import Banner from '../../components/Banner'
import './index.css'
function Home() {
  const navigate = useNavigate()

  // refs for stats section visibility
  const statsRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  // numbers state
  const [counts, setCounts] = useState({
    members: 0,
    sectors: 0,
    events: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
        }
      },
      { threshold: 0.4 }
    );

    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);


  useEffect(() => {
    if (!startCount) return;

    const targets = {
      members: 50,
      sectors: 50,
      events: 100,
    };

    const duration = 2000; // animation time
    const intervalTime = 20;
    const steps = duration / intervalTime;

    let currentStep = 0;

    const counter = setInterval(() => {
      currentStep++;

      setCounts({
        members: Math.min(Math.ceil((targets.members / steps) * currentStep), targets.members),
        sectors: Math.min(Math.ceil((targets.sectors / steps) * currentStep), targets.sectors),
        events: Math.min(Math.ceil((targets.events / steps) * currentStep), targets.events),
      });

      if (currentStep >= steps) clearInterval(counter);
    }, intervalTime);

    return () => clearInterval(counter);
  }, [startCount]);

  return (
    <div>
      {/* <Banner title="Home" /> */}
      {/* <h1 className="home-title text-center">Home Page</h1> */}
      {/* <!-- Main Content - Home Page --> */}
      <main className="home-page flex-grow-1">
        <div className="container-fluid">
          {/* <!-- Slider Section --> */}
          <div id="lbnSlider" className="carousel slide lbn-slider-container" data-bs-ride="carousel"
            data-bs-interval="5000">
            {/* <!-- Indicators --> */}
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#lbnSlider" data-bs-slide-to="0" className="active"></button>
              <button type="button" data-bs-target="#lbnSlider" data-bs-slide-to="1"></button>
              <button type="button" data-bs-target="#lbnSlider" data-bs-slide-to="2"></button>
            </div>

            {/* <!-- Slides --> */}
            <div className="carousel-inner">
              {/* <!-- Slide 1 --> */}
              <div className="carousel-item active lbn-carousel-item">
                <div className="container h-100">
                  <div className="row align-items-center h-100">
                    <div className="col-lg-7 col-xl-7 lbn-content">
                      <div className="lbn-subtitle">Trusted Business Network</div>
                      <h1 className="lbn-title">One Community.</h1>
                      <div className="lbn-animated-text">
                        <div className="lbn-text-loop">Every Business</div>
                        <div className="lbn-typing-text">Connecting leaders across...</div>
                      </div>
                      <p className="lbn-description">Connecting leaders across industries to collaborate,
                        grow, and succeed together.</p>

                      {/* <!-- <div className="col-lg-5 col-xl-5 lbn-content">
                        <a href="#" className="lbn-btn lbn-btn-primary">Become a Member</a>
                      </div> --> */}
                      <a href="#" className="btn btn-join col-lg-4 col-xl-4" onClick={() => navigate('/Contact')}>Become a Member</a>
                    </div>

                    <div className="col-lg-5 col-xl-5 lbn-image-section">
                      {/* <!-- Real Human/Organization Photos Grid --> */}
                      <div className="lbn-photo-grid">
                        <div className="lbn-photo-item">
                          <img src={sliderone_1}
                            alt="Business Meeting" />
                          {/* <!-- <div className="lbn-photo-overlay">Manufacturing & Industries</div> --> */}
                        </div>
                        <div className="lbn-photo-item">
                          <img src={sliderone_2}
                            alt="Team Collaboration" />
                          {/* <!-- <div className="lbn-photo-overlay">Team Work</div> --> */}
                        </div>
                        <div className="lbn-photo-item large">
                          <img src={sliderone_3}
                            alt="Organization Conference" />
                          {/* <!-- <div className="lbn-photo-overlay">Business Conference</div> --> */}
                        </div>
                      </div>

                      {/* <!-- Floating Badges --> */}
                      <div className="lbn-badge-container">
                        <div className="lbn-badge lbn-badge-1">
                          <i className="fa-solid fa-gear"></i>
                          <div className="lbn-badge-text">Manufacturing & Industries</div>
                        </div>

                        <div className="lbn-badge lbn-badge-2">
                          <i className="fa-solid fa-cart-shopping"></i>
                          <div className="lbn-badge-text">Retail & E-Commerce</div>
                        </div>

                        <div className="lbn-badge lbn-badge-3">
                          <i className="fa-solid fa-calendar-days"></i>
                          <div className="lbn-badge-text">Events & Meetups</div>
                        </div>

                        <div className="lbn-badge lbn-badge-4">
                          <i className="fas fa-handshake"></i>
                          <div className="lbn-badge-text">Services & Professionals</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Slide 2 --> */}
              <div className="carousel-item lbn-carousel-item">
                <div className="container h-100">
                  <div className="row align-items-center h-100">
                    <div className="col-lg-7 col-xl-7 lbn-content">
                      <div className="lbn-subtitle">Collaboration Platform</div>
                      <h1 className="lbn-title">Global Network.</h1>
                      <div className="lbn-animated-text">
                        <div className="lbn-text-loop">Every Connection</div>
                        <div className="lbn-typing-text">Building partnerships worldwide...</div>
                      </div>
                      <p className="lbn-description">Connect with industry leaders and build meaningful
                        partnerships that drive innovation and success.</p>

                      {/* <!-- <a href="#" className="lbn-btn lbn-btn-primary">Join Now</a> --> */}
                      {/* <!-- <div className="col-lg-5 col-xl-5 lbn-content">
                        <a href="#" className="lbn-btn lbn-btn-primary">Join Now</a>
                      </div> --> */}
                      <a href="#" className="btn btn-join col-lg-4 col-xl-4" onClick={() => navigate('/Contact')}>Join Now</a>
                    </div>

                    <div className="col-lg-5 col-xl-5 lbn-image-section">
                      {/* <!-- Real Human/Organization Photos Grid --> */}
                      <div className="lbn-photo-grid">
                        <div className="lbn-photo-item">
                          <img src={slidertwo_1}
                            alt="Professional Networking" />
                          <div className="lbn-photo-overlay">Networking</div>
                        </div>
                        <div className="lbn-photo-item">
                          <img src={slidertwo_2}
                            alt="Corporate Meeting" />
                          <div className="lbn-photo-overlay">Collaboration</div>
                        </div>
                        <div className="lbn-photo-item large">
                          <img src={slidertwo_3}
                            alt="Business Conference" />
                          <div className="lbn-photo-overlay">Events & Summits</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Slide 3 --> */}
              <div className="carousel-item lbn-carousel-item">
                <div className="container h-100">
                  <div className="row align-items-center h-100">
                    <div className="col-lg-7 col-xl-7 lbn-content">
                      <div className="lbn-subtitle">What Happens Inside LBN</div>
                      <h1 className="lbn-title">Weekly Business Meetings</h1>
                      <div className="lbn-animated-text">
                        <div className="lbn-text-loop">Every Opportunity</div>
                        <div className="lbn-typing-text">Real meetings. Real connections…</div>
                      </div>
                      <p className="lbn-description">Every week members introduce their business, share opportunities, and pass trusted referrals.
                        LBN meetings turn conversations into collaborations and clients.</p>

                      {/* <!-- <a href="#" className="lbn-btn lbn-btn-primary">Start Growing</a> --> */}
                      {/* <!-- <div className="col-lg-5 col-xl-5 lbn-content">
                        <a href="#" className="lbn-btn lbn-btn-primary">Start Growing</a>
                      </div> --> */}
                      <a href="#" className="btn btn-join col-lg-4 col-xl-4" onClick={() => navigate('/Contact')}>Start Growing</a>
                    </div>

                    <div className="col-lg-5 col-xl-5 lbn-image-section">
                      {/* <!-- Real Human/Organization Photos Grid --> */}
                      <div className="lbn-photo-grid">
                        <div className="lbn-photo-item">
                          <img src={sliderthree_1}
                            alt="Success Story" />
                          <div className="lbn-photo-overlay">Individual Stories</div>
                        </div>
                        <div className="lbn-photo-item">
                          <img src={sliderthree_2}
                            alt="Strategy Session" />
                          <div className="lbn-photo-overlay">Collaborations</div>
                        </div>
                        <div className="lbn-photo-item large">
                          <img src={sliderthree_3}
                            alt="Team Success" />
                          <div className="lbn-photo-overlay">Meetings</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- About Content --> */}
          {/* <!-- ======================================
                      ABOUT SECTION
              ====================================== --> */}
          <section className="about-section">
            <div className="container">
              {/* <!-- Section Header --> */}
              <div className="section-header text-center">
                <h2 className="section-title">About Local Business Network (LBN)</h2>
                <p className="section-subtitle"
                  style={{ color: "var(--text-dark)", marginBottom: "10px" }}
                >Connecting local businesses for growth & collaboration</p>
                <div className="title-divider"></div>
              </div>

              {/* <!-- About Content --> */}
              <div className="row align-items-center g-5">
                {/* <!-- Logo Section --> */}
                <div className="col-lg-5">
                  <div className="about-logo-container">
                    <div className="logo-badge">
                      <i className="fas fa-certificate"></i>
                    </div>
                    <img src={logo} alt="LBN Logo" className="about-logo" />
                    <div className="logo-glow"></div>
                  </div>
                </div>

                {/* <!-- Content Section --> */}
                <div className="col-lg-7">
                  <div className="about-content">
                    <p className="about-text">
                      Local Business Network (LBN) is a platform that connects local business owners into
                      one strong and supportive network.
                    </p>

                    <p className="about-text">
                      Founded in 2023 by four friends, LBN was created to give local businesses access to
                      growth opportunities, genuine referrals, and a space for knowledge sharing. Today, it
                      has grown into one of Kakinada’s most respected non-profit business networking
                      organizations, bringing together business leaders with a combined annual turnover of ₹5+
                      crores.
                    </p>

                    <p className="about-text">
                      Through regular networking meetings, social events, and collaboration opportunities, LBN
                      helps members build meaningful partnerships, expand their reach, and grow together.
                    </p>

                    <p className="about-text">
                      By building trust-based relationships, members gain visibility, credibility, long-term
                      business growth, and the opportunity to give back to society.
                    </p>

                    <div className="about-cta">
                      <Link to="/about" className="btn-read-more">

                        Read More
                        <i className="fas fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* <!-- Members Section --> */}
          <section className="members-section">
            <div className="container-fluid">
              <div className="section-header" data-aos="fade-up" data-aos-duration="600">
                <h2><span className="gradient-text">Core Leadership</span></h2>
                <p>People behind the Local Business Network</p>
              </div>

              {/* <!-- Members Grid - 4 cards per row --> */}
              <div className="row g-4 members-grid">
                {/* <!-- Member Card 1 --> */}
                <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100" data-aos-duration="600">
                  <div className="member-card">
                    {/* <!-- <div className="category-badge">
                      <i className="fas fa-gem"></i>
                      <span>Jewelry</span>
                    </div> --> */}
                    <div className="profile-image-wrapper">
                      <div className="image-overlay"></div>
                      <img src={member_1} alt="Mr.Teja"
                        className="profile-image" />
                      <div className="image-shine"></div>
                    </div>
                    <div className="card-content">
                      <h3 className="member-name gradient-text-animated">Mr.Teja</h3>
                      <div className="member-role">President</div>
                      {/* <!-- <div className="member-description">
                        Over 15 years of experience in fine jewelry design and craftsmanship.
                      </div> --> */}
                      {/* <!-- <div className="member-actions">
                        <button className="btn-profile">
                          <i className="fas fa-user"></i>
                          Profile
                        </button>
                        <button className="btn-connect">
                          <i className="fas fa-paper-plane"></i>
                          Connect
                        </button>
                      </div> --> */}
                      <p>Visionary driving powerful local collaborations.</p>
                      <div className="social-links">
                        <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-whatsapp"></i></a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Member Card 2 --> */}
                <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="150" data-aos-duration="600">
                  <div className="member-card">
                    {/* <!-- <div className="category-badge">
                      <i className="fas fa-laptop-code"></i>
                      <span>Technology</span>
                    </div> --> */}
                    <div className="profile-image-wrapper">
                      <div className="image-overlay"></div>
                      <img src={member_2} alt="Mr.Ankur Surana" className="profile-image" />
                      <div className="image-shine"></div>
                    </div>
                    <div className="card-content">
                      <h3 className="member-name gradient-text-animated">Mr.Ankur Surana</h3>
                      <div className="member-role">Director</div>
                      {/* <!-- <div className="member-description">
                        Full-stack developer specializing in React, Node.js, and cloud solutions.
                      </div> --> */}
                      {/* <!-- <div className="member-actions">
                        <button className="btn-profile">
                          <i className="fas fa-user"></i>
                          Profile
                        </button>
                        <button className="btn-connect">
                          <i className="fas fa-paper-plane"></i>
                          Connect
                        </button>
                      </div> --> */}
                      <p>Brand strategist focussed on referal growth.</p>
                      <div className="social-links">
                        <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-whatsapp"></i></a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Member Card 3 --> */}
                <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200" data-aos-duration="600">
                  <div className="member-card">
                    {/* <!-- <div className="category-badge">
                      <i className="fas fa-utensils"></i>
                      <span>Restaurant</span>
                    </div> --> */}
                    <div className="profile-image-wrapper">
                      <div className="image-overlay"></div>
                      <img src={member_3} alt="Dr. Siraj" className="profile-image" />
                      <div className="image-shine"></div>
                    </div>
                    <div className="card-content">
                      <h3 className="member-name gradient-text-animated">Dr. Siraj</h3>
                      <div className="member-role">Vice President</div>
                      {/* <!-- <div className="member-description">
                        Award-winning chef and restaurateur with Michelin-starred establishments.
                      </div> --> */}
                      {/* <!-- <div className="member-actions">
                        <button className="btn-profile">
                          <i className="fas fa-user"></i>
                          Profile
                        </button>
                        <button className="btn-connect">
                          <i className="fas fa-paper-plane"></i>
                          Connect
                        </button>
                      </div> --> */}
                      <p>Operations leader ensuring execution excellence.</p>
                      <div className="social-links">
                        <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-whatsapp"></i></a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Member Card 4 --> */}
                <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="250" data-aos-duration="600">
                  <div className="member-card">
                    {/* <!-- <div className="category-badge">
                      <i className="fas fa-dumbbell"></i>
                      <span>Fitness</span>
                    </div> --> */}
                    <div className="profile-image-wrapper">
                      <div className="image-overlay"></div>
                      <img src={member_4} alt="A.V.V.Satish kumar"
                        className="profile-image" />
                      <div className="image-shine"></div>
                    </div>
                    <div className="card-content">
                      <h3 className="member-name gradient-text-animated">A.V.V.Satish kumar</h3>
                      <div className="member-role">Secretary</div>
                      {/* <!-- <div className="member-description">
                        Certified personal trainer with 10+ years experience in strength training.
                      </div> --> */}
                      {/* <!-- <div className="member-actions">
                        <button className="btn-profile">
                          <i className="fas fa-user"></i>
                          Profile
                        </button>
                        <button className="btn-connect">
                          <i className="fas fa-paper-plane"></i>
                          Connect
                        </button>
                      </div> --> */}
                      <p>Finance & growth advisor for scale.</p>
                      <div className="social-links">
                        <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-whatsapp"></i></a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Member Card 5 --> */}
                <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300" data-aos-duration="600">
                  <div className="member-card">
                    {/* <!-- <div className="category-badge">
                      <i className="fas fa-paint-brush"></i>
                      <span>Design</span>
                    </div> --> */}
                    <div className="profile-image-wrapper">
                      <div className="image-overlay"></div>
                      <img src={member_5} alt="Mr.Sama Surya" className="profile-image" />
                      <div className="image-shine"></div>
                    </div>
                    <div className="card-content">
                      <h3 className="member-name gradient-text-animated">Mr.Sama Surya</h3>
                      <div className="member-role">Treasurer</div>
                      {/* <!-- <div className="member-description">
                        Brand identity specialist with expertise in UX/UI design and digital experiences.
                      </div> --> */}
                      {/* <!-- <div className="member-actions">
                        <button className="btn-profile">
                          <i className="fas fa-user"></i>
                          Profile
                        </button>
                        <button className="btn-connect">
                          <i className="fas fa-paper-plane"></i>
                          Connect
                        </button>
                      </div> --> */}
                      <p>Responsible leader managing funds budgets wisely</p>
                      <div className="social-links">
                        <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-whatsapp"></i></a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Member Card 6 --> */}
                <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="350" data-aos-duration="600">
                  <div className="member-card">
                    {/* <!-- <div className="category-badge">
                      <i className="fas fa-camera"></i>
                      <span>Photography</span>
                    </div> --> */}
                    <div className="profile-image-wrapper">
                      <div className="image-overlay"></div>
                      <img src={member_6} alt="Mr.Ankit jain" className="profile-image" />
                      <div className="image-shine"></div>
                    </div>
                    <div className="card-content">
                      <h3 className="member-name gradient-text-animated">Mr.Ankit jain</h3>
                      <div className="member-role">Joint Secretary</div>
                      {/* <!-- <div className="member-description">
                        Commercial and portrait photographer with work in national publications.
                      </div> --> */}
                      {/* <!-- <div className="member-actions">
                        <button className="btn-profile">
                          <i className="fas fa-user"></i>
                          Profile
                        </button>
                        <button className="btn-connect">
                          <i className="fas fa-paper-plane"></i>
                          Connect
                        </button>
                      </div> --> */}
                      <p>Organized leader supporting operations and planning</p>
                      <div className="social-links">
                        <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-whatsapp"></i></a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Member Card 7 --> */}
                <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="400" data-aos-duration="600">
                  <div className="member-card">
                    {/* <!-- <div className="category-badge">
                      <i className="fas fa-heartbeat"></i>
                      <span>Healthcare</span>
                    </div> --> */}
                    <div className="profile-image-wrapper">
                      <div className="image-overlay"></div>
                      <img src={member_7}
                        alt="Mr. Satyam tolimili" className="profile-image" />
                      <div className="image-shine"></div>
                    </div>
                    <div className="card-content">
                      <h3 className="member-name gradient-text-animated">Mr. Satyam tolimili</h3>
                      <div className="member-role">Joint treasurer</div>
                      {/* <!-- <div className="member-description">
                        Board-certified physician with 20+ years in family medicine and wellness.
                      </div> --> */}
                      {/* <!-- <div className="member-actions">
                        <button className="btn-profile">
                          <i className="fas fa-user"></i>
                          Profile
                        </button>
                        <button className="btn-connect">
                          <i className="fas fa-paper-plane"></i>
                          Connect
                        </button>
                      </div> --> */}
                      <p>Operations leader ensuring execution excellence.</p>
                      <div className="social-links">
                        <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-whatsapp"></i></a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Member Card 8 --> */}
                <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="450" data-aos-duration="600">
                  <div className="member-card">
                    {/* <!-- <div className="category-badge">
                      <i className="fas fa-shopping-bag"></i>
                      <span>Retail</span>
                    </div> --> */}
                    <div className="profile-image-wrapper">
                      <div className="image-overlay"></div>
                      <img src={member_8} alt="Mr. Mahesh kondisetti"
                        className="profile-image" />
                      <div className="image-shine"></div>
                    </div>
                    <div className="card-content">
                      <h3 className="member-name gradient-text-animated">Mr. Mahesh kondisetti</h3>
                      <div className="member-role">Marketing Head</div>
                      {/* <!-- <div className="member-description">
                        Curator of sustainable fashion with focus on emerging designers.
                      </div> --> */}
                      {/* <!-- <div className="member-actions">
                        <button className="btn-profile">
                          <i className="fas fa-user"></i>
                          Profile
                        </button>
                        <button className="btn-connect">
                          <i className="fas fa-paper-plane"></i>
                          Connect
                        </button>
                      </div> --> */}
                      <p>Finance & growth advisor for scale.</p>
                      <div className="social-links">
                        <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-whatsapp"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Load More Button -->
              <!-- <div className="text-center mt-5" data-aos="fade-up" data-aos-delay="600" data-aos-duration="600">
                <button className="btn-load-more">
                  <i className="fas fa-users"></i>
                  Load More Members
                </button>
              </div> --> */}
            </div>
          </section>

          {/* <!-- Why Choose LBN Section--> */}
          <section className="why-choose-section">
            <div className="container-fluid">
              <div className="text-center mb-5">
                <h2 className="section-title">Why Choose LBN</h2>
                <p className="section-subtitle">More than a network — LBN is a growth-focused business<br />community.
                </p>
              </div>

              <div className="row g-4">
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="feature-card">
                    <div className="icon-circle">
                      <i className="fas fa-handshake"></i>
                    </div>
                    <h3 className="feature-title">Trusted Network</h3>
                    <p className="feature-description">Connect with verified and like-minded business owners
                      across industries.</p>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                  <div className="feature-card">
                    <div className="icon-circle">
                      <i className="fas fa-building"></i>
                    </div>
                    <h3 className="feature-title">Multi-Domain Access</h3>
                    <p className="feature-description">IT, Manufacturing, Healthcare, Finance, Education & more
                      under one roof.</p>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                  <div className="feature-card">
                    <div className="icon-circle">
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <h3 className="feature-title">Business Growth</h3>
                    <p className="feature-description">Generate leads, partnerships, and referrals through
                      community collaboration.</p>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                  <div className="feature-card">
                    <div className="icon-circle">
                      <i className="fas fa-microphone"></i>
                    </div>
                    <h3 className="feature-title">Events & Meetups</h3>
                    <p className="feature-description">Participate in local meetups, workshops, and business
                      networking events.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* <!-- Growing a Stronger Business Network Section--> */}
          <section className="stats-section" ref={statsRef}>
            <div className="container">
              <div className="text-center mb-5">
                <h2 className="stats-title">Growing a <span className="highlight">Stronger Business Network</span></h2>
                <p className="stats-subtitle">Our numbers reflect the trust and growth of the LBN community.</p>
              </div>

              <div className="row g-4">
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fas fa-users"></i>
                    </div>
                    <div className="stat-number">{counts.members}+</div>
                    <div className="stat-label">Active Members</div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fas fa-layer-group"></i>
                    </div>
                    <div className="stat-number">{counts.sectors}+</div>
                    <div className="stat-label">Business Sectors</div>
                  </div>
                </div>

                {/* <!-- <div className="col-12 col-sm-6 col-lg-3">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fas fa-city"></i>
                    </div>
                    <div className="stat-number" data-target="10">0</div>
                    <div className="stat-label">Cities Connected</div>
                  </div>
                </div> --> */}

                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fas fa-calendar-check"></i>
                    </div>
                    <div className="stat-number">{counts.events}+</div>
                    <div className="stat-label">Events & Meetups</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* <!-- Sectors Section --> */}
          <section className="sectors-section">
            <div className="container-fluid">
              <h2 className="section-title">Our Business Sectors</h2>
              <p className="section-subtitle">
                Industries we support to expand your network and opportunities.
              </p>

              <div className="sectors-slider">
                <div className="sectors-track">

                  {/* <!-- ORIGINAL ITEMS --> */}
                  <div className="sector-badge">
                    <span className="icon">💻</span>
                    <span className="label">IT &amp; Software</span>
                  </div>
                  <div className="sector-badge">
                    <span className="icon">🏥</span>
                    <span className="label">Healthcare</span>
                  </div>
                  <div className="sector-badge">
                    <span className="icon">🏭</span>
                    <span className="label">Manufacturing</span>
                  </div>
                  <div className="sector-badge">
                    <span className="icon">💰</span>
                    <span className="label">Finance</span>
                  </div>
                  <div className="sector-badge">
                    <span className="icon">🏗️</span>
                    <span className="label">Construction</span>
                  </div>
                  <div className="sector-badge">
                    <span className="icon">🎓</span>
                    <span className="label">Education</span>
                  </div>
                  <div className="sector-badge">
                    <span className="icon">🍽️</span>
                    <span className="label">Hospitality</span>
                  </div>
                  <div className="sector-badge">
                    <span className="icon">🚚</span>
                    <span className="label">Logistics</span>
                  </div>
                  <div className="sector-badge">
                    <span className="icon">🏪</span>
                    <span className="label">Retail</span>
                  </div>
                  <div className="sector-badge">
                    <span className="icon">⚡</span>
                    <span className="label">Energy</span>
                  </div>

                  {/* <!-- DUPLICATE ITEMS FOR INFINITE SCROLL --> */}
                  <div className="sector-badge">
                    <span className="icon">💻</span>
                    <span className="label">IT &amp; Software</span>
                  </div>
                  <div className="sector-badge">
                    <span className="icon">🏥</span>
                    <span className="label">Healthcare</span>
                  </div>
                  <div className="sector-badge">
                    <span className="icon">🏭</span>
                    <span className="label">Manufacturing</span>
                  </div>
                  <div className="sector-badge">
                    <span className="icon">💰</span>
                    <span className="label">Finance</span>
                  </div>
                  <div className="sector-badge">
                    <span className="icon">🏗️</span>
                    <span className="label">Construction</span>
                  </div>
                  <div className="sector-badge">
                    <span className="icon">🎓</span>
                    <span className="label">Education</span>
                  </div>
                  <div className="sector-badge">
                    <span className="icon">🍽️</span>
                    <span className="label">Hospitality</span>
                  </div>
                  <div className="sector-badge">
                    <span className="icon">🚚</span>
                    <span className="label">Logistics</span>
                  </div>
                  <div className="sector-badge">
                    <span className="icon">🏪</span>
                    <span className="label">Retail</span>
                  </div>
                  <div className="sector-badge">
                    <span className="icon">⚡</span>
                    <span className="label">Energy</span>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* <!-- Become a member cta Section --> */}
          <section className="cta-section">
            <div className="container text-center">
              <h2 className="cta-title">
                Become a Member of <span>LBN</span>
              </h2>

              <p className="cta-text">
                Join our trusted local business community and grow your business
                through networking, referrals, and learning.
              </p>

              <a href="/contact" className="cta-btn">
                Register / Contact
              </a>
            </div>
          </section>

        </div>


      </main>
    </div>
  )
}

export default Home