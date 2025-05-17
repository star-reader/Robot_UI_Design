import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'
import logo from '../../assets/images/logo.svg'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [featuresOpen, setFeaturesOpen] = useState(false)
  const location = useLocation()
  const featuresRef = useRef(null)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (featuresRef.current && !featuresRef.current.contains(event.target)) {
        setFeaturesOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navItems = [
    { name: '首页', path: '/' },
    { name: '智能咨询', path: '/consultation' },
    { name: '虚拟校园', path: '/virtual-tour' },
    { name: '招生指南', path: '/admissions' },
    { name: '校园生活', path: '/campus-life' }
  ]

  const featureItems = [
    { name: '专业匹配测试', path: '/major-match', icon: '🎯' },
    { name: 'AR校园导览', path: '/ar-campus', icon: '📱' },
    { name: '招生数据分析', path: '/data-visualization', icon: '📊' },
    { name: '模拟课堂体验', path: '/virtual-class', icon: '🎓' }
  ]

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <img src={logo} alt="华南农业大学" />
          <div className={styles.logoText}>
            <h1>智能招生系统</h1>
            {/* <p>智能招生系统</p> */}
          </div>
        </div>
        
        <nav className={styles.navigation}>
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
            >
              {item.name}
            </Link>
          ))}
          
          <div className={styles.featuresDropdown} ref={featuresRef}>
            <button 
              className={`${styles.navItem} ${styles.dropdownBtn} ${featuresOpen ? styles.active : ''}`} 
              onClick={() => setFeaturesOpen(!featuresOpen)}
            >
              特色功能
              <span className={styles.arrow}>▼</span>
            </button>
            
            {featuresOpen && (
              <div className={styles.dropdownContent}>
                {featureItems.map((item) => (
                  <Link 
                    key={item.path} 
                    to={item.path}
                    className={styles.dropdownItem}
                    onClick={() => setFeaturesOpen(false)}
                  >
                    <span className={styles.itemIcon}>{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
        
        <button className={styles.contactBtn} hidden>
          立即报名
          <span className={styles.btnGlow}></span>
        </button>
      </div>
    </header>
  )
}

export default Header
