import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import UserMenuCa from '../../component/user/UserMenuCa.jsx';
import Header from '../../component/common/Header.jsx';
import './UserMenu.css'
import TabMenu from '../../component/common/TabMenu.jsx';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";
import { useWebSocket } from "../../flag/WebSocketContext.jsx";
const UserSearchList = () => {
    const location = useLocation();
    const searchTerm = location.state?.searchTerm || -1;//검색정보
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user,user_x,setX,user_y,setY } = useContext(AdminFlagContext);
    const navigate = useNavigate();  
    const { stompClient, messages, setMessages, connected, setMessages2,messages2 } = useWebSocket();
    const [shopStates, setShopStates] = useState({});
    const [currentCheck, setCurrentCheck] = useState(null);

    useEffect(() => {
        if (!user_x) {
            alert("잘못된 접근입니다");
            navigate("/");
        }
    }, []);    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const rs = await axios.get("http://localhost:8080/search/searchList", {
                    params: {x:user_x,y:user_y,searchTerm:searchTerm}
                });
                setData(rs.data);
                console.log(rs.data)
            } catch (e) {
                setError("연결실패");
                console.log("연결실패", e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user_x,user_y,searchTerm]);

    useEffect(() => {
        const checkAllShops = async () => {
            for (let i = 0; i < data.length; i++) {
               const rs= await check(data[i]);
               console.log("값",rs)
               if (rs=='t'){
                console.log("존재함")
               setShopStates((prev) => ({
                ...prev,
                [data[i].owner_id]: true,
            }));}
            }
        };
        if (data.length > 0) {
            console.log("for문동작시작")
            checkAllShops();
        }
    }, [data]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;



    // Check shop status
    const check = async (array) => {
        setCurrentCheck(array); // Store the current item being checked

        try {
            const rs = await axios.get("http://localhost:8080/search/emailTrue", {
                params: { id: array.owner_id }
            });
            return rs.data
        } catch (e) {
            setError("연결실패");
            console.log("연결실패", e);
            return "e";
        }
    };

    //
    const check2=(value,array)=>{
       
        if (value){
            navigate("/UserShopDetail", { state: { data: array } });
        }
        else{
            alert("열려있지않습니다")
        }
    }

    return (
        <div>
            <Header />
            <TabMenu />

            <div className="container-custom">
                <p className="store-count">음식점 <span className="pd3">{data.length}곳</span>을 찾았습니다.</p>
                <p className="superlist"><a href="#" className="badge badge-danger">SuperList</a></p>
                <div className="big-column row">
                    {data.reduce((acc, da, index) => {
                        if (index % 2 === 0) {
                            acc.push([]);
                        }
                        acc[acc.length - 1].push(da);
                        return acc;
                    }, []).map((itemGroup, groupIndex) => (
                        <div className="row" key={groupIndex}>
                            {itemGroup.map((item, index) => (
                                <div className="col-md-6 mb-4" key={index} onClick={() => check2(shopStates[item.owner_id],item)}>
                                    <UserMenuCa data={item} shop={shopStates[item.owner_id]} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserSearchList;