import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserShopDetailMenu from './UserShopDetailMenu';

const UserShopDetail = () => {
    const location = useLocation();
    const datas = location.state.data;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [basket, setBasket] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rs = await axios.get("http://localhost:8080/search/menuList", {
                    params: { id: datas.store_id } //상점 아이디
                });
                setData(rs.data);
                console.log(rs.data);
            } catch (e) {
                setError("연결실패");
                console.log("연결실패", e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [datas]);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const price = basket.reduce((sum, item) => sum + item.menuPrice * item.quantity, 0);
            setTotalPrice(price);
        };

        calculateTotalPrice();
    }, [basket]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // 장바구니에 추가
    const handlePlus = (add) => {

        setBasket((prevBasket) => {
            const existingItem = prevBasket.find(menu => menu.menuName === add.menuName);
            if (existingItem) {
                return prevBasket.map(menu =>
                    menu.menuName === add.menuName ? { ...menu, quantity: menu.quantity + 1 } : menu
                );
            } else {
                const { menuName, menuPrice } = add;
                return [...prevBasket, { menuName, menuPrice, quantity: 1 }];
            }
        });
    };

    // 장바구니에서 수량 증가
    const increaseQuantity = (menuName) => {
        console.log("증가")
        setBasket((prevBasket) =>
            prevBasket.map(menu =>
                menu.menuName === menuName ? { ...menu, quantity: menu.quantity + 1 } : menu
            )
        );
    };

    // 장바구니에서 수량 감소
    const decreaseQuantity = (menuName) => {
        console.log("감소")
        setBasket((prevBasket) =>
            prevBasket.map(menu =>
                menu.menuName === menuName ? { ...menu, quantity: menu.quantity - 1 } : menu
            ).filter(menu => menu.quantity > 0) // 수량이 0인 항목은 제거
        );
    };

       // 주문하기 처리
       const handleOrder = async () => {
        const orderDetails = JSON.stringify(basket);

        const orderData = {
            customerId: 1, // 고객 ID, 실제로는 로그인된 사용자 ID를 사용해야 합니다.
            storeId: datas.store_id,
            orderDetails: orderDetails,
            totalPrice: totalPrice,
        };

        try {
            const response = await axios.post('http://localhost:8080/search/order', orderData);
            console.log('Order response:', response.data);
            // 주문 성공 처리 (예: 알림, 페이지 리디렉션 등)
            if(response.data==1){
                alert("주문성공")
            }
        } catch (error) {
            console.error('Order error:', error);
            // 주문 실패 처리
        }
    };

    return (
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
                                <Nav.Link href="#">Active</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-2">Link</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="disabled" disabled>
                                    Disabled
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        {data && data.map(array => (
                            <UserShopDetailMenu key={array.menuName} data={array} plus={handlePlus} />
                        ))}
                    </div>
                </div>
                <div className="section" id="c">
                    <h3 className='basketto'>장바구니</h3>
                    {basket.map((array) => (
                    <div className='basket' key={array.menuName}>
                        <div>{array.menuName}</div>
                        <div className='basket-data'>
                            <button onClick={() => decreaseQuantity(array.menuName)}>-</button>
                            {array.quantity}
                            <button onClick={() => increaseQuantity(array.menuName)}>+</button>
                            <div>{array.menuPrice * array.quantity} 원</div>
                        </div>
                    </div>
                ))}
                    <p onClick={handleOrder}>총금액 {totalPrice} 원 주문하기</p>
                </div>
            </div>
        </div>
    );
};

export default UserShopDetail;



// return (
//     <div>
//     <div id='detail_container'>
//         <div class="item-card">
//         <div class="item-image">
//             <img  src={`/imgs/${datas.store_image}`} width="70"/>
//         </div>
//         <div class="item-info">
//             <p>{datas.store_name}</p></div>
//         </div>
//         <div>장바구니</div>


//     </div>
//     <div id='detail_container'>

//     </div>

//     {data.map(array=>(
//         <div>
//             <p>{array.menuName}</p>
//             <img  src={`/imgs/${array.menuImage}`} width="70"/>
//             </div>

//         ))}
//     </div>
// );