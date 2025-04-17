import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Spin, Row, Col, Divider } from 'antd';
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const LoginCard = styled(Card)`
  width: 420px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  
  img {
    height: 60px;
    margin-right: 15px;
  }
  
  h1 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #007A49;
  }
`;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const onFinish = async (values) => {
    try {
      setLoading(true);
      
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 在实际应用中，这里应该发送请求给后端API验证用户凭据
      if (values.username === 'admin' && values.password === 'admin123') {
        // 模拟成功登录
        const mockUser = {
          id: '1001',
          name: '管理员',
          role: 'admin',
          avatar: null,
          permissions: ['admin', 'edit', 'view']
        };
        
        const mockToken = 'mock_jwt_token_' + Math.random().toString(36).substr(2);
        
        login(mockUser, mockToken);
        message.success('登录成功');
        navigate('/');
      } else {
        message.error('用户名或密码不正确');
      }
    } catch (error) {
      message.error('登录失败，请稍后再试');
      console.error('登录错误:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <LoginContainer>
      <LoginCard>
        <Spin spinning={loading} tip="登录中...">
          <LogoContainer>
            <img src="/src/assets/images/logo.svg" alt="华南农业大学" />
            <h1>智能招生系统管理平台</h1>
          </LogoContainer>
          
          <Divider style={{ margin: '15px 0 25px' }} />
          
          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            size="large"
            layout="vertical"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input 
                prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} 
                placeholder="用户名" 
                autoComplete="username"
              />
            </Form.Item>
            
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password 
                prefix={<LockOutlined style={{ color: '#bfbfbf' }} />} 
                placeholder="密码" 
                autoComplete="current-password"
              />
            </Form.Item>
            
            <Form.Item
              name="captcha"
              rules={[{ required: true, message: '请输入验证码' }]}
            >
              <Row gutter={8}>
                <Col flex="auto">
                  <Input 
                    prefix={<SafetyOutlined style={{ color: '#bfbfbf' }} />}
                    placeholder="验证码" 
                  />
                </Col>
                <Col flex="none">
                  <div 
                    style={{ 
                      width: 100, 
                      height: 40, 
                      background: '#f2f2f2', 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                      fontWeight: 'bold',
                      letterSpacing: 2,
                      cursor: 'pointer',
                      userSelect: 'none',
                      color: '#007A49'
                    }}
                    onClick={() => message.info('刷新验证码')}
                  >
                    ABCD
                  </div>
                </Col>
              </Row>
            </Form.Item>
            
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading} 
                block
                style={{ height: 45 }}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
          
          <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: 16 }}>
            账号: admin, 密码: admin123 (测试账号)
          </Text>
        </Spin>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;
