import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage/HomePage'
import ConsultationPage from './pages/ConsultationPage/ConsultationPage'
import VirtualTourPage from './pages/VirtualTourPage/VirtualTourPage'
import AdmissionsPage from './pages/AdmissionsPage/AdmissionsPage'
import CampusLifePage from './pages/CampusLifePage/CampusLifePage'
import styles from './App.module.css'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading resources
    setTimeout(() => setLoading(false), 1500)
  }, [])

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <img src="/src/assets/images/scau_logo.png" alt="SCAU Logo" className={styles.loadingLogo} />
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
          <Route path="/consultation" element={<ConsultationPage />} />
          <Route path="/virtual-tour" element={<VirtualTourPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/campus-life" element={<CampusLifePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App