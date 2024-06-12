import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const ManagerApproveList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // 여기에 API 호출 로직을 추가할 수 있습니다.
        // 임시로 하드코딩된 데이터를 사용합니다.
        const fetchData = async () => {
            
        };

        fetchData();
    }, []);

    return (
        <div>
              <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Owner ID</th>
                        <th>Store Name</th>
                        <th>Modification Date</th>
                        <th>Approval Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.owner_id}</td>
                            <td>{item.store_name}</td>
                            <td>{item.modification_date}</td>
                            <td>{item.approval_status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ManagerApproveList;