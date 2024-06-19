import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { AdminFlagContext } from '../../flag/Flag.jsx';
import { useCookies } from 'react-cookie';
import Header from './headside/Header.jsx';

const MypageMain = () => {
    const navigate = useNavigate();
    const { user,setUser,userId,setUserId,shopId,setShopid } = useContext(AdminFlagContext); //현재 로그인된 사용자 정보 얻기 user 정보는 서버 요청 시 인증 토큰으로 사용됨.
    const [cookies] = useCookies(['jwtToken']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [userInfo, setUserInfo] = useState(null);

    // useEffect는 컴포넌트가 처음 렌더링될 때, 그리고 user가 변경될 때마다 서버에서 사용자 정보를 가져와 userInfo를 업데이트해요.
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

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        const token = cookies.jwtToken;
        try {
            await axios.post('http://localhost:8080/api/api/change-password', {
                password: newPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage('Password changed successfully');
        } catch (error) {
            console.log(error);
            setMessage('Error changing password');
        }
    };

    return (
        <div>
            <Header />
            <div className="container mt-5">
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
                    <Link class="item-list " to={'/MyorderDetails'}>
                        <div class="item ">
                            <p class="item-maintext">주문내역</p>
                        </div>
                    </Link>
            </div>
            <div className="container mt-5">
                    <Link class="item-list " to={'/MypageComments'}>
                        <div class="item ">
                            <p class="item-maintext">리뷰관리</p>
                        </div>
                    </Link>
            </div>
            </div>
            <div className="container mt-5">
                <Card>
                    <Card.Body>
                        <Card.Title>업체이름</Card.Title>
                        {/* Add company name details here */}
                    </Card.Body>
                </Card>
            </div>
            <div className="container mt-5">
                <Card>
                    <Card.Body>
                        <Card.Title>비밀번호 변경</Card.Title>
                        <form onSubmit={handlePasswordChange}>
                            <div className="mb-3">
                                <label htmlFor="newPassword" className="form-label">New Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="newPassword" 
                                    value={newPassword} 
                                    onChange={(e) => setNewPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="confirmPassword" 
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Change Password</button>
                        </form>
                        {message && <p className="mt-3">{message}</p>}
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};
 
export default MypageMain;

// const {user,setUser,userId,setUserId,shopId,setShopid}=useContext(AdminFlagContext)

// const navigate = useNavigate(); 
// useEffect(() => {
//     //상점아이디를 플래그 에 저장하는 파트 
//     const fetchData = async () => {
//         try {
//             const rs = await axios.get("http://localhost:8080/store/menuRs", {
//                 params: { id: userId }
//             });
//             if (rs.status === 200) {
//                 console.log(rs.data)
//                 if (rs.data != -1) {
//                     setShopid(rs.data)
//                 } else {
//                     console.log("승인받지 못함");
//                 }
//             }
//         } catch (e) {
//             console.log("연결실패", e);
//         }}

//     fetchData();
// }, [userId]); 
