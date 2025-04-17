import { useState, useEffect } from 'react'
import styles from './CampusLifePage.module.css'

const CampusLifePage = () => {
  const [activeCategory, setActiveCategory] = useState('activities')
  const [isLoading, setIsLoading] = useState(true)
  const [expandedEvent, setExpandedEvent] = useState(null)
  
  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const categories = [
    { id: 'activities', name: '校园活动' },
    { id: 'clubs', name: '学生社团' },
    { id: 'facilities', name: '校园设施' },
    { id: 'dormitories', name: '宿舍生活' },
    { id: 'testimonials', name: '学生心声' }
  ]

  const activities = [
    {
      id: 1,
      title: '新生开学典礼',
      date: '9月1日',
      image: 'https://via.placeholder.com/400x250',
      description: '每年9月，华南农业大学都会举行盛大的开学典礼，欢迎来自全国各地的新生加入华农大家庭。典礼上，校领导会发表重要讲话，优秀学长学姐代表也会分享自己的经验。',
      location: '东区体育馆'
    },
    {
      id: 2,
      title: '校园文化节',
      date: '10月15-25日',
      image: 'https://via.placeholder.com/400x250',
      description: '校园文化节是华农最具特色的活动之一，为期10天的活动包括文艺演出、创意市集、美食节、体育比赛等多种形式，充分展示华农学子的青春活力和创造力。',
      location: '教三大草坪'
    },
    {
      id: 3,
      title: '毕业季活动',
      date: '6月10-30日',
      image: 'https://via.placeholder.com/400x250',
      description: '毕业季期间，学校组织毕业晚会、毕业照拍摄、毕业典礼等系列活动，为即将离校的学生留下美好回忆。同时，各学院也会举办专属的毕业欢送会。',
      location: '大学城校区'
    },
    {
      id: 4,
      title: '科研创新大赛',
      date: '4月20-25日',
      image: 'https://via.placeholder.com/400x250',
      description: '科研创新大赛旨在激发学生的创新思维和实践能力，比赛分为多个领域，包括农业科技、计算机应用、生物工程等。获奖项目将获得学校的资金支持。',
      location: '创新创业中心'
    }
  ]

  const clubs = [
    {
      id: 1,
      name: '农业科技协会',
      members: 120,
      image: 'https://via.placeholder.com/400x250',
      description: '农业科技协会是华南农业大学历史最悠久的学生社团之一，致力于推广现代农业技术，组织农业科技创新活动和田间实践。',
      achievements: '多次获得全国大学生农业创新大赛金奖'
    },
    {
      id: 2,
      name: '书画协会',
      members: 85,
      image: 'https://via.placeholder.com/400x250',
      description: '书画协会汇聚了热爱中国传统文化的学生，定期举办书法、国画学习交流活动，并在校内外展览会展示会员作品。',
      achievements: '举办年度"翰墨飘香"书画展，参与广州市大学生文化艺术节'
    },
    {
      id: 3,
      name: '机器人协会',
      members: 95,
      image: 'https://via.placeholder.com/400x250',
      description: '机器人协会专注于机器人设计、编程和智能控制领域，拥有完善的设备和实验室，经常参加国内外机器人竞赛。',
      achievements: 'RoboCup中国公开赛三等奖，华南赛区二等奖'
    },
    {
      id: 4,
      name: '绿色环保协会',
      members: 150,
      image: 'https://via.placeholder.com/400x250',
      description: '绿色环保协会致力于校园环保意识的宣传和实践，组织植树活动、垃圾分类宣讲、环保创意设计大赛等活动。',
      achievements: '获评广东省优秀环保社团，参与多项城市绿化项目'
    }
  ]

  const facilities = [
    {
      id: 1,
      name: '图书馆',
      image: 'https://via.placeholder.com/400x250',
      description: '华南农业大学图书馆藏书丰富，拥有超过300万册纸质图书和大量数字资源。现代化的阅读空间和自习区为学生提供了良好的学习环境。',
      openHours: '周一至周日 8:00-22:00'
    },
    {
      id: 2,
      name: '体育中心',
      image: 'https://via.placeholder.com/400x250',
      description: '体育中心包括标准游泳池、篮球馆、足球场、网球场等设施，满足学生不同的运动需求。中心还定期举办各类体育赛事和健身课程。',
      openHours: '周一至周日 6:00-22:00'
    },
    {
      id: 3,
      name: '学生活动中心',
      image: 'https://via.placeholder.com/400x250',
      description: '学生活动中心是校园文化活动的主要场所，设有多功能演出厅、排练室、社团活动室等，为学生提供展示才艺和开展活动的平台。',
      openHours: '周一至周日 9:00-21:00'
    },
    {
      id: 4,
      name: '创新创业中心',
      image: 'https://via.placeholder.com/400x250',
      description: '创新创业中心为学生提供创业指导、项目孵化、技术支持等服务，配备有3D打印、VR开发等先进设备，支持学生将创意转化为现实。',
      openHours: '周一至周五 9:00-18:00'
    }
  ]

  const dormitories = [
    {
      id: 1,
      name: '1-4号学生公寓',
      type: '本科生宿舍',
      image: 'https://via.placeholder.com/400x250',
      description: '本科生宿舍通常为4-6人间，配备空调、热水器、独立卫浴、书桌、衣柜等基本设施。宿舍区设有公共洗衣房、开水房、便利店等。',
      amenities: '空调、热水器、独立卫浴、网络'
    },
    {
      id: 2,
      name: '5-6号研究生公寓',
      type: '研究生宿舍',
      image: 'https://via.placeholder.com/400x250',
      description: '研究生宿舍通常为2-4人间，居住条件更加舒适，部分宿舍配有小客厅。研究生公寓邻近实验室和图书馆，方便学习和研究。',
      amenities: '空调、热水器、独立卫浴、网络、小客厅'
    },
    {
      id: 3,
      name: '7号国际学生公寓',
      type: '留学生宿舍',
      image: 'https://via.placeholder.com/400x250',
      description: '国际学生公寓为单人或双人间，配备齐全的现代化设施，为国际学生提供舒适的生活环境。公寓内设有公共活动区和小型厨房。',
      amenities: '空调、热水器、独立卫浴、网络、厨房'
    },
    {
      id: 4,
      name: '校园餐厅',
      type: '学生食堂',
      image: 'https://via.placeholder.com/400x250',
      description: '学校设有多个餐厅，提供多样化的饮食选择，包括中式、西式、清真等。餐厅价格亲民，食品安全有保障，是学生就餐的主要场所。',
      amenities: '多种菜系、特色窗口、自助餐区'
    }
  ]

  const testimonials = [
    {
      id: 1,
      name: '李明',
      department: '农学院',
      year: '大三',
      image: 'https://via.placeholder.com/100x100',
      quote: '在华农的三年是我人生中最充实的时光，这里的实践机会让我将课本知识与农业生产紧密结合，老师们的指导让我受益匪浅。'
    },
    {
      id: 2,
      name: '张华',
      department: '工学院',
      year: '研一',
      image: 'https://via.placeholder.com/100x100',
      quote: '华农的科研氛围浓厚，实验室设备先进，我有幸参与了一些前沿项目研究，这为我将来的学术生涯打下了坚实基础。'
    },
    {
      id: 3,
      name: '王芳',
      department: '生命科学学院',
      year: '大四',
      image: 'https://via.placeholder.com/100x100',
      quote: '通过学校的社会实践项目，我有机会走进农村，了解农民的真实需求，这让我更加坚定了专业选择，希望用所学知识服务三农。'
    },
    {
      id: 4,
      name: 'David Chen',
      department: '国际交流生',
      year: '交换生',
      image: 'https://via.placeholder.com/100x100',
      quote: '作为一名国际学生，我被华农丰富的文化活动和友好的校园环境所吸引。这里的老师和同学们都很热心帮助我，让我感受到了家的温暖。'
    }
  ]

  const renderContent = () => {
    switch(activeCategory) {
      case 'activities':
        return (
          <div className={styles.eventsContainer}>
            {activities.map(event => (
              <div 
                key={event.id} 
                className={`${styles.eventCard} ${expandedEvent === event.id ? styles.expanded : ''}`}
                onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
              >
                <div className={styles.eventImage}>
                  <img src={event.image} alt={event.title} />
                  <div className={styles.eventDate}>{event.date}</div>
                </div>
                <div className={styles.eventContent}>
                  <h3>{event.title}</h3>
                  <p className={styles.eventLocation}>
                    <span className={styles.locationIcon}>📍</span> {event.location}
                  </p>
                  <p className={styles.eventDescription}>
                    {expandedEvent === event.id ? event.description : `${event.description.substring(0, 100)}...`}
                  </p>
                  <span className={styles.readMore}>
                    {expandedEvent === event.id ? '收起' : '了解更多'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'clubs':
        return (
          <div className={styles.clubsContainer}>
            {clubs.map(club => (
              <div key={club.id} className={styles.clubCard}>
                <div className={styles.clubImage}>
                  <img src={club.image} alt={club.name} />
                  <div className={styles.membersBadge}>{club.members} 名成员</div>
                </div>
                <div className={styles.clubContent}>
                  <h3>{club.name}</h3>
                  <p className={styles.clubDescription}>{club.description}</p>
                  <div className={styles.clubAchievements}>
                    <h4>主要成就</h4>
                    <p>{club.achievements}</p>
                  </div>
                  <button className={styles.joinButton}>加入社团</button>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'facilities':
        return (
          <div className={styles.facilitiesContainer}>
            {facilities.map(facility => (
              <div key={facility.id} className={styles.facilityCard}>
                <div className={styles.facilityImage}>
                  <img src={facility.image} alt={facility.name} />
                </div>
                <div className={styles.facilityContent}>
                  <h3>{facility.name}</h3>
                  <p className={styles.facilityDescription}>{facility.description}</p>
                  <div className={styles.facilityHours}>
                    <span className={styles.clockIcon}>🕒</span>
                    <span>{facility.openHours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'dormitories':
        return (
          <div className={styles.dormitoriesContainer}>
            {dormitories.map(dorm => (
              <div key={dorm.id} className={styles.dormCard}>
                <div className={styles.dormImage}>
                  <img src={dorm.image} alt={dorm.name} />
                  <div className={styles.dormType}>{dorm.type}</div>
                </div>
                <div className={styles.dormContent}>
                  <h3>{dorm.name}</h3>
                  <p className={styles.dormDescription}>{dorm.description}</p>
                  <div className={styles.amenitiesList}>
                    <h4>设施</h4>
                    <p>{dorm.amenities}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'testimonials':
        return (
          <div className={styles.testimonialsContainer}>
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className={styles.testimonialCard}>
                <div className={styles.testimonialHeader}>
                  <div className={styles.testimonialAvatar}>
                    <img src={testimonial.image} alt={testimonial.name} />
                  </div>
                  <div className={styles.testimonialInfo}>
                    <h3>{testimonial.name}</h3>
                    <p>{testimonial.department} | {testimonial.year}</p>
                  </div>
                </div>
                <div className={styles.testimonialQuote}>
                  <span className={styles.quoteIcon}>"</span>
                  <p>{testimonial.quote}</p>
                  <span className={styles.quoteIconEnd}>"</span>
                </div>
              </div>
            ))}
          </div>
        );
      
      default:
        return <div>选择一个类别查看内容</div>;
    }
  }

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>正在加载校园生活内容...</p>
      </div>
    );
  }

  return (
    <div className={styles.campusLifePage}>
      <div className={styles.pageHeader}>
        <h1>校园生活</h1>
        <p>探索华南农业大学丰富多彩的校园文化与学生活动</p>
      </div>

      <div className={styles.categoriesNav}>
        {categories.map(category => (
          <button 
            key={category.id}
            className={`${styles.categoryButton} ${activeCategory === category.id ? styles.activeCategory : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className={styles.contentContainer}>
        {renderContent()}
      </div>
    </div>
  )
}

export default CampusLifePage
