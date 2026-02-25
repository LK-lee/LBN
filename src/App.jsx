import { Suspense, lazy } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import ScrollToTop from "./components/ScrollToTop"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import './index.css'

const Home = lazy(() => import("./pages/Home"))
const Contact = lazy(() => import("./pages/Contact"))
const About = lazy(() => import("./pages/About"))
const Members = lazy(() => import("./pages/Members"))
const Meetings = lazy(() => import("./pages/Meetings"))

function App() {
  return (
    <BrowserRouter>

      <ScrollToTop />  
      
      <Navbar />

      {/* No loader */}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<About />} />
          <Route path="/Members" element={<Members />} />
          <Route path="/Meetings" element={<Meetings />} />
        </Routes>
      </Suspense>

      <Footer />
    </BrowserRouter>
  )
}

export default App
