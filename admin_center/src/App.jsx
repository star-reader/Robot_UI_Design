import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import AdminLayout from './layouts/AdminLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ConversationsPage from './pages/ConversationsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import KnowledgeBasePage from './pages/KnowledgeBasePage';
import SettingsPage from './pages/SettingsPage';
// import SystemMonitorPage from './pages/SystemMonitorPage';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// 自定义主题配置
const theme = {
  token: {
    colorPrimary: '#007A49', // 华农绿
    borderRadius: 6,
    colorLink: '#00A896',
    colorLinkHover: '#39B0AC'
  },
};

// 受保护的路由组件
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>加载中...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <ConfigProvider locale={zhCN} theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardPage />} />
              <Route path="conversations" element={<ConversationsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="knowledge-base" element={<KnowledgeBasePage />} />
              <Route path="settings" element={<SettingsPage />} />
              {/* <Route path="system-monitor" element={<SystemMonitorPage />} /> */}
            </Route>
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;