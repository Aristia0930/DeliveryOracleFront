import React, { useEffect, useRef, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../component/common/Header.jsx';
import { AdminFlagContext } from "../../flag/Flag.jsx";
import { Carousel } from 'react-bootstrap';
import './UserMain.css';
// import '../common/Slider.css'
import '../../component/common/Slider.css'
import axios from 'axios';
import Footer from '../../component/common/Footer.jsx';

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

    // 밑에 슬라이더 코드

    const carouselRef = useRef(null);
    const [selectedIdx, setSelectedIdx] = useState(3);

    const moveToSelected = (element) => {
        let idx;

        if (element === "next") {
            idx = selectedIdx + 1;
        } else if (element === "prev") {
            idx = selectedIdx - 1;
        } else {
            idx = element;
        }

        if (idx < 0) {
            idx = carouselRef.current.children.length - 1;
        } else if (idx >= carouselRef.current.children.length) {
            idx = 0;
        }

        setSelectedIdx(idx);
    };

    const handleKeydown = (e) => {
        if (e.key === "ArrowLeft") {
            moveToSelected('prev');
        } else if (e.key === "ArrowRight") {
            moveToSelected('next');
        }
    };

    useEffect(() => {
        const currentCarousel = carouselRef.current;
        if (currentCarousel) {
            currentCarousel.addEventListener('keydown', handleKeydown);
            return () => {
                currentCarousel.removeEventListener('keydown', handleKeydown);
            };
        }
    }, [selectedIdx]);

    const getClass = (index) => {
        if (index === selectedIdx) return 'selected';
        if (index === selectedIdx - 1) return 'prev';
        if (index === selectedIdx + 1) return 'next';
        if (index === selectedIdx - 2) return 'prevLeftSecond';
        if (index === selectedIdx + 2) return 'nextRightSecond';
        return index < selectedIdx ? 'hideLeft' : 'hideRight';
    };

    const imagePaths = [
        "asset/bulgogi.jpg",
        "asset/pajeon.jpg",
        "asset/steak.jpg",
        "asset/hamburger.jpg",
        "asset/chicken.jpg",
        "asset/pizza.jpg",
        "asset/salad.jpg"
    ];

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
                            style={{ width: "800px", height: "600px" }}
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
                            style={{ width: "800px", height: "600px" }}
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
                            style={{ width: "800px", height: "600px" }}
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
                        { ca: 1, img: "/imgs/item01.png", text: "한식" ,url:"/UserMenuCaList"},
                        { ca: 2, img: "/imgs/item02.png", text: "중식" ,url:"/UserMenuCaList"},
                        { ca: 3, img: "/imgs/item03.png", text: "일식" ,url:"/UserMenuCaList"},
                        { ca: 4, img: "/imgs/item05.png", text: "치킨" ,url:"/UserMenuCaList"},
                        { ca: 5, img: "/imgs/item06.png", text: "피자" ,url:"/UserMenuCaList"},
                        { ca: 6, img: "/imgs/chatbot.png", text: "AI추천",url:"/UserAiList"},
                    ].map((item, index) => (
                        <div className="col-md-4" key={index}>
                            <Link className="item-link" to={item.url} state={{ ca: item.ca, y: location.latitude, x: location.longitude }}>
                                <div className="menuitem box">
                                    <img src={item.img} alt={item.text} style={item.style || {}} />
                                    <p className="item-maintext">{item.text}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>


            <div className="crossline"></div>
            <div className="item-recommend">
            <div>
                <h1>오늘은 이거 어때요?</h1>
                <h1><strong><span className="highlight-style01">#인기메뉴★들</span></strong> 만 모았어요!</h1>
            </div>
            </div>
            <div>
                <div className="slider-container">
                    <div id="carousel" className="codepen-carousel" ref={carouselRef} tabIndex="0" style={{ outline: 'none' }}>
                        {imagePaths.map((path, index) => (
                            <div
                                key={index}
                                className={getClass(index)}
                                onClick={() => moveToSelected(index)}
                            >
                                <img src={path} alt={`추천 ${index}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="crossline"></div>
            <div className="ft"></div>
            <Footer />
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
            </div>*/}

        </div>
    );
};

export default UserMain;