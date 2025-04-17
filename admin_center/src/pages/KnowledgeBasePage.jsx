import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Tag, 
  Space, 
  Input, 
  Typography, 
  Drawer, 
  Form, 
  Select, 
  TreeSelect, 
  Switch,
  Upload,
  message,
  Modal,
  Tabs,
  Empty
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined, 
  UploadOutlined,
  QuestionCircleOutlined,
  SyncOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;
const { confirm } = Modal;

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 24px;
  }
`;

const KnowledgeBasePage = () => {
  const [loading, setLoading] = useState(true);
  const [knowledgeList, setKnowledgeList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [form] = Form.useForm();
  const [treeData, setTreeData] = useState([]);
  
  // 模拟获取知识库数据
  useEffect(() => {
    const fetchData = async () => {
      // 在实际应用中，这应该是一个API调用
      setTimeout(() => {
        const mockKnowledgeData = Array(20).fill({}).map((_, index) => ({
          id: `kb-${1000 + index}`,
          title: `知识点 ${1000 + index}`,
          category: index % 4 === 0 ? '招生政策' : 
                  index % 4 === 1 ? '专业介绍' : 
                  index % 4 === 2 ? '校园生活' : '就业信息',
          status: index % 3 === 0 ? 'active' : (index % 3 === 1 ? 'draft' : 'archived'),
          author: '系统管理员',
          updateTime: new Date(Date.now() - Math.random() * 30 * 86400000).toLocaleString(),
          hitCount: Math.floor(Math.random() * 1000)
        }));
        
        const mockQuestionData = Array(20).fill({}).map((_, index) => ({
          id: `q-${1000 + index}`,
          question: `常见问题 ${1000 + index}?`,
          answer: `这是问题 ${1000 + index} 的详细解答，包含了相关的政策信息和解释。`,
          category: index % 4 === 0 ? '招生政策' : 
                   index % 4 === 1 ? '专业介绍' : 
                   index % 4 === 2 ? '校园生活' : '就业信息',
          status: index % 3 === 0 ? 'active' : (index % 3 === 1 ? 'draft' : 'archived'),
          hitCount: Math.floor(Math.random() * 500),
          lastUpdated: new Date(Date.now() - Math.random() * 30 * 86400000).toLocaleString()
        }));
        
        const mockTreeData = [
          {
            title: '招生政策',
            value: 'admission',
            key: 'admission',
            children: [
              { title: '招生计划', value: 'admission-plan', key: 'admission-plan' },
              { title: '招生简章', value: 'admission-guide', key: 'admission-guide' },
              { title: '录取规则', value: 'admission-rules', key: 'admission-rules' }
            ]
          },
          {
            title: '专业介绍',
            value: 'majors',
            key: 'majors',
            children: [
              { title: '农学院', value: 'agriculture', key: 'agriculture' },
              { title: '工程学院', value: 'engineering', key: 'engineering' },
              { title: '经管学院', value: 'economics', key: 'economics' }
            ]
          },
          {
            title: '校园生活',
            value: 'campus',
            key: 'campus',
            children: [
              { title: '住宿条件', value: 'dormitory', key: 'dormitory' },
              { title: '校园设施', value: 'facilities', key: 'facilities' },
              { title: '学生活动', value: 'activities', key: 'activities' }
            ]
          }
        ];
        
        setKnowledgeList(mockKnowledgeData);
        setQuestionList(mockQuestionData);
        setTreeData(mockTreeData);
        setLoading(false);
      }, 1000);
    };
    
    fetchData();
  }, []);
  
  // 打开抽屉
  const openDrawer = (record, type) => {
    setSelectedRecord(record);
    setActiveTab(type === 'question' ? '2' : '1');
    
    if (record) {
      // 编辑模式
      form.setFieldsValue({
        ...record,
        tags: record.tags || [],
        isPublished: record.status === 'active'
      });
    } else {
      // 新增模式
      form.resetFields();
      form.setFieldsValue({
        status: 'draft',
        isPublished: false
      });
    }
    
    setDrawerVisible(true);
  };
  
  // 保存知识点或问题
  const handleSave = () => {
    form.validateFields().then(values => {
      console.log('提交的值:', values);
      
      // 在实际应用中，这里会调用API保存数据
      message.success(`${selectedRecord ? '更新' : '创建'}成功`);
      setDrawerVisible(false);
      
      // 模拟更新列表
      if (activeTab === '1') {
        if (selectedRecord) {
          setKnowledgeList(prev => 
            prev.map(item => item.id === selectedRecord.id ? { ...item, ...values, status: values.isPublished ? 'active' : 'draft' } : item)
          );
        } else {
          const newItem = {
            id: `kb-${1000 + knowledgeList.length}`,
            ...values,
            status: values.isPublished ? 'active' : 'draft',
            author: '系统管理员',
            updateTime: new Date().toLocaleString(),
            hitCount: 0
          };
          setKnowledgeList(prev => [...prev, newItem]);
        }
      } else {
        if (selectedRecord) {
          setQuestionList(prev => 
            prev.map(item => item.id === selectedRecord.id ? { ...item, ...values, status: values.isPublished ? 'active' : 'draft' } : item)
          );
        } else {
          const newItem = {
            id: `q-${1000 + questionList.length}`,
            ...values,
            status: values.isPublished ? 'active' : 'draft',
            lastUpdated: new Date().toLocaleString(),
            hitCount: 0
          };
          setQuestionList(prev => [...prev, newItem]);
        }
      }
    });
  };
  
  // 删除知识点或问题
  const handleDelete = (record, type) => {
    confirm({
      title: '确定要删除此内容吗?',
      icon: <QuestionCircleOutlined style={{ color: 'red' }} />,
      content: '删除后将无法恢复。',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        // 在实际应用中，这里会调用API删除数据
        message.success('删除成功');
        
        // 模拟更新列表
        if (type === 'knowledge') {
          setKnowledgeList(prev => prev.filter(item => item.id !== record.id));
        } else {
          setQuestionList(prev => prev.filter(item => item.id !== record.id));
        }
      }
    });
  };
  
  // 知识库表格列配置
  const knowledgeColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      render: category => {
        let color = 'default';
        
        if (category === '招生政策') color = 'blue';
        if (category === '专业介绍') color = 'green';
        if (category === '校园生活') color = 'purple';
        if (category === '就业信息') color = 'orange';
        
        return <Tag color={color}>{category}</Tag>;
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: status => {
        let color = 'default';
        let text = '';
        
        if (status === 'active') {
          color = 'success';
          text = '已发布';
        } else if (status === 'draft') {
          color = 'warning';
          text = '草稿';
        } else if (status === 'archived') {
          color = 'default';
          text = '已归档';
        }
        
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 170
    },
    {
      title: '创建者',
      dataIndex: 'author',
      key: 'author',
      width: 120
    },
    {
      title: '点击量',
      dataIndex: 'hitCount',
      key: 'hitCount',
      width: 90,
      sorter: (a, b) => a.hitCount - b.hitCount
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button type="text" size="small" icon={<EyeOutlined />} />
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => openDrawer(record, 'knowledge')} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record, 'knowledge')} />
        </Space>
      )
    }
  ];
  
  // 常见问题表格列配置
  const questionColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100
    },
    {
      title: '问题',
      dataIndex: 'question',
      key: 'question',
      ellipsis: true
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      render: category => {
        let color = 'default';
        
        if (category === '招生政策') color = 'blue';
        if (category === '专业介绍') color = 'green';
        if (category === '校园生活') color = 'purple';
        if (category === '就业信息') color = 'orange';
        
        return <Tag color={color}>{category}</Tag>;
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: status => {
        let color = 'default';
        let text = '';
        
        if (status === 'active') {
          color = 'success';
          text = '已发布';
        } else if (status === 'draft') {
          color = 'warning';
          text = '草稿';
        } else if (status === 'archived') {
          color = 'default';
          text = '已归档';
        }
        
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: '更新时间',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      width: 170
    },
    {
      title: '点击量',
      dataIndex: 'hitCount',
      key: 'hitCount',
      width: 90,
      sorter: (a, b) => a.hitCount - b.hitCount
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button type="text" size="small" icon={<EyeOutlined />} />
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => openDrawer(record, 'question')} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record, 'question')} />
        </Space>
      )
    }
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={2}>知识库管理</Title>
      </div>
      
      <StyledTabs defaultActiveKey="1" onChange={setActiveTab}>
        <TabPane tab="知识库内容" key="1">
          <Card
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>知识库列表</span>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={() => openDrawer(null, 'knowledge')}
                >
                  添加知识点
                </Button>
              </div>
            }
          >
            <div style={{ marginBottom: 16 }}>
              <Input.Search 
                placeholder="搜索知识点" 
                style={{ width: 300, marginRight: 16 }}
                onSearch={value => console.log(value)}
              />
              
              <Button icon={<SyncOutlined />} onClick={() => message.success('刷新成功')}>
                刷新
              </Button>
            </div>
            
            <Table 
              columns={knowledgeColumns} 
              dataSource={knowledgeList}
              loading={loading}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              scroll={{ x: 'max-content' }}
            />
          </Card>
        </TabPane>
        
        <TabPane tab="常见问题" key="2">
          <Card
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>问题列表</span>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={() => openDrawer(null, 'question')}
                >
                  添加问题
                </Button>
              </div>
            }
          >
            <div style={{ marginBottom: 16 }}>
              <Input.Search 
                placeholder="搜索问题" 
                style={{ width: 300, marginRight: 16 }}
                onSearch={value => console.log(value)}
              />
              
              <Button icon={<SyncOutlined />} onClick={() => message.success('刷新成功')}>
                刷新
              </Button>
            </div>
            
            <Table 
              columns={questionColumns} 
              dataSource={questionList}
              loading={loading}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              scroll={{ x: 'max-content' }}
            />
          </Card>
        </TabPane>
        
        <TabPane tab="同义词管理" key="3">
          <Card>
            <Empty description="同义词管理功能正在开发中..." />
          </Card>
        </TabPane>
      </StyledTabs>
      
      <Drawer
        title={`${selectedRecord ? '编辑' : '添加'}${activeTab === '1' ? '知识点' : '问题'}`}
        width={600}
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button style={{ marginRight: 8 }} onClick={() => setDrawerVisible(false)}>
              取消
            </Button>
            <Button type="primary" onClick={handleSave}>
              保存
            </Button>
          </div>
        }
      >
        <Form 
          layout="vertical" 
          form={form}
          initialValues={{
            status: 'draft',
            isPublished: false
          }}
        >
          {activeTab === '1' ? (
            // 知识点表单
            <>
              <Form.Item 
                name="title" 
                label="标题" 
                rules={[{ required: true, message: '请输入标题' }]}
              >
                <Input placeholder="请输入标题" />
              </Form.Item>
              
              <Form.Item 
                name="content" 
                label="内容" 
                rules={[{ required: true, message: '请输入内容' }]}
              >
                <TextArea rows={8} placeholder="请输入知识点内容" />
              </Form.Item>
              
              <Form.Item 
                name="category" 
                label="分类" 
                rules={[{ required: true, message: '请选择分类' }]}
              >
                <TreeSelect
                  showSearch
                  style={{ width: '100%' }}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="请选择分类"
                  allowClear
                  treeData={treeData}
                />
              </Form.Item>
              
              <Form.Item name="tags" label="标签">
                <Select mode="tags" placeholder="输入标签并回车" />
              </Form.Item>
              
              <Form.Item name="attachments" label="附件">
                <Upload>
                  <Button icon={<UploadOutlined />}>上传文件</Button>
                </Upload>
              </Form.Item>
              
              <Form.Item name="isPublished" valuePropName="checked" label="是否发布">
                <Switch />
              </Form.Item>
            </>
          ) : (
            // 问题表单
            <>
              <Form.Item 
                name="question" 
                label="问题" 
                rules={[{ required: true, message: '请输入问题' }]}
              >
                <Input placeholder="请输入问题" />
              </Form.Item>
              
              <Form.Item 
                name="answer" 
                label="答案" 
                rules={[{ required: true, message: '请输入答案' }]}
              >
                <TextArea rows={6} placeholder="请输入答案内容" />
              </Form.Item>
              
              <Form.Item 
                name="category" 
                label="分类" 
                rules={[{ required: true, message: '请选择分类' }]}
              >
                <Select placeholder="请选择分类">
                  <Option value="招生政策">招生政策</Option>
                  <Option value="专业介绍">专业介绍</Option>
                  <Option value="校园生活">校园生活</Option>
                  <Option value="就业信息">就业信息</Option>
                </Select>
              </Form.Item>
              
              <Form.Item name="tags" label="标签">
                <Select mode="tags" placeholder="输入标签并回车" />
              </Form.Item>
              
              <Form.Item name="isPublished" valuePropName="checked" label="是否发布">
                <Switch />
              </Form.Item>
            </>
          )}
        </Form>
      </Drawer>
    </>
  );
};

export default KnowledgeBasePage;
