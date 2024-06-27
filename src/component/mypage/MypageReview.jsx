import React, { useState, useEffect, useContext } from 'react';
import Header from '../commom/Header.jsx';
import axios from 'axios';
import { AdminFlagContext } from "../../flag/Flag.jsx";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import MypageReviewList from './MypageReviewList.jsx';
const MypageReview = () => {
    const {user,setUser,userId,setUserId,shopId,setShopid}=useContext(AdminFlagContext)
    const [review, setReview] = useState([]);

    

    useEffect(() => {
        const fetchOrderDetails = async () => {
           
                const response = await axios.get('http://localhost:8080/search/review', {
                    params: {
                        id: userId
                    }
                });

                console.log(response.data);
                setReview(response.data);
        };

        fetchOrderDetails();
    }, [user]);
    return (
        <div>
            <Header />
        <div className="text-center" style={{  margin: '25px' }}>

                    {/* <Card.Title>주문 내역</Card.Title> */}
                    {
                        review.map(reviews => (<MypageReviewList review={reviews} />
            
                            
                        ))
                   }
  
        </div>
        </div>
    );
};

export default MypageReview;