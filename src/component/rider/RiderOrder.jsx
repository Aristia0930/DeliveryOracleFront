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
    const {user,setUser,userId,setUserId,shopId,setShopid,user_x,setX,user_y,setY}=useContext(AdminFlagContext)
    const [orderData,setOrderData]=useState([])
    const [mes, setMes] = useState("");
    // const [stompClient, setStompClient] = useState(null);
    const[data,setData]=useState([])
    const { stompClient, messages, sendMessage,setMessages } = useWebSocket();
    const orderList = async () => {

        try {
            const response = await axios.get('http://localhost:8080/rider/orderCall', {
                params: {id:userId}
            });
            console.log(response.data)
            setOrderData(response.data)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{

        orderList();

    },[])

    useEffect(() => {
        const handleMesUpdate = async () => {
            console.log("클릭")
            if (messages.content === "true") {
                console.log(messages.content)

                //바꿔야할것들
 
                const orderData = {
                    deliveryId:data.deliveryId,
                    orderId: data.orderId,
                    storeId: data.storeId,
                    storeName: data.storeName,
                    storeOwnerEmail: data.storeOwnerEmail,
                    riderId:userId, // 내꺼
                    distanceToStore:data.distanceToStore,
                    distanceToUser:data.distanceToUser,
                    deliveryPrice:data.deliveryPrice

                };

                try {
                    const response = await axios.post('http://localhost:8080/rider/order/finish', orderData);
                    console.log('Order response:', response.data);
                    if (response.data == 1) {
                        orderList();
                        setMessages("")
                        alert("배달 완료");
                    }
                } catch (error) {
                    console.error('Order error:', error);
                }
            } else {
                alert("현재 음식점이 열려있지 않습니다")
            }
        };

        if (messages.content) {
            handleMesUpdate();
        }
    }, [messages]);

    const handleOrder = async (s) => {
        if (stompClient) {
            setData(s)
            //from 에 나중에 이 상점 주인 아이디를 넣어야 하는데 이때 앞에서 상점 주인 아이디(이메일을)까지 받아와야한다.
            stompClient.send('/app/sendMessage', {}, JSON.stringify({ from: s.storeOwnerEmail, content: "message" }));
        }
    };

    return (
        <div>
        <Header />
            <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">
                        <Sidebar/>
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
                            <div id="main_container" key={groupIndex}>
                                {orderGroup.map((order, index) => (
                                    <RiderOrderList key={index} order={order} handleOrder={handleOrder}/>
                                ))}
                            </div>
                        ))}


                    </Col>
                </Row>
            </Container> 
        </div>
    );
};

export default RiderOrder;