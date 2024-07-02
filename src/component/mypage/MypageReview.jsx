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
           try {

               const response = await axios.get('http://localhost:8080/search/review', {
                   params: {
                       id: userId
                    }
                });
                
                console.log(response.data);
                setReview(response.data); //서버에서 받아온 데이터를 state에 설정한다.
            
            } catch (error) {
                console.error("서버 요청 실패", error);
            }
        };

        fetchOrderDetails();
    }, [user]);
    return (
        <div>
            <Header />
        <div className="text-center" style={{  margin: '25px' }}>

                    {/* <Card.Title>주문 내역</Card.Title> */}
                    {
                        review.map(review => (
                        <MypageReviewList key={review.commentId} review={review} />
                        ))
                   }
  
        </div>
        </div>
    );
};

export default MypageReview;