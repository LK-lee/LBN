import React from 'react'
import Banner from '../../components/Banner'
import './index.css'
function Meetings() {
  return (
    <div>
      <Banner title="Meeting" />
      {/* <h1 className='meetings-title text-center'>Meetings Page</h1> */}
      <main className="meetings-page flex-grow-1">
        {/* <!-- Meeting Card Section --> */}
        <section class="main-content section-padding">
          <div class="container-fluid">
            <div class="row g-4">
              {/* <!-- First Meeting Card --> */}
              <div class="col-lg-6" data-aos="fade-up" data-aos-duration="800">
                <div class="meeting-card">
                  {/* <!-- decorative layers --> */}
                  <div class="gradient-overlay"></div>
                  <div class="particle"></div>
                  <div class="particle"></div>
                  <div class="particle"></div>
                  <div class="corner-accent top-right"></div>
                  <div class="corner-accent bottom-left"></div>

                  <div class="content-wrapper">
                    {/* <!-- Left column: branding + headline --> */}
                    <div class="left-section">
                      <div class="logo-section">
                        <div class="logo">
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V7.89l7-3.11v8.21z" />
                          </svg>
                        </div>
                        <span class="brand-name">Local Business Network</span>
                      </div>

                      <div class="event-badge">📅 Event Closed</div>

                      <h1 class="title">Business Network Meeting</h1>
                      <p class="subtitle">Connect, Collaborate, and Grow Your Business</p>
                    </div>

                    {/* <!-- Right column: date / time / venue + CTA --> */}
                    <div class="right-section">
                      <div class="info-card">
                        <div class="icon-wrapper calendar">
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
                          </svg>
                        </div>
                        <div class="info-content">
                          <div class="info-label">Date</div>
                          <div class="info-value">February 10, 2026</div>
                        </div>
                      </div>

                      <div class="info-card">
                        <div class="icon-wrapper time">
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                          </svg>
                        </div>
                        <div class="info-content">
                          <div class="info-label">Time</div>
                          <div class="info-value">8:00 AM IST</div>
                        </div>
                      </div>

                      <div class="info-card">
                        <div class="icon-wrapper location">
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                          </svg>
                        </div>
                        <div class="info-content">
                          <div class="info-label">Venue</div>
                          <div class="info-value">Sarovar Port, Kakinada</div>
                        </div>
                      </div>

                      <button class="cta-button">
                        <span>Mark Your Calendar</span>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Second Meeting Card --> */}
              <div class="col-lg-6" data-aos="fade-up" data-aos-duration="800">
                <div class="meeting-card">
                  {/* <!-- decorative layers --> */}
                  <div class="gradient-overlay"></div>
                  <div class="particle"></div>
                  <div class="particle"></div>
                  <div class="particle"></div>
                  <div class="corner-accent top-right"></div>
                  <div class="corner-accent bottom-left"></div>

                  <div class="content-wrapper">
                    {/* <!-- Left column: branding + headline --> */}
                    <div class="left-section">
                      <div class="logo-section">
                        <div class="logo">
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V7.89l7-3.11v8.21z" />
                          </svg>
                        </div>
                        <span class="brand-name">Local Business Network</span>
                      </div>

                      <div class="event-badge">📅 Upcoming Event</div>

                      <h1 class="title">Business Network Meeting</h1>
                      <p class="subtitle">Connect, Collaborate, and Grow Your Business</p>
                    </div>

                    {/* <!-- Right column: date / time / venue + CTA --> */}
                    <div class="right-section">
                      <div class="info-card">
                        <div class="icon-wrapper calendar">
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
                          </svg>
                        </div>
                        <div class="info-content">
                          <div class="info-label">Date</div>
                          <div class="info-value">February 21, 2026</div>
                        </div>
                      </div>

                      <div class="info-card">
                        <div class="icon-wrapper time">
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                          </svg>
                        </div>
                        <div class="info-content">
                          <div class="info-label">Time</div>
                          <div class="info-value">8:00 AM IST</div>
                        </div>
                      </div>

                      <div class="info-card">
                        <div class="icon-wrapper location">
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                          </svg>
                        </div>
                        <div class="info-content">
                          <div class="info-label">Venue</div>
                          <div class="info-value">GRT Grand, Kakinada</div>
                        </div>
                      </div>

                      <button class="cta-button">
                        <span>Mark Your Calendar</span>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                        </svg>
                      </button>
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

export default Meetings