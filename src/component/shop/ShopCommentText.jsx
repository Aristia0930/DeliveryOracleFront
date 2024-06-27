import React, { useEffect, useState } from 'react';
import Header from '../commom/Header.jsx';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import StarRating from '../user/StartRating.jsx';
import axios from 'axios';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";

//댓글 작성 
const ShopCommentText = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state?.array || "[]";


    const {user,setUser,userInfo, setUserInfo,userIdm,userDate, setUserDate}=useContext(AdminFlagContext)


    const [comments,setComments]=useState("")
    



    // 실제 서버로 별점을 전송하는 함수 (예시)
    const sendRatingToServer = async(e) => {
        e.preventDefault();
        // 여기서 서버로 rating 변수를 전송하는 로직을 추가할 수 있음
      
        try {
            const rs = await axios.post("http://localhost:8080/comments");
            if (rs.status === 201) {
                console.log(rs.data);


                if (rs.data) {
                  navigate("/");
                } else {
                    console.log("없음");
                }
            }
            else{
                alert("오류발생")
                navigate("/");
            }
        } catch (e) {
            console.log("연결실패", e);
        }

    };


    return (
        <div>
            <Header />
            <div id="main_container">
                <div className="shop_container">
                    <div className="form">
                        <form action="#">
                            <p className="shop_text">
                                <label htmlFor="shop_text">댓글작성</label>
                                <textarea name="postContent" rows={6} onChange={(e)=>setComments(e.target.value)}/>
                            </p>
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit" id="submit_btn" className="submit_btn" onClick={sendRatingToServer}>등록하기</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopCommentText;
