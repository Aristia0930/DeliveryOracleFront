import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaBiking, FaClipboardList, FaHistory, FaDollarSign } from 'react-icons/fa';
import { AdminFlagContext } from "../../../flag/Flag.jsx";


const Sidebar = () => {
    const { role } = useContext(AdminFlagContext);
    const navigate = useNavigate();  

    // 권한 확인
    const roleExist = async (src) => {
        if (role == null) {
            alert("로그인해주세요");
            navigate("/RiderMain");
        } else if (role === "ROLE_RIDER") {
            navigate(`/${src}`);
        }
    };

    return (
        <Nav defaultActiveKey="/dashboard" className="flex-column bg-light sidebar" style={{ height: '100vh', padding: '10px' }}>
            <Nav.Item onClick={() => roleExist("RiderCall")}>
                <Nav.Link>
                    <FaBiking className="me-2" /> 콜받기
                </Nav.Link>
            </Nav.Item>

            <Nav.Item onClick={() => roleExist("RiderOrder")}>
                <Nav.Link>
                    <FaClipboardList className="me-2" /> 진행중인 배달
                </Nav.Link>
            </Nav.Item>

            <Nav.Item onClick={() => roleExist("RiderOrderReceipt")}>
                <Nav.Link>
                    <FaHistory className="me-2" /> 완료내역
                </Nav.Link>
            </Nav.Item>

            <Nav.Item onClick={() => roleExist("RiderRevenue")}>
                <Nav.Link>
                    <FaDollarSign className="me-2" /> 총수익
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default Sidebar;