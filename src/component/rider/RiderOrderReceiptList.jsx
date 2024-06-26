import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const RiderOrderReceiptList = ({ orders }) => {

    return (
        <div>
            {orders.map((order) => (
                <Card key={order.riderId} style={{ width: '40rem', margin: 'auto', marginBottom: '20px' }}>
                    <Card.Body>
                        <p><strong>배달 번호:</strong> {order.deliveryId}</p>
                        <p><strong>라이더 번호:</strong> {order.riderId}</p>
                        <p><strong>배달 가격:</strong> {order.deliveryPrice}</p>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default RiderOrderReceiptList;

