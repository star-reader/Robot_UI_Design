import React, { useState } from 'react';
import { 
  Card, Tabs, Form, Input, Button, Switch, Upload, message, 
  Avatar, Typography, Divider, Space, Select, InputNumber
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  UploadOutlined,
  SettingOutlined,
  BellOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const SettingsPage = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [form] = Form.useForm();

  // 保存设置
  const handleSave = async (values) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('设置已保存');
    } catch (error) {
      message.error('保存失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title level={2}>系统设置</Title>
      
      <Card>
        <Tabs defaultActiveKey="profile">
          <TabPane 
            tab={<span><UserOutlined />个人资料</span>}
            key="profile"
          >
            <Form
              layout="vertical"
              form={form}
              onFinish={handleSave}
              initialValues={{
                username: user?.name,
                email: 'admin@scau.edu.cn',
                notifications: true,
                theme: 'light',
                language: 'zh_CN'
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Upload
                  name="avatar"
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={() => message.info('头像更新功能开发中')}
                >
                  <Avatar 
                    size={100} 
                    icon={<UserOutlined />}
                    style={{ cursor: 'pointer' }}
                  />
                </Upload>
                <div style={{ marginTop: 8 }}>
                  <Text type="secondary">点击更换头像</Text>
                </div>
              </div>

              <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                label="邮箱"
                name="email"
                rules={[{ required: true, type: 'email' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="接收消息通知"
                name="notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  保存更改
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane 
            tab={<span><SafetyCertificateOutlined />安全设置</span>}
            key="security"
          >
            <Form layout="vertical">
              <Form.Item label="修改密码">
                <Input.Password placeholder="当前密码" style={{ marginBottom: 16 }} />
                <Input.Password placeholder="新密码" style={{ marginBottom: 16 }} />
                <Input.Password placeholder="确认新密码" style={{ marginBottom: 16 }} />
                <Button type="primary">更新密码</Button>
              </Form.Item>

              <Divider />

              <Form.Item label="两步验证">
                <Switch defaultChecked={false} onChange={() => message.info('两步验证功能开发中')} />
                <div style={{ marginTop: 8 }}>
                  <Text type="secondary">启用两步验证以提高账户安全性</Text>
                </div>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane 
            tab={<span><SettingOutlined />系统设置</span>}
            key="system"
          >
            <Form layout="vertical">
              <Form.Item label="系统主题">
                <Select defaultValue="light">
                  <Option value="light">浅色</Option>
                  <Option value="dark">深色</Option>
                  <Option value="auto">跟随系统</Option>
                </Select>
              </Form.Item>

              <Form.Item label="页面布局">
                <Select defaultValue="side">
                  <Option value="side">侧边导航</Option>
                  <Option value="top">顶部导航</Option>
                </Select>
              </Form.Item>

              <Form.Item label="每页显示数量">
                <InputNumber min={10} max={100} defaultValue={20} />
              </Form.Item>

              <Form.Item label="自动刷新间隔">
                <Select defaultValue="0">
                  <Option value="0">关闭</Option>
                  <Option value="30">30秒</Option>
                  <Option value="60">1分钟</Option>
                  <Option value="300">5分钟</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button type="primary">保存设置</Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
};

export default SettingsPage;
