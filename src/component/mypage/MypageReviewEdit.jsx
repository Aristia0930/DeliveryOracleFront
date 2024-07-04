import React, { useEffect, useState, useContext } from 'react';
import Header from '../common/Header.jsx';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import StarRating from './StarRating ';
import axios from 'axios';
import { AdminFlagContext } from "../../flag/Flag.jsx";

//댓글 수정
const MypageReviewEdit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const review=location.state?.review;
    const [rating, setRating] = useState(review.rating); // 초기 별점 상태는 0으로 설정
    const [comments,setComments]=useState(review.content)
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    // 실제 서버로 별점을 전송하는 함수 (예시)
    const sendRatingToServer = async(e) => {
        e.preventDefault();

        const reviewData={
            content:comments,
            rating:rating,
            commentId:review.commentId
        }

        try {
            const rs = await axios.put("http://localhost:8080/comments/Edit", reviewData);
            if (rs.status === 200) {
                console.log(rs.data);


                if (rs.data=="SUCCESS") {
                    alert("댓글수정 완료")
                  navigate("/MypageReview");
                } else {
                    alert("오류발생")
                    navigate("/MypageMain");
                }
            }
            else{
                alert("오류발생")
                navigate("/MypageMain");
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
                            <h1>리뷰 수정하기</h1>
                            <hr></hr>
                            <StarRating initialRating={rating} onRatingChange={handleRatingChange} />
                            <p className="shop_text">
                                <label htmlFor="shop_text">댓글작성</label>
                                <textarea name="postContent" value={comments} rows={6} onChange={(e)=>setComments(e.target.value)}/>
                            </p>
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit" id="submit_btn" className="submit_btn" onClick={sendRatingToServer}>수정하기</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MypageReviewEdit;