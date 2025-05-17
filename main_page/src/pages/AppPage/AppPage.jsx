import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './AppPage.module.css'
import styleSection from './AppPageSection.module.css'
import logo from '../../assets/images/scau.png'
import React from 'react'

const HomePage = () => {
    const [heroLoaded, setHeroLoaded] = useState(false)
    const [features, setFeatures] = useState([])
    const [isRobotOpen, setIsRobotOpen] = useState(true)
    const [showBubble, setShowBubble] = useState(false)
    const [currentMessage, setCurrentMessage] = useState('可以试着对我说“你好华农”')
    const [currentStatIndex, setCurrentStatIndex] = useState(0)
    const messages = [
        '可以试着对我说“你好华农”',
    ]
    
    const stats = [
        {
            type: 'number',
            number: '8211亩',
            label: '校园面积',
            description: '中国高校中面积最大的校园之一',
        },
        {
            type: 'number',
            number: '41',
            label: 'QS世界排名',
            description: '农业科学领域全球领先',
        },
        {
            type: 'number',
            number: '98',
            label: '本科专业',
            description: '涵盖农、工、理、经、管、文、法、艺等多学科',
        },
        {
            type: 'number',
            number: '1',
            label: '国家双一流建设学科',
            description: '作物学',
        },
        {
            type: 'number',
            number: '2',
            label: 'ESI排名前1‰学科',
            description: '植物学与动物学、农业科学',
        },
        {
            type: 'number',
            number: '13',
            label: 'ESI排名前1%学科',
            description: '植物学与动物学、化学、农业科学、微生物学等共13个学科',
        },
        {
            type: 'number',
            number: '5',
            label: '国家二级学科重点学科',
            description: '作物遗传育种、农业昆虫与害虫防治、农业经济管理、果树学、预防兽医学',
        },
        {
            type: 'number',
            number: '1',
            label: '国家重点(培育)学科',
            description: '农业机械化工程',
        },
        {
            type: 'number',
            number: '7',
            label: '广东省一级学科攀峰重点学科',
            description: '农业工程、食品科学与工程、作物学、园艺学、植物保护、兽医学、农林经济管理',
        },
        {
            type: 'number',
            number: '6',
            label: '广东省一级学科优势重点学科',
            description: '生物学、生态学、畜牧学、林学、农业资源与环境、公共管理',
        },
        {
            type: 'number',
            number: '4',
            label: '广东省二级学科特色重点学科',
            description: '金融学、应用数学、应用化学、木材科学与技术',
        },
        {
            type: 'number',
            number: '2',
            label: '国家林草局一级学科重点学科',
            description: '林学、农林经济管理',
        },
        {
            type: 'number',
            number: '1',
            label: '国家林草局二级学科重点学科',
            description: '植物学',
        },
        {
            type: 'number',
            number: '5',
            label: '农业部重点学科',
            description: '植物病理学、农业机械化工程、预防兽医学、生态学、作物遗传育种',
        },
        // {
        //     type: 'image',
        //     number: null,
        //     label: '国际学生',
        //     description: '来自100多个国家和地区',
        //     image: '../../assets/images/international.jpg'
        // },
        // {
        //     type: 'image',
        //     number: null,
        //     label: '建校年份',
        //     description: '百年名校，底蕴深厚',
        //     image: '../../assets/images/history.jpg'
        // }
    ]

    const getRandomMessage = () => {
        const randomIndex = Math.floor(Math.random() * messages.length)
        return messages[randomIndex]
    }

    useEffect(() => {
        const img = new Image()
        img.src = logo
        img.onload = () => setHeroLoaded(true)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setIsRobotOpen(false)
            setTimeout(() => setIsRobotOpen(true), 200)
        }, 3400)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const bubbleInterval = setInterval(() => {
            setShowBubble(true)
            setCurrentMessage(getRandomMessage())
            setTimeout(() => setShowBubble(false), 2000)
        }, 5000)
        return () => clearInterval(bubbleInterval)
    }, [])
    
    useEffect(() => {
        const statInterval = setInterval(() => {
            setCurrentStatIndex((prev) => (prev + 1) % stats.length)
        }, 3000)
        return () => clearInterval(statInterval)
    }, [])

    return (
        <div className={styles.homePage}>
            {/* Hero Section */}
            <section
                className={`${styles.hero} ${heroLoaded ? styles.loaded : ''}`}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <h1 className={styles.mainTitle}>
                        <span>欢迎报考国家“双一流”建设高校</span>
                        <span className={styles.gradientText}>华南农业大学</span>
                    </h1>
                    {/* <p className={styles.subTitleBig}>国家“双一流”建设高校</p> */}
                    <p className={styles.subTitle}>修德、博学、求实、创新</p>

                    {/* <div className={styles.heroBtns}>
                        <Link to="/consultation" className={styles.primaryBtn}>
                            <span>智能对话系统</span>
                            <i className={styles.arrowIcon}>→</i>
                        </Link>
                        <a href="#features" className={styles.secondaryBtn}>了解华农</a>
                    </div> */}

                    <div className={styles.heroStats}>
                        <div className={styles.statContainer}>
                            {stats.map((stat, index) => (
                                <div 
                                    key={index}
                                    className={`${styles.statItem} ${index === currentStatIndex ? styles.active : ''}`}
                                >
                                    {stat.type === 'image' ? (
                                    <div className={styles.imagePlaceholder}>
                                        <div className={styles.imageRatioBox}></div>
                                        <img src={stat.image} alt={stat.label} className={styles.statImage} />
                                    </div>
                                ) : (
                                    <span className={styles.statNumber}>{stat.number}</span>
                                )}
                                <span className={styles.statLabel}>{stat.label}</span>
                                <p className={styles.statDescription}>{stat.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={
                    [styleSection.robotSection, isRobotOpen ? styleSection.open : styleSection.close

                    ].join(' ')}>
                    {showBubble && (
                        <div className={styleSection.speechBubble}>
                            {currentMessage}
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default HomePage
