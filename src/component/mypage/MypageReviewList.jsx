import React from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import StarRating from '../user/StartRating.jsx';
import axios from 'axios';

const MypageReviewList = ({ review,setCheck }) => {
    const navigate = useNavigate();
    console.log('리뷰:', review);

    const handleDelete = async() => {
        // 삭제 기능 구현
        try{
            const rs= await axios.delete(`http://localhost:8080/comments/ucv/${review.commentId}`)

            if (rs.status==200){
                alert("댓글 삭제 완료")
                setCheck(review.commentId)
            }
            else{
                alert("댓글삭제 실패")
                navigate("/MypageMain");
            }

        }catch(e){
            console.log("연결실패",e)
        }
        

        
    };

    const handleEdit = () => {
        // 수정 기능 구현
        console.log('리뷰 수정:', review.comment_id);
        navigate(`/MypageReviewEdit`, { state: { review: review } }) //수정 페이지로 이동하기
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Card style={{ width: '30rem', margin: '10px' }}>
                <Card.Body>
                    <Card.Title>
                        작성자: {review.authorName} <StarRating initialRating={review.rating} />
                    </Card.Title>
                    <Card.Text>{review.content}</Card.Text>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="warning" onClick={handleEdit}>
                            수정하기
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            삭제하기
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default MypageReviewList;
