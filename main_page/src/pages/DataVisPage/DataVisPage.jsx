import { useState, useEffect, useRef } from 'react'
import styles from './DataVisPage.module.css'

const DataVisPage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)
  const [chartData, setChartData] = useState({})
  const enrollmentChartRef = useRef(null)
  const genderChartRef = useRef(null)
  const provinceChartRef = useRef(null)
  const scoreChartRef = useRef(null)
  
  // 模拟获取数据
  useEffect(() => {
    const fetchData = async () => {
      // 在真实应用中，这里会是API调用
      setTimeout(() => {
        setChartData({
          enrollment: {
            years: ['2018', '2019', '2020', '2021', '2022', '2023'],
            values: [5800, 6100, 6300, 6500, 6700, 7000]
          },
          gender: {
            labels: ['男生', '女生'],
            values: [46, 54]
          },
          provinces: [
            { name: '广东', value: 42 },
            { name: '广西', value: 18 },
            { name: '湖南', value: 8 },
            { name: '江西', value: 7 },
            { name: '福建', value: 6 },
            { name: '四川', value: 5 },
            { name: '湖北', value: 4 },
            { name: '其他', value: 10 }
          ],
          scores: {
            majors: ['计算机科学与技术', '农学', '经济学', '食品科学', '动物医学'],
            scores: [620, 580, 600, 590, 610]
          },
          acceptance: {
            years: ['2018', '2019', '2020', '2021', '2022', '2023'],
            rates: [28, 26, 25, 23, 20, 18]
          },
          employment: {
            categories: ['升学深造', '企业就业', '政府机构', '自主创业', '其他'],
            values: [30, 45, 15, 5, 5]
          }
        })
        setIsLoading(false)
      }, 1500)
    }
    
    fetchData()
  }, [])

  // 简易图表渲染函数 (实际项目中应使用ECharts或其他图表库)
  const renderBarChart = (container, data, labels, color) => {
    if (!container) return
    
    const canvas = container
    const ctx = canvas.getContext('2d')
    const maxValue = Math.max(...data)
    const barWidth = (canvas.width - 60) / data.length
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // 绘制标题和坐标轴
    ctx.beginPath()
    ctx.moveTo(40, 20)
    ctx.lineTo(40, canvas.height - 40)
    ctx.lineTo(canvas.width - 20, canvas.height - 40)
    ctx.strokeStyle = '#666'
    ctx.stroke()
    
    // 绘制条形
    data.forEach((value, i) => {
      const barHeight = ((value / maxValue) * (canvas.height - 80))
      const x = 40 + i * barWidth + 10
      const y = canvas.height - 40 - barHeight
      
      // 绘制条形
      ctx.fillStyle = color
      ctx.fillRect(x, y, barWidth - 20, barHeight)
      
      // 绘制数值
      ctx.fillStyle = '#fff'
      ctx.font = '12px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(value, x + (barWidth - 20)/2, y - 5)
      
      // 绘制标签
      ctx.fillStyle = '#aaa'
      ctx.fillText(labels[i], x + (barWidth - 20)/2, canvas.height - 20)
    })
  }
  
  const renderPieChart = (container, data, labels, colors) => {
    if (!container) return
    
    const canvas = container
    const ctx = canvas.getContext('2d')
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 40
    
    const total = data.reduce((acc, val) => acc + val, 0)
    let startAngle = 0
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // 绘制饼图
    data.forEach((value, i) => {
      const sliceAngle = (value / total) * 2 * Math.PI
      
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()
      
      ctx.fillStyle = colors[i % colors.length]
      ctx.fill()
      
      // 绘制标签
      const labelAngle = startAngle + sliceAngle / 2
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7)
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7)
      
      ctx.fillStyle = '#fff'
      ctx.font = '12px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(`${labels[i]}: ${value}%`, labelX, labelY)
      
      startAngle += sliceAngle
    })
  }

  useEffect(() => {
    if (!isLoading) {
      // 渲染图表
      if (activeTab === 'overview') {
        renderBarChart(
          enrollmentChartRef.current,
          chartData.enrollment.values,
          chartData.enrollment.years,
          'rgba(76, 175, 80, 0.7)'
        )
        
        renderPieChart(
          genderChartRef.current,
          chartData.gender.values,
          chartData.gender.labels,
          ['rgba(33, 150, 243, 0.7)', 'rgba(233, 30, 99, 0.7)']
        )
      } else if (activeTab === 'scores') {
        renderBarChart(
          scoreChartRef.current,
          chartData.scores.scores,
          chartData.scores.majors,
          'rgba(255, 152, 0, 0.7)'
        )
      }
    }
  }, [isLoading, activeTab, chartData])
  
  // 渲染数据标签
  const renderDataCard = (title, value, unit, icon, description) => {
    return (
      <div className={styles.dataCard}>
        <div className={styles.dataCardIcon}>{icon}</div>
        <div className={styles.dataCardContent}>
          <h3>{title}</h3>
          <div className={styles.dataValue}>
            <span className={styles.valueNumber}>{value}</span>
            <span className={styles.valueUnit}>{unit}</span>
          </div>
          <p className={styles.dataDescription}>{description}</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>正在加载数据...</p>
      </div>
    )
  }

  return (
    <div className={styles.dataVisPage}>
      <div className={styles.pageHeader}>
        <h1>招生数据可视化</h1>
        <p>直观了解华南农业大学近年招生情况与统计数据</p>
      </div>
      
      <div className={styles.tabsContainer}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'overview' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          招生概况
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'scores' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('scores')}
        >
          分数线分析
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'employment' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('employment')}
        >
          就业数据
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'demographics' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('demographics')}
        >
          生源分布
        </button>
      </div>
      
      <div className={styles.dataContainer}>
        {activeTab === 'overview' && (
          <>
            <div className={styles.dataCardsSection}>
              <div className={styles.cardsGrid}>
                {renderDataCard('2023年招生人数', '7,000', '人', '👨‍🎓', '较2022年增长4.5%')}
                {renderDataCard('招生专业数', '90', '+', '📚', '覆盖12个学科门类')}
                {renderDataCard('录取率', '18', '%', '📊', '2023年本科生录取比例')}
                {renderDataCard('平均分数线', '590', '分', '🏆', '2023年本科录取分数线')}
              </div>
            </div>
            
            <div className={styles.chartsSection}>
              <div className={styles.chartCard}>
                <h3>近六年招生人数趋势</h3>
                <div className={styles.chartContainer}>
                  <canvas ref={enrollmentChartRef} width="500" height="300"></canvas>
                </div>
              </div>
              
              <div className={styles.chartCard}>
                <h3>男女比例</h3>
                <div className={styles.chartContainer}>
                  <canvas ref={genderChartRef} width="400" height="300"></canvas>
                </div>
              </div>
            </div>
            
            <div className={styles.statsSection}>
              <h2>2023年招生亮点</h2>
              <div className={styles.statsList}>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>98.6<span>%</span></div>
                  <div className={styles.statLabel}>一志愿录取率</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>42<span>位</span></div>
                  <div className={styles.statLabel}>全国高考状元</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>26<span>个</span></div>
                  <div className={styles.statLabel}>全国招生省份</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>12<span>个</span></div>
                  <div className={styles.statLabel}>国家重点学科</div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'scores' && (
          <>
            <div className={styles.scoresSection}>
              <div className={styles.scoresTrends}>
                <h3>主要专业分数线</h3>
                <div className={styles.chartContainer}>
                  <canvas ref={scoreChartRef} width="600" height="300"></canvas>
                </div>
              </div>
              
              <div className={styles.scoresTable}>
                <h3>2023年各省份录取分数线</h3>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>省份</th>
                      <th>文科</th>
                      <th>理科</th>
                      <th>综合</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>广东</td>
                      <td>590</td>
                      <td>600</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>广西</td>
                      <td>575</td>
                      <td>585</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>湖南</td>
                      <td>580</td>
                      <td>592</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>福建</td>
                      <td>582</td>
                      <td>595</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>江西</td>
                      <td>578</td>
                      <td>588</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className={styles.hotMajors}>
              <h3>热门专业录取情况</h3>
              <div className={styles.majorsGrid}>
                <div className={styles.majorItem}>
                  <div className={styles.majorName}>计算机科学与技术</div>
                  <div className={styles.majorScore}>620<span>分</span></div>
                  <div className={styles.oversubscription}>8.5:1</div>
                  <div className={styles.majorLabel}>报录比</div>
                </div>
                <div className={styles.majorItem}>
                  <div className={styles.majorName}>动物医学</div>
                  <div className={styles.majorScore}>610<span>分</span></div>
                  <div className={styles.oversubscription}>7.2:1</div>
                  <div className={styles.majorLabel}>报录比</div>
                </div>
                <div className={styles.majorItem}>
                  <div className={styles.majorName}>经济学</div>
                  <div className={styles.majorScore}>600<span>分</span></div>
                  <div className={styles.oversubscription}>6.8:1</div>
                  <div className={styles.majorLabel}>报录比</div>
                </div>
                <div className={styles.majorItem}>
                  <div className={styles.majorName}>食品科学与工程</div>
                  <div className={styles.majorScore}>590<span>分</span></div>
                  <div className={styles.oversubscription}>5.5:1</div>
                  <div className={styles.majorLabel}>报录比</div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'employment' && (
          <div className={styles.employmentSection}>
            <div className={styles.employmentOverview}>
              <h2>就业概览</h2>
              <div className={styles.employmentRate}>
                <div className={styles.rateCircle}>
                  <div className={styles.rateInner}>
                    <span className={styles.rateNumber}>96.8%</span>
                    <span className={styles.rateLabel}>就业率</span>
                  </div>
                </div>
                
                <div className={styles.rateDetails}>
                  <p>2023届本科毕业生就业率达<strong>96.8%</strong>，研究生就业率达<strong>98.2%</strong>，连续5年保持较高水平。</p>
                  <div className={styles.rateChange}>
                    <span className={styles.rateUp}>↑ 1.2%</span>
                    <span className={styles.rateInfo}>较上一年度</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.employmentDistribution}>
                <h3>毕业生去向分布</h3>
                <div className={styles.distributionGrid}>
                  <div className={styles.distributionItem}>
                    <div className={styles.distributionIcon}>🏢</div>
                    <div className={styles.distributionPercentage}>45%</div>
                    <div className={styles.distributionLabel}>企业就业</div>
                  </div>
                  <div className={styles.distributionItem}>
                    <div className={styles.distributionIcon}>🎓</div>
                    <div className={styles.distributionPercentage}>30%</div>
                    <div className={styles.distributionLabel}>升学深造</div>
                  </div>
                  <div className={styles.distributionItem}>
                    <div className={styles.distributionIcon}>🏛️</div>
                    <div className={styles.distributionPercentage}>15%</div>
                    <div className={styles.distributionLabel}>政府机构</div>
                  </div>
                  <div className={styles.distributionItem}>
                    <div className={styles.distributionIcon}>🚀</div>
                    <div className={styles.distributionPercentage}>5%</div>
                    <div className={styles.distributionLabel}>自主创业</div>
                  </div>
                  <div className={styles.distributionItem}>
                    <div className={styles.distributionIcon}>🌍</div>
                    <div className={styles.distributionPercentage}>5%</div>
                    <div className={styles.distributionLabel}>其他</div>
                  </div>
                </div>
              </div>
              
              <div className={styles.employersList}>
                <h3>主要合作企业</h3>
                <div className={styles.employersGrid}>
                  <div className={styles.employerItem}>华为技术有限公司</div>
                  <div className={styles.employerItem}>腾讯科技</div>
                  <div className={styles.employerItem}>中国农业银行</div>
                  <div className={styles.employerItem}>广州市农业农村局</div>
                  <div className={styles.employerItem}>温氏集团</div>
                  <div className={styles.employerItem}>伊利集团</div>
                  <div className={styles.employerItem}>中粮集团</div>
                  <div className={styles.employerItem}>广东省农科院</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'demographics' && (
          <div className={styles.demographicsSection}>
            <div className={styles.provincesDistribution}>
              <h3>生源地区分布</h3>
              <div className={styles.provincesTable}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>省份</th>
                      <th>比例</th>
                      <th>较去年变化</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartData.provinces.map(province => (
                      <tr key={province.name}>
                        <td>{province.name}</td>
                        <td>{province.value}%</td>
                        <td className={Math.random() > 0.5 ? styles.positive : styles.negative}>
                          {Math.random() > 0.5 ? '↑' : '↓'} {(Math.random() * 2).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className={styles.educationBackground}>
              <h3>考生背景分布</h3>
              <div className={styles.backgroundCards}>
                <div className={styles.backgroundCard}>
                  <h4>城乡分布</h4>
                  <div className={styles.backgroundRatio}>
                    <div className={styles.ratioItem}>
                      <div className={styles.ratioBar} style={{ width: '60%' }}></div>
                      <div className={styles.ratioLabel}>城市 60%</div>
                    </div>
                    <div className={styles.ratioItem}>
                      <div className={styles.ratioBar} style={{ width: '40%' }}></div>
                      <div className={styles.ratioLabel}>农村 40%</div>
                    </div>
                  </div>
                </div>
                
                <div className={styles.backgroundCard}>
                  <h4>学校类型</h4>
                  <div className={styles.backgroundRatio}>
                    <div className={styles.ratioItem}>
                      <div className={styles.ratioBar} style={{ width: '70%' }}></div>
                      <div className={styles.ratioLabel}>普通高中 70%</div>
                    </div>
                    <div className={styles.ratioItem}>
                      <div className={styles.ratioBar} style={{ width: '30%' }}></div>
                      <div className={styles.ratioLabel}>职业高中 30%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.diversity}>
              <h3>多元化招生</h3>
              <div className={styles.diversityCards}>
                <div className={styles.diversityCard}>
                  <div className={styles.diversityIcon}>🌟</div>
                  <div className={styles.diversityContent}>
                    <h4>少数民族学生</h4>
                    <div className={styles.diversityNumber}>12%</div>
                    <p>来自29个少数民族</p>
                  </div>
                </div>
                
                <div className={styles.diversityCard}>
                  <div className={styles.diversityIcon}>🌍</div>
                  <div className={styles.diversityContent}>
                    <h4>国际学生</h4>
                    <div className={styles.diversityNumber}>5%</div>
                    <p>来自45个国家和地区</p>
                  </div>
                </div>
                
                <div className={styles.diversityCard}>
                  <div className={styles.diversityIcon}>🏆</div>
                  <div className={styles.diversityContent}>
                    <h4>高考特长生</h4>
                    <div className={styles.diversityNumber}>8%</div>
                    <p>含体育、艺术及科技特长</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className={styles.dataDisclaimer}>
        <p>* 数据来源：华南农业大学招生办公室统计，更新日期：2023年12月</p>
      </div>
    </div>
  )
}

export default DataVisPage
