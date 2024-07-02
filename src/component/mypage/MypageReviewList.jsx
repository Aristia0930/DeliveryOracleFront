import React from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import StarRating from '../user/StartRating.jsx';
import axios from 'axios';

const MypageReviewList = ({ review }) => {
    const navigate = useNavigate();

    const handleDelete = () => {
        // 삭제 기능 구현 (가시성 표현 0이면 존재하지 않는 댓글, 1이면 존재하는 원본 댓글)
        axios.put(`/comments/ucv/updateCommentVisivility?comment_id=${review.commentId}`)
            .then(response => {
                if(response.data === 'SUCCESS') {
                //삭제 성공 시 페이지를 새로고침하지 않고, 바로 댓글 리스트를 갱신한다.
                alert("댓글 삭제 성공!");
                navigate("/MypageReview", {replace : true});
            } else {
                alert("댓글 삭제 실패");
            }
        })
        .catch(error => {
            console.error("댓글 삭제 에러", error);
            alert("댓글 삭제 처리 중 에러가 발생!");
        });

    };

    console.log('리뷰 삭제 : ', review.commentId);

    // 수정 기능 구현
    const handleEdit = () => {
        navigate(`MypageReviewEdit/${review.commentId}`) //수정 페이지로 이동하기
        console.log('리뷰 수정 : ', review.commentId);
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
