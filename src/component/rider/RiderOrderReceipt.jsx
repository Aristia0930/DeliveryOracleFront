import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './headside/Header.jsx';
import Sidebar from './headside/Sidebar.jsx';
import RiderOrderReceiptList from './RiderOrderReceiptList';
import { AdminFlagContext } from "../../flag/Flag.jsx";

const RiderOrderReceipt = () => {
    const { userId } = useContext(AdminFlagContext);
    const [order, setOrder] = useState([]); // 주문 정보 상태를 설정합니다.

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/rider/riderReceipt", {
                    params: { riderId: userId }
                });

                if (response.status === 200) {
                    console.log("배달 완료 내역 조회 결과:", response.data);
                    setOrder(response.data);
                } else {
                    console.log("배달 완료 내역 없음");
                    setOrder([]); // 데이터가 없을 경우 빈 배열로 설정합니다.
                }
            } catch (error) {
                console.error("배달 완료 내역 조회 실패:", error);
                setOrder([]); // 에러 발생 시 빈 배열로 설정합니다.
            }
        };
        fetchData();
    }, [userId]);

    return (
        <div>
            <Header />
            <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">
                        <Sidebar />
                    </Col>
                    <Col xs={10} id="page-content-wrapper">
                        <h1>배달완료 내역 확인</h1>
                        <RiderOrderReceiptList orders={order} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RiderOrderReceipt;
