import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PaySection = ({ showModal, handleCloseModal, handleOrder, totalPrice }) => {
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>결제 정보 입력</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* 모달 내용 */}
                <h5>배달정보</h5>
                <p className="pay-position">서울특별시 송파구 방이동 44-2</p>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">배달시 요청사항</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </div>
                
                <h5>결제금액</h5>
                <div className="alert alert-info" role="alert">
                    <span className="alert-second">주문금액 {totalPrice}원</span>
                </div>
                
                <div className="input-group mb-3">
                    <select className="custom-select" id="inputGroupSelect01">
                        <option defaultValue>결제선택</option>
                        <option value="1">포인트결제</option>
                        <option value="2">카카오페이</option>
                        <option value="3">카드결제</option>
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>취소하기</Button>
                <Button variant="success" onClick={handleOrder}>주문하기</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PaySection;