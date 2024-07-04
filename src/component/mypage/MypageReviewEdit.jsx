import React, { useEffect, useState, useContext } from 'react';
<<<<<<< HEAD
import Header from '../commom/Header.jsx';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
=======
import Header from '../common/Header.jsx';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
>>>>>>> master
import StarRating from './StarRating ';
import axios from 'axios';
import { AdminFlagContext } from "../../flag/Flag.jsx";

//댓글 수정
const MypageReviewEdit = () => {
<<<<<<< HEAD
    const { commentId } = useParams();
    console.log("commentId 값이 잘 들어오는지 확인 : " + commentId);

    const navigate = useNavigate();
    const { userInfo, userId } = useContext(AdminFlagContext);
    const [review, setReview] = useState({ content: "", rating: 0 });
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        const fetchReviewData = async () => {
            try {
                const response = await axios.put(`/comments/selectById/${commentId}`);
                setReview(response.data);
                setOrderDetails(response.data.orderDetails || []); //orderDetails가 없을 경우 빈 배열로 설정
            } catch(error) {
                console.error('댓글 패치 에러 : ', error);
            }
        };

        fetchReviewData();
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

=======
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


>>>>>>> master
    return (
        <div>
            <Header />
            <div id="main_container">
                <div className="shop_container">
                    <div className="form">
<<<<<<< HEAD
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
=======
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
>>>>>>> master
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MypageReviewEdit;