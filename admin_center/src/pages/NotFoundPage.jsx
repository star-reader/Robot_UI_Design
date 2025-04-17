import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

const NotFoundPage = () => {
  const navigate = useNavigate();
  
  return (
    <NotFoundContainer>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在"
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            返回首页
          </Button>
        }
      />
    </NotFoundContainer>
  );
};

export default NotFoundPage;
