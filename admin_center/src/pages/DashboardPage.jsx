import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Table, List, Tag, Typography, Button, Spin } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, MessageOutlined, QuestionCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import { fetchDashboardData } from '../services/dashboardService';

const { Title, Text } = Typography;

// 自定义统计卡片组件
const StatCard = ({ title, value, icon, suffix, color, trend, trendValue }) => {
  return (
    <Card hoverable style={{ height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <Text type="secondary">{title}</Text>
          <Title level={3} style={{ margin: '10px 0' }}>{value}{suffix && <small style={{ fontSize: '16px', marginLeft: '5px' }}>{suffix}</small>}</Title>
          {trend && (
            <div>
              {trend === 'up' ? (
                <Text type="success"><ArrowUpOutlined /> {trendValue}%</Text>
              ) : (
                <Text type="danger"><ArrowDownOutlined /> {trendValue}%</Text>
              )}
              <Text type="secondary" style={{ marginLeft: '5px' }}>较上周</Text>
            </div>
          )}
        </div>
        <div style={{ 
          background: `rgba(${color}, 0.1)`, 
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        // 在实际应用中，从API获取数据
        // 这里使用mock数据进行演示
        const mockData = {
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
            { id: '1003', user: '王同学', topic: '专业选择建议', time: '40分钟前', status: 'completed' },
            { id: '1004', user: '赵同学', topic: '校园住宿条件', time: '1小时前', status: 'completed' },
            { id: '1005', user: '钱家长', topic: '学费缴纳方式', time: '2小时前', status: 'completed' }
          ],
          topQuestions: [
            { question: '如何申请入学?', count: 245 },
            { question: '学校有哪些专业?', count: 198 },
            { question: '奖学金申请条件是什么?', count: 175 },
            { question: '录取分数线是多少?', count: 156 },
            { question: '校园住宿条件如何?', count: 132 }
          ],
          visitsData: {
            dates: ['10/1', '10/2', '10/3', '10/4', '10/5', '10/6', '10/7', '10/8', '10/9', '10/10'],
            values: [120, 132, 101, 134, 90, 230, 210, 240, 280, 300]
          },
          conversationsData: {
            dates: ['10/1', '10/2', '10/3', '10/4', '10/5', '10/6', '10/7', '10/8', '10/9', '10/10'],
            values: [45, 52, 38, 54, 42, 65, 60, 68, 75, 82]
          }
        };
        
        setData(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // 访问量趋势图配置
  const visitsChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data?.visitsData.dates || [],
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: '访问量',
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 3,
        color: '#007A49'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(0, 122, 73, 0.3)'
          }, {
            offset: 1,
            color: 'rgba(0, 122, 73, 0)'
          }]
        }
      },
      data: data?.visitsData.values || []
    }]
  };
  
  // 会话数趋势图配置
  const conversationsChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data?.conversationsData.dates || [],
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: '会话数',
      type: 'bar',
      barWidth: '60%',
      itemStyle: {
        color: '#00A896'
      },
      data: data?.conversationsData.values || []
    }]
  };
  
  // 表格列配置
  const columns = [
    {
      title: '用户',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: '话题',
      dataIndex: 'topic',
      key: 'topic',
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={status === 'active' ? 'green' : 'blue'}>
          {status === 'active' ? '进行中' : '已完成'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: () => <Button type="link" size="small">查看详情</Button>,
    },
  ];
  
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <Spin size="large" />
      </div>
    );
  }
  
  return (
    <>
      <Title level={2}>仪表盘</Title>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard 
            title="今日访问量" 
            value={data.stats.totalVisits} 
            icon={<UserOutlined style={{ color: '#007A49', fontSize: '24px' }} />}
            color="0, 122, 73"
            trend={data.trends.visits.trend}
            trendValue={data.trends.visits.value}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard 
            title="活跃会话" 
            value={data.stats.activeConversations} 
            icon={<MessageOutlined style={{ color: '#00A896', fontSize: '24px' }} />}
            color="0, 168, 150"
            trend={data.trends.conversations.trend}
            trendValue={data.trends.conversations.value}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard 
            title="平均响应时间" 
            value={data.stats.averageResponseTime} 
            icon={<ClockCircleOutlined style={{ color: '#39B0AC', fontSize: '24px' }} />}
            color="57, 176, 172"
            trend={data.trends.responseTime.trend}
            trendValue={data.trends.responseTime.value}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard 
            title="满意度" 
            value={data.stats.satisfactionRate} 
            suffix="%" 
            icon={<QuestionCircleOutlined style={{ color: '#F9C80E', fontSize: '24px' }} />}
            color="249, 200, 14"
            trend={data.trends.satisfaction.trend}
            trendValue={data.trends.satisfaction.value}
          />
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="访问量趋势" bordered={false}>
            <ReactECharts option={visitsChartOption} style={{ height: 300 }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="会话数趋势" bordered={false}>
            <ReactECharts option={conversationsChartOption} style={{ height: 300 }} />
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={14}>
          <Card title="近期会话" bordered={false} extra={<Button type="link">查看全部</Button>}>
            <Table 
              columns={columns} 
              dataSource={data.recentConversations} 
              rowKey="id"
              size="middle"
              pagination={false}
            />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="热门问题" bordered={false} extra={<Button type="link">查看全部</Button>}>
            <List
              size="small"
              dataSource={data.topQuestions}
              renderItem={(item) => (
                <List.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text ellipsis style={{ maxWidth: '70%' }}>{item.question}</Text>
                  <Tag color="blue">{item.count}次</Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardPage;
