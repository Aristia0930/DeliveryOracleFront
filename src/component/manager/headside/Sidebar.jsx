// import React from 'react';
// import { Nav } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import { useContext } from "react";
// import { FaHome, FaList, FaComment, FaClipboardList, FaHistory, FaDollarSign, FaEdit } from 'react-icons/fa';
// import { AdminFlagContext } from "../../../flag/Flag.jsx"
// import { useNavigate } from 'react-router-dom';
// const Sidebar = () => {
//     const {role,user,setUser,userId,setUserId,shopId,setShopId}=useContext(AdminFlagContext)
//     const navigate = useNavigate();  
//     //권한확인
//      const roleExist=async(src)=>{
  
//         if(role==null){
//             alert("로그인해주세요")
//             navigate("/ManagerMain")
//           }
//         else if (role=="ROLE_ADMIN"){
//             navigate(`/${src}`)
//         }
//     }

//     return (
//         <Nav defaultActiveKey="/dashboard" className="flex-column bg-light" style={{ height: '100vh', padding: '10px' }}>
//             <LinkContainer to="/ManagerApprove">
//                 <Nav.Link>업체승인하기</Nav.Link>
//             </LinkContainer>
//             <LinkContainer to="/ManagerShopleave">
//                 <Nav.Link>악덕 업체 퇴출</Nav.Link>
//             </LinkContainer>
//             <LinkContainer to="/ManagerUserblock">
//                 <Nav.Link>악성 이용자 차단</Nav.Link>
//             </LinkContainer>
//             <LinkContainer to="/ManagerOrderReceipt">
//                 <Nav.Link>주문내역</Nav.Link>
//             </LinkContainer>
//             <LinkContainer to="/ManagerRevenue">
//                 <Nav.Link>매출내역</Nav.Link>
//             </LinkContainer>
//             {/* Add more links as needed */}
//         </Nav>
//     );
// };

// export default Sidebar;

import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from "react";
import { FaHome, FaList, FaComment, FaClipboardList, FaHistory, FaDollarSign, FaEdit, FaUserShield, FaBan, FaFileInvoiceDollar } from 'react-icons/fa';
import { AdminFlagContext } from "../../../flag/Flag.jsx";
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
    const { role } = useContext(AdminFlagContext);
    const navigate = useNavigate();  

    //권한확인
    const roleExist = async (src) => {
        if (role == null) {
            alert("로그인해주세요");
            navigate("/ManagerMain");
        } else if (role === "ROLE_ADMIN") {
            navigate(`/${src}`);
        }
    };

    return (
        <Nav defaultActiveKey="/dashboard" className="flex-column bg-light sidebar" style={{ height: '100vh', padding: '10px' }}>
             <div onClick={e=>{roleExist("ManagerApprove")}}>
                <Nav.Link><FaUserShield className="sidebar-icon" /> 업체 승인하기</Nav.Link>
            </div>

            <div onClick={e=>{roleExist("ManagerShopleave")}}>
            {/* <LinkContainer to="/ManagerShopleave"> */}
                <Nav.Link><FaBan className="sidebar-icon" /> 악덕 업체 퇴출</Nav.Link>
            </div>
            <div onClick={e=>{roleExist("ManagerUserblock")}}>
            
                <Nav.Link><FaComment className="sidebar-icon" /> 악성 이용자 차단</Nav.Link>
            </div>
            <div onClick={e=>{roleExist("ManagerOrderReceipt")}}>
          
                <Nav.Link><FaClipboardList className="sidebar-icon" /> 주문 내역</Nav.Link>
            </div>

            <div onClick={e=>{roleExist("ManagerRevenue")}}>
            
                <Nav.Link><FaFileInvoiceDollar className="sidebar-icon" /> 매출 내역</Nav.Link>
            </div>
            {/* Add more links as needed */}
        </Nav>
    );
};

export default Sidebar;
