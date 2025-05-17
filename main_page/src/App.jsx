import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage/HomePage'
import ConsultationPage from './pages/ConsultationPage/ConsultationPage'
import VirtualTourPage from './pages/VirtualTourPage/VirtualTourPage'
import AdmissionsPage from './pages/AdmissionsPage/AdmissionsPage'
import CampusLifePage from './pages/CampusLifePage/CampusLifePage'
import MajorMatchPage from './pages/MajorMatchPage/MajorMatchPage'
// import ARCampusPage from './pages/ARCampusPage/ARCampusPage'
import DataVisPage from './pages/DataVisPage/DataVisPage'
// import VirtualClassPage from './pages/VirtualClassPage/VirtualClassPage'
import AppPage from './pages/AppPage/AppPage'
import styles from './App.module.css'
import logo from './assets/images/scau_logo.png'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading resources
    setTimeout(() => setLoading(false), 1500)
  }, [])

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <img src={logo} alt="SCAU Logo" className={styles.loadingLogo} />
        <div className={styles.loadingBar}>
          <div className={styles.loadingProgress}></div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/app' element={<AppPage/>} />
          <Route path="/consultation" element={<ConsultationPage />} />
          <Route path="/virtual-tour" element={<VirtualTourPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/campus-life" element={<CampusLifePage />} />
          <Route path="/major-match" element={<MajorMatchPage />} />
          {/* <Route path="/ar-campus" element={<ARCampusPage />} /> */}
          <Route path="/data-visualization" element={<DataVisPage />} />
          {/* <Route path="/virtual-class" element={<VirtualClassPage />} /> */}
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default App