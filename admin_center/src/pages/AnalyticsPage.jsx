import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Tabs, DatePicker, Button, Spin, Typography, Select, Radio, Space, Divider } from 'antd';
import ReactECharts from 'echarts-for-react';
import WordCloud from 'wordcloud';
import { DownloadOutlined, FilterOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const WordCloudContainer = styled.div`
  position: relative;
  width: 100%;
  height: 450px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  overflow: hidden;

  canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100% !important;
    height: 100% !important;
  }
`;

const AnalyticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [timeRange, setTimeRange] = useState('week');
  const wordCloudRef = useRef(null);
  
  // 模拟从API获取数据
  useEffect(() => {
    const fetchData = async () => {
      // 在实际应用中，从API获取数据
      // 这里使用mock数据进行演示
      setTimeout(() => {
        const mockData = {
          questionDistribution: {
            categories: ['专业选择', '入学申请', '奖学金', '住宿信息', '学费缴纳', '课程设置', '实习就业', '校园活动'],
            values: [234, 310, 190, 150, 180, 220, 160, 120]
          },
          responseTimes: {
            categories: ['0-5秒', '5-15秒', '15-30秒', '30-60秒', '60秒以上'],
            values: [355, 210, 120, 75, 40]
          },
          userSatisfaction: {
            categories: ['非常满意', '满意', '一般', '不满意', '非常不满意'],
            values: [65, 25, 7, 2, 1]
          },
          timeDistribution: {
            hours: Array.from({ length: 24 }, (_, i) => i),
            values: [12, 8, 5, 3, 2, 5, 15, 30, 45, 60, 55, 48, 52, 60, 58, 48, 42, 38, 45, 40, 35, 25, 18, 15]
          },
          queryTrends: {
            dates: ['10/1', '10/2', '10/3', '10/4', '10/5', '10/6', '10/7', '10/8', '10/9', '10/10'],
            categories: ['专业选择', '入学申请', '奖学金', '校园生活'],
            series: [
              [20, 25, 18, 22, 15, 28, 24, 30, 32, 35],
              [35, 32, 30, 38, 25, 40, 37, 45, 48, 50],
              [15, 18, 12, 20, 22, 25, 18, 22, 24, 28],
              [30, 28, 32, 35, 30, 38, 42, 35, 40, 45]
            ]
          },
          wordCloud: [
            { text: "入学申请流程", size: 28 },
            { text: "专业选择", size: 25 },
            { text: "奖学金", size: 22 },
            { text: "录取标准", size: 20 },
            { text: "学费", size: 19 },
            { text: "住宿条件", size: 18 },
            { text: "课程安排", size: 18 },
            { text: "实习机会", size: 17 },
            { text: "就业前景", size: 17 },
            { text: "校园活动", size: 16 },
            { text: "转专业", size: 15 },
            { text: "国际交流", size: 15 },
            { text: "研究生项目", size: 14 },
            { text: "教授资质", size: 14 },
            { text: "图书馆资源", size: 13 },
            { text: "学生社团", size: 13 },
            { text: "膳食选择", size: 12 },
            { text: "运动设施", size: 12 },
            { text: "校园安全", size: 11 },
            { text: "WiFi覆盖", size: 11 },
            { text: "交通便利性", size: 10 },
            { text: "支持服务", size: 10 }
          ]
        };
        
        setData(mockData);
        setLoading(false);
        
        // 渲染词云
        if (wordCloudRef.current) {
          const cloudData = mockData.wordCloud.map(item => [item.text, item.size * 4]);
          WordCloud(wordCloudRef.current, {
            list: cloudData,
            gridSize: 16,
            weightFactor: 1,
            fontFamily: 'Microsoft YaHei',
            color: 'random-dark',
            backgroundColor: 'white',
            rotateRatio: 0.5,
          });
        }
      }, 1500);
    };
    
    fetchData();
  }, [timeRange]);

  useEffect(() => {
    if (wordCloudRef.current) {
      const updateWordCloud = () => {
        const width = wordCloudRef.current.parentElement.offsetWidth;
        const height = 450;
        
        const options = {
          list: mockData.wordCloud.map(item => [item.text, item.size * 4]),
          gridSize: Math.round(16 * width / 1000),
          weightFactor: width / 1000,
          fontFamily: 'Microsoft YaHei',
          color: (word, weight) => {
            const colors = ['#007A49', '#00A896', '#39B0AC', '#87CEEB'];
            return colors[Math.floor(Math.random() * colors.length)];
          },
          backgroundColor: 'white',
          rotateRatio: 0.5,
          rotationSteps: 2,
          shape: 'circle'
        };

        WordCloud(wordCloudRef.current, options);
      };

      updateWordCloud();
      window.addEventListener('resize', updateWordCloud);
      return () => window.removeEventListener('resize', updateWordCloud);
    }
  }, [data]);
  
  // 问题分布饼图配置
  const questionDistributionOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      type: 'scroll',
      orient: 'horizontal',
      bottom: 0,
      data: data?.questionDistribution.categories || []
    },
    series: [
      {
        name: '问题分类',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data?.questionDistribution.categories.map((cat, index) => ({
          value: data.questionDistribution.values[index],
          name: cat
        })) || []
      }
    ]
  };
  
  // 响应时间分布图配置
  const responseTimeOption = {
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
      data: data?.responseTimes.categories || []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '响应次数',
        type: 'bar',
        barWidth: '60%',
        data: data?.responseTimes.values || [],
        itemStyle: {
          color: function(params) {
            const colorList = ['#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272'];
            return colorList[params.dataIndex];
          }
        }
      }
    ]
  };
  
  // 用户满意度图配置
  const satisfactionOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      bottom: 0
    },
    series: [
      {
        name: '满意度',
        type: 'pie',
        radius: '70%',
        center: ['50%', '45%'],
        data: data?.userSatisfaction.categories.map((cat, index) => ({
          value: data.userSatisfaction.values[index],
          name: cat
        })) || [],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          color: function(params) {
            const colorList = ['#007A49', '#36C486', '#F9C80E', '#FF6B6B', '#C62E2D'];
            return colorList[params.dataIndex];
          }
        }
      }
    ]
  };
  
  // 时间分布图配置
  const timeDistributionOption = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}:00 - {b + 1}:00<br/>{c}次查询'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data?.timeDistribution.hours.map(h => h.toString()) || [],
      axisLabel: {
        formatter: '{value}:00'
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '查询次数',
        type: 'line',
        smooth: true,
        data: data?.timeDistribution.values || [],
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 122, 73, 0.5)' },
              { offset: 1, color: 'rgba(0, 122, 73, 0.1)' }
            ]
          }
        },
        lineStyle: {
          color: '#007A49',
          width: 3
        },
        itemStyle: {
          color: '#007A49'
        }
      }
    ]
  };
  
  // 查询趋势图配置
  const queryTrendsOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: data?.queryTrends.categories || [],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data?.queryTrends.dates || []
    },
    yAxis: {
      type: 'value'
    },
    series: data?.queryTrends.categories.map((category, i) => ({
      name: category,
      type: 'line',
      stack: '总量',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: data.queryTrends.series[i]
    })) || []
  };
  
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <Spin size="large" />
      </div>
    );
  }
  
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={2}>数据分析</Title>
        <Space>
          <Radio.Group value={timeRange} onChange={e => setTimeRange(e.target.value)}>
            <Radio.Button value="today">今日</Radio.Button>
            <Radio.Button value="week">本周</Radio.Button>
            <Radio.Button value="month">本月</Radio.Button>
            <Radio.Button value="year">全年</Radio.Button>
          </Radio.Group>
          
          <RangePicker />
          
          <Button type="primary" icon={<DownloadOutlined />}>
            导出报告
          </Button>
        </Space>
      </div>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="问题分类分布" bordered={false}>
            <ReactECharts option={questionDistributionOption} style={{ height: 400 }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="响应时间分布" bordered={false}>
            <ReactECharts option={responseTimeOption} style={{ height: 400 }} />
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="用户满意度" bordered={false}>
            <ReactECharts option={satisfactionOption} style={{ height: 400 }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="每日时段分布" bordered={false}>
            <ReactECharts option={timeDistributionOption} style={{ height: 400 }} />
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="查询趋势" bordered={false}>
            <ReactECharts option={queryTrendsOption} style={{ height: 400 }} />
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card 
            title="热门关键词" 
            bordered={false}
            extra={
              <Button type="link" icon={<FilterOutlined />}>
                筛选条件
              </Button>
            }
          >
            <WordCloudContainer>
              <canvas ref={wordCloudRef}></canvas>
            </WordCloudContainer>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AnalyticsPage;
