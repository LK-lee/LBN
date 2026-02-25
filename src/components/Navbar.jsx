import React, { useEffect } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import logo from "../assets/Img/logo/logo.png"

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

  const navLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link"

  // Auto close navbar on route change
  useEffect(() => {
    const nav = document.querySelector(".navbar-collapse")
    if (nav?.classList.contains("show")) {
      nav.classList.remove("show")
    }
  }, [location])

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="LBN Logo" className="logo-img" />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink to="/" className={navLinkClass} end>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/About" className={navLinkClass}>About LBN</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Members" className={navLinkClass}>Members</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Meetings" className={navLinkClass}>Meeting</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Contact" className={navLinkClass}>Contact</NavLink>
            </li>
          </ul>

          <button className="btn btn-join" onClick={() => navigate('/Contact')}>Join Us Now</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar