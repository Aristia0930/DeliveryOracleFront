// 리엑트 차트 그래프 예제 코드 
import Rechart from "./ShopRechart";
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from './headside/Header';
import Sidebar from './headside/Sidebar';

function App() {
    return (
        <div>
        <Header />
        <Container fluid>
            <Row>
                <Col xs={2} id="sidebar-wrapper">
                    <Sidebar/>
                </Col>
                <Col xs={10} id="page-content-wrapper">
                <div style={{ width: 1500, height: 1000,padding:"45px"}}>
                    <Rechart />
                </div>
                </Col>
            </Row>
        </Container>
    </div>

    );
}

export default App;