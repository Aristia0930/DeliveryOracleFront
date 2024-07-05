import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Header from './headside/Header';
import Dashboard from './headside/Dashboard';
import Sidebar from './headside/Sidebar';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";

const ManagerMain = () => {
    const {role, setRole,user,setUser,userId,setUserId,shopId,setShopid,userDate, setUserDate}=useContext(AdminFlagContext)
    const navigate = useNavigate();    
    const [data,setData]=useState([]);
    useEffect(() => {
        const fetchUserInfo = async () => {

            const token = user
            console.log(token)
            console.log("jwt 불러오는 중")
            try {
                const response = await axios.get('http://localhost:8080/api/api/userinfo', {
                    headers: { 
                        Authorization: `Bearer ${token}`
                   }
                });
                console.log(response.data);
                console.log(response.data.user_id);
                setUserDate(response.data)
                setRole(response.data.authList[0].auth)
                // setUserDate(response.data.user_id)
                //유저아이디를 플래그에 저장
                setUserId(response.data.user_id)
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserInfo();
    }, [user]);

    useEffect(()=>{
        const todayData = async () => {

            try {
                const response = await axios.get('http://localhost:8080/admin/Today');
                console.log("오늘데이터",response.data)

                setData(response.data)
            } catch (error) {
                console.log(error);
            }
        };

        
        if(user){
            todayData();

        }

    },[role])
    
    const approve=(e)=>{
        e.preventDefault()
        navigate("/ManagerApprove")
    }
    return (
        <div>
            <Header />
            <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">
                        <Sidebar />
                    </Col>
                    <Col xs={10} id="page-content-wrapper">
                    <Row className="mt-4">
                            <Col md={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>총 사용자 수</Card.Title>
                                        <Card.Text>
                                            {data.visitorCount}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>총 주문 수</Card.Title>
                                        <Card.Text>
                                        {data.orderCount}
                            
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>오늘의 매출</Card.Title>
                                        <Card.Text>
                                        {data.totalPriceSum}
                                
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ManagerMain;