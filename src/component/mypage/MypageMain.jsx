import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { AdminFlagContext } from '../../flag/Flag.jsx';
import { useCookies } from 'react-cookie';
import Header from '../common/Header';
import './Mypage.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { MdOutlineMonetizationOn } from 'react-icons/md';
import { FaRankingStar } from "react-icons/fa6";

const MypageMain = () => {
    const navigate = useNavigate();
    const { user,setUser,userId,setUserId,shopId,setShopid } = useContext(AdminFlagContext); //현재 로그인된 사용자 정보 얻기 user 정보는 서버 요청 시 인증 토큰으로 사용됨.
    const [cookies] = useCookies(['jwtToken']);
    const [userInfo, setUserInfo] = useState(null);
    const [account,setAccount]=useState(0)
    const [amount,setamount]=useState()
    const [rankName,setRankName]=useState("")

    // useEffect는 컴포넌트가 처음 렌더링될 때, 그리고 user가 변경될 때마다 서버에서 사용자 정보를 가져와 userInfo를 업데이트 한다.
    // fetchUserInfo 함수는 axios.get을 사용하여 서버에 요청을 보내고
    // 서버에서 받은 응답 데이터를 setUserInfo(response.data)를 사용해 userInfo 상태로 저장해요.
    // userInfo가 업데이트되면 컴포넌트는 다시 렌더링되고, userInfo의 값이 화면에 표시돼요.

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/api/userinfo', {
                    headers: {
                        Authorization: `Bearer ${user}`
                    }
                });
                console.log(response.data);
                setUserInfo(response.data);
                setUserId(response.data.user_id)
            } catch (error) {
                console.log(error);
            }
        };


        fetchUserInfo();
    }, [user]);

    useEffect(()=>{
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8080/account/amount', {params: {id:userId}

                });
                setAccount(response.data)

            } catch (error) {
                console.log(error);
            }
        };
        const rank = async () => {
            try {
                const response = await axios.post('http://localhost:8080/account/rank', {id:userId}
                );
                console.log(response.data);
                if(response.status==200){
                    setRankName(response.data)
                }

   
            } catch (error) {
                console.log(error);
            }
        };

        if(userId){
            fetchUserInfo()
            rank()
        }

    },[userId])

    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    //충전하기
    const charge = async () => {
        try {
            const response = await axios.post('http://localhost:8080/account/deposit', {id:userId,price:amount

            });
            if (response.data==-1){
                handleCloseModal()
                alert("잘못된 입력입니다")
            }
            else{
            setAccount(response.data)
            handleCloseModal()
           alert(`${amount} 원충전완료`) 
           setamount(0)}
            

        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        // 숫자와 백스페이스만 허용
        if (/^\d*$/.test(value)) {
            setamount(value);
        }
    };

    return (
        <div>
            <Header />
            <Container className="mt-5">
            <Card>
                <Card.Body>
                    <Card.Title>User Information</Card.Title>
                    <div className="user-profile d-flex align-items-center mb-4">
                       
                       {userInfo ? (
                            
                            <div><h4 className='rank-padding'><FaRankingStar className='sidebar-icon2'/>등급 : {rankName}</h4>
                            <div className="d-flex align-items-center">
                                
                                <img src="/imgs/profile.jpg" alt="Profile" className="profile-img mr-3" />
                                <div>
                                    <p className="mb-0"><strong>이메일(Id): {userInfo.email}</strong></p>
                                    <p className="mb-0"><strong>닉네임: {userInfo.name}</strong></p>
                                    <p className="mb-0"><Link to="/MypageUserEdit">계정관리/수정</Link> </p>
                                    <p className="mb-0"><MdOutlineMonetizationOn className='sidebar-icon'/>잔액: {account} 원 / <Button className='charge-button' onClick={handleOpenModal}>충전하기</Button></p>
                                </div>
                               
                            </div>
                            
                            </div>
                            
                        ) : (
                            <p>Loading user info...</p>
                        )}
                        
                    </div> 
                    

                    <div className="navigation-boxes">
                        <Row className="text-center">
                            <Col xs={12} md={6} className="mb-3">
                                <div className="nav-box">
                                    <Link to="/MyorderDetails" className="nav-link">주문내역</Link>
                                </div>
                            </Col>
                            <Col xs={12} md={6} className="mb-3">
                                <div className="nav-box">
                                    <Link to="/MypageReview" className="nav-link">리뷰관리</Link>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Card.Body>
            </Card>
        </Container>


        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>충전하기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                    type="text"
                    onChange={handleChange}
                    placeholder="충전할 금액을 입력하세요"
                    style={{ width: '100%', padding: '10px' }}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    닫기
                </Button>
                <Button variant="primary" onClick={charge}>
                    충전하기
                </Button>
            </Modal.Footer>
        </Modal>

            {/* <div className="container mt-5">
                <Card>
                    <Card.Body>
                        <Card.Title>사용자 정보</Card.Title>
                        {userInfo ? (
                            <div>
                                <p><strong>user_id:</strong> {userInfo.user_id}</p>
                                <p><strong>이메일(id):</strong> {userInfo.email}</p>
                                <p><strong>Username:</strong> {userInfo.name}</p>
                            </div>
                        ) : (
                            <p>Loading user info...</p>
                        )}
                    </Card.Body>
                </Card>
            </div>
            <div id="main_container">
                <div className="container mt-5">
                    <Link className="item-list" to="/MyorderDetails">
                        <div className="item">
                            <p className="item-maintext">주문내역</p>
                        </div>
                    </Link>
                </div>
                <div className="container mt-5">
                    <Link className="item-list" to="/MypageComments">
                        <div className="item">
                            <p className="item-maintext">리뷰관리</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="container mt-5">
                <Card>
                    <Card.Body>
                        <Card.Title>업체이름</Card.Title>
                        // Add company name details here 
                    </Card.Body>
                </Card>
            </div> */}
        </div>
    );
};

export default MypageMain;