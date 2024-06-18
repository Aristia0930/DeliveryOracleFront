import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './headside/Header';
import Sidebar from './headside/Sidebar';

const RiderMain = () => {

    //jwt 아이디 저장한다.

    //라이더 위치도 필요함.. 

    //새로운 db가 필요하네
    //라이더 주문 no
    //오더 주문no
    //내 아이디 no
    //시킨 사람 아이디
    //나와 상점 거리
    // 상점과 유저 거리
    //배달 가격
     
    //콜받기에서는
    //주문 오더와 상점 정보를 기반으로 나와의 거리 상점과의 거리 값과 배달 비 받아온다.
    //오더 주문no,시킨사람아이디 이렇게 4개 받아온다. 
    //배달비도 보여준다.(서비스단에서) 계산 돌리자

    //주문내역확인
    //서로간의 거리와
    //배달비 를 받는다.


    return (
        <div>
         <Header />
            <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">
                        <Sidebar/>
                    </Col>
                    <Col xs={10} id="page-content-wrapper">
 

                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RiderMain;