import React, { useEffect, useState } from 'react';
import Header from './headside/Header';
import Sidebar from './headside/Sidebar';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import RiderOrderList from './RiderOrderList.jsx';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useWebSocket  } from "../../flag/WebSocketContext.jsx";
const RiderOrder = () => {
    const { user, userId } = useContext(AdminFlagContext);
    const [orderData, setOrderData] = useState([]);
    const { stompClient, messages, setMessages } = useWebSocket();

    useEffect(() => {
        const orderList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/rider/orderCall', {
                    params: { id: userId }
                });
                console.log(response.data);
                setOrderData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        orderList();
    }, [userId]);

    const handleOrder = async (s) => {
        if (stompClient) {
            stompClient.send('/app/sendMessage', {}, JSON.stringify({ from: s.storeOwnerEmail, content: "message" }));
        }
    };

    return (
        <div>
            <Header />
            <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">
                        <Sidebar />
                    </Col>
                    <Col xs={10} id="page-content-wrapper">
                        {orderData.reduce((acc, order, index) => {
                            // Every 4th item or the first item, create a new container
                            if (index % 4 === 0) {
                                acc.push([]);
                            }
                            // Add the current menu item to the last container
                            acc[acc.length - 1].push(order);
                            return acc;
                        }, []).map((orderGroup, groupIndex) => (
                            
                            <div id={`order-group-${groupIndex} `} key={groupIndex}>
                                <div id="main_container">
                                {orderGroup.map((order, index) => (
                                    
                                    <RiderOrderList key={order.deliveryId} order={order} handleOrder={handleOrder} keyProp={`order-${order.deliveryId}`} />
                                ))}
                            </div></div>
                        ))}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RiderOrder;