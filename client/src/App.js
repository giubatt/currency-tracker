import React from 'react';
import styled from 'styled-components'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.css'

import Chart from './components/Chart'

const Layout = styled.main`
  display: flex;
  justify-content: center;
  padding: 100px;
`

const Title = styled.header`
  font-size: 3rem;
  text-align: center;
`

function App() {
  return (
    <Layout>
      <Container>
        <Row>
          <Col>
            <Title>Currency Tracker</Title>
          </Col>
        </Row>
        <Chart></Chart>
      </Container>
    </Layout>
  );
}

export default App;
