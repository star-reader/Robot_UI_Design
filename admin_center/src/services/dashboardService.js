// 模拟API调用的延迟
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 获取仪表盘数据
export const fetchDashboardData = async () => {
  // 模拟API请求延迟
  await delay(1000);
  
  // 返回模拟数据
  return {
    stats: {
      totalVisits: 2457,
      activeConversations: 18,
      averageResponseTime: '45秒',
      satisfactionRate: 96.5
    },
    trends: {
      visits: { trend: 'up', value: 12.3 },
      conversations: { trend: 'up', value: 8.7 },
      responseTime: { trend: 'down', value: 5.2 },
      satisfaction: { trend: 'up', value: 2.1 }
    },
    recentConversations: [
      { id: '1001', user: '张同学', topic: '入学申请流程', time: '10分钟前', status: 'active' },
      { id: '1002', user: '李家长', topic: '奖学金政策咨询', time: '25分钟前', status: 'completed' },
      { id: '1003', user: '王同学', topic: '专业选择建议', time: '40分钟前', status: 'completed' }
    ],
    topQuestions: [
      { question: '如何申请入学?', count: 245 },
      { question: '学校有哪些专业?', count: 198 },
      { question: '奖学金申请条件是什么?', count: 175 }
    ],
    visitsData: {
      dates: ['10/1', '10/2', '10/3', '10/4', '10/5', '10/6', '10/7'],
      values: [120, 132, 101, 134, 90, 230, 210]
    },
    conversationsData: {
      dates: ['10/1', '10/2', '10/3', '10/4', '10/5', '10/6', '10/7'],
      values: [45, 52, 38, 54, 42, 65, 60]
    }
  };
};
