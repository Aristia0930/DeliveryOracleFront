import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Card from 'react-bootstrap/Card';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";
import { useCookies } from 'react-cookie';
import { useWebSocket  } from "../../flag/WebSocketContext.jsx";
import Header from './Header.jsx';
import Footer from '../common/Footer.jsx';


const Main = () => {
    const navigate = useNavigate();
    const {user,setUser,userInfo, setUserInfo}=useContext(AdminFlagContext)
    // const [cookies] = useCookies(['jwtToken']);
    const { stompClient, messages, sendMessage ,setMessages} = useWebSocket();

    //유저로그인 페이지이동 
    const userbutton=(e)=>{
        e.preventDefault()
         navigate("/UserMain")

    }

    //업체 페이지 이동
    const shopbutton=(e)=>{
        e.preventDefault()
       navigate("/ShopMain")

    }
    //관리자 페이지 이동

    const managerbutton=(e)=>{
        e.preventDefault()
       navigate("/ManagerMain")

    }

    //라이더 페이지이동
    const riderbutton=(e)=>{
        e.preventDefault()
       navigate("/RiderMain")

    }

    return (
        <div>
            <Header />
            <div id="main_container3">
                <div className="item-list" onClick={userbutton}>
                    <div className="item">
                        <img src="asset/king.png" width={100} />
                        <p className="item-maintext">유저 페이지</p>
                    </div>
                </div>
                <div className="item-list" onClick={shopbutton}>
                    <div className="item">
                        <img src="asset/waiter.png" width={100} />
                        <p className="item-maintext">업체 페이지</p>
                    </div>
                </div>
                <div className="item-list" onClick={managerbutton}>
                    <div className="item">
                        <img src="asset/admin.png" width={100} />
                        <p className="item-maintext">관리자 페이지</p>
                    </div>
                </div>
                <div className="item-list" onClick={riderbutton}>
                    <div className="item">
                        <img src="asset/rider.png" width={100} />
                        <p className="item-maintext">라이더 페이지</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Main;


