import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { AdminFlagContext } from '../../flag/Flag.jsx';
import { useCookies } from 'react-cookie';
import Header from './headside/Header.jsx';


const ShopMyPage = () => {
    const navigate = useNavigate();
    const { user,setUser,userId,setUserId,shopId,setShopid } = useContext(AdminFlagContext); //현재 로그인된 사용자 정보 얻기 user 정보는 서버 요청 시 인증 토큰으로 사용됨.
    const [cookies] = useCookies(['jwtToken']);
    const [userInfo, setUserInfo] = useState(null);

    // useEffect는 컴포넌트가 처음 렌더링될 때, 그리고 user가 변경될 때마다 서버에서 사용자 정보를 가져와 userInfo를 업데이트 한다.
    // fetchUserInfo 함수는 axios.get을 사용하여 서버에 요청을 보내고
    // 서버에서 받은 응답 데이터를 setUserInfo(response.data)를 사용해 userInfo 상태로 저장해요.
    // userInfo가 업데이트되면 컴포넌트는 다시 렌더링되고, userInfo의 값이 화면에 표시돼요.

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/api/userinfo', {
                    headers: {
                        Authorization: `Bearer ${user}`
                    }
                });
                console.log(response.data);
                setUserInfo(response.data);
                setUserId(response.data.user_id)
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserInfo();
    }, [user]);

    return (
        <div>
            <Header/>
            <Container className="mt-5">
            <Card>
                <Card.Body>
                    <Card.Title>Shop Information</Card.Title>
                    <div className="user-profile d-flex align-items-center mb-4">
                        {userInfo ? (
                            <div className="d-flex align-items-center">
                                <img src="/imgs/profile.jpg" alt="Profile" className="profile-img mr-3" />
                                <div>
                                    <p className="mb-0"><strong>이메일(Id): {userInfo.email}</strong></p>
                                    <p className="mb-0"><strong>닉네임: {userInfo.name}</strong></p>
                                    <p className="mb-0"><Link to="/ShopMyPagemodify">계정관리/수정</Link> </p>
                                </div>
                            </div>
                        ) : (
                            <p>Loading user info...</p>
                        )}
                    </div>

                    <div className="navigation-boxes">
                        <Row className="text-center">
                            <Col xs={12} md={6} className="mb-3">
                                <div className="nav-box">
                                    <Link to="/MyorderDetails" className="nav-link">매출내역</Link>
                                </div>
                            </Col>
                            <Col xs={12} md={6} className="mb-3">
                                <div className="nav-box">
                                    <Link to="/MypageReview" className="nav-link">업체관리</Link>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Card.Body>
            </Card>
        </Container>
        </div>
    );
};

export default ShopMyPage;