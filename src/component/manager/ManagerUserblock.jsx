import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './headside/Header';
import Sidebar from './headside/Sidebar';
import { Table, Button } from 'react-bootstrap';

//유저신고 처리 페이지
const ManagerUserblock = () => {
    const [data,setData]=useState([])
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

    },[])
    

    const handleApprove = async (id) => {
        try {


            const response = await axios.get('http://localhost:8080/admin/approve', {
                params: { owner_id: id }
            });

      
            
            if (response.status === 200) {


    
                const updatedData = data.map(item =>
                    item.owner_id === id ? { ...item, approval_status: 1 } : item
                );
                setData(updatedData);
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
                        <th>Owner ID</th>
                        <th>Store Name</th>
                        <th>Modification Date</th>
                        <th>Approval Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.owner_id}</td>
                            <td>{item.store_name}</td>
                            <td>{item.modification_date}</td>
                            <td>{item.approval_status === 1 ? "1" : "0"}</td>
                            <td>
                                {item.approval_status === 0 ? (
                                    <Button onClick={() => handleApprove(item.owner_id)}>승인</Button>
                                ) : "완료"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ManagerUserblock;