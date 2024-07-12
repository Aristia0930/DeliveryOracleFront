import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserMenuCa from '../../component/user/UserMenuCa.jsx';
import Header from '../../component/common/Header.jsx';
import './UserMenu.css';
import TabMenu from '../../component/common/TabMenu.jsx';
import { useWebSocket } from "../../flag/WebSocketContext.jsx";
import { AdminFlagContext } from "../../flag/Flag.jsx";
import Spinner from 'react-bootstrap/Spinner';
import './UserAiList.css';
import Footer from '../../component/common/Footer.jsx';

const UserAiList = () => {
    const location = useLocation();
    const caInfo = location.state?.ca || -1; // 카테고리 정보
    const y = location.state?.y;
    const x = location.state?.x;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { stompClient, messages, setMessages, connected, setMessages2, messages2 } = useWebSocket();
    const navigate = useNavigate();
    const [shopStates, setShopStates] = useState({});
    const [currentCheck, setCurrentCheck] = useState(null);
    const { user, setUser, userId, setUserId, shopId, setShopid, userDate, setUserDate } = useContext(AdminFlagContext);
    const [count,setCount]=useState(0);
    useEffect(() => {

        if (!user) {
            alert("AI 기능사용을 위해 로그인해주세요!");
            navigate('/UserMain');
        }


        console.log("x", x);
        let counts=0
        const fetchData = async () => {
            try {
                const rs = await axios.get("http://localhost:8080/gemini/chat", {
                    params: { id: userId, x: x, y: y }
                });
                console.log("ai", rs);
                console.log("ai", rs.data);

                const initialShopStates = {};

                for (const menuName in rs.data) {
                    const stores = rs.data[menuName];
                    console.log(`${menuName}:`, stores); // 메뉴 이름과 관련 가게 목록을 출력

                    for (const store of stores) {
                        console.log(store); // 각 가게의 내용을 출력
                        initialShopStates[store.owner_id] = false;
                        counts=counts+1;
                    }
                }
                setShopStates(initialShopStates);
                setData(rs.data);
                setCount(counts)
            } catch (e) {
                setError("연결실패");
                console.log("연결실패", e);
            } finally {
                setLoading(false);
            }
      
        };

        fetchData();

    }, [userId, x, y]);


    useEffect(() => {
        const checkAllShops = async () => {
            const updatedShopStates = {};

            for (const menuName in data) {
                const stores = data[menuName];

                for (const store of stores) {
                    const rs = await check(store);
                    console.log("값", rs);
                    if (rs === 't') {
                        console.log("존재함");
                        updatedShopStates[store.owner_id] = true;
                    }
                }
            }

            setShopStates(prev => ({
                ...prev,
                ...updatedShopStates
            }));
        };

        if (Object.keys(data).length > 0) {
            console.log("for문동작시작");
            checkAllShops();
        }
    }, [data]);

    const check = async (array) => {
        setCurrentCheck(array); // Store the current item being checked

        try {
            const rs = await axios.get("http://localhost:8080/search/emailTrue", {
                params: { id: array.owner_id }
            });
            return rs.data;
        } catch (e) {
            setError("연결실패");
            console.log("연결실패", e);
            return "e";
        }
    };

    const check2 = (value, array) => {
        if (value) {
            navigate("/UserShopDetail", { state: { data: array } });
        } else {
            alert("열려있지않습니다");
        }
    };

    return (
        <div>
            <Header />
            <TabMenu />
            {loading ? 
            <div className="loading-container"> 
        <Spinner animation="border" variant="secondary" className='spinner-ai'/>
     <p className="loading-text">로딩 중...</p>
     </div> :
            <div className="container-custom" style={{ margin: '20px' }}>
                <p className="store-count">음식점 <span className="pd3">{count}곳</span>을 찾았습니다.</p>
                <hr/>
                <div className="row big-column">
                    {Object.keys(data).map((menuName, index) => (
                        <div className="col-md-6" key={index}>
                            <strong><h3>{menuName.substring(0, menuName.indexOf(':'))}</h3></strong>
                            <h5>{menuName.substring(menuName.indexOf(':') + 1)}</h5>
                            {data[menuName].map((store, storeIndex) => (
                                <div className="mb-4" key={storeIndex} onClick={() => check2(shopStates[store.owner_id], store)}>
                                    <UserMenuCa data={store} shop={shopStates[store.owner_id]} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>}
            <Footer/>
        </div>
    );
};

export default UserAiList;
