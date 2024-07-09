import React, { useEffect, useState } from 'react';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";
import { Link, useLocation } from 'react-router-dom';

const TabMenu = () => {

  const { user_x, setRole,setX, user_y, setY ,userId,setUserId,user,setUser,setUserDate} = useContext(AdminFlagContext);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const currentLocation = useLocation();
  const handleTabClick = (ca) => {
    console.log("실행버튼",ca)
    setActiveTab(ca); // 탭이 클릭했을때 nav-link active 활성화

  };
  useEffect(() => {
    const path = currentLocation.pathname;
    if (path.includes('/UserMenuCaList')) {
      const tab = new URLSearchParams(currentLocation.search).get('ca');
      setActiveTab(Number(tab));
    } else if (path.includes('/UserAiList')) {
      setActiveTab(6);
    }
  }, []);


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

  return (
    <ul className="nav nav-tabs nav-menu">
      <li className="nav-item">
        <Link className={`nav-link ${activeTab === 1 ? 'active' : ''}`} to="/UserMenuCaList" state={{ ca: 1, y: location.latitude, x: location.longitude }} onClick={() => handleTabClick(1)}>한식</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${activeTab === 2 ? 'active' : ''}`} to="/UserMenuCaList" state={{ ca: 2, y: location.latitude, x: location.longitude }} onClick={() => handleTabClick(2)}>중식</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${activeTab === 3 ? 'active' : ''}`} to="/UserMenuCaList" state={{ ca: 3, y: location.latitude, x: location.longitude }} onClick={() => handleTabClick(3)}>일식</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${activeTab === 4 ? 'active' : ''}`} to="/UserMenuCaList" state={{ ca: 4, y: location.latitude, x: location.longitude }} onClick={() => handleTabClick(4)}>치킨</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${activeTab === 5 ? 'active' : ''}`} to="/UserMenuCaList" state={{ ca: 5, y: location.latitude, x: location.longitude }} onClick={() => handleTabClick(5)}>피자</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${activeTab === 6 ? 'active' : ''}`} to="/UserAiList" state={{ ca: 6, y: location.latitude, x: location.longitude }} onClick={() => handleTabClick(6)}>AI추천</Link>
      </li>
    </ul>
  );
};

export default TabMenu;