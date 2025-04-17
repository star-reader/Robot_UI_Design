import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: '首页', path: '/' },
    { name: '智能咨询', path: '/consultation' },
    { name: '虚拟校园', path: '/virtual-tour' },
    { name: '招生指南', path: '/admissions' },
    { name: '校园生活', path: '/campus-life' },
  ]

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <img src="/src/assets/images/scau_logo.png" alt="华南农业大学" />
          <div className={styles.logoText}>
            <h1>华南农业大学</h1>
            <p>智能招生系统</p>
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
        </nav>
        
        <button className={styles.contactBtn}>
          立即报名
          <span className={styles.btnGlow}></span>
        </button>
      </div>
    </header>
  )
}

export default Header
