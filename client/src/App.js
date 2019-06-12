import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';

import { Layout } from 'antd';

import Chart from './components/Chart';
const { Header, Content } = Layout;

const Title = styled.header`
  font-size: 3rem;
  text-align: center;
`;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#fff' }}>
        <Title>Currency Tracker</Title>
      </Header>
      <Content style={{ margin: '32px' }}>
        <Chart />
      </Content>
    </Layout>
  );
}

export default App;
