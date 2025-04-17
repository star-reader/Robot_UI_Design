import React, { useState, useEffect } from 'react';
import { 
  Table, Card, Input, Button, Select, Tag, Badge, Space, Drawer, 
  Typography, Timeline, Tabs, Radio, Row, Col, Tooltip, DatePicker,
  Divider, Statistic, Progress, Spin, Collapse, Empty, message, Popconfirm
} from 'antd';
import { 
  SearchOutlined, FilterOutlined, ExportOutlined, DeleteOutlined, 
  EyeOutlined, UserOutlined, MessageOutlined, FileExcelOutlined,
  CalendarOutlined, ReloadOutlined, CheckCircleOutlined, SyncOutlined,
  ClockCircleOutlined, CloseCircleOutlined, RobotOutlined, QuestionCircleOutlined
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import styled from 'styled-components';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Panel } = Collapse;
const { Option } = Select;

// 自定义样式组件
const StyledCard = styled(Card)`
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const StatusTag = styled(Tag)`
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  
  .anticon {
    margin-right: 4px;
  }
`;

const MessageBubble = styled.div`
  padding: 12px 16px;
  border-radius: ${props => props.isUser ? '12px 12px 2px 12px' : '12px 12px 12px 2px'};
  background-color: ${props => props.isUser ? '#e6f7ff' : '#f6ffed'};
  border: 1px solid ${props => props.isUser ? '#91d5ff' : '#b7eb8f'};
  max-width: 80%;
  margin-bottom: 10px;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  position: relative;
  word-wrap: break-word;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  overflow-y: auto;
  padding: 20px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  background: #fafafa;
`;

const ConversationsPage = () => {
  // 状态定义
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: null,
    keyword: '',
    topics: [],
    userTypes: []
  });
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [statistics, setStatistics] = useState({
    total: 0,
    active: 0,
    completed: 0,
    pending: 0,
    avgDuration: '0',
    avgSatisfaction: 0
  });

  // 模拟获取会话数据
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // 在实际应用中，这应该是一个API调用
        await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟网络延迟
        
        // 生成模拟数据
        const mockData = generateMockData(100);
        
        setConversations(mockData);
        setFilteredConversations(mockData);
        setPagination(prev => ({
          ...prev,
          total: mockData.length
        }));
        
        // 计算统计数据
        calculateStatistics(mockData);
      } catch (error) {
        console.error('加载数据出错:', error);
        message.error('加载数据时发生错误');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // 生成模拟数据
  const generateMockData = (count) => {
    const topics = ['专业选择', '入学申请', '奖学金政策', '校园生活', '就业前景', '转专业', '宿舍条件'];
    const userTypes = ['高中生', '家长', '教师', '在校生', '其他'];
    const regions = ['广东省', '广西省', '湖南省', '江西省', '福建省', '四川省', '北京市', '上海市'];
    const entryMethods = ['官网', '微信小程序', '招生活动', '朋友推荐', '搜索引擎'];
    
    return Array(count).fill({}).map((_, index) => {
      const startDate = new Date(Date.now() - Math.random() * 30 * 86400000);
      const messageCount = Math.floor(Math.random() * 17) + 3;
      const status = getRandomStatus();
      
      return {
        id: `conv-${1000 + index}`,
        user: `用户${1000 + index}`,
        userType: userTypes[Math.floor(Math.random() * userTypes.length)],
        topic: topics[Math.floor(Math.random() * topics.length)],
        status: status,
        startTime: startDate.toLocaleString(),
        timestamp: startDate.getTime(),
        duration: `${Math.floor(Math.random() * 10) + 1}分钟`,
        durationSeconds: (Math.floor(Math.random() * 10) + 1) * 60,
        messageCount: messageCount,
        humanMessages: Math.floor(messageCount / 2),
        aiMessages: Math.ceil(messageCount / 2),
        satisfactionRating: status === 'closed' || Math.random() > 0.2 ? Math.floor(Math.random() * 2) + 4 : null,
        region: regions[Math.floor(Math.random() * regions.length)],
        entryMethod: entryMethods[Math.floor(Math.random() * entryMethods.length)],
        userIP: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        hasProblems: Math.random() > 0.8,
        tags: generateRandomTags()
      };
    });
  };

  // 获取随机状态
  const getRandomStatus = () => {
    const rand = Math.random();
    if (rand < 0.2) return 'active';
    if (rand < 0.7) return 'completed';
    if (rand < 0.9) return 'pending';
    return 'closed';
  };

  // 生成随机标签
  const generateRandomTags = () => {
    const allTags = ['紧急', '重要', '已解决', '需跟进', '特殊情况', 'VIP'];
    const count = Math.floor(Math.random() * 3);
    
    if (count === 0) return [];
    
    const tags = [];
    for (let i = 0; i < count; i++) {
      const tag = allTags[Math.floor(Math.random() * allTags.length)];
      if (!tags.includes(tag)) tags.push(tag);
    }
    
    return tags;
  };

  // 计算统计数据
  const calculateStatistics = (data) => {
    const total = data.length;
    const active = data.filter(item => item.status === 'active').length;
    const completed = data.filter(item => item.status === 'completed').length;
    const pending = data.filter(item => item.status === 'pending').length;
    
    const totalDuration = data.reduce((acc, item) => acc + item.durationSeconds, 0);
    const avgDuration = Math.round(totalDuration / total);
    const minutes = Math.floor(avgDuration / 60);
    const seconds = avgDuration % 60;
    
    const ratingsData = data.filter(item => item.satisfactionRating !== null);
    const avgSatisfaction = ratingsData.length > 0 
      ? ratingsData.reduce((acc, item) => acc + item.satisfactionRating, 0) / ratingsData.length
      : 0;
    
    setStatistics({
      total,
      active,
      completed,
      pending,
      avgDuration: `${minutes}分${seconds}秒`,
      avgSatisfaction: parseFloat(avgSatisfaction.toFixed(1))
    });
  };

  // 处理表格变化
  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  // 处理搜索
  const handleSearch = (value) => {
    setFilters({
      ...filters,
      keyword: value
    });
    
    applyFilters({
      ...filters,
      keyword: value
    });
  };

  // 应用过滤器
  const applyFilters = (currentFilters) => {
    let filtered = [...conversations];
    
    // 关键词过滤
    if (currentFilters.keyword) {
      const keyword = currentFilters.keyword.toLowerCase();
      filtered = filtered.filter(item => 
        item.id.toLowerCase().includes(keyword) ||
        item.user.toLowerCase().includes(keyword) ||
        item.topic.toLowerCase().includes(keyword)
      );
    }
    
    // 状态过滤
    if (currentFilters.status && currentFilters.status !== 'all') {
      filtered = filtered.filter(item => item.status === currentFilters.status);
    }
    
    // 日期过滤
    if (currentFilters.dateRange && currentFilters.dateRange.length === 2) {
      const startDate = currentFilters.dateRange[0].startOf('day').valueOf();
      const endDate = currentFilters.dateRange[1].endOf('day').valueOf();
      
      filtered = filtered.filter(item => {
        return item.timestamp >= startDate && item.timestamp <= endDate;
      });
    }
    
    // 话题过滤
    if (currentFilters.topics && currentFilters.topics.length > 0) {
      filtered = filtered.filter(item => currentFilters.topics.includes(item.topic));
    }
    
    // 用户类型过滤
    if (currentFilters.userTypes && currentFilters.userTypes.length > 0) {
      filtered = filtered.filter(item => currentFilters.userTypes.includes(item.userType));
    }
    
    setFilteredConversations(filtered);
    setPagination(prev => ({
      ...prev,
      current: 1,
      total: filtered.length
    }));
    
    setFilterDrawerVisible(false);
  };

  // 重置过滤器
  const resetFilters = () => {
    setFilters({
      status: 'all',
      dateRange: null,
      keyword: '',
      topics: [],
      userTypes: []
    });
    
    setFilteredConversations(conversations);
    setPagination(prev => ({
      ...prev,
      current: 1,
      total: conversations.length
    }));
    
    setFilterDrawerVisible(false);
  };

  // 查看会话详情
  const viewConversation = (record) => {
    setCurrentConversation({
      ...record,
      messages: generateMockMessages(record.messageCount),
      userInfo: {
        nickname: record.user,
        avatar: 'https://via.placeholder.com/100',
        type: record.userType,
        region: record.region,
        visitCount: Math.floor(Math.random() * 10) + 1,
        firstVisit: new Date(Date.now() - Math.random() * 30 * 86400000).toLocaleDateString(),
        ip: record.userIP,
        device: Math.random() > 0.5 ? 'iOS手机' : 'Android手机'
      },
      analytics: {
        intentRecognition: Math.random() * 100,
        sentimentScore: (Math.random() * 1).toFixed(2),
        topIntents: ['查询专业', '了解录取条件', '咨询奖学金政策'],
        keyEntities: ['计算机专业', '奖学金申请', '入学要求', '分数线'],
        responseQuality: Math.random() * 100,
        userSatisfaction: record.satisfactionRating || 'N/A'
      }
    });
    setActiveTab('messages');
    setDrawerVisible(true);
  };

  // 生成模拟消息
  const generateMockMessages = (count) => {
    const messages = [];
    const topics = [
      '请问贵校的计算机专业录取分数线是多少？',
      '我想了解一下奖学金申请条件',
      '学校的住宿条件怎么样？',
      '转专业的政策是什么？',
      '请问有哪些特色专业？'
    ];
    
    const topic = topics[Math.floor(Math.random() * topics.length)];
    
    // 第一条消息必须是用户发问
    messages.push({
      id: 1,
      type: 'user',
      content: topic,
      time: '2023-10-15 10:30:45'
    });
    
    for (let i = 1; i < count; i++) {
      const isUser = i % 2 === 0;
      messages.push({
        id: i + 1,
        type: isUser ? 'user' : 'system',
        content: isUser 
          ? generateUserMessage() 
          : generateSystemResponse(i === 1 ? topic : messages[i-1].content),
        time: getTimeOffset(i, messages[0].time)
      });
    }
    
    return messages;
  };

  // 生成用户消息
  const generateUserMessage = () => {
    const userMessages = [
      '谢谢解答，那我再问一下专业就业前景怎么样？',
      '学费是多少呢？',
      '有推荐的专业方向吗？',
      '好的，我明白了',
      '还有什么其他需要注意的吗？',
      '学校有什么特色活动？',
      '我对这个专业很感兴趣，可以了解更多吗？'
    ];
    
    return userMessages[Math.floor(Math.random() * userMessages.length)];
  };

  // 生成系统响应
  const generateSystemResponse = (question) => {
    const systemResponses = {
      '分数线': '华南农业大学计算机专业在广东省的录取分数线近三年分别是：2023年为620分，2022年为615分，2021年为602分。请注意分数线会根据当年的招生计划和考生情况有所调整。',
      '奖学金': '我校设有完善的奖学金体系，包括国家奖学金、国家励志奖学金、校长奖学金和企业奖学金等。其中，国家奖学金每年8000元，面向学习成绩优异的本科生；国家励志奖学金每年5000元，面向品学兼优的家庭经济困难学生。',
      '住宿条件': '学校提供四人间和六人间宿舍，均配备空调、热水器、独立卫生间、阳台和网络接口。新生公寓区环境优美，配套设施齐全，包括洗衣房、自习室、小卖部等。',
      '转专业': '我校支持学生在大一第二学期和大二第一学期申请转专业，需要满足学分要求且无违纪记录。部分热门专业会设置额外的考核要求。具体政策请参考教务处网站公布的最新规定。',
      '特色专业': '华南农业大学的特色优势专业包括农学、植物保护、动物医学、食品科学与工程、风景园林等。此外，计算机科学与技术、经济学等专业近年来发展也很迅速，就业前景良好。'
    };
    
    // 尝试匹配关键词生成响应
    for (const keyword in systemResponses) {
      if (question.includes(keyword)) {
        return systemResponses[keyword];
      }
    }
    
    // 默认响应
    return '感谢您的咨询。您的问题我已经记录下来，我们会尽快为您提供更具体的信息。请问还有其他问题需要了解吗？';
  };

  // 获取时间偏移
  const getTimeOffset = (index, baseTime) => {
    const baseDate = new Date(baseTime);
    // 随机增加几秒到一分钟的时间
    const offsetSeconds = index % 2 === 1 ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 30) + 5;
    baseDate.setSeconds(baseDate.getSeconds() + offsetSeconds);
    return baseDate.toLocaleString();
  };

  // 批量删除会话
  const handleBatchDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.info('请先选择要删除的会话');
      return;
    }
    
    // 在实际应用中，这里应该调用API删除选定的会话
    const newData = filteredConversations.filter(item => !selectedRowKeys.includes(item.id));
    setFilteredConversations(newData);
    setConversations(conversations.filter(item => !selectedRowKeys.includes(item.id)));
    
    message.success(`成功删除 ${selectedRowKeys.length} 条会话`);
    setSelectedRowKeys([]);
  };

  // 导出会话数据
  const handleExport = () => {
    message.success('开始导出数据，请稍候...');
    // 在实际应用中，这里应该触发文件下载
    setTimeout(() => {
      message.success('数据已导出到Excel文件');
    }, 2000);
  };

  // 获取状态标签
  const getStatusTag = (status) => {
    switch (status) {
      case 'active':
        return (
          <StatusTag color="green">
            <SyncOutlined spin /> 进行中
          </StatusTag>
        );
      case 'completed':
        return (
          <StatusTag color="blue">
            <CheckCircleOutlined /> 已完成
          </StatusTag>
        );
      case 'pending':
        return (
          <StatusTag color="orange">
            <ClockCircleOutlined /> 待处理
          </StatusTag>
        );
      case 'closed':
        return (
          <StatusTag color="red">
            <CloseCircleOutlined /> 已关闭
          </StatusTag>
        );
      default:
        return <StatusTag color="default">未知</StatusTag>;
    }
  };

  // 表格列配置
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      fixed: 'left'
    },
    {
      title: '用户',
      dataIndex: 'user',
      key: 'user',
      width: 120,
      render: (text, record) => (
        <div>
          {text}
          <div>
            <Tag color="default" style={{ fontSize: '12px', marginTop: '4px' }}>{record.userType}</Tag>
          </div>
        </div>
      )
    },
    {
      title: '话题',
      dataIndex: 'topic',
      key: 'topic',
      width: 130,
      render: topic => {
        let color = 'default';
        
        if (topic === '专业选择') color = 'blue';
        if (topic === '入学申请') color = 'green';
        if (topic === '奖学金政策') color = 'gold';
        if (topic === '校园生活') color = 'purple';
        if (topic === '就业前景') color = 'cyan';
        
        return <Tag color={color}>{topic}</Tag>;
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: status => getStatusTag(status)
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      width: 180,
      sorter: (a, b) => a.timestamp - b.timestamp
    },
    {
      title: '持续时间',
      dataIndex: 'duration',
      key: 'duration',
      width: 100,
      sorter: (a, b) => a.durationSeconds - b.durationSeconds
    },
    {
      title: '消息数',
      dataIndex: 'messageCount',
      key: 'messageCount',
      width: 90,
      sorter: (a, b) => a.messageCount - b.messageCount,
      render: (text, record) => (
        <Tooltip title={`用户消息: ${record.humanMessages}, 系统消息: ${record.aiMessages}`}>
          <span>{text}</span>
        </Tooltip>
      )
    },
    {
      title: '满意度',
      dataIndex: 'satisfactionRating',
      key: 'satisfactionRating',
      width: 90,
      sorter: (a, b) => (a.satisfactionRating || 0) - (b.satisfactionRating || 0),
      render: rating => rating ? `${rating}/5` : '-'
    },
    {
      title: '地区',
      dataIndex: 'region',
      key: 'region',
      width: 100
    },
    {
      title: '来源',
      dataIndex: 'entryMethod',
      key: 'entryMethod',
      width: 120
    },
    {
      title: '标签',
      key: 'tags',
      width: 150,
      render: (_, record) => (
        <>
          {record.tags.map(tag => {
            let color = 'default';
            if (tag === '紧急') color = 'red';
            if (tag === '重要') color = 'orange';
            if (tag === '已解决') color = 'green';
            if (tag === '需跟进') color = 'blue';
            if (tag === 'VIP') color = 'purple';
            
            return <Tag color={color} key={tag}>{tag}</Tag>;
          })}
        </>
      )
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="text" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => viewConversation(record)}
          />
          <Popconfirm
            title="确定要删除这条会话记录吗？"
            onConfirm={() => {
              const newData = filteredConversations.filter(item => item.id !== record.id);
              setFilteredConversations(newData);
              setConversations(conversations.filter(item => item.id !== record.id));
              message.success('删除成功');
            }}
            okText="确认"
            cancelText="取消"
          >
            <Button 
              type="text" 
              size="small" 
              danger 
              icon={<DeleteOutlined />} 
            />
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={2}>会话管理</Title>
        
        <Space>
          <Button 
            icon={<FilterOutlined />} 
            onClick={() => setFilterDrawerVisible(true)}
          >
            高级筛选
          </Button>
          <Button 
            type="primary" 
            icon={<ExportOutlined />}
            onClick={handleExport}
          >
            导出数据
          </Button>
        </Space>
      </div>
      
      {/* 统计卡片 */}
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col xs={24} sm={12} md={6}>
          <StyledCard>
            <Statistic
              title="总会话数"
              value={statistics.total}
              prefix={<MessageOutlined style={{ color: '#1890ff' }} />}
            />
          </StyledCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StyledCard>
            <Statistic
              title="活跃会话"
              value={statistics.active}
              valueStyle={{ color: '#52c41a' }}
              prefix={<SyncOutlined style={{ color: '#52c41a' }} />}
            />
          </StyledCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StyledCard>
            <Statistic
              title="平均会话时长"
              value={statistics.avgDuration}
              prefix={<ClockCircleOutlined style={{ color: '#faad14' }} />}
            />
          </StyledCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StyledCard>
            <Statistic
              title="平均满意度"
              value={statistics.avgSatisfaction}
              suffix="/5"
              precision={1}
              prefix={<UserOutlined style={{ color: '#eb2f96' }} />}
            />
          </StyledCard>
        </Col>
      </Row>
      
      {/* 主要卡片 */}
      <StyledCard
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>会话列表</span>
            <Button 
              icon={<ReloadOutlined />}
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  message.success('数据已刷新');
                  setLoading(false);
                }, 500);
              }}
            >
              刷新数据
            </Button>
          </div>
        }
      >
        {/* 搜索和过滤区域 */}
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
          <Input.Search
            placeholder="搜索会话ID、用户名或话题"
            enterButton
            style={{ width: 300 }}
            onSearch={handleSearch}
            allowClear
          />
          
          <Space>
            <Select
              placeholder="状态筛选"
              style={{ width: 120 }}
              value={filters.status}
              onChange={value => {
                const newFilters = { ...filters, status: value };
                setFilters(newFilters);
                applyFilters(newFilters);
              }}
            >
              <Option value="all">全部</Option>
              <Option value="active">进行中</Option>
              <Option value="completed">已完成</Option>
              <Option value="pending">待处理</Option>
              <Option value="closed">已关闭</Option>
            </Select>
            
            <Button 
              danger 
              disabled={selectedRowKeys.length === 0}
              onClick={handleBatchDelete}
            >
              批量删除
            </Button>
          </Space>
        </div>
        
        {/* 表格 */}
        <Table 
          columns={columns} 
          dataSource={filteredConversations}
          rowKey="id"
          pagination={pagination}
          onChange={handleTableChange}
          loading={loading}
          scroll={{ x: 1500 }}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys
          }}
        />
      </StyledCard>
      
      {/* 会话详情抽屉 */}
      <Drawer 
        title={`会话详情 - ${currentConversation?.id || ''}`}
        placement="right"
        width={700}
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        extra={
          <Space>
            <Button onClick={() => setDrawerVisible(false)}>关闭</Button>
          </Space>
        }
      >
        {currentConversation && (
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            {/* 对话内容选项卡 */}
            <TabPane tab="对话内容" key="messages">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <Space>
                      <Badge status={currentConversation.status === 'active' ? 'processing' : 'default'} />
                      <Text strong>{currentConversation.topic}</Text>
                      {getStatusTag(currentConversation.status)}
                    </Space>
                    <Text type="secondary">{currentConversation.startTime}</Text>
                  </div>
                  
                  <ChatContainer>
                    {currentConversation.messages.map((msg, index) => (
                      <MessageBubble key={index} isUser={msg.type === 'user'}>
                        <div style={{ marginBottom: 5, display: 'flex', justifyContent: 'space-between' }}>
                          <Text strong>{msg.type === 'user' ? '用户' : '系统'}</Text>
                          <Text type="secondary" style={{ fontSize: 12 }}>{msg.time}</Text>
                        </div>
                        <div>{msg.content}</div>
                      </MessageBubble>
                    ))}
                  </ChatContainer>
                </Col>
              </Row>
            </TabPane>
            
            {/* 用户信息选项卡 */}
            <TabPane tab="用户信息" key="user">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                    <Avatar size={64} icon={<UserOutlined />} src={currentConversation.userInfo.avatar} />
                    <div style={{ marginLeft: 16 }}>
                      <Title level={4} style={{ margin: 0 }}>{currentConversation.userInfo.nickname}</Title>
                      <Tag color="blue">{currentConversation.userInfo.type}</Tag>
                    </div>
                  </div>
                </Col>
                
                <Col span={12}>
                  <StyledCard title="基本信息" size="small">
                    <p><strong>所在地区：</strong> {currentConversation.userInfo.region}</p>
                    <p><strong>IP地址：</strong> {currentConversation.userInfo.ip}</p>
                    <p><strong>设备类型：</strong> {currentConversation.userInfo.device}</p>
                    <p><strong>首次访问：</strong> {currentConversation.userInfo.firstVisit}</p>
                    <p><strong>访问次数：</strong> {currentConversation.userInfo.visitCount}次</p>
                  </StyledCard>
                </Col>
                
                <Col span={12}>
                  <StyledCard title="会话信息" size="small">
                    <p><strong>话题：</strong> {currentConversation.topic}</p>
                    <p><strong>开始时间：</strong> {currentConversation.startTime}</p>
                    <p><strong>持续时间：</strong> {currentConversation.duration}</p>
                    <p><strong>消息数量：</strong> {currentConversation.messageCount}</p>
                    <p>
                      <strong>满意度评分：</strong> 
                      {currentConversation.satisfactionRating ? `${currentConversation.satisfactionRating}/5` : '-'}
                    </p>
                    <p>
                      <strong>标签：</strong> 
                      {currentConversation.tags.length > 0 
                        ? currentConversation.tags.map(tag => <Tag key={tag}>{tag}</Tag>) 
                        : '无'}
                    </p>
                  </StyledCard>
                </Col>
              </Row>
            </TabPane>
            
            {/* 分析报告选项卡 */}
            <TabPane tab="分析报告" key="analytics">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <StyledCard title="对话分析">
                    <div style={{ marginBottom: 20 }}>
                      <Title level={5}>意图识别准确率</Title>
                      <Progress 
                        percent={Math.round(currentConversation.analytics.intentRecognition)} 
                        status="active" 
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                      />
                    </div>
                    
                    <div style={{ marginBottom: 20 }}>
                      <Title level={5}>情感分析</Title>
                      <Progress 
                        percent={Math.round(currentConversation.analytics.sentimentScore * 100)} 
                        status="active" 
                        strokeColor={{
                          '0%': '#ff4d4f',
                          '100%': '#52c41a',
                        }}
                      />
                      <div>
                        情感得分: {currentConversation.analytics.sentimentScore} 
                        <span style={{ marginLeft: 8, color: '#52c41a' }}>
                          {currentConversation.analytics.sentimentScore > 0.5 ? '积极' : '中性'}
                        </span>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: 20 }}>
                      <Title level={5}>主要意图</Title>
                      <div>
                        {currentConversation.analytics.topIntents.map(intent => (
                          <Tag key={intent} color="blue" style={{ margin: '0 8px 8px 0' }}>{intent}</Tag>
                        ))}
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: 20 }}>
                      <Title level={5}>关键实体</Title>
                      <div>
                        {currentConversation.analytics.keyEntities.map(entity => (
                          <Tag key={entity} color="green" style={{ margin: '0 8px 8px 0' }}>{entity}</Tag>
                        ))}
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: 20 }}>
                      <Title level={5}>响应质量</Title>
                      <Progress 
                        percent={Math.round(currentConversation.analytics.responseQuality)} 
                        status="active" 
                        strokeColor={{
                          '0%': '#faad14',
                          '100%': '#52c41a',
                        }}
                      />
                    </div>
                  </StyledCard>
                </Col>
                
                <Col span={24}>
                  <StyledCard title="总结建议">
                    <Paragraph>
                      基于对话分析，本次会话{currentConversation.analytics.sentimentScore > 0.5 ? '整体呈积极态度' : '态度中立'}，
                      用户主要关注{currentConversation.analytics.topIntents[0]}和{currentConversation.analytics.topIntents[1]}。
                      系统响应质量{currentConversation.analytics.responseQuality > 70 ? '良好' : '一般'}。
                    </Paragraph>
                    
                    {currentConversation.hasProblems && (
                      <div style={{ marginTop: 16 }}>
                        <Alert
                          message="潜在问题提示"
                          description="检测到可能的误解或未完全解答的问题，建议人工跟进。"
                          type="warning"
                          showIcon
                        />
                      </div>
                    )}
                    
                    <div style={{ marginTop: 16 }}>
                      <Title level={5}>用户满意度</Title>
                      {typeof currentConversation.analytics.userSatisfaction === 'number' ? (
                        <Rate disabled defaultValue={currentConversation.analytics.userSatisfaction} />
                      ) : (
                        <Text type="secondary">暂无评分</Text>
                      )}
                    </div>
                  </StyledCard>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        )}
      </Drawer>
      
      {/* 过滤器抽屉 */}
      <Drawer
        title="高级筛选"
        placement="right"
        width={400}
        open={filterDrawerVisible}
        onClose={() => setFilterDrawerVisible(false)}
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={resetFilters}>重置</Button>
            <Button type="primary" onClick={() => applyFilters(filters)}>应用筛选</Button>
          </div>
        }
      >
        <div style={{ marginBottom: 24 }}>
          <Title level={5}>会话状态</Title>
          <Radio.Group 
            value={filters.status} 
            onChange={e => setFilters({ ...filters, status: e.target.value })}
          >
            <Radio value="all">全部</Radio>
            <Radio value="active">进行中</Radio>
            <Radio value="completed">已完成</Radio>
            <Radio value="pending">待处理</Radio>
            <Radio value="closed">已关闭</Radio>
          </Radio.Group>
        </div>
        
        <div style={{ marginBottom: 24 }}>
          <Title level={5}>日期范围</Title>
          <RangePicker 
            style={{ width: '100%' }}
            value={filters.dateRange}
            onChange={dateRange => setFilters({ ...filters, dateRange })}
          />
        </div>
        
        <div style={{ marginBottom: 24 }}>
          <Title level={5}>话题</Title>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="选择话题"
            value={filters.topics}
            onChange={topics => setFilters({ ...filters, topics })}
            options={[
              { value: '专业选择', label: '专业选择' },
              { value: '入学申请', label: '入学申请' },
              { value: '奖学金政策', label: '奖学金政策' },
              { value: '校园生活', label: '校园生活' },
              { value: '就业前景', label: '就业前景' },
              { value: '转专业', label: '转专业' },
              { value: '宿舍条件', label: '宿舍条件' }
            ]}
          />
        </div>
        
        <div style={{ marginBottom: 24 }}>
          <Title level={5}>用户类型</Title>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="选择用户类型"
            value={filters.userTypes}
            onChange={userTypes => setFilters({ ...filters, userTypes })}
            options={[
              { value: '高中生', label: '高中生' },
              { value: '家长', label: '家长' },
              { value: '教师', label: '教师' },
              { value: '在校生', label: '在校生' },
              { value: '其他', label: '其他' }
            ]}
          />
        </div>
      </Drawer>
    </>
  );
};

export default ConversationsPage;
