import React, { useEffect, useState } from 'react';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";
import { Link } from 'react-router-dom';

const TabMenu = () => {

  const { user_x, setRole,setX, user_y, setY ,userId,setUserId,user,setUser,setUserDate} = useContext(AdminFlagContext);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

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
        <Link className="nav-link active" to="/UserMenuCaList" state={{ ca: 1, y: location.latitude, x: location.longitude }}>한식</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/UserMenuCaList" state={{ ca: 2, y: location.latitude, x: location.longitude }}>중식</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/UserMenuCaList" state={{ ca: 3, y: location.latitude, x: location.longitude }}>일식</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/UserMenuCaList" state={{ ca: 4, y: location.latitude, x: location.longitude }}>치킨</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/UserMenuCaList" state={{ ca: 5, y: location.latitude, x: location.longitude }}>피자</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/UserMenuCaList" state={{ ca: 6, y: location.latitude, x: location.longitude }}>AI추천</Link>
      </li>
    </ul>
  );
};

export default TabMenu;
