import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../component/manager/headside/Header';
import Sidebar from '../../component/manager/headside/Sidebar';
import { Table, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'; // Bootstrap의 Modal 컴포넌트 import
import { useNavigate } from 'react-router-dom';

//유저신고 처리 페이지
const ManagerUserblock = () => {
    const [data,setData]=useState([])

    const [showModal, setShowModal] = useState(false); // 팝업 창 열고 닫기 상태
    const [comment,setcomment]=useState([])
    const navigate = useNavigate();
    const [check,setCheck]=useState("")

    // 팝업 열기 함수
    const handleOpenModal = (id) => {
        const fetchData = async () => {
            
            try {
                const response = await axios.get("http://localhost:8080/admin/ReportsDetail",{params: { id: id }});
                if (response.status === 200) {
                    setcomment(response.data);
                }
                console.log(response.data)
            } catch (error) {
                console.error("불러오기 실패", error);
            }
        };

        fetchData();

        setShowModal(true);
    }

    // 팝업 닫기 함수
    const handleCloseModal = () => {
        setShowModal(false);
    }
    useEffect(()=>{
        const fetchData = async () => {
            
            try {
                const response = await axios.get("http://localhost:8080/admin/Reports");
                if (response.status === 200) {
                    setData(response.data);
                }
                console.log(response.data)
            } catch (error) {
                console.error("불러오기 실패", error);
            }
        };

        fetchData();

    },[check])
    

    const userblock = async (id) => {
        try {


            const response = await axios.post('http://localhost:8080/admin/block', {id :id});

      
            
            if (response.status === 200) {
                console.log(response.data)
                alert("유저 블락 성공")
                // navigate("/ManagerMain")
                setCheck(id)
                


            }
        } catch (error) {
            console.error("승인 실패", error);
        }
    };


    return (
        <div>
        <Header />
            <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">
                        <Sidebar />
                    </Col>
                    <Col xs={10} id="page-content-wrapper">
                    <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>유저 이메일</th>
                        <th>신고횟수</th>
                        <th>상세보기</th>
                        <th>차단하기</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.email}</td>
                            <td>{item.countOfComments}</td>
                            <td>
                                <Button onClick={() => handleOpenModal(item.commentAuthorId)}>상세보기</Button>
                            </td>
                            <td>
                                <Button onClick={() => userblock(item.commentAuthorId)}>블락하기</Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
                    </Col>
                </Row>
            </Container>

            {/* 팝업 */}
         <Modal show={showModal} onHide={handleCloseModal}>
         <Modal.Header closeButton>
             <Modal.Title>신고 내용 입력</Modal.Title>
         </Modal.Header>
         <Modal.Body>
         <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>유저 이메일</th>
                        <th>신고자</th>
                        <th>댓글 내용</th>
                        <th>신고내용</th>
   
                    </tr>
                </thead>
                <tbody>
                    {comment.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.commentAuthorEmail}</td>
                            <td>{item.reporterEmail}</td>
                            <td>{item.content}</td>
                            <td>{item.reportText}</td>
       
                        </tr>
                    ))}
                </tbody>
            </Table>

         </Modal.Body>
         <Modal.Footer>
             <Button variant="secondary" onClick={handleCloseModal}>
                 닫기
             </Button>
         </Modal.Footer>
     </Modal>
        </div>
    );
};

export default ManagerUserblock;


{/* <td>
{item.approval_status === 0 ? (
    <Button onClick={() => handleApprove(item.owner_id)}>승인</Button>
) : "완료"}
</td> */}