import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

const HomePage = () => {
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [features, setFeatures] = useState([])

  useEffect(() => {
    const featuresList = [
      {
        id: 1,
        title: '智能咨询系统',
        description: '利用AI技术提供24/7实时招生咨询服务，解答考生疑问',
        icon: '💬',
        link: '/consultation'
      },
      {
        id: 2,
        title: '3D虚拟校园',
        description: '足不出户游览华农美丽校园，感受校园文化与氛围',
        icon: '🏫',
        link: '/virtual-tour'
      },
      {
        id: 3,
        title: '招生指南',
        description: '提供专业介绍、录取分数线、报考攻略等权威信息',
        icon: '📚',
        link: '/admissions'
      },
      {
        id: 4,
        title: '校园生活',
        description: '了解华农学子多彩的校园生活，感受大学魅力',
        icon: '🎓',
        link: '/campus-life'
      }
    ]

    // Simulate loading of features
    setTimeout(() => {
      setFeatures(featuresList)
    }, 500)
  }, [])

  useEffect(() => {
    const img = new Image()
    img.src = '/src/assets/images/scau.png'
    img.onload = () => setHeroLoaded(true)
  }, [])

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={`${styles.hero} ${heroLoaded ? styles.loaded : ''}`}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.mainTitle}>
            <span>华南农业大学</span>
            <span className={styles.gradientText}>智能招生系统</span>
          </h1>
          <p className={styles.subTitle}>科技引领未来，智慧点亮人生</p>
          
          <div className={styles.heroBtns}>
            <Link to="/consultation" className={styles.primaryBtn}>
              <span>开始咨询</span>
              <i className={styles.arrowIcon}>→</i>
            </Link>
            <a href="#features" className={styles.secondaryBtn}>了解更多</a>
          </div>
          
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>109</span>
              <span className={styles.statLabel}>年办学历史</span>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>90+</span>
              <span className={styles.statLabel}>本科专业</span>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>40000+</span>
              <span className={styles.statLabel}>在校学生</span>
            </div>
          </div>
        </div>
        
        <div className={styles.scrollIndicator}>
          <div className={styles.mouseIcon}>
            <div className={styles.wheel}></div>
          </div>
          <p>向下滚动</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2>智能招生服务</h2>
          <p>为您提供全方位的招生信息与服务体验</p>
        </div>
        
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <Link to={feature.link} key={feature.id} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <span className={styles.learnMore}>了解更多 →</span>
              <div className={styles.glowEffect} style={{ animationDelay: `${index * 0.2}s` }}></div>
            </Link>
          ))}
        </div>
      </section>

      {/* Consultation Preview */}
      <section className={styles.consultationPreview}>
        <div className={styles.previewContent}>
          <h2>AI 智能咨询</h2>
          <p>拥有深度学习能力的招生咨询助手，随时为您解答关于华农的一切疑问</p>
          
          <div className={styles.chatPreview}>
            <div className={styles.chatMessage}>
              <div className={styles.userMessage}>
                <span>请问华农的王牌专业有哪些？</span>
              </div>
              <div className={styles.aiMessage}>
                <span>华南农业大学的王牌专业包括农学、植物保护、动物科学、园艺、动物医学、食品科学与工程等农业相关专业，以及风景园林、计算机科学与技术、工商管理等特色专业。这些专业拥有雄厚的师资力量和科研实力，就业前景广阔。</span>
              </div>
            </div>
            
            <Link to="/consultation" className={styles.tryItBtn}>立即体验</Link>
          </div>
        </div>
      </section>

      {/* Virtual Tour Preview */}
      <section className={styles.virtualTourSection}>
        <div className={styles.sectionHeader}>
          <h2>3D 虚拟校园</h2>
          <p>足不出户，探索华农美丽校园</p>
        </div>
        <div className={styles.tourPreviewBox}>
          <div className={styles.tourPlaceholder}>
            <span className={styles.playIcon}>▶</span>
            <span>点击开始虚拟校园之旅</span>
          </div>
          <Link to="/virtual-tour" className={styles.exploreBtn}>探索校园</Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
