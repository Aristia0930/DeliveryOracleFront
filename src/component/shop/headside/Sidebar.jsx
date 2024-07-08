import axios from 'axios';
import React, { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { FaHome, FaList, FaComment, FaClipboardList, FaHistory, FaDollarSign, FaEdit } from 'react-icons/fa';
import { AdminFlagContext } from "../../../flag/Flag.jsx"
import './Sidebar.css'; 
const Sidebar = () => {
    const {role,user,setUser,userId,setUserId,shopId,setShopId}=useContext(AdminFlagContext)

    const navigate = useNavigate(); 
    useEffect(() => {
        //상점아이디를 플래그 에 저장하는 파트 
        const fetchData = async () => {
            try {
                const rs = await axios.get("http://localhost:8080/store/menuRs", {
                    params: { id: userId }
                });
                if (rs.status === 200) {
                    console.log(rs.data)
                    if (rs.data == -1) {
                        // setShopId(rs.data)
                        console.log("승인받지 못함");
                    } else if(rs.data==-2) {
                        console.log("이거 -2");
                        alert("업체 정지 관리자에게 문의 하세요 ")
         
                    }
                    else {
                        setShopId(rs.data)
                    }
                }
            } catch (e) {
                console.log("연결실패", e);
            }} 
        
        if(userId){

        fetchData();}
    }, [userId]); 

    useEffect(()=>{
        if (role == null) {
            navigate("/ShopMain");
        } else if (role != "ROLE_STORE") {
            window.location.href = "/ShopMain";
        }
    },[role])
    

    const shoppMenu=async(e)=>{
        e.preventDefault()
        //아이디값을 넘겨서 그 아이디값의 상점 주인이 승인 되었는 확인하는 절차
        if(role==null){
            alert("로그인 해주세요")
            navigate("/ShopMain");
        }
        else if(role=="ROLE_STORE"){
           
        
        //상점 아이디값이 받아오는
        try {
            const rs = await axios.get("http://localhost:8080/store/menuRs", {
                params: { id: userId }
            });
            if (rs.status === 200) {
                console.log(rs.data)
                if (rs.data != -1) {
                    setShopId(rs.data)
                    navigate("/ShopMenu", { state: { approvalStatus: rs.data } });
                } else {
                    console.log("승인받지 못함");
                    alert("업체승인받지 못함")
                    navigate("/ShopMain");
                }
            }
        } catch (e) {
            console.log("연결실패", e);
        }}}

        //업체등록 입장 전 권한 확인파트
        const shopJoinButton=async(e)=>{
            e.preventDefault()
            if(role==null){
                alert("로그인해주세요")
                navigate("/ShopMain")
              }
             else if(role=="ROLE_STORE"){
                try {
                    const rs = await axios.get("http://localhost:8080/store/exist", {
                        params: { id: userId }
                    });
                    if (rs.status === 200) {
                        console.log(rs.data)
                        if (rs.data == "exist") {
                            alert("이미 업체가 존재합니다")
                            navigate("/ShopMain")

        
                        } else {
                            navigate("/ShopJoin")
                        }
                    }
                } catch (e) {
                    console.log("연결실패", e);
                    alert("오류발생",e)
                }}
                // navigate("/ShopJoin")
              }
            
            // const ShopComment=async()=>{
  
            //     if(role==null){
            //         alert("로그인해주세요")
            //         navigate("/ShopMain")
            //       }
                

                

            //     try {
            //         const rs = await axios.get("http://localhost:8080/store/menuRs", {
            //             params: { id: userId }
            //         });
            //         if (rs.status === 200) {
            //             console.log(rs.data)
            //             if (rs.data != -1) {
            //                 setShopId(rs.data)
            //                 navigate("/ShopComment");
            //             } else {
            //                 console.log("승인받지 못함");
            //                 alert("업체승인받지 못함")
            //                 navigate("/ShopMain");
            //             }
            //         }
            //     } catch (e) {
            //         console.log("연결실패", e);
            //     }
            // }

            //권한확인
            const roleExist=async(src)=>{
  
                if(role==null){
                    alert("로그인해주세요")
                    navigate("/ShopMain")
                  }
                  else if(role=="ROLE_STORE"){

                

                try {
                    const rs = await axios.get("http://localhost:8080/store/menuRs", {
                        params: { id: userId }
                    });
                    if (rs.status === 200) {
                        console.log(rs.data)
                        if (rs.data != -1) {
                            setShopId(rs.data)
                            navigate(`/${src}`);
                        } else {
                            console.log("승인받지 못함");
                            alert("업체승인받지 못함")
                            navigate("/ShopMain");
                        }
                    }
                } catch (e) {
                    console.log("연결실패", e);
                }
            }}

            //업체관리 입장 확인 파트
            const ShopEdit=async(e)=>{
                e.preventDefault()
                if(role==null){
                    alert("로그인해주세요")
                    navigate("/ShopMain")
                  }
                  else if(role=="ROLE_STORE"){
                    try {
                        const rs = await axios.get("http://localhost:8080/store/exist", {
                            params: { id: userId }
                        });
                        if (rs.status === 200) {
                            console.log(rs.data)
                            if (rs.data == "SUCCESS") {
                                alert("업체를 등록해주세요")
                                navigate("/ShopMain")
    
            
                            } else {
                                navigate("/ShopEdit")
                            }
                        }
                    } catch (e) {
                        console.log("연결실패", e);
                        alert("오류발생",e)
                    }}
                    // navigate("/ShopJoin")
                  }
    
    return (
        <Nav defaultActiveKey="/dashboard" className="flex-column bg-light sidebar" style={{ height: '100vh', padding: '10px' }}>
            <div onClick={shopJoinButton}>
            <Nav.Link>
            <FaHome className="sidebar-icon" /> 업체 등록</Nav.Link>
                {/* <Nav.Link>업체 등록</Nav.Link> */}
                </div>
            <div onClick={shoppMenu}>
                {/* <Nav.Link>메뉴 목록</Nav.Link> */}
                <Nav.Link>
                <FaList className="sidebar-icon" /> 메뉴 목록
                </Nav.Link>
            </div>
            <div onClick={e=>{roleExist("ShopComment")}}>
                {/* <Nav.Link>댓글 관리</Nav.Link> */}
                <Nav.Link>
                <FaComment className="sidebar-icon" /> 댓글 관리
                </Nav.Link>
            </div>
            <div onClick={e=>{roleExist("ShopOrder")}}>
                {/* <Nav.Link>현재 주문상태</Nav.Link> */}
                <Nav.Link>
                <FaClipboardList className="sidebar-icon" /> 현재 주문상태
                </Nav.Link>
           </div>
           <div onClick={e=>{roleExist("ShopOrderReceipt")}}>
                {/* <Nav.Link>주문내역</Nav.Link> */}
                <Nav.Link>
                <FaHistory className="sidebar-icon" /> 주문내역
                </Nav.Link>
            </div>
            <div onClick={e=>{roleExist("ShopRevenue")}}>
      
                {/* <Nav.Link>매출내역</Nav.Link> */}
                <Nav.Link>
                <FaDollarSign className="sidebar-icon" /> 매출내역
                </Nav.Link>
            </div>

            <div onClick={ShopEdit}>
    
                {/* <Nav.Link>업체관리</Nav.Link> */}
                <Nav.Link>
                <FaEdit className="sidebar-icon" /> 업체관리
                </Nav.Link>
                </div>

            {/* <LinkContainer to="/ShopEdit">
                <Nav.Link>업체관리</Nav.Link>
            </LinkContainer> */}

        </Nav>
    );
};

export default Sidebar;