import React from "react"
import { Link } from "react-router-dom"

function Banner({ title }) {
  return (
    <div className="banner">
      <div className="container text-center">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb justify-content-center">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">{title}</li>
          </ol>
        </nav>

        <h1 className="banner-title">{title.toUpperCase()}</h1>
        <div className="banner-underline"></div>
      </div>
    </div>
  )
}

export default Banner
