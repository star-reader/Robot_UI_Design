import { useState } from 'react'
import styles from './VirtualTourPage.module.css'

const VirtualTourPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedLocation, setSelectedLocation] = useState('main')

  const locations = [
    { id: 'main', name: '校园主景观', description: '华南农业大学主校区全景' },
    { id: 'library', name: '图书馆', description: '华农图书馆内部景观' },
    { id: 'stadium', name: '体育场', description: '华农体育场全景' },
    { id: 'dorm', name: '学生宿舍', description: '学生宿舍环境展示' },
    { id: 'canteen', name: '学生食堂', description: '学生餐厅环境' }
  ]

  // In a real implementation, you would have different URLs for different locations
  const getVirtualTourUrl = () => {
    return 'https://www.720yun.com/t/3bb26xauyn6?scene_id=1243117'
  }

  return (
    <div className={styles.virtualTourPage}>
      <div className={styles.pageHeader}>
        <h1>3D虚拟校园游览</h1>
        <p>足不出户，身临其境体验华南农业大学校园环境</p>
      </div>

      <div className={styles.tourContainer}>
        <div className={styles.tourSidebar}>
          <h3>校园景点</h3>
          <ul className={styles.locationsList}>
            {locations.map(location => (
              <li 
                key={location.id}
                className={`${styles.locationItem} ${selectedLocation === location.id ? styles.active : ''}`}
                onClick={() => setSelectedLocation(location.id)}
              >
                <span className={styles.locationName}>{location.name}</span>
                <span className={styles.locationDesc}>{location.description}</span>
              </li>
            ))}
          </ul>
          
          <div className={styles.tourGuide}>
            <h3>操作指南</h3>
            <ul className={styles.guideList}>
              <li>鼠标拖拽：360°旋转视角</li>
              <li>鼠标滚轮：缩放视图</li>
              <li>点击热点：移动到其他场景</li>
              <li>全屏按钮：全屏浏览体验</li>
            </ul>
          </div>
        </div>
        
        <div className={styles.tourFrame}>
          {isLoading && (
            <div className={styles.loadingOverlay}>
              <div className={styles.spinner}></div>
              <span>正在加载虚拟校园...</span>
            </div>
          )}
          <iframe 
            src={getVirtualTourUrl()}
            title="华南农业大学虚拟校园"
            frameBorder="0" 
            allowFullScreen
            className={styles.iframe}
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default VirtualTourPage
