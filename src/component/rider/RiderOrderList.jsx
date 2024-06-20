import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";

const RiderOrderList = ({order,handleOrder}) => {


    const navigate = useNavigate();   
    const { user,user_x,setX,user_y,setY } = useContext(AdminFlagContext);


    const apiKey = "d75de8ff5686d9730ec2b1a409f5b7a6";
    useEffect(() => {
        if (!user) {
            alert("로그인해주세요");
            navigate("/");
        }
    }, [user, navigate]);

    // 카카오 API 호출
    useEffect(() => {
      const script = document.createElement("script");
      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
      document.head.appendChild(script);

      script.addEventListener("load", () => {
        window.kakao.maps.load(() => {
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(user_y, user_x), // 초기 중심 좌표 (위도, 경도)
            level: 7, // 지도 확대 레벨
          };
          const map = new window.kakao.maps.Map(container, options);
          var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
          
          // 마커가 표시될 위치입니다 
          const markerPosition = new window.kakao.maps.LatLng(user_y, user_x);
          const positions = [
            {
                title: '가게', 
                latlng:new window.kakao.maps.LatLng(order.store_y, order.store_x)
            },
            {
                title: '주문자', 
                latlng: new window.kakao.maps.LatLng(order.user_y, order.user_x)
            }
    
        ];

        for (var i = 0; i < positions.length; i ++) {
    
            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new window.kakao.maps.Size(24, 35); 
            
            // 마커 이미지를 생성합니다    
            var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize); 
            
            // 마커를 생성합니다
            var marker = new window.kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
                title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image : markerImage // 마커 이미지 
            });
        
        
          // 마커를 생성합니다
        //   const marker = new window.kakao.maps.Marker({
        //     position: markerPosition
        //   });

          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(map);
      }          
      const markera = new window.kakao.maps.Marker({
        position: markerPosition
      });
      markera.setMap(map);
    });
      });
    }, []);
    


    return (
        <div>
            <Card style={{ width: '25rem' }}>
                <Card.Body>
                    <Card.Title>가게이름 : {order.storeName}</Card.Title>
                    <Card.Text>가게까지 거리: {order.distanceToStore}km</Card.Text>
                    <Card.Text>가게에서 주문자 거리: {order.distanceToUser}km</Card.Text>
                    <Card.Text>배달가격: {order.deliveryPrice}</Card.Text>
                    <div id="map" style={{ width: "100%", height: "400px" }}></div>
                    <Button variant="primary" onClick={() => handleOrder(order)}>완료</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default RiderOrderList;