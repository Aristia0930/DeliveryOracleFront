import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";
import './UserMain.css'; // 스타일링을 위한 CSS 파일 import

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
            <div className="image-slide">
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src="asset/img/slide-image.png" alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="asset/img/slide-image.png" alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="asset/img/slide-image.png" alt="Third slide" />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
            <div id="main_container" className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <Link className="item-link" to={{ pathname: '/UserMenuCaList', state: { ca: 1, y: location.latitude, x: location.longitude } }}>
                            <div className="item">
                                <p className="item-maintext">한식</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <div className="item">
                            <p className="item-maintext">중식</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="item">
                            <p className="item-maintext">일식</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="item-recommend">
                <div className="crossline"></div>
                <h1>오늘은 이거 어때요?</h1>
                <div className="item item01">
                    <h1>맛있는 것만 <span className="highlight-style01"><strong>#덮고<span className="highlight-style02">♬</span>비벼요!</strong></span></h1>
                    <div className="codepen-carousel">
                        <div className="hideLeft">
                            <img src="asset/img/item-recommend.png" alt="item-recommend" />
                        </div>
                        <div className="prevLeftSecond">
                            <img src="asset/img/item-recommend.png" alt="item-recommend" />
                        </div>
                        <div className="prev">
                            <img src="asset/img/item-recommend.png" alt="item-recommend" />
                        </div>
                        <div className="selected">
                            <img src="asset/img/item-recommend.png" alt="item-recommend" />
                        </div>
                        <div className="next">
                            <img src="asset/img/item-recommend.png" alt="item-recommend" />
                        </div>
                        <div className="nextRightSecond">
                            <img src="asset/img/item-recommend.png" alt="item-recommend" />
                        </div>
                        <div className="hideRight">
                            <img src="asset/img/item-recommend.png" alt="item-recommend" />
                        </div>
                    </div>
                </div>
                <div className="item item02">
                    <h1><strong><span className="highlight-style01">#인기메뉴★들</span></strong> 만 모았어요!</h1>
                    <div className="codepen-carousel">
                        <div className="hideLeft">
                            <img src="asset/img/item-recommend.png" alt="item-recommend" />
                        </div>
                        <div className="prevLeftSecond">
                            <img src="asset/img/item-recommend.png" alt="item-recommend" />
                        </div>
                        <div className="prev">
                            <img src="asset/img/item-recommend.png" alt="item-recommend" />
                        </div>
                        <div className="selected">
                            <img src="asset/img/item-recommend.png" alt="item-recommend" />
                        </div>
                        <div className="next">
                            <img src="asset/img/item-recommend.png" alt="item-recommend" />
                        </div>
                        <div className="nextRightSecond">
                            <img src="asset/img/item-recommend.png" alt="item-recommend" />
                        </div>
                        <div className="hideRight">
                            <img src="asset/img/item-recommend.png" alt="item-recommend" />
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
