import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../component/rider/headside/Header.jsx';
import Sidebar from '../../component/rider/headside/Sidebar.jsx';
import Footer from '../../component/common/Footer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AdminFlagContext } from "../../flag/Flag.jsx";

const RiderMain = () => {
    const { setRole, user, setUser, userId, setUserId, shopId, setShopId, user_x, setX, user_y, setY } = useContext(AdminFlagContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = user;
            try {
                const response = await axios.get('http://localhost:8080/api/api/userinfo', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserId(response.data.user_id);
                setRole(response.data.authList[0].auth);
            } catch (error) {
                console.log(error);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setX(position.coords.longitude);
                    setY(position.coords.latitude);
                    setError(null);
                },
                (error) => {
                    setError(error.message);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }

        fetchUserInfo();
    }, []);

    useEffect(() => {
        const script = document.createElement("script");
        const apiKey = "d75de8ff5686d9730ec2b1a409f5b7a6";
        script.async = true;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;

        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById("map");
                if (container) {
                    const options = {
                        center: new window.kakao.maps.LatLng(user_y, user_x),
                        level: 7,
                    };
                    const map = new window.kakao.maps.Map(container, options);
                    const markerPosition = new window.kakao.maps.LatLng(user_y, user_x);

                    const marker = new window.kakao.maps.Marker({
                        position: markerPosition
                    });

                    marker.setMap(map);
                }
            });
        };

        script.onerror = () => {
            console.error("Kakao Maps script failed to load.");
        };

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script); // 컴포넌트가 언마운트될 때 스크립트 제거
        };
    }, [user_x, user_y]);
    const [x,setXx]=useState();
    const [y,setYy]=useState();
    const xybutton=()=>{
      setX(x)
      setY(y)
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
                    
                        <h1>메인</h1>
                        <h3>현재 x : {user_x} / 현재 y : {user_y} </h3>
                        <input type='text' placeholder="x좌표" onChange={(e)=>setXx(e.target.value)}></input>
                        <input type='text' placeholder="y좌표"  onChange={(e)=>setYy(e.target.value)}></input>
                        <button onClick={xybutton}> 좌표새로지정</button>

                        <div id="main_container">
                        <Card style={{ width: '45rem' }}>
                            <Card.Body>
                                <Card.Title>현재 내위치</Card.Title>
                                <div id="map" style={{ width: "100%", height: "600px" }}></div>
                            </Card.Body>
                        </Card></div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
};

export default RiderMain;
