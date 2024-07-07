import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../component/manager/headside/Header';
import Sidebar from '../../component/manager/headside/Sidebar';
import { Table, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'; // Bootstrap의 Modal 컴포넌트 import
import { useNavigate } from 'react-router-dom';


const ManagerShopleave = () => {
    const [data,setData]=useState([])

    const [showModal, setShowModal] = useState(false); // 팝업 창 열고 닫기 상태
    const [comment,setcomment]=useState([])
    const navigate = useNavigate();
    const [check,setCheck]=useState("")
    // 팝업 열기 함수
    const handleOpenModal = (id) => {
        const fetchData = async () => {
            
            try {
                const response = await axios.get("http://localhost:8080/admin/StoreReportsDetail",{params: { storeId: id }});
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
                const response = await axios.get("http://localhost:8080/admin/StoreReports");
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


            const response = await axios.post('http://localhost:8080/admin/Storeblock', {id :id});

      
            
            if (response.status === 200) {
                console.log(response.data)
                alert("업체 내리기 성공")
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
                        <th>#</th>
                        <th>유저 이메일</th>
                        <th>신고횟수</th>
                        <th>Action</th>
                        <th>Action2</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.storeName}</td>
                            <td>{item.count}</td>
                            <td>

                                    <Button onClick={() => handleOpenModal(item.storeId)}>상세보기</Button>

                         
                            </td>
                            <td>


                                <Button onClick={() => userblock(item.storeId)}>업체내리기</Button>

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
             <Modal.Title>신고 내용</Modal.Title>
         </Modal.Header>
         <Modal.Body>
         <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>업체이름</th>
                        <th>신고자</th>
       
                        <th>신고내용</th>
   
                    </tr>
                </thead>
                <tbody>
                    {comment.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.storeName}</td>
                            <td>{item.reporterEmail}</td>
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

export default ManagerShopleave;