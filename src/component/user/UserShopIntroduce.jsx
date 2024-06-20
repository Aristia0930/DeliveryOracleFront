import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";
import TabMenu from '../commom/TabMenu.jsx';
import Header from '../commom/Header.jsx';

const UserShopIntroduce = () => {
    const location = useLocation();
    const datas = location.state.data || -1;
    const { user } = useContext(AdminFlagContext);
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=d75de8ff5686d9730ec2b1a409f5b7a6Y`;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                // Kakao 지도 SDK 로드 완료 시 실행될 콜백 함수
                const mapContainer = document.getElementById('map');
                const options = {
                    center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                    level: 3 // 지도의 확대 레벨
                };
                const map = new window.kakao.maps.Map(mapContainer, options);
                
                // 마커를 추가하거나 다른 초기화 작업을 수행할 수 있습니다.

                // Clean up
                return () => {
                    // 컴포넌트 언마운트 시 스크립트 제거
                    document.head.removeChild(script);
                };
            });
        };

        return () => {
            // 컴포넌트 언마운트 시 스크립트 제거
            document.head.removeChild(script);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/api/userinfo', {
                    headers: {
                        Authorization: `Bearer ${user}`
                    }
                });
                console.log(response.data);
                console.log(response.data.user_id);

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

    }, [user]);

    return (
        <div>
            <Header />
            <TabMenu />
            <div className='mv'>
                <div className="container">
                    <div className="left-sections">
                        <div className="section" id="a">
                            <div className="item-card">
                                <div className="item-image">
                                    <img src={`/imgs/${datas.store_image}`} width="70" alt="Store" />
                                </div>
                                <div className="item-info">
                                    <p>{datas.store_name}</p>
                                </div>
                            </div>
                        </div>
                        <div className="section" id="b">
                            <Nav fill variant="tabs" defaultActiveKey="/home">
                                <Nav.Item>
                                    <Nav.Link href="#"><Link to={`/UserShopDetail`} state={{ data: datas }}>메뉴</Link></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-1">댓글</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-2"><Link to={`/UserShopIntroduce`} state={{ data: datas }}>매장소개</Link></Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <div>
                                <p><strong>설명:</strong> {datas.store_description}</p>
                                <p><strong>주소:</strong> {datas.store_address}</p>
                                <div>
            <div id="map" ></div>
        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserShopIntroduce;
