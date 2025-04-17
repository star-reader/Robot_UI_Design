import { useState, useRef, useEffect } from 'react'
import styles from './ConsultationPage.module.css'

const ConsultationPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: '你好！我是华南农业大学智能招生助手，很高兴为您服务。请问有什么可以帮助您的吗？', isUser: false, typing: false }
  ])
  const [inputText, setInputText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const messagesEndRef = useRef(null)
  const [suggestions] = useState([
    '华农有哪些王牌专业？',
    '请介绍一下华农的校园环境',
    '华农的录取分数线是多少？',
    '华农的住宿条件怎么样？',
    '华农的就业情况如何？'
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (query) => {
    // These would be AI-generated responses, but for the prototype we'll use canned answers
    const responses = {
      '华农有哪些王牌专业？': '华南农业大学的王牌专业包括农学、植物保护、动物科学、园艺、动物医学、食品科学与工程等农业相关专业，以及风景园林、计算机科学与技术、工商管理等特色专业。这些专业拥有雄厚的师资力量和科研实力，就业前景广阔。',
      '请介绍一下华农的校园环境': '华南农业大学占地面积6890亩，校园环境优美，绿树成荫，四季花香。校园内不仅有现代化的教学楼、图书馆和实验室，还有各类运动场地和休闲娱乐设施。校园整体布局合理，既保留了百年老校的历史韵味，又彰显了现代高校的活力与风采。',
      '华农的录取分数线是多少？': '华南农业大学的录取分数线因专业和地区而异。以2022年为例，在广东省本科批次，大部分专业的录取分数线在550分以上，部分热门专业如计算机科学与技术、食品科学与工程等分数线更高。建议您查询学校招生网站获取最新的分数线信息，或者告诉我您感兴趣的具体专业和省份，我可以提供更准确的信息。',
      '华农的住宿条件怎么样？': '华南农业大学的住宿条件较好，本科生宿舍一般为4-6人间，配备空调、热水器、独立卫浴、书桌、衣柜等基本设施，部分宿舍还有阳台。宿舍区配有洗衣房、开水房、便利店等生活服务设施。校园网络覆盖宿舍区，方便学生学习和生活。',
      '华农的就业情况如何？': '华南农业大学毕业生就业情况良好，近年来本科生就业率保持在95%以上，研究生就业率接近100%。学校与众多企事业单位建立了良好的合作关系，定期举办校园招聘会。农学、动物医学、食品科学等优势专业就业率尤为突出，毕业生遍布全国各地的农业企业、科研机构和政府部门。'
    }

    // Default response for questions not in our database
    let response = '感谢您的提问。作为华农招生助手，我会尽力解答您的疑问。华南农业大学创建于1909年，是一所以农业科学和生命科学为优势，农、工、文、理、经、管、法、医、艺等多学科协调发展的国家"211工程"重点建设大学。如果您有关于专业设置、录取标准、校园生活等具体问题，请告诉我，我会提供更详细的信息。'
    
    // Check if we have a canned response
    for (const key in responses) {
      if (query.includes(key) || key.includes(query)) {
        response = responses[key]
        break
      }
    }

    return response
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputText.trim() === '' || isProcessing) return
    
    // Add user message
    const userMessage = { id: Date.now(), text: inputText, isUser: true }
    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsProcessing(true)
    
    // Simulate AI thinking
    setTimeout(() => {
      // Add AI message with typing indicator
      const aiMessageTyping = { id: Date.now() + 1, text: '', isUser: false, typing: true }
      setMessages(prev => [...prev, aiMessageTyping])
      
      // Simulate response generation (in a real app, this would be an API call)
      setTimeout(() => {
        const response = generateResponse(userMessage.text)
        
        // Replace typing indicator with actual response
        setMessages(prev => prev.map(msg => 
          msg.typing ? { ...msg, text: response, typing: false } : msg
        ))
        setIsProcessing(false)
      }, 1500)
    }, 500)
  }

  const handleVoiceInput = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.lang = 'zh-CN'
      recognition.interimResults = false
      
      recognition.onstart = () => {
        setIsSpeaking(true)
      }
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInputText(transcript)
      }
      
      recognition.onend = () => {
        setIsSpeaking(false)
      }
      
      recognition.start()
    } else {
      alert('您的浏览器不支持语音识别功能')
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion)
  }

  return (
    <div className={styles.consultationPage}>
      <div className={styles.pageHeader}>
        <h1>智能招生咨询</h1>
        <p>解答您关于华南农业大学的所有疑问</p>
      </div>
      
      <div className={styles.chatContainer}>
        <div className={styles.chatBox}>
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`${styles.messageContainer} ${message.isUser ? styles.userContainer : styles.aiContainer}`}
            >
              <div className={`${styles.messageBubble} ${message.isUser ? styles.userMessage : styles.aiMessage}`}>
                {message.typing ? (
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                ) : (
                  message.text
                )}
              </div>
              {!message.isUser && !message.typing && (
                <button 
                  className={styles.speakerIcon} 
                  onClick={() => {
                    const speech = new SpeechSynthesisUtterance(message.text)
                    speech.lang = 'zh-CN'
                    window.speechSynthesis.speak(speech)
                  }}
                >
                  🔊
                </button>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className={styles.suggestionChips}>
          {suggestions.map((suggestion, index) => (
            <button 
              key={index} 
              onClick={() => handleSuggestionClick(suggestion)}
              className={styles.suggestionChip}
            >
              {suggestion}
            </button>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="输入您的问题..."
            disabled={isProcessing}
            className={styles.inputField}
          />
          <button 
            type="button" 
            onClick={handleVoiceInput}
            className={`${styles.voiceBtn} ${isSpeaking ? styles.speaking : ''}`}
            disabled={isProcessing}
          >
            🎤
          </button>
          <button 
            type="submit" 
            disabled={inputText.trim() === '' || isProcessing}
            className={styles.sendBtn}
          >
            <span className={styles.sendIcon}>➤</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default ConsultationPage
