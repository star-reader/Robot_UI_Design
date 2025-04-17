import { useState, useEffect } from 'react'
import styles from './AdmissionsPage.module.css'

const AdmissionsPage = () => {
  const [activeTab, setActiveTab] = useState('undergraduate')
  const [programs, setPrograms] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedFaq, setExpandedFaq] = useState(null)

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        const programsData = {
          undergraduate: [
            { id: 1, name: '农学', description: '培养具备农业科学基本理论、基本知识和基本技能的专业人才', years: '4年', degree: '农学学士', cutoff: '550分' },
            { id: 2, name: '植物保护', description: '培养掌握植物保护和植物检疫基本理论和技能的专业人才', years: '4年', degree: '农学学士', cutoff: '545分' },
            { id: 3, name: '动物科学', description: '培养从事动物遗传育种、繁殖、营养与饲料、生产等方面的专业人才', years: '4年', degree: '农学学士', cutoff: '535分' },
            { id: 4, name: '食品科学与工程', description: '培养具备食品科学与工程学科宽广的技术理论基础和较强实践能力的专业人才', years: '4年', degree: '工学学士', cutoff: '560分' },
            { id: 5, name: '计算机科学与技术', description: '培养具有良好综合素质和职业道德，掌握扎实的计算机科学与技术专业知识的专业人才', years: '4年', degree: '工学学士', cutoff: '570分' },
            { id: 6, name: '风景园林', description: '培养掌握风景园林规划设计、建设与管理的基本理论和基本知识的专业人才', years: '4年', degree: '工学学士', cutoff: '555分' },
          ],
          graduate: [
            { id: 1, name: '农业工程', description: '研究农业生产中工程技术的应用，包括农业机械化、农田水利等', years: '3年', degree: '农业工程硕士', cutoff: 'N/A' },
            { id: 2, name: '作物学', description: '研究作物的生长发育规律、遗传改良和高产栽培技术等', years: '3年', degree: '农学硕士', cutoff: 'N/A' },
            { id: 3, name: '兽医学', description: '研究动物疾病的诊断、治疗和预防，以及动物产品的检验等', years: '3年', degree: '兽医学硕士', cutoff: 'N/A' },
          ],
          international: [
            { id: 1, name: 'Agricultural Science', description: 'Study the principles and practices of modern agriculture', years: '4年', degree: 'Bachelor of Science', cutoff: 'N/A' },
            { id: 2, name: 'Food Science and Technology', description: 'Learn about food processing, preservation, and safety', years: '4年', degree: 'Bachelor of Engineering', cutoff: 'N/A' },
          ]
        }
        
        setPrograms(programsData)
        setIsLoading(false)
      }, 1000)
    }
    
    loadData()
  }, [])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSearchTerm('')
  }
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }
  
  const filteredPrograms = programs[activeTab]?.filter(program => 
    program.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    program.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }
  
  const faqs = [
    { id: 1, question: '华南农业大学本科招生计划一年是多少人？', answer: '华南农业大学每年的本科招生计划约为6000人，具体数量会根据教育部规定和学校发展规划有所调整。详细的招生计划可查看当年的招生简章。' },
    { id: 2, question: '录取原则是什么？', answer: '学校按照"分数优先、遵循志愿"的原则录取考生。在第一志愿考生生源充足的情况下，优先录取第一志愿考生。对于特殊类型招生，学校将严格按照相关政策执行。' },
    { id: 3, question: '是否有专业级差？', answer: '部分热门专业可能设有专业级差，通常在10-30分之间，详细请参考当年招生简章。' },
    { id: 4, question: '可以转专业吗？', answer: '学校实行弹性的转专业政策。除了少数特殊专业外，大一学生在完成第一学年学习后，符合条件者可申请转专业。具体细则以学校教务处发布的最新政策为准。' },
    { id: 5, question: '学校有哪些奖助学金？', answer: '学校设有国家奖学金、国家励志奖学金、国家助学金、学校奖学金、专项奖学金等多种奖助学金，此外还有助学贷款、勤工助学等帮助家庭经济困难学生完成学业。' }
  ]

  const applicationSteps = [
    { name: '了解招生信息', icon: '📚', description: '查看招生简章，了解专业设置和招生政策' },
    { name: '网上报名', icon: '💻', description: '在规定时间内完成网上报名及志愿填报' },
    { name: '参加考试', icon: '✍️', description: '参加高考或其他相应入学考试' },
    { name: '查询录取结果', icon: '🔍', description: '通过官方渠道查询录取状态' },
    { name: '办理入学手续', icon: '📝', description: '按照录取通知书要求，按时办理入学手续' }
  ]

  if (isLoading) {
    return <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p>正在加载招生信息...</p>
    </div>
  }

  return (
    <div className={styles.admissionsPage}>
      <div className={styles.pageHeader}>
        <h1>招生指南</h1>
        <p>探索华南农业大学的优质教育资源与专业学科</p>
      </div>
      
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'undergraduate' ? styles.activeTab : ''}`} 
            onClick={() => handleTabChange('undergraduate')}
          >
            本科生招生
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'graduate' ? styles.activeTab : ''}`} 
            onClick={() => handleTabChange('graduate')}
          >
            研究生招生
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'international' ? styles.activeTab : ''}`} 
            onClick={() => handleTabChange('international')}
          >
            国际学生
          </button>
        </div>
        
        <div className={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="搜索专业..." 
            value={searchTerm} 
            onChange={handleSearch} 
            className={styles.searchInput} 
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>
      </div>
      
      <div className={styles.programsSection}>
        <h2>{activeTab === 'undergraduate' ? '本科专业' : activeTab === 'graduate' ? '研究生专业' : '国际学生专业'}</h2>
        
        {filteredPrograms.length === 0 ? (
          <div className={styles.noResults}>没有找到匹配的专业</div>
        ) : (
          <div className={styles.programsGrid}>
            {filteredPrograms.map(program => (
              <div key={program.id} className={styles.programCard}>
                <div className={styles.programHeader}>
                  <h3>{program.name}</h3>
                  <div className={styles.programBadge}>{program.years}</div>
                </div>
                <p className={styles.programDesc}>{program.description}</p>
                
                <div className={styles.programDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>学位</span>
                    <span>{program.degree}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>分数线</span>
                    <span>{program.cutoff}</span>
                  </div>
                </div>
                
                <button className={styles.moreInfoBtn}>了解更多</button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className={styles.applicationProcess}>
        <h2>申请流程</h2>
        <div className={styles.processSteps}>
          {applicationSteps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3>{step.name}</h3>
              <p>{step.description}</p>
              <div className={styles.stepNumber}>{index + 1}</div>
              {index < applicationSteps.length - 1 && <div className={styles.connector}></div>}
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.faqSection}>
        <h2>常见问题</h2>
        <div className={styles.faqList}>
          {faqs.map(faq => (
            <div 
              key={faq.id} 
              className={`${styles.faqItem} ${expandedFaq === faq.id ? styles.expanded : ''}`}
              onClick={() => toggleFaq(faq.id)}
            >
              <div className={styles.faqQuestion}>
                <h3>{faq.question}</h3>
                <span className={styles.faqIcon}>
                  {expandedFaq === faq.id ? '−' : '+'}
                </span>
              </div>
              {expandedFaq === faq.id && (
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.contactSection}>
        <h2>联系招生办</h2>
        <div className={styles.contactGrid}>
          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>📞</div>
            <h3>招生热线</h3>
            <p>020-85280000</p>
            <p>工作日 8:30-17:00</p>
          </div>
          
          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>✉️</div>
            <h3>电子邮箱</h3>
            <p>admission@scau.edu.cn</p>
            <p>24小时接收邮件咨询</p>
          </div>
          
          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>📱</div>
            <h3>官方微信</h3>
            <p>SCAU_Admission</p>
            <p>扫描二维码关注</p>
          </div>
          
          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>🏢</div>
            <h3>招生办公室</h3>
            <p>华南农业大学行政楼115室</p>
            <p>工作日 8:30-17:00</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdmissionsPage
