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

    // if (loading) return <div className="loading-container"> 
    //     <Spinner animation="border" variant="secondary" className='spinner-ai'/>
    //  <p className="loading-text">로딩 중...</p>
    //  </div>;
    // if (error) return <div>{error}</div>;

    // Check shop status
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
                <p className="superlist"><a href="#" className="badge badge-danger">SuperList</a></p>
                <div className="big-column row">
                    {Object.keys(data).reduce((acc, menuName, index) => {
                        const stores = data[menuName];
                        if (index % 2 === 0) {
                            acc.push([]);
                        }
                        acc[acc.length - 1].push({ menuName, stores });
                        return acc;
                    }, []).map((itemGroup, groupIndex) => (
                        <div className="row" key={groupIndex}>
                            {itemGroup.map((item, index) => (
                                <div>
                                <h3>{item.menuName.substring(0,item.menuName.indexOf(':'))}</h3>
                                <h5>{item.menuName.substring(item.menuName.indexOf(':')+1)}</h5>
                                    {item.stores.map((store, storeIndex) => (
                                        <div className="col-md-6 mb-4" key={index} onClick={() => check2(shopStates[store.owner_id], store)}>
                                        <UserMenuCa key={storeIndex} data={store} shop={shopStates[store.owner_id]} />
                                     </div>))}
                               
                            </div>))}
                        </div>
                    ))}
                </div>
            </div>}
        </div>
    );
};

export default UserAiList;
