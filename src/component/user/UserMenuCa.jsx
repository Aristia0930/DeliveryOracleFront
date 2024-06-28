import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserMenuCa.css';

const UserMenuCa = ({ data, shop }) => {
    return (
        <Card className="item-card mb-3" style={{ width: '100%' }}>
            <Card.Body className="d-flex align-items-start">
                <div className="item-image">
                    <img src={`/imgs/${data.store_image}`} alt="item" width="70" />
                </div>
                <div className="item-info ml-3">
                    <Card.Title>
                        <strong>{data.store_name}</strong>
                        <span className="special-tags ml-2">
                        {shop ? <Badge pill variant="primary" className="mr-1"> 우수 </Badge> : <Badge pill variant="primary" bg="danger" className="mr-1">운영종료</Badge>}
                        </span>
                    </Card.Title>
                    <Card.Text>
                        <FaStar className="scope-rate" /> <strong>{data.rating}</strong>
                        <span className="pd2">최근리뷰 {data.recent_reviews} | 사장님댓글 {data.recent_comments}</span>
                    </Card.Text>
                    <Card.Text className="info-detailmenu pd1">
                        {data.menu}
                    </Card.Text>
                </div>
            </Card.Body>
        </Card>
    );
};

export default UserMenuCa;
