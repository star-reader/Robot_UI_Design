import { useState, useEffect, useRef } from 'react'
import styles from './ARCampusPage.module.css'

const ARCampusPage = () => {
  const [isIntroActive, setIsIntroActive] = useState(true)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [detectedMarker, setDetectedMarker] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  
  const buildings = [
    { 
      id: 'library', 
      name: '图书馆', 
      description: '华南农业大学图书馆于1997年建成，建筑面积2.4万平方米，馆藏文献超过300万册，电子资源丰富，是学校最主要的学习场所。',
      image: 'https://via.placeholder.com/400x300',
      features: ['阅览座位3000个', '电子阅览室', '24小时自习区', '学术报告厅']
    },
    { 
      id: 'admin', 
      name: '行政楼', 
      description: '行政楼是学校的标志性建筑之一，集行政办公、会议接待等功能于一体，是学校重要的决策和管理中心。',
      image: 'https://via.placeholder.com/400x300',
      features: ['校长办公室', '各职能部门', '大会议厅', '接待中心']
    },
    { 
      id: 'science', 
      name: '科学馆', 
      description: '科学馆是学校重要的科研和教学场所，拥有多个现代化实验室和科研平台，是培养创新人才的重要基地。',
      image: 'https://via.placeholder.com/400x300',
      features: ['现代化实验室', '科研平台', '学术交流中心', '学生创新实践基地']
    }
  ]

  // 模拟AR标记检测
  const simulateMarkerDetection = () => {
    if (!isCameraActive) return
    
    const markers = ['library', 'admin', 'science']
    const randomDelay = Math.floor(Math.random() * 3000) + 1000
    
    setTimeout(() => {
      if (isCameraActive) {
        const randomMarker = markers[Math.floor(Math.random() * markers.length)]
        setDetectedMarker(randomMarker)
      }
    }, randomDelay)
  }

  // 启动相机
  const startCamera = async () => {
    setIsLoading(true)
    
    try {
      const constraints = {
        video: {
          facingMode: 'environment'
        }
      }
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        
        videoRef.current.onloadedmetadata = () => {
          setIsLoading(false)
          setIsCameraActive(true)
          setIsIntroActive(false)
          simulateMarkerDetection()
        }
      }
    } catch (err) {
      console.error('Error accessing camera:', err)
      setIsLoading(false)
      alert('无法访问摄像头，请确保您已授予摄像头权限。')
    }
  }

  // 停止相机
  const stopCamera = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks()
      tracks.forEach(track => track.stop())
      setIsCameraActive(false)
      setDetectedMarker(null)
    }
  }

  // 重新扫描
  const rescan = () => {
    setDetectedMarker(null)
    simulateMarkerDetection()
  }

  // 返回介绍页面
  const backToIntro = () => {
    stopCamera()
    setIsIntroActive(true)
  }

  useEffect(() => {
    // 组件卸载时停止相机
    return () => {
      stopCamera()
    }
  }, [])

  // 渲染建筑信息
  const renderBuildingInfo = () => {
    const building = buildings.find(b => b.id === detectedMarker)
    if (!building) return null
    
    return (
      <div className={styles.buildingInfo}>
        <div className={styles.buildingHeader}>
          <h2>{building.name}</h2>
          <button className={styles.closeButton} onClick={rescan}>×</button>
        </div>
        
        <div className={styles.buildingImage}>
          <img src={building.image} alt={building.name} />
        </div>
        
        <div className={styles.buildingDescription}>
          <p>{building.description}</p>
        </div>
        
        <div className={styles.buildingFeatures}>
          <h3>主要特点</h3>
          <ul>
            {building.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        
        <div className={styles.buildingActions}>
          <button 
            className={styles.viewModelButton}
            onClick={() => alert('3D模型功能即将上线')}
          >
            查看3D模型
          </button>
          <button 
            className={styles.navigateButton}
            onClick={() => alert('导航功能即将上线')}
          >
            导航到此处
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.arCampusPage}>
      <div className={styles.pageHeader}>
        <h1>AR校园导览</h1>
        <p>扫描校园标识，探索华农建筑与设施</p>
      </div>
      
      {isIntroActive ? (
        <div className={styles.introContainer}>
          <div className={styles.introContent}>
            <div className={styles.introImage}>
              <img src="https://via.placeholder.com/500x300" alt="AR校园导览" />
            </div>
            
            <h2>体验增强现实校园导览</h2>
            
            <div className={styles.introSteps}>
              <div className={styles.step}>
                <div className={styles.stepIcon}>📱</div>
                <div className={styles.stepContent}>
                  <h3>步骤 1</h3>
                  <p>允许访问您的相机</p>
                </div>
              </div>
              
              <div className={styles.step}>
                <div className={styles.stepIcon}>🔍</div>
                <div className={styles.stepContent}>
                  <h3>步骤 2</h3>
                  <p>将相机对准校园建筑标识</p>
                </div>
              </div>
              
              <div className={styles.step}>
                <div className={styles.stepIcon}>✨</div>
                <div className={styles.stepContent}>
                  <h3>步骤 3</h3>
                  <p>探索建筑详情与3D模型</p>
                </div>
              </div>
            </div>
            
            <button 
              className={styles.startButton}
              onClick={startCamera}
            >
              开始体验
            </button>
            
            <p className={styles.disclaimer}>
              注：实际使用时需在校园内特定位置扫描标识。本演示使用模拟数据。
            </p>
          </div>
          
          <div className={styles.featuredBuildings}>
            <h3>特色建筑</h3>
            <div className={styles.buildingsGrid}>
              {buildings.map(building => (
                <div key={building.id} className={styles.buildingCard}>
                  <div className={styles.buildingCardImage}>
                    <img src={building.image} alt={building.name} />
                  </div>
                  <h4>{building.name}</h4>
                  <p>{building.description.substring(0, 80)}...</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.cameraContainer}>
          {isLoading ? (
            <div className={styles.loadingCamera}>
              <div className={styles.spinner}></div>
              <p>正在加载相机...</p>
            </div>
          ) : (
            <>
              <div className={styles.cameraView}>
                <video 
                  ref={videoRef} 
                  className={styles.video} 
                  autoPlay 
                  playsInline 
                  muted
                ></video>
                <canvas 
                  ref={canvasRef} 
                  className={styles.canvas}
                ></canvas>
                
                {!detectedMarker && (
                  <div className={styles.scanOverlay}>
                    <div className={styles.scanArea}>
                      <div className={styles.scanLine}></div>
                    </div>
                    <p>寻找校园标识...</p>
                  </div>
                )}
              </div>
              
              {detectedMarker && renderBuildingInfo()}
              
              <button 
                className={styles.backButton}
                onClick={backToIntro}
              >
                返回
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default ARCampusPage
