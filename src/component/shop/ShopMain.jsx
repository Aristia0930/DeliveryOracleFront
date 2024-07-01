import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Container, Row, Col, Button, Card, Carousel } from 'react-bootstrap';
import Header from './headside/Header';
import Sidebar from './headside/Sidebar';
import ShopJoin from './ShopJoin';
import ShopMenu from './ShopMenu';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";


const ShopMain = () => {
    const navigate = useNavigate();    

    //상점아이디
    const {role, setRole,user,setUser,userId,setUserId,shopId,setShopid,userDate, setUserDate}=useContext(AdminFlagContext)
    //쿠키에 저장된 jwt를 기반으로 아이디값 받아오기
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
    


    

    

// const shoppMenu=async(e)=>{
//     e.preventDefault()
//     //아이디값을 넘겨서 그 아이디값의 상점 주인이 승인 되었는 확인하는 절차

//     //상점 아이디값이 받아오는
//     try {
//         const rs = await axios.get("http://localhost:8080/store/menuRs", {
//             params: { id: userId }
//         });
//         if (rs.status === 200) {
//             console.log(rs.data)
//             if (rs.data != -1) {
//                 navigate("/ShopMenu", { state: { approvalStatus: rs.data } });
//             } else {
//                 console.log("승인받지 못함");
//             }
//         }
//     } catch (e) {
//         console.log("연결실패", e);
//     }}

//     const shopOrder=async(e)=>{
//         e.preventDefault()
//         //아이디값을 넘겨서 그 아이디값의 상점 주인이 승인 되었는 확인하는 절차
    
//         //상점 아이디값이 받아오는
    

//             navigate("/ShopOrder", {state : {id:userId}})




// }
return (
    <div>
        <Header />
        <Container fluid>
            <Row>
                <Col xs={2} id="sidebar-wrapper">
                    <Sidebar id={userId} />
                </Col>
                <Col xs={10} id="page-content-wrapper">
                    <div className="d-flex flex-column align-items-center" style={{ paddingTop: '35px' }}>
                        <Carousel style={{ width: '75%' }}>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://via.placeholder.com/800x400"
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>First slide label</h3>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://via.placeholder.com/800x400"
                                    alt="Second slide"
                                />
                                <Carousel.Caption>
                                    <h3>Second slide label</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://via.placeholder.com/800x400"
                                    alt="Third slide"
                                />
                                <Carousel.Caption>
                                    <h3>Third slide label</h3>
                                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                        <Row className="mt-4 w-100">
                            <Col md={4} className="d-flex justify-content-center mb-4">
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Sales Today" />
                                    <Card.Body>
                                        <Card.Title>Sales Today</Card.Title>
                                        <Card.Text>
                                            {/* Replace with dynamic data */}
                                            $1000
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} className="d-flex justify-content-center mb-4">
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Pending Orders" />
                                    <Card.Body>
                                        <Card.Title>Pending Orders</Card.Title>
                                        <Card.Text>
                                            {/* Replace with dynamic data */}
                                            5
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} className="d-flex justify-content-center mb-4">
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Shop Ratings" />
                                    <Card.Body>
                                        <Card.Title>Shop Ratings</Card.Title>
                                        <Card.Text>
                                            {/* Replace with dynamic data */}
                                            4.5/5
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
);
};

export default ShopMain;