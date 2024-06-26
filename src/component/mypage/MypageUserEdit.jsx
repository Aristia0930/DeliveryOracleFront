import React, { useState, useEffect, useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { AdminFlagContext } from '../../flag/Flag.jsx';
import Header from '../commom/Header';

const MypageUserEdit = () => {
    const [cookies] = useCookies(['jwtToken']);
    const { user, setUser, userId, setUserId, shopId, setShopid } = useContext(AdminFlagContext);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [nickname, setNickname] = useState('');
    const [previewImageSrc, setPreviewImageSrc] = useState('');
    const [loginCheck, setLoginCheck] = useState(false);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('비밀번호가 일치하지 않습니다.');
            setLoginCheck(true);
            return;
        }
        setLoginCheck(false);

        const token = cookies.jwtToken;
        try {
            await axios.post('http://localhost:8080/api/api/change-password', {
                password: newPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage('비밀번호가 성공적으로 변경되었습니다.');
        } catch (error) {
            console.log(error);
            setMessage('비밀번호 변경 중 오류가 발생했습니다.');
        }
    };

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         setPreviewImageSrc(reader.result);
    //     };
    //     if (file) {
    //         reader.readAsDataURL(file);
    //     }
    // };

    return (
        <div>
            <Header/>
            <div className="container mt-5">
                
                <Card>
                    <Card.Body>
                        <Card.Title>이름 업데이트</Card.Title>
                        <div className="userEdit-info-container mb-3">
                            <label htmlFor="nickname" className="form-label">닉네임</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nickname"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                            />
                        </div>
                    </Card.Body>
                </Card>

                <Card className="mt-4">
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
                            <button type="submit" className="btn btn-primary">Change</button>
                        </form>
                        {message && <p className="mt-3">{message}</p>}
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default MypageUserEdit;

    // const [cookies] = useCookies(['jwtToken']);
    // const { user,setUser,userId,setUserId,shopId,setShopid } = useContext(AdminFlagContext);
    // const [newPassword, setNewPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    // const [message, setMessage] = useState('');


    // const handlePasswordChange = async (e) => {
    //     e.preventDefault();
    //     if (newPassword !== confirmPassword) {
    //         setMessage('Passwords do not match');
    //         return;
    //     }

    //     const token = cookies.jwtToken;
    //     try {
    //         await axios.post('http://localhost:8080/api/api/change-password', {
    //             password: newPassword,
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         setMessage('Password changed successfully');
    //     } catch (error) {
    //         console.log(error);
    //         setMessage('Error changing password');
    //     }
    // };

    // return(
    //     <div className="container mt-5">
    //     <Card>
    //         <Card.Body>
    //             <Card.Title>비밀번호 변경</Card.Title>
    //             <form onSubmit={handlePasswordChange}>
    //                 <div className="mb-3">
    //                     <label htmlFor="newPassword" className="form-label">New Password</label>
    //                     <input 
    //                         type="password" 
    //                         className="form-control" 
    //                         id="newPassword" 
    //                         value={newPassword} 
    //                         onChange={(e) => setNewPassword(e.target.value)} 
    //                         required 
    //                     />
    //                 </div>
    //                 <div className="mb-3">
    //                     <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
    //                     <input 
    //                         type="password" 
    //                         className="form-control" 
    //                         id="confirmPassword" 
    //                         value={confirmPassword} 
    //                         onChange={(e) => setConfirmPassword(e.target.value)} 
    //                         required 
    //                     />
    //                 </div>
    //                 <button type="submit" className="btn btn-primary">Change</button>
    //             </form>
    //             {message && <p className="mt-3">{message}</p>}
    //         </Card.Body>
    //     </Card>
    //     </div>
    // );
