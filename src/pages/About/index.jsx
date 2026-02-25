import React, { useEffect, useRef } from 'react'
import logo from '../../assets/Img/logo/logo.png'
import Banner from '../../components/Banner'
import './index.css'

function About() {
  const countersRef = useRef([])

  // Counter animation
  useEffect(() => {
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-count'))
      const duration = 2000
      const step = target / (duration / 16)
      let current = 0
      const timer = setInterval(() => {
        current += step
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        el.textContent = Math.floor(current)
      }, 16)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    countersRef.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // AOS-like scroll animations
  useEffect(() => {
    const els = document.querySelectorAll('.about-page [data-animate]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('about-page__animated')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
      <>
        <Banner title="About" />
    <main className="about-page flex-grow-1">
      

      {/* ======== WHO WE ARE ======== */}
      <section className="about-page__who-we-are">
        <div className="about-page__container">
          <div className="about-page__row">
            {/* Left */}
            <div className="about-page__col-left" data-animate="fade-right">
              <span className="about-page__badge">Discover Our Story</span>
              <h2 className="about-page__section-title">Who We Are</h2>
              <div className="about-page__underline" />
              <p className="about-page__lead">
                <strong>LBN (Local Business Network)</strong> is a community-driven platform built to
                support local entrepreneurs, professionals, and business owners by creating meaningful
                connections.
              </p>
              <p className="about-page__text">
                We believe local businesses grow faster when they collaborate, share knowledge, and
                support one another.
              </p>
              <div className="about-page__points">
                {[
                  'Community-Driven Platform',
                  'Meaningful Business Connections',
                  'Collaborative Growth Ecosystem',
                ].map((point) => (
                  <div className="about-page__point-item" key={point}>
                    <i className="fas fa-check-circle" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Logo */}
            <div className="about-page__col-right" data-animate="fade-left">
              <div className="about-page__logo-showcase">
                <div className="about-page__logo-glow" />
                <img src={logo} alt="LBN Logo" className="about-page__main-logo" />
                <div className="about-page__shapes">
                  <div className="about-page__shape about-page__shape--1" />
                  <div className="about-page__shape about-page__shape--2" />
                  <div className="about-page__shape about-page__shape--3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== MISSION VISION VALUES ======== */}
      <section className="about-page__mvv">
        <div className="about-page__container">
          <div className="about-page__section-header" data-animate="fade-up">
            <h2 className="about-page__section-title">Mission, Vision &amp; Values</h2>
            <div className="about-page__underline about-page__underline--center" />
            <p className="about-page__subtitle">What drives our local business community</p>
          </div>

          <div className="about-page__mvv-grid">
            {[
              {
                icon: 'fa-bullseye',
                title: 'Our Mission',
                desc: 'To build a strong local business ecosystem through collaboration, trust, and shared opportunities.',
                mod: 'mission',
                delay: '0.1s',
              },
              {
                icon: 'fa-eye',
                title: 'Our Vision',
                desc: 'To become the most trusted local business networking community, empowering every member to succeed.',
                mod: 'vision',
                delay: '0.2s',
              },
              {
                icon: 'fa-heart',
                title: 'Our Values',
                desc: 'Integrity, collaboration, inclusivity, and long-term relationships.',
                mod: 'values',
                delay: '0.3s',
              },
            ].map((card) => (
              <div
                className="about-page__mvv-card"
                key={card.title}
                data-animate="fade-up"
                style={{ animationDelay: card.delay }}
              >
                <div className="about-page__card-icon-wrap">
                  <div className="about-page__card-icon-bg" />
                  <i className={`fas ${card.icon} about-page__card-icon`} />
                </div>
                <h3 className="about-page__card-title">{card.title}</h3>
                <p className="about-page__card-desc">{card.desc}</p>
                <div className="about-page__card-line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== RICH CONTENT BLOCKS ======== */}
      <section className="about-page__content-blocks">
        <div className="container">

          {/* Block 1 */}
          <div className="about-page__content-block" data-animate="fade-up">
            <h2 className="about-page__section-title">A Strong Network with Real Impact</h2>
            <div className="about-page__underline" />
            <p className="about-page__lead">
              LBN brings together prominent entrepreneurs from diverse industries whose businesses
              collectively generate an annual turnover exceeding ₹5 Crores.
            </p>
            <p className="about-page__lead">This diversity creates powerful opportunities for:</p>
            <ul className="about-page__list">
              <li>Business referrals</li>
              <li>Strategic collaborations</li>
              <li>Knowledge sharing</li>
              <li>Long-term professional growth</li>
            </ul>
            <p className="about-page__text">
              Our focus is not just networking — but building meaningful business relationships.
            </p>
          </div>

          {/* Block 2 */}
          <div className="about-page__content-block" data-animate="fade-up">
            <h2 className="about-page__section-title">Affordable, Transparent &amp; Member-Focused</h2>
            <div className="about-page__underline" />
            <p className="about-page__text">
              LBN operates with a highly affordable annual membership fee of ₹14,000, collected purely
              as a meeting fee.
            </p>
            <p className="about-page__text">
              Despite the minimal cost, members gain access to a wide range of value-driven activities:
            </p>
            <ul className="about-page__list">
              <li>Regular business networking meetings</li>
              <li>Family get-togethers</li>
              <li>Anniversary celebrations</li>
              <li>Cocktail parties &amp; social gatherings</li>
            </ul>
            <p className="about-page__text">We believe strong friendships create stronger businesses.</p>
          </div>

          {/* Block 3 */}
          <div className="about-page__content-block" data-animate="fade-up">
            <h2 className="about-page__section-title">Business with a Social Purpose</h2>
            <div className="about-page__underline" />
            <p className="about-page__text">Beyond business, LBN actively gives back through:</p>
            <ul className="about-page__list">
              <li>Blood donation camps</li>
              <li>Charity drives</li>
              <li>Community service initiatives</li>
            </ul>
            <p className="about-page__text">
              At LBN, we believe that successful businesses must also contribute to the community.
            </p>
          </div>

          {/* Block 4 */}
          <div className="about-page__content-block" data-animate="fade-up">
            <h2 className="about-page__section-title">Recognized &amp; Respected</h2>
            <div className="about-page__underline" />
            <p className="about-page__text">
              The work and impact of LBN have been appreciated by well-known celebrities and political
              leaders in Kakinada, strengthening our credibility and growing reputation.
            </p>
          </div>

          {/* Block 5 */}
          <div className="about-page__content-block" data-animate="fade-up">
            <h2 className="about-page__section-title">One Platform. Many Values.</h2>
            <div className="about-page__underline" />
            <p className="about-page__text">
              LBN is proud to be Kakinada's one and only non-profit business networking organization
              that seamlessly blends:
            </p>
            <ul className="about-page__list">
              <li>Business Growth</li>
              <li>Friendship</li>
              <li>Social Service</li>
            </ul>
          </div>

          {/* Block 6 - Join CTA */}
          <div className="about-page__content-block" data-animate="fade-up">
            <h2 className="about-page__section-title">Join LBN</h2>
            <div className="about-page__underline" />
            <p className="about-page__text">Become part of a trusted and growing network of entrepreneurs.</p>
            <p className="about-page__text">
              Contact us today to check the availability of your trade category and begin your journey
              with LBN.
            </p>
            <p className="about-page__text">
              Grow your business. Build strong relationships. Serve society — with LBN.
            </p>
            <p className="about-page__tagline">LBN – Let's Grow Together.</p>
            {/* <a href="/Contact" className="about-page__cta-btn">
              Contact Us Today
            </a> */}
          </div>

        </div>
      </section>

      {/* ======== WHY JOIN US ======== */}
      <section className="about-page__why-join" id="why-join">
        <div className="container">
          <div className="about-page__row">

            {/* Left Benefits */}
            <div className="about-page__col-left" data-animate="fade-right">
              <span className="about-page__badge about-page__badge--light">Why Join Us</span>
              <h2 className="about-page__section-title about-page__section-title--white">
                Grow With a Strong{' '}
                <span className="about-page__gradient-text">Local Network</span>
              </h2>
              <div className="about-page__underline" />
              <p className="about-page__text--light">
                LBN connects local business owners to create partnerships, referrals, and growth
                opportunities within the community.
              </p>
              <div className="about-page__benefits">
                {[
                  { icon: 'fa-handshake', label: 'Trusted local connections', delay: '0.1s' },
                  { icon: 'fa-chart-line', label: 'Referral-based growth', delay: '0.15s' },
                  { icon: 'fa-lightbulb', label: 'Knowledge sharing sessions', delay: '0.2s' },
                  { icon: 'fa-users', label: 'Community support', delay: '0.25s' },
                ].map((b) => (
                  <div
                    className="about-page__benefit-item"
                    key={b.label}
                    data-animate="fade-up"
                    style={{ animationDelay: b.delay }}
                  >
                    <div className="about-page__benefit-icon">
                      <i className={`fas ${b.icon}`} />
                    </div>
                    <span>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Stats */}
            <div className="about-page__col-right" data-animate="fade-left">
              <div className="about-page__stats-grid">
                {[
                  { icon: 'fa-users', count: 50, label: 'Members', delay: '0.1s' },
                  { icon: 'fa-building', count: 10, label: 'Industries', delay: '0.2s' },
                  { icon: 'fa-calendar-alt', count: 100, label: 'Events', delay: '0.3s' },
                  { icon: 'fa-handshake', count: 100, label: 'Meetings', delay: '0.4s' },
                ].map((stat, i) => (
                  <div
                    className="about-page__stat-card"
                    key={stat.label}
                    data-animate="zoom-in"
                    style={{ animationDelay: stat.delay }}
                  >
                    <div className="about-page__stat-icon">
                      <i className={`fas ${stat.icon}`} />
                    </div>
                    <div
                      className="about-page__stat-number"
                      data-count={stat.count}
                      ref={(el) => (countersRef.current[i] = el)}
                    >
                      0
                    </div>
                    <div className="about-page__stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
    </>
  )
}

export default About