import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminFlagContext } from "../../flag/Flag.jsx";
import { Card } from 'react-bootstrap';

const MyorderDetails = () => {
    const {user,setUser,userId,setUserId,shopId,setShopid}=useContext(AdminFlagContext)
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        const fetchOrderDetails = async () => {
           
                const response = await axios.get('http://localhost:8080/search/details', {
                    params: {
                        userId: userId
                    }
                });

                console.log(response.data);
                setOrderDetails(response.data);
        };

        fetchOrderDetails();
    }, [user]);

    return (
        <div >

                    {/* <Card.Title>주문 내역</Card.Title> */}
                    {orderDetails.length > 0 ? (
                        orderDetails.map(order => (
                            <Card>
                            <Card.Body>
                            <div key={order.orderId}>
                                <p><strong>Order ID:</strong> {order.orderId}</p>
                                <p><strong>Store ID:</strong> {order.storeId}</p>
                                <p><strong>Order Details:</strong> {order.orderDetails}</p>
                                <p><strong>Total Price:</strong> {order.totalPrice}</p>
                                <p><strong>Order Date:</strong> {order.orderDate}</p>
                                <hr />
                            </div>
                            </Card.Body>
                            </Card>
                            
                        ))
                    ) : (
                        <p>Loading order details...</p>
                    )}
  
        </div>
    );
};

export default MyorderDetails;

