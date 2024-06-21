import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ShopOrderList = ({ orders }) => {

    if (!orders || orders.length === 0) {
        return <p>주문이 없습니다.</p>;
    }
 
    return (
        <ListGroup>
            {orders.map(order => (
                <ListGroup.Item key={order.order_id}>
                    <h5>Order ID: {order.order_id}</h5>
                    <p>Customer: {order.name} ({order.email})</p>
                    <p>Details: {order.order_details}</p>
                    <p>Total Price: {order.total_price}</p>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default ShopOrderList;