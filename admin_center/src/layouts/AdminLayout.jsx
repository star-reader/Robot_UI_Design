import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Avatar, Dropdown, Badge, theme, Typography } from 'antd';
import {
  DashboardOutlined,
  MessageOutlined,
  BarChartOutlined,
  BookOutlined,
  SettingOutlined,
  MonitorOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const Logo = styled.div`
  height: 64px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.1);
  
  h1 {
    color: white;
    font-size: 18px;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  img {
    height: 40px;
    margin-right: 10px;
  }
`;

const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StyledSider = styled(Sider)`
  position: fixed !important;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  background: linear-gradient(135deg, rgba(0, 122, 73, 0.97), rgba(0, 168, 150, 0.95)) !important;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/src/assets/images/museum.jpg') no-repeat center center;
    background-size: cover;
    opacity: 0.1;
    z-index: -1;
  }

  &.ant-layout-sider-collapsed {
    min-width: 60px !important;
    width: 40px !important;
    flex: 0 0 60px !important;
  }

  .ant-layout-sider-children {
    background: transparent;
  }

  .ant-menu.ant-menu-dark {
    background: transparent;
  }

  .ant-layout-sider-trigger {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { token } = theme.useToken();
  
  // 初始化通知
  useEffect(() => {
    setNotifications([
      { id: 1, title: '新的招生咨询', content: '您有10条未处理的咨询', time: '10分钟前', read: false },
      { id: 2, title: '系统更新', content: '系统将于今晚10点进行更新维护', time: '1小时前', read: false }
    ]);
  }, []);
  
  // 菜单配置
  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: '仪表盘',
    },
    {
      key: '/conversations',
      icon: <MessageOutlined />,
      label: '会话管理',
    },
    {
      key: '/analytics',
      icon: <BarChartOutlined />,
      label: '数据分析',
    },
    {
      key: '/knowledge-base',
      icon: <BookOutlined />,
      label: '知识库管理',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
    // {
    //   key: '/system-monitor',
    //   icon: <MonitorOutlined />,
    //   label: '系统监控',
    // }
  ];
  
  // 用户下拉菜单
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];
  
  // 处理用户菜单点击
  const handleUserMenuClick = ({ key }) => {
    if (key === 'logout') {
      logout();
      navigate('/login');
    } else if (key === 'profile') {
      navigate('/settings?tab=profile');
    }
  };
  
  // 通知下拉菜单
  const notificationMenuItems = notifications.map(notification => ({
    key: notification.id,
    label: (
      <div>
        <div style={{ fontWeight: notification.read ? 'normal' : 'bold' }}>{notification.title}</div>
        <div style={{ fontSize: '12px', color: token.colorTextSecondary }}>{notification.content}</div>
        <div style={{ fontSize: '12px', color: token.colorTextTertiary, marginTop: '4px' }}>{notification.time}</div>
      </div>
    ),
  }));
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <StyledSider 
        width={220} 
        collapsed={collapsed}
        style={{ overflow: 'auto' }}
      >
        <Logo style={{display: 'flex', flexWrap: 'wrap', height: collapsed ? '50px' : '90px', 'marginLeft': '-8px'}}>
          <div><img src="/src/assets/images/logo.svg" alt="华农智能招生系统" /> </div>
          {!collapsed && <h1>招生系统管理中心</h1>}
        </Logo>
        
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          style={{ background: 'transparent', borderRight: 0 }}
          items={menuItems}
          onClick={({key}) => navigate(key)}
        />
      </StyledSider>
      
      <Layout style={{ marginLeft: collapsed ? 80 : 220, transition: 'all 0.2s' }}>
        <StyledHeader>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          
          <HeaderRight>
            <Dropdown
              menu={{
                items: [...notificationMenuItems, {
                  type: 'divider'
                }, {
                  key: 'all',
                  label: '查看全部通知'
                }]
              }}
              placement="bottomRight"
              arrow
            >
              <Badge count={notifications.filter(n => !n.read).length} size="small">
                <Button type="text" icon={<BellOutlined />} style={{ fontSize: '18px' }} />
              </Badge>
            </Dropdown>
            
            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: handleUserMenuClick
              }}
              placement="bottomRight"
              arrow
            >
              <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <Avatar style={{ backgroundColor: token.colorPrimary }} icon={<UserOutlined />} />
                <span style={{ marginLeft: 8, marginRight: 8 }}>{user?.name || '管理员'}</span>
              </div>
            </Dropdown>
          </HeaderRight>
        </StyledHeader>
        
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', borderRadius: 8 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
