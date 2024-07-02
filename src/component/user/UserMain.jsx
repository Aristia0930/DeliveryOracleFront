import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";
import { Container, Row, Col, Button, Card, Carousel } from 'react-bootstrap';
import './UserMain.css';

const UserMain = () => {
    const { user_x, setX, user_y, setY } = useContext(AdminFlagContext);
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
                    console.log("위치",position.coords.longitude)
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
    }, []);

    // 사용자 로그인 페이지로 이동
    const userlogin = (e) => {
        e.preventDefault();
        navigate("/UserLogin");
    }

    // 사용자 회원가입 페이지로 이동
    const userjoin = (e) => {
        e.preventDefault();
        navigate("/UserJoin");
    }

    return (
        <div>
            <Header />
            <div className="d-flex flex-column align-items-center" style={{ paddingTop: '35px' }}>
                        <Carousel style={{ width: '50%' }}>
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
                    </div>
            <div id="main_container" className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <Link className="item-link" to={'/UserMenuCaList'} state={{ ca: 1, y: location.latitude, x: location.longitude }}>
                            <div className="menuitem">
                                <img src="/imgs/item01.png" alt="Korean Food" />
                                <p className="item-maintext">한식</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <div className="menuitem">
                            <img src="/imgs/item02.png" alt="Chinese Food" />
                            <p className="item-maintext">중식</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="menuitem">
                            <img src="/imgs/item03.png" alt="Japan Food" />
                            <p className="item-maintext">일식</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="menuitem">
                            <img src="/imgs/item05.png" alt="Chicken" />
                            <p className="item-maintext">치킨</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="menuitem">
                            <img src="/imgs/item06.png" alt="Pizza" />
                            <p className="item-maintext">피자</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="menuitem">
                            <img src="/imgs/item07.png" alt="Bunsik" />
                            <p className="item-maintext">분식</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="item-recommend">
                <div className="crossline"></div>
                <h1>오늘은 이거 어때요?</h1>
                <div className="item item01">
                    <div className="codepen-carousel">
                        <div className="hideLeft">
                            <img src="https://via.placeholder.com/200x100" alt="item-recommend" />
                        </div>
                        <div className="prevLeftSecond">
                            <img src="https://via.placeholder.com/200x100" alt="item-recommend" />
                        </div>
                        <div className="prev">
                            <img src="https://via.placeholder.com/200x100" alt="item-recommend" />
                        </div>
                        <div className="selected">
                            <img src="https://via.placeholder.com/200x100" alt="item-recommend" />
                        </div>
                        <div className="next">
                            <img src="https://via.placeholder.com/200x100" alt="item-recommend" />
                        </div>
                        <div className="nextRightSecond">
                            <img src="https://via.placeholder.com/200x100" alt="item-recommend" />
                        </div>
                        <div className="hideRight">
                            <img src="https://via.placeholder.com/200x100" alt="item-recommend" />
                        </div>
                    </div>
                </div>
                <div className="item item02">
                    <h1><strong><span className="highlight-style01">#인기메뉴★들</span></strong> 만 모았어요!</h1>
                    <div className="codepen-carousel">
                        <div className="hideLeft">
                            <img src="https://via.placeholder.com/200x100" alt="item-recommend" />
                        </div>
                        <div className="prevLeftSecond">
                            <img src="https://via.placeholder.com/200x100" alt="item-recommend" />
                        </div>
                        <div className="prev">
                            <img src="https://via.placeholder.com/200x100" alt="item-recommend" />
                        </div>
                        <div className="selected">
                            <img src="https://via.placeholder.com/200x100" alt="item-recommend" />
                        </div>
                        <div className="next">
                            <img src="https://via.placeholder.com/200x100" alt="item-recommend" />
                        </div>
                        <div className="nextRightSecond">
                            <img src="https://via.placeholder.com/200x100" alt="item-recommend" />
                        </div>
                        <div className="hideRight">
                            <img src="https://via.placeholder.com/200x100" alt="item-recommend" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 사용자 위치 정보 섹션 */}
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
            </div>
        </div>
    );
};

export default UserMain;