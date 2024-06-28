import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import Header from '../commom/Header.jsx';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'; 
import { AdminFlagContext } from "../../flag/Flag.jsx";
const MypageDetailsList = ({ order }) => {
    const [showModal, setShowModal] = useState(false); // 팝업 창 열고 닫기 상태
    const [reportText, setReportText] = useState(''); // 신고 내용을 저장할 상태 변수
    const {user,setUser,userId,setUserId,shopId,setShopid,userDate, setUserDate}=useContext(AdminFlagContext)

    const navigate = useNavigate();
    let orderDetailsArray = [];
    try {
        orderDetailsArray = JSON.parse(order.orderDetails);
    } catch (e) {
        console.error("orderDetails가 유효한 JSON 배열이 아닙니다:", e);
        // JSON 변환 실패 시, menu.orderDetails를 단일 문자열로 처리
        orderDetailsArray = [order.orderDetails];
    }

    const cleanOrderDetails = orderDetailsArray.map((detail, index) => {
        if (typeof detail === 'string') {
            return detail.replace(/[\\{}[\]"]/g, "");
        } else if (typeof detail === 'object' && detail !== null) {
            // 객체일 경우, 모든 키-값 쌍을 문자열로 결합
            return Object.entries(detail).map(([key, value]) => `${key}: ${value}`).join(", ");
        } else {
            console.error("detail이 문자열이나 객체가 아닙니다:", detail);
            return ""; // 알 수 없는 형식인 경우 빈 문자열 반환
        }
    });

    // 리뷰 페이지 이동
    const comment = (e) => {
        e.preventDefault();
        navigate("/MypageComments", { state: { cleanOrderDetails: JSON.stringify(cleanOrderDetails) ,order:order} });
    }

    const but=(e)=>{
        e.preventDefault();
    }

    // 팝업 열기 함수
        const handleOpenModal = () => {
            setShowModal(true);
        }
    
    // 팝업 닫기 함수
        const handleCloseModal = () => {
            setShowModal(false);
        }
    //신고하기
    
    //신고하기 버튼
    const handleReport =async(e)=>{
        e.preventDefault();

        const reportData = {
            orderId: order.orderId,
            storeId: order.storeId,
            reportText: reportText,
            reporterId: userId
        };

        
        try{
            const rs=await axios.post("http://localhost:8080/userReport/store", reportData)
            if(rs.status==200){
                console.log(rs.data)
                if(rs.data=="checkFail"){
                    alert("이미 신고했습니다.")
                    handleCloseModal();
                }
                else{
                alert("신고하기성공")
                handleCloseModal();
                navigate("/")}
                

            }
        }catch(e){
            console.log("신고실패",e)
        }

    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <Card style={{ width: '40rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
                <Card.Img 
                    variant="top" 
                    src={`/imgs/${order.storeImage}`} 
                    style={{ width: '8rem', height: '8rem', objectFit: 'cover', borderRadius: '50%', margin: '20px auto' }} 
                />
                <Card.Body>
                    <div style={{ textAlign: 'center' }}>
                        <h5 style={{ fontWeight: 'bold', marginBottom: '15px' }}>{order.storeName}</h5>
                        <p style={{
                            width: '100%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            marginBottom: '15px'
                        }}><strong>주문내용:</strong> {cleanOrderDetails.join(", ")}</p>
                        <p><strong>가격:</strong> {order.totalPrice} 원</p>
                        <p><strong>주문날짜:</strong> {order.orderDate}</p>
     
                        <hr />
                        {order.orderApprovalStatus==4&&
                        <Button onClick={comment}>리뷰쓰기</Button>}
                        {order.orderApprovalStatus==5&&
                        <Button onClick={but}>주문이 거절 되었습니다.</Button>}
                        {order.orderApprovalStatus==3&&
                        <Button onClick={but}>배달중입니다.</Button>}
                        {order.orderApprovalStatus==2&&
                        <Button onClick={but}>라이더 배정중입니다.</Button>}
                          {order.orderApprovalStatus==1&&
                        <Button onClick={but}>조리중</Button>}
                        {order.orderApprovalStatus==0&&
                        <Button onClick={but}>음식점에서 주문확인중</Button>} 
                         <Button variant="danger"  style={{ marginLeft: '20px' }} onClick={handleOpenModal}>신고하기</Button>
                    </div>
                </Card.Body>
            </Card>

            <>
         {/* 팝업 */}
         <Modal show={showModal} onHide={handleCloseModal}>
         <Modal.Header closeButton>
             <Modal.Title>신고 내용 입력</Modal.Title>
         </Modal.Header>
         <Modal.Body>
             <input
                 type="text"
                 value={reportText}
                 onChange={(e) => setReportText(e.target.value)}
                 placeholder="신고 내용을 입력하세요"
                 style={{ width: '100%', padding: '10px' }}
             />
         </Modal.Body>
         <Modal.Footer>
             <Button variant="secondary" onClick={handleCloseModal}>
                 닫기
             </Button>
             <Button variant="primary" onClick={handleReport}>
                 신고하기
             </Button>
         </Modal.Footer>
     </Modal></>
        </div>
    );
};

export default MypageDetailsList;