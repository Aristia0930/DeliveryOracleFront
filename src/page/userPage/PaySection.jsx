import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { AdminFlagContext } from "../../flag/Flag.jsx";

const PaySection = ({ showModal, handleCloseModal, handleOrder, totalPrice }) => {
    const { setRole, user, setUserId, user_x, setX, user_y, setY } = useContext(AdminFlagContext);
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [address, setAddress] = useState("");
    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = user;
            try {
                const response = await axios.get('http://localhost:8080/api/api/userinfo', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setUserInfo(response.data);
                setUserId(response.data.user_id);
                setRole(response.data.authList[0].auth);
            } catch (error) {
                console.log(error);
                setError('Failed to fetch user information.');
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setX(position.coords.longitude);
                    setY(position.coords.latitude);
                    setError(null);
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

        fetchUserInfo();
    }, [user, setRole, setUserId, setX, setY]);

    useEffect(() => {
        if (user_x && user_y) {
            const fetchAddress = async () => {
                try {
                    // const apiKey = "d75de8ff5686d9730ec2b1a409f5b7a6"; 
                    // const response = await axios.get(`/api/kakaov2/local/geo/coord2address.json?input_coord=WGS84&x=${user_x}&y=${user_y}`, {
                    //     headers: {
                    //         Authorization: `KakaoAK ${apiKey}`,
                    //     },
                    // });
                    const response = await axios.get(`/api/kakao/v2/local/geo/coord2address.json`, {
                        params: {
                          input_coord: 'WGS84',
                          x: user_x,
                          y: user_y,
                        },
                      });
                      
                    const location = response.data.documents[0];
                    setAddress(`${location.address.region_1depth_name} ${location.address.region_2depth_name} ${location.address.region_3depth_name}`);
                } catch (error) {
                    console.log(error.message);
                }
            };

            fetchAddress();
        }
    }, [user_x, user_y]);

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>결제 정보 입력</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* 모달 내용 */}

                <h5>배달정보</h5>
                {userInfo ? (
                    <>
                    <p style={{ marginBottom: 0 }}><strong style={{color:'#32CD32'}}>{userInfo.name}</strong> 님의 현재 위치는</p>
                    <p><strong style={{color: '#32CD32'}}>{address}</strong> 입니다.</p>
                    </>
                ) : (
                    <p>사용자 정보를 불러오는 중입니다...</p>
                )}


                {error && <p className="text-danger">{error}</p>}

                {/* <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">전화번호</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">배달시 요청사항</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                </div> */}

                <h5>결제금액</h5>
                <div className="alert alert-info" role="alert">
                    <span className="alert-second">주문금액 {totalPrice}원</span>
                </div>

                <div className="input-group mb-3">
                    <select className="custom-select" id="inputGroupSelect01">
                        <option defaultValue>결제선택</option>
                        <option value="1">포인트결제</option>
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>취소하기</Button>
                <Button variant="success" onClick={handleOrder}>주문하기</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PaySection;
