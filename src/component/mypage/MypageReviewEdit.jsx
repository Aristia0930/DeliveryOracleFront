import React, { useEffect, useState, useContext } from 'react';
import Header from '../common/Header.jsx';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import StarRating from './StarRating ';
import axios from 'axios';
import { AdminFlagContext } from "../../flag/Flag.jsx";

//댓글 수정
const MypageReviewEdit = () => {
    const { commentId } = useParams();
    console.log("commentId 값이 잘 들어오는지 확인 : " + commentId);
    const navigate = useNavigate();
    const { userInfo, userId } = useContext(AdminFlagContext);
    const [review, setReview] = useState({ content: "", rating: 0 });
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        // 서버로부터 댓글 데이터를 가져온다.
        axios
            .put(`/comments/${commentId}`)
            .then((response) => {
                setReview(response.data);
                
                // 주문 상세 내역을 가져온다.
                 setOrderDetails(response.data.orderDetails);
            })
            .catch((error) => {
                console.error('댓글 패치 에러 : ', error);
            });
    }, [commentId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    const handleRatingChange = (newRating) => {
        setReview({ ...review, rating: newRating });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/comments/${commentId}`, review)
            .then(response => {
                if (response.data === 'SUCCESS') {
                    navigate('/MypageReview'); // 수정 후 리뷰 페이지로 이동한다.
                } else {
                    alert('댓글 업데이트 성공');
                }
            })
            .catch(error => {
                console.error('댓글 업데이트 에러 : ', error);
            });
    };

    return (
        <div>
            <Header />
            <div id="main_container">
                <div className="shop_container">
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <h3 className='form_padding'>댓글 수정</h3>
                            {/* 주문내역 표시 - 이 부분은 필요에 따라 수정 */}
                            {orderDetails.map((detail, index) => (
                                <p key={index}>{detail}</p>
                            ))}
                            <hr></hr>
                            <StarRating initialRating={review.rating} onRatingChange={handleRatingChange} />
                            <p className="shop_text">
                                <label htmlFor="content">댓글 수정</label>
                                <textarea name="content" rows={6} value={review.content} onChange={handleInputChange} />
                            </p>
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit" id="submit_btn" className="submit_btn">수정하기</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MypageReviewEdit;