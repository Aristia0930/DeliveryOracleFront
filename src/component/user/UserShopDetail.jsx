import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';


const UserShopDetail = () => {
    const location = useLocation();
    const datas=location.state.data;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            //상점아이디 넘기기 (메뉴 불러오기 위해서)
            try {
                const rs = await axios.get("http://localhost:8080/search/menuList", {
                    params: { id: datas.store_id}
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
    }, [datas]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;



    return (
    <div className='mv'>
    {/* <div id='detail_container'>
        <div class="item-card">
        <div class="item-image">
            <img  src={`/imgs/${datas.store_image}`} width="70"/>
        </div>
        <div class="item-info">
            <p>{datas.store_name}</p></div>
        </div>
        <div>장바구니</div>


    </div>
    <div id='detail_container'>

    </div>

    {data.map(array=>(
        <div>
            <p>{array.menuName}</p>
            <img  src={`/imgs/${array.menuImage}`} width="70"/>
            </div>

        ))} */}
        
        
        <div class="container">
            <div class="left-sections">
                <div class="section" id="a">
                        <div class="item-card">
                        <div class="item-image">
                            <img  src={`/imgs/${datas.store_image}`} width="70"/>
                    </div>
                        <div class="item-info">
                            <p>{datas.store_name}</p></div>
                        </div>

                </div>
                <div class="section" id="b">
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
                {data.map(array=>(
                            <div>
                                <p>{array.menuName}</p>
                                <img  src={`/imgs/${array.menuImage}`} width="70"/>
                                </div>

                            ))}
                </div>
            </div>
            <div class="section" id="c">장바구니</div>
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