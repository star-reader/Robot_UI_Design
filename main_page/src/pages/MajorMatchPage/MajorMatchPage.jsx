import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './MajorMatchPage.module.css'

const MajorMatchPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [percentage, setPercentage] = useState(0)
  
  const questions = [
    {
      id: 1,
      text: '您更喜欢哪种学习方式？',
      options: [
        { id: 'a', text: '动手实践操作', traits: ['engineering', 'agriculture', 'arts'] },
        { id: 'b', text: '阅读文献资料', traits: ['humanities', 'business', 'science'] },
        { id: 'c', text: '小组讨论合作', traits: ['business', 'humanities', 'education'] },
        { id: 'd', text: '独立思考探索', traits: ['science', 'engineering', 'medicine'] }
      ]
    },
    {
      id: 2,
      text: '您对以下哪个领域最感兴趣？',
      options: [
        { id: 'a', text: '科学与自然', traits: ['science', 'agriculture', 'medicine'] },
        { id: 'b', text: '人文与社会', traits: ['humanities', 'education', 'business'] },
        { id: 'c', text: '技术与工程', traits: ['engineering', 'computer', 'science'] },
        { id: 'd', text: '艺术与设计', traits: ['arts', 'humanities', 'computer'] }
      ]
    },
    {
      id: 3,
      text: '您理想的职业环境是？',
      options: [
        { id: 'a', text: '户外/自然环境', traits: ['agriculture', 'science', 'environment'] },
        { id: 'b', text: '办公室环境', traits: ['business', 'computer', 'humanities'] },
        { id: 'c', text: '实验室/研究所', traits: ['science', 'medicine', 'engineering'] },
        { id: 'd', text: '创意/设计工作室', traits: ['arts', 'computer', 'humanities'] }
      ]
    },
    {
      id: 4,
      text: '您认为自己的优势是？',
      options: [
        { id: 'a', text: '逻辑思维与分析能力', traits: ['science', 'engineering', 'computer'] },
        { id: 'b', text: '创新思维与想象力', traits: ['arts', 'humanities', 'computer'] },
        { id: 'c', text: '沟通能力与团队协作', traits: ['business', 'education', 'humanities'] },
        { id: 'd', text: '观察力与细心程度', traits: ['medicine', 'agriculture', 'science'] }
      ]
    },
    {
      id: 5,
      text: '您在解决问题时的方式是？',
      options: [
        { id: 'a', text: '寻找创新与突破性解决方案', traits: ['engineering', 'computer', 'arts'] },
        { id: 'b', text: '系统分析并寻找最优解', traits: ['science', 'medicine', 'business'] },
        { id: 'c', text: '依靠经验与直觉', traits: ['arts', 'humanities', 'agriculture'] },
        { id: 'd', text: '寻求他人建议与合作', traits: ['education', 'business', 'humanities'] }
      ]
    },
    {
      id: 6,
      text: '您更希望从事哪类工作？',
      options: [
        { id: 'a', text: '改善人们生活品质的工作', traits: ['medicine', 'education', 'agriculture'] },
        { id: 'b', text: '创造有价值产品的工作', traits: ['engineering', 'computer', 'arts'] },
        { id: 'c', text: '探索未知领域的工作', traits: ['science', 'medicine', 'engineering'] },
        { id: 'd', text: '影响他人思想的工作', traits: ['humanities', 'education', 'business'] }
      ]
    },
    {
      id: 7,
      text: '您对未来职业的期望是？',
      options: [
        { id: 'a', text: '稳定且有保障', traits: ['medicine', 'education', 'business'] },
        { id: 'b', text: '充满创新与挑战', traits: ['computer', 'engineering', 'science'] },
        { id: 'c', text: '能够自由发挥创意', traits: ['arts', 'humanities', 'computer'] },
        { id: 'd', text: '对社会有所贡献', traits: ['agriculture', 'medicine', 'education'] }
      ]
    }
  ]

  const majorRecommendations = {
    agriculture: [
      { name: '农学', description: '培养农业科学与技术领域的专业人才，主要研究农作物生长、栽培和生产等问题。', match: 95 },
      { name: '植物保护', description: '研究农作物病虫害防治技术，培养具备植物保护基础理论和技术的专业人才。', match: 92 },
      { name: '园艺学', description: '培养果树、蔬菜、花卉等园艺植物生产与研究的专业人才。', match: 88 }
    ],
    science: [
      { name: '生物科学', description: '研究生命现象和生命活动规律，培养具备生物学基本理论的专业人才。', match: 94 },
      { name: '食品科学与工程', description: '培养食品加工、检测、质量控制等领域的专业人才。', match: 90 },
      { name: '应用化学', description: '培养在化学及相关领域从事科研、技术开发的专业人才。', match: 87 }
    ],
    engineering: [
      { name: '农业工程', description: '培养能够将工程技术应用于农业生产的复合型人才。', match: 93 },
      { name: '机械工程', description: '培养机械设计、制造及自动化领域的专业人才。', match: 89 },
      { name: '土木工程', description: '培养从事建筑工程设计、施工和管理的专业人才。', match: 85 }
    ],
    computer: [
      { name: '计算机科学与技术', description: '培养具备计算机系统设计、开发和应用能力的专业人才。', match: 96 },
      { name: '软件工程', description: '培养从事软件开发、测试和维护的专业人才。', match: 92 },
      { name: '数据科学与大数据技术', description: '培养能够进行数据分析和挖掘的专业人才。', match: 90 }
    ],
    medicine: [
      { name: '动物医学', description: '培养从事动物疾病诊断、防治和检疫的专业人才。', match: 95 },
      { name: '预防医学', description: '培养从事疾病预防控制和公共卫生工作的专业人才。', match: 88 },
      { name: '中药学', description: '培养从事中药资源开发利用的专业人才。', match: 85 }
    ],
    business: [
      { name: '工商管理', description: '培养能够从事企业经营管理工作的专业人才。', match: 92 },
      { name: '市场营销', description: '培养从事市场调研、营销策划和营销管理的专业人才。', match: 90 },
      { name: '国际经济与贸易', description: '培养从事国际贸易业务和管理的专业人才。', match: 87 }
    ],
    humanities: [
      { name: '英语', description: '培养具有扎实英语语言基础和广泛文化知识的专业人才。', match: 89 },
      { name: '汉语言文学', description: '培养具备汉语言文学基础知识和应用能力的专业人才。', match: 86 },
      { name: '新闻传播学', description: '培养从事新闻采编、传媒经营管理的专业人才。', match: 85 }
    ],
    education: [
      { name: '教育学', description: '培养从事教育教学、研究和管理工作的专业人才。', match: 91 },
      { name: '学前教育', description: '培养从事幼儿教育和管理的专业人才。', match: 87 },
      { name: '体育教育', description: '培养从事体育教学、训练和管理的专业人才。', match: 84 }
    ],
    arts: [
      { name: '风景园林', description: '培养从事景观规划设计和建设管理的专业人才。', match: 94 },
      { name: '环境设计', description: '培养从事环境空间设计的专业人才。', match: 89 },
      { name: '视觉传达设计', description: '培养从事视觉设计和创意表达的专业人才。', match: 87 }
    ],
    environment: [
      { name: '环境工程', description: '培养从事环境保护和治理的专业人才。', match: 93 },
      { name: '生态学', description: '培养从事生态环境保护和生态建设的专业人才。', match: 90 },
      { name: '资源环境科学', description: '培养从事自然资源管理和环境保护的专业人才。', match: 88 }
    ]
  }

  const handleAnswerSelect = (questionId, optionId, traits) => {
    setAnswers({ 
      ...answers, 
      [questionId]: { option: optionId, traits: traits } 
    })
    
    if (questionId < questions.length) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
      }, 300)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    setLoading(true)
    
    // 模拟处理时间
    const timer = setInterval(() => {
      setPercentage(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 4
      })
    }, 100)
    
    // 模拟API请求
    setTimeout(() => {
      // 分析性格特质
      const traitCounts = {}
      
      Object.values(answers).forEach(answer => {
        answer.traits.forEach(trait => {
          traitCounts[trait] = (traitCounts[trait] || 0) + 1
        })
      })
      
      // 排序特质
      const sortedTraits = Object.entries(traitCounts)
        .sort((a, b) => b[1] - a[1])
        .map(entry => entry[0])
      
      // 获取前三个特质对应的专业推荐
      const recommendedMajors = []
      
      sortedTraits.slice(0, 3).forEach(trait => {
        if (majorRecommendations[trait]) {
          majorRecommendations[trait].forEach(major => {
            recommendedMajors.push({ 
              ...major, 
              field: trait,
              fieldName: getFieldName(trait)
            })
          })
        }
      })
      
      // 按匹配度排序，去重
      const uniqueMajors = recommendedMajors
        .sort((a, b) => b.match - a.match)
        .filter((major, index, self) => 
          index === self.findIndex(m => m.name === major.name)
        )
        .slice(0, 5)
      
      setResults({
        traits: sortedTraits.slice(0, 3).map(trait => ({
          name: trait,
          displayName: getFieldName(trait)
        })),
        majors: uniqueMajors
      })
      
      setLoading(false)
      clearInterval(timer)
      setPercentage(100)
    }, 3000)
  }
  
  const getFieldName = (field) => {
    const fieldNames = {
      agriculture: '农业科学',
      science: '自然科学',
      engineering: '工程技术',
      computer: '计算机与信息',
      medicine: '医药卫生',
      business: '商业管理',
      humanities: '人文社科',
      education: '教育学',
      arts: '艺术设计',
      environment: '环境科学'
    }
    return fieldNames[field] || field
  }
  
  const resetTest = () => {
    setCurrentStep(1)
    setAnswers({})
    setResults(null)
    setPercentage(0)
  }

  // 渲染问卷部分
  const renderQuestions = () => {
    const currentQuestion = questions[currentStep - 1]
    
    return (
      <div className={styles.questionContainer}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${(currentStep / questions.length) * 100}%` }}
          ></div>
        </div>
        
        <div className={styles.questionCount}>
          问题 {currentStep} / {questions.length}
        </div>
        
        <h2 className={styles.questionText}>{currentQuestion.text}</h2>
        
        <div className={styles.optionsContainer}>
          {currentQuestion.options.map(option => (
            <button 
              key={option.id}
              className={`${styles.optionButton} ${answers[currentQuestion.id]?.option === option.id ? styles.selected : ''}`}
              onClick={() => handleAnswerSelect(currentQuestion.id, option.id, option.traits)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    )
  }
  
  // 渲染结果部分
  const renderResults = () => {
    return (
      <div className={styles.resultsContainer}>
        <h2 className={styles.resultTitle}>您的专业匹配结果</h2>
        
        <div className={styles.traitsSection}>
          <h3>您的专业倾向</h3>
          <div className={styles.traitsList}>
            {results.traits.map((trait, index) => (
              <div key={index} className={styles.traitItem}>
                <span className={styles.traitIcon}>
                  {trait.name === 'agriculture' ? '🌾' : 
                   trait.name === 'science' ? '🔬' : 
                   trait.name === 'engineering' ? '⚙️' : 
                   trait.name === 'computer' ? '💻' : 
                   trait.name === 'medicine' ? '⚕️' : 
                   trait.name === 'business' ? '📊' : 
                   trait.name === 'humanities' ? '📚' : 
                   trait.name === 'education' ? '🎓' : 
                   trait.name === 'arts' ? '🎨' : '🌍'}
                </span>
                <span className={styles.traitName}>{trait.displayName}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.majorsSection}>
          <h3>推荐专业</h3>
          <div className={styles.majorsList}>
            {results.majors.map((major, index) => (
              <div key={index} className={styles.majorCard}>
                <div className={styles.majorHeader}>
                  <h4>{major.name}</h4>
                  <div className={styles.matchBadge}>
                    <span className={styles.matchText}>匹配度</span>
                    <span className={styles.matchPercentage}>{major.match}%</span>
                  </div>
                </div>
                
                <p className={styles.majorDescription}>{major.description}</p>
                
                <div className={styles.majorField}>
                  <span className={styles.fieldLabel}>所属领域:</span>
                  <span className={styles.fieldValue}>{major.fieldName}</span>
                </div>
                
                <Link to={`/admissions?major=${encodeURIComponent(major.name)}`} className={styles.learnMoreBtn}>
                  了解更多
                </Link>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.actionsSection}>
          <button onClick={resetTest} className={styles.resetButton}>
            重新测试
          </button>
          <Link to="/consultation" className={styles.consultButton}>
            咨询招生顾问
          </Link>
        </div>
      </div>
    )
  }
  
  // 渲染加载部分
  const renderLoading = () => {
    return (
      <div className={styles.loadingContainer}>
        <h2>正在分析您的答案...</h2>
        <div className={styles.analysisProgress}>
          <div className={styles.analysisFill} style={{ width: `${percentage}%` }}></div>
        </div>
        <div className={styles.analysisSteps}>
          <div className={`${styles.analysisStep} ${percentage >= 25 ? styles.active : ''}`}>
            <div className={styles.stepIcon}>📊</div>
            <span>分析个人特质</span>
          </div>
          <div className={`${styles.analysisStep} ${percentage >= 50 ? styles.active : ''}`}>
            <div className={styles.stepIcon}>🔍</div>
            <span>匹配专业方向</span>
          </div>
          <div className={`${styles.analysisStep} ${percentage >= 75 ? styles.active : ''}`}>
            <div className={styles.stepIcon}>📋</div>
            <span>生成推荐结果</span>
          </div>
          <div className={`${styles.analysisStep} ${percentage >= 100 ? styles.active : ''}`}>
            <div className={styles.stepIcon}>✅</div>
            <span>完成</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.majorMatchPage}>
      <div className={styles.pageHeader}>
        <h1>专业匹配测试</h1>
        <p>通过回答一系列问题，找到最适合您的专业方向</p>
      </div>
      
      <div className={styles.contentContainer}>
        {loading ? renderLoading() : 
         results ? renderResults() : renderQuestions()}
      </div>
    </div>
  )
}

export default MajorMatchPage
