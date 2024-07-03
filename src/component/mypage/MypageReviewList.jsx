import React from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import StarRating from '../user/StartRating.jsx';

const MypageReviewList = ({ review }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        // 수정 기능 구현
        console.log('리뷰 수정:', review.comment_id);
    };

    const handleDelete = () => {
        // 삭제 기능 구현
        console.log('리뷰 삭제:', review.comment_id);
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
