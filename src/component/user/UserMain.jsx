import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import Slider from '../common/Slider.jsx';
import { AdminFlagContext } from "../../flag/Flag.jsx";
import { Carousel } from 'react-bootstrap';
import './UserMain.css';
import axios from 'axios';

const UserMain = () => {
    const { user_x, setRole, setX, user_y, setY, userId, setUserId, user, setUserDate } = useContext(AdminFlagContext);
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = user;
            console.log(token);
            console.log("jwt 불러오는 중");
            try {
                const response = await axios.get('http://localhost:8080/api/api/userinfo', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                console.log(response.data.user_id);
                setUserDate(response.data);
                setRole(response.data.authList[0].auth);
                setUserId(response.data.user_id);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserInfo();
    }, [user]);

    // 사용자 위치 정보 가져오기
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    setX(position.coords.longitude);
                    setY(position.coords.latitude);
                    setError(null);
                    console.log("위치", position.coords.longitude);
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
    }, [setX, setY]);

    return (
        <div>
            <Header />
            <div className="d-flex flex-column align-items-center" style={{ paddingTop: '35px' }}>
                <Carousel style={{ width: '50%' }}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="asset/Default_Vibrant_food_illustrations_in_digital_painting_showcas_2.jpg"
                            alt="First slide"
                            style={{ width: "800px", height: "300px" }}
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="asset/Default_Vibrant_stilllife_photographs_of_savory_meals_and_swee_1.jpg"
                            alt="Second slide"
                            style={{ width: "800px", height: "300px" }}
                        />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="asset/Default_Vibrant_food_illustrations_in_digital_painting_showcas_1.jpg"
                            alt="Third slide"
                            style={{ width: "800px", height: "300px" }}
                        />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <div id="main_container" className="container-fluid">
                <div className="row justify-content-center">
                    {[
                        { ca: 1, img: "/imgs/item01.png", text: "한식" },
                        { ca: 2, img: "/imgs/item02.png", text: "중식" },
                        { ca: 3, img: "/imgs/item03.png", text: "일식" },
                        { ca: 4, img: "/imgs/item05.png", text: "치킨" },
                        { ca: 5, img: "/imgs/item06.png", text: "피자" },
                        { ca: 6, img: "/imgs/chatbot.png", text: "AI추천"},
                    ].map((item, index) => (
                        <div className="col-md-4" key={index}>
                            <Link className="item-link" to={'/UserMenuCaList'} state={{ ca: item.ca, y: location.latitude, x: location.longitude }}>
                                <div className="menuitem box">
                                    <img src={item.img} alt={item.text} style={item.style || {}} />
                                    <p className="item-maintext">{item.text}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <div className="item-recommend">
                <div className="crossline"></div>
                <h1>오늘은 이거 어때요?</h1>
                <h1><strong><span className="highlight-style01">#인기메뉴★들</span></strong> 만 모았어요!</h1>
                <div className="item item01">
                    <div className="codepen-carousel">
                    <Slider/>
                    </div>
                </div>
            </div>

            <div className="crossline"></div>

            {/* 사용자 위치 정보 섹션
            <div className="user-location">
                <h1>User Location</h1>
                {error ? (
                    <p>Error: {error}</p>
                ) : (
                    <div>
                        <p>Latitude Y: {location.latitude}</p>
                        <p>Longitude X: {location.longitude}</p>
                    </div>
                )}
            </div> */}

        </div>
    );
};

export default UserMain;