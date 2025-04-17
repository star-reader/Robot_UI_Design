import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.logoSection}>
          <img src="/src/assets/images/scau_logo.png" alt="华南农业大学" className={styles.footerLogo} />
          <div className={styles.logoText}>
            <h3>华南农业大学</h3>
            <p>科技兴农，人才强校</p>
          </div>
        </div>
        
        <div className={styles.linksContainer}>
          <div className={styles.linkColumn}>
            <h4>招生信息</h4>
            <ul>
              <li><Link to="/admissions">本科招生</Link></li>
              <li><Link to="/admissions">研究生招生</Link></li>
              <li><Link to="/admissions">国际学生</Link></li>
              <li><Link to="/admissions">奖学金</Link></li>
            </ul>
          </div>
          
          <div className={styles.linkColumn}>
            <h4>快速导航</h4>
            <ul>
              <li><Link to="/">首页</Link></li>
              <li><Link to="/consultation">智能咨询</Link></li>
              <li><Link to="/virtual-tour">校园导览</Link></li>
              <li><Link to="/campus-life">校园生活</Link></li>
            </ul>
          </div>
          
          <div className={styles.contactColumn}>
            <h4>联系我们</h4>
            <p><span className={styles.icon}>📍</span> 广州市天河区五山路483号</p>
            <p><span className={styles.icon}>📞</span> 招生热线：020-85280000</p>
            <p><span className={styles.icon}>✉️</span> admission@scau.edu.cn</p>
          </div>
        </div>
      </div>
      
      <div className={styles.divider}></div>
      
      <div className={styles.bottomSection}>
        <div className={styles.copyright}>
          <p>&copy; {currentYear} 华南农业大学招生办公室. 版权所有.</p>
        </div>
        
        <div className={styles.social}>
          <a href="https://weibo.com/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <span>微博</span>
          </a>
          <a href="https://wx.qq.com/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <span>微信</span>
          </a>
          <a href="https://www.douyin.com/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <span>抖音</span>
          </a>
          <a href="https://www.zhihu.com/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <span>知乎</span>
          </a>
        </div>
      </div>
      
      <div className={styles.techDecoration}>
        <div className={styles.techCircle}></div>
        <div className={styles.techLines}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
