import React, { useEffect, useState } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";
import TabMenu from '../commom/TabMenu.jsx';
import Header from '../commom/Header.jsx';
import { useWebSocket  } from "../../flag/WebSocketContext.jsx";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import StarRating from './StartRating.jsx';

const UserShopComment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let datas = location.state.data || -1;
    const [comment, setComment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [basket, setBasket] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { user, setUser, user_x, setX, user_y, setY } = useContext(AdminFlagContext);
    const [mes, setMes] = useState("");
    const [useid, setUseid] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const { stompClient, messages, sendMessage, setMessages, connected } = useWebSocket();

    useEffect(() => {

        const fetchData = async () => {
            console.log(datas.store_id);
            try {
                const rs = await axios.get("http://localhost:8080/comments/list", {
                    params: { store_id: datas.store_id }
                });
                setComment(rs.data);
                console.log(rs.data);
            } catch (e) {
                setError("연결실패");
                console.log("연결실패", e);
            } finally {
                setLoading(false);
            }
        };

        fetchData()

    }, [datas]);


  


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
                                    <Nav.Link eventKey="link-1"><Link to={`/UserShopComment`} state={{ data: datas }}>댓글</Link></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-2"><Link to={`/UserShopIntroduce`} state={{ data: datas }}>매장소개</Link></Nav.Link>
                                </Nav.Item>

                            </Nav>
                            <div>

                                {comment.map((array,index)=>(
                            <div>
                                        {array.depth==1 && <div>
                                            <Card style={{ width: '100%', margin: '10px' }}>
                                                <Card.Body>
                                                    <Card.Title>작성자:{array.authorName} <StarRating initialRating={array.rating}></StarRating></Card.Title>

                                                    <Card.Text>
                                                        {array.content}
                                                    </Card.Text>
                                    
                                                </Card.Body>
                                            </Card>
                                        </div>}
                                        {array.depth==2 && 
                                        <div  style={{ position: 'relative' }}>
                                                    <div
                                                        style={{
                                                            position: 'absolute',
                                                            top: '-10px',
                                                            left: '80px',
                                                            width: '0',
                                                            height: '0',
                                                            borderLeft: '10px solid transparent',
                                                            borderRight: '10px solid transparent',
                                                            borderBottom: '10px solid #ccc', // 화살표 색상
                                                        }}
                                                    ></div>
                                          <Card style={{ width: '90%', margin: '15px 0', marginLeft: '80px' }}>
                                                <Card.Body>
                                                    <Card.Title>작성자:{array.authorName} </Card.Title>

                                                    <Card.Text>
                                                        {array.content}
                                                    </Card.Text>
                                    
                                                </Card.Body>
                                            </Card>
                                        </div>}

                                
                            </div>))}
                                
            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserShopComment;