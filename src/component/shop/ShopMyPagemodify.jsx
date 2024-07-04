import React, { useState, useEffect, useContext } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { AdminFlagContext } from '../../flag/Flag.jsx';
import Header from './headside/Header.jsx';


const ShopMyPagemodify = () => {
    const { userId, user, setUserId } = useContext(AdminFlagContext);
    const [nickname, setNickname] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message1, setMessage1] = useState('');
    const [message2, setMessage2] = useState('');

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
    }, [user, setUserId]);

    const handleNicknameChange = async (e) => {
        e.preventDefault();

        if (userInfo.name === nickname) {
            setMessage1('기존 닉네임과 새 닉네임이 같습니다. 다른 닉네임을 입력해주세요.');
            return;
        }

        try {
            await axios.get('http://localhost:8080/edit/change-nickname', {
                params: {
                    userId: userId,
                    name: userInfo.name, // 고정된 이름 값 사용
                    nickname: nickname
                },
                headers: {
                    Authorization: `Bearer ${user}`
                }
            });
            setMessage1('닉네임이 변경 되었습니다.');
        } catch (error) {
            console.error('닉네임 변경 중 오류:', error);
            setMessage1('닉네임 변경 중 오류가 발생했습니다.');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage2('비밀번호가 일치하지 않습니다.');
            return;
        }

        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("oldPassword", oldPassword);
        formData.append("newPassword", newPassword);

        const token = user;
        try {
            await axios.post('http://localhost:8080/edit/change-password', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage2('비밀번호가 성공적으로 변경되었습니다.');
        } catch (error) {
            console.error('비밀번호 변경 중 오류:', error);
            setMessage2('비밀번호 변경 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <Header/>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <Card className="mt-4">
                            <Card.Body>
                                <Card.Title>닉네임 변경</Card.Title>
                                <form onSubmit={handleNicknameChange}>
                                    <div className="userEdit-info-container mb-3">
                                        <label htmlFor="currentNickname" className="form-label">기존 닉네임</label>
                                        <input 
                                            type="text" 
                                            className="form-control"  
                                            value={userInfo.name || ''} // 기존 닉네임 표시
                                            id="currentNickname" 
                                            readOnly
                                        />

                                        <label htmlFor="nickname" className="form-label">새로운 닉네임</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nickname"
                                            value={nickname}
                                            onChange={(e) => setNickname(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Change</button>
                                    {message1 && <p>{message1}</p>}
                                </form>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-6">
                        <Card className="mt-4">
                            <Card.Body>
                                <Card.Title>비밀번호 변경</Card.Title>
                                <form onSubmit={handlePasswordChange}>
                                    <div className="mb-3">
                                        <label htmlFor="oldPassword" className="form-label">
                                            기존 비밀번호
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="oldPassword"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="newPassword" className="form-label">새로운 비밀번호</label>
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
                                        <label htmlFor="confirmPassword" className="form-label">새 비밀번호 확인</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Change</button>
                                    {message2 && <p className="mt-3">{message2}</p>}
                                </form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopMyPagemodify;