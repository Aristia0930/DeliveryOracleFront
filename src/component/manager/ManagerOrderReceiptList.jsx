import React, { useState, useEffect, useContext } from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const ManagerOrderReceiptList = ({ orders }) => {
    const navigate = useNavigate();

    if (!orders || orders.length === 0) {
        return <p>배달매칭된 주문이 없습니다.</p>;
    }
    
    // 훨씬더 간단한 코드
    const formatOrderDetails = (details) => {
        if (typeof details === 'string') {
          return details.replace(/[\\{}[\]"]/g, "");
        }
        return details;
      };
    

    return (
        <div>
            {orders.map((order) => (
                <Card style={{ width: '40rem', margin: 'auto', marginBottom: '20px' }}>
                    <Card.Body>
                        <div key={order.order_id}>
                            <p><strong>가게 번호(Store ID):</strong> {order.store_id}</p>
                            <p><strong>주문내용:</strong> {formatOrderDetails(order.order_details)}</p>
                            <p><strong>가격:</strong> {order.total_price}</p>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default ManagerOrderReceiptList;