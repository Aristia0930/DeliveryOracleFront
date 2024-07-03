
// import React, { useEffect, useState } from 'react';
// import { Link, useLocation,useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Nav from 'react-bootstrap/Nav';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useContext } from "react";
// import { AdminFlagContext } from "../../flag/Flag.jsx";
// import TabMenu from '../commom/TabMenu.jsx';
// import Header from '../commom/Header.jsx';
// import { useWebSocket  } from "../../flag/WebSocketContext.jsx";
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card'
// import StarRating from '../user/StartRating.jsx';
// import { BsFillFlagFill, BsChatFill } from 'react-icons/bs'; // react-icons에서 사용할 아이콘을 가져옵니다
// import Modal from 'react-bootstrap/Modal'; // Bootstrap의 Modal 컴포넌트 import
// const ShopCommentList = ({array}) => {
//     const navigate = useNavigate();
//     const {user,setUser,userId,setUserId,shopId,setShopid,userDate, setUserDate}=useContext(AdminFlagContext)


//     const [showModal, setShowModal] = useState(false); // 팝업 창 열고 닫기 상태
//     const [showModal2, setShowModal2] = useState(false); // 팝업 창 열고 닫기 상태//답글
//     const [reportText, setReportText] = useState(''); // 신고 내용을 저장할 상태 변수

//     // 팝업 열기 함수
//     const handleOpenModal = () => {
//         setShowModal(true);
//     }

//     // 팝업 닫기 함수
//     const handleCloseModal = () => {
//         setShowModal(false);
//     }

//     //답글 팝업함수
//         // 팝업 열기 함수
//         const handleOpenModal2 = () => {
//             setShowModal2(true);
//         }
    
//         // 팝업 닫기 함수
//         const handleCloseModal2 = () => {
//             setShowModal2(false);
//         }

//     //신고하기 버튼
//     const handleReport =async(e)=>{
//         e.preventDefault();

//         const reportData = {
//             commentId: array.commentId,
//             commentAuthorId: array.authorId,
//             reportText: reportText,
//             reporterId: userId
//         };

        
//         try{
//             const rs=await axios.post("http://localhost:8080/store/report", reportData)
//             if(rs.status==200){
//                 alert("신고하기성공")
//                 handleCloseModal();
//                 navigate("/ShopMain")
                

//             }
//         }catch(e){
//             console.log("신고실패",e)
//         }

//     }
//     //답글쓰기
//     const commentText=async(e)=>{
//         e.preventDefault();

//         try{
//             const rs=await axios.post("http://localhost:8080/comments/reply", {storeId:array.storeId,authorId:userId,authorName:userDate.name,content:reportText,replyId:array.commentId})
//             if(rs.status==201){
//                 alert("답글쓰기 성공 ")
//                 handleCloseModal2();
//                 navigate("/ShopMain")
                

//             }
//         }catch(e){
//             console.log("답글작성 실패",e)
//         }


//     }


//     return (
//         <div>
//   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//             {array.depth === 1 && (
//                 <div style={{ marginBottom: '20px', width: '100%' }}>
//                     <Card style={{ width: '100%', maxWidth: '600px', margin: '0 auto', border: '1px solid #007bff', borderRadius: '10px' }}>
//                         <Card.Body>
//                             <Card.Title style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                 <span>작성자: {array.authorName}</span>
//                                 <StarRating initialRating={array.rating} />
//                             </Card.Title>
//                             <Card.Text>{array.content}</Card.Text>
//                             {array.visibilityStatus === 1 && (
//                                 <Button variant="danger" style={{ marginRight: '10px' }} onClick={handleOpenModal}>
//                                     <BsFillFlagFill /> 신고하기
//                                 </Button>
//                             )}
//                             <Button variant="primary" onClick={handleOpenModal2}>
//                                 <BsChatFill /> 답글쓰기
//                             </Button>
//                         </Card.Body>
//                     </Card>
//                 </div>
//             )}
//             {array.depth === 2 && (
//                 <div style={{ position: 'relative', marginLeft: '40px', marginBottom: '20px', width: '100%' }}>
             
//                     <Card style={{ width: '100%', maxWidth: '560px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
//                         <Card.Body>
//                             <Card.Title style={{ fontSize: '1rem', fontWeight: 'bold' }}>
//                                 작성자: {array.authorName}
//                             </Card.Title>
//                             <Card.Text style={{ fontSize: '0.9rem' }}>
//                                 {array.content}
//                             </Card.Text>
//                         </Card.Body>
//                     </Card>
//                 </div>
//             )}
//         </div>
// <>
//          {/* 팝업 */}
//          <Modal show={showModal} onHide={handleCloseModal}>
//          <Modal.Header closeButton>
//              <Modal.Title>신고 내용 입력</Modal.Title>
//          </Modal.Header>
//          <Modal.Body>
//              <input
//                  type="text"
//                  value={reportText}
//                  onChange={(e) => setReportText(e.target.value)}
//                  placeholder="신고 내용을 입력하세요"
//                  style={{ width: '100%', padding: '10px' }}
//              />
//          </Modal.Body>
//          <Modal.Footer>
//              <Button variant="secondary" onClick={handleCloseModal}>
//                  닫기
//              </Button>
//              <Button variant="primary" onClick={handleReport}>
//                  신고하기
//              </Button>
//          </Modal.Footer>
//      </Modal></>
// <>
     
//          {/* 답글팝업 */}
//          <Modal show={showModal2} onHide={handleCloseModal2}>
//          <Modal.Header closeButton>
//              <Modal.Title>신고 내용 입력</Modal.Title>
//          </Modal.Header>
//          <Modal.Body>
//              <input
//                  type="text"
//                  value={reportText}
//                  onChange={(e) => setReportText(e.target.value)}
//                  placeholder="답글을 입력하세요"
//                  style={{ width: '100%', padding: '10px' }}
//              />
//          </Modal.Body>
//          <Modal.Footer>
//              <Button variant="secondary" onClick={handleCloseModal2}>
//                  닫기
//              </Button>
//              <Button variant="primary" onClick={commentText}>
//                  답글작성
//              </Button>
//          </Modal.Footer>
//      </Modal></>
//  </div>
//     );
// };

// export default ShopCommentList;

import React, { useEffect, useState } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";
import TabMenu from '../common/TabMenu.jsx';
import Header from '../common/Header.jsx';
import { useWebSocket  } from "../../flag/WebSocketContext.jsx";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import StarRating from '../user/StartRating.jsx';
import {  BsFillFlagFill, BsChatFill, BsPencilFill, BsTrashFill } from 'react-icons/bs'; // react-icons에서 사용할 아이콘을 가져옵니다
import Modal from 'react-bootstrap/Modal'; // Bootstrap의 Modal 컴포넌트 import

const ShopCommentList = ({ array ,setCheck,index}) => {
    const navigate = useNavigate();
    const { user,setUser,userId,setUserId,shopId,setShopid,userDate, setUserDate } = useContext(AdminFlagContext);

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [reportText, setReportText] = useState('');
    const[content,setContent]=useState("")
    const [editText, setEditText] = useState('');

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleOpenModal2 = () => setShowModal2(true);
    const handleCloseModal2 = () => setShowModal2(false);

    const handleOpenEditModal = () => setShowEditModal(true);
    const handleCloseEditModal = () => setShowEditModal(false);

    const handleReport = async (e) => {
        e.preventDefault();
        const reportData = {
            commentId: array.commentId,
            commentAuthorId: array.authorId,
            reportText: reportText,
            reporterId: userId
        };
        try {
            const rs = await axios.post("http://localhost:8080/store/report", reportData);
            if (rs.status === 200) {
                alert("신고하기 성공");
                handleCloseModal();
                setCheck(index+"re")
            }
        } catch (e) {
            console.log("신고 실패", e);
        }
    };

    const commentText = async (e) => {
        e.preventDefault();
        try {
            const rs = await axios.post("http://localhost:8080/comments/reply", {
                storeId: array.storeId,
                authorId: userId,
                authorName: userDate.name,
                content: content,
                replyId: array.commentId
            });
            if (rs.status === 201) {
                alert("답글쓰기 성공");
                handleCloseModal2();
                setCheck(index)
            }
        } catch (e) {
            console.log("답글 작성 실패", e);
        }
    };

    //수정해야할것들

    const handleEditReply = async (e) => {
        e.preventDefault();
        //put라 해서 상관없이 스프링에 맞게 수정
        try {
            const rs = await axios.put(`http://localhost:8080/comments/reply`, {
                commentId:array.commentId,
                content: editText
            });
            if (rs.status === 200) {
                alert("답글 수정 성공");
                handleCloseEditModal();
                setCheck(index+"ed")
            }
        } catch (e) {
            console.log("답글 수정 실패", e);
        }
    };

    const handleDeleteReply = async () => {
        
        try {
            const rs = await axios.delete(`http://localhost:8080/comments/replyUrv/${array.commentId}`);
            if (rs.status === 200) {
                alert("답글 삭제 성공");
                setCheck(index+"de")
            }
        } catch (e) {
            console.log("답글 삭제 실패", e);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                {array.depth === 1 &&array.visibilityStatus!=0&& (
                    <div style={{ marginBottom: '20px', width: '100%' }}>
                        <Card style={{ width: '100%', maxWidth: '600px', margin: '0 auto', border: '1px solid #007bff', borderRadius: '10px' }}>
                            <Card.Body>
                                <Card.Title style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>작성자: {array.authorName}</span>
                                    <StarRating initialRating={array.rating} />
                                </Card.Title>
                                <Card.Text>{array.content}</Card.Text>
                                {array.visibilityStatus === 1 && (
                                    <Button variant="danger" style={{ marginRight: '10px' }} onClick={handleOpenModal}>
                                        <BsFillFlagFill /> 신고하기
                                    </Button>
                                )}
                                <Button variant="primary" onClick={handleOpenModal2}>
                                    <BsChatFill /> 답글쓰기
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                )}
                {array.depth === 2 &&array.visibilityStatus!=0&& (
                    <div style={{ position: 'relative', marginLeft: '40px', marginBottom: '20px', width: '100%' }}>
                        <Card style={{ width: '100%', maxWidth: '560px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
                            <Card.Body>
                                <Card.Title style={{ fontSize: '1rem', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>작성자: {array.authorName}</span>
                                    <div>
                                        <Button variant="outline-secondary" size="sm" style={{ marginRight: '5px' }} onClick={handleOpenEditModal}>
                                            <BsPencilFill />
                                        </Button>
                                        <Button variant="outline-danger" size="sm" onClick={handleDeleteReply}>
                                            <BsTrashFill />
                                        </Button>
                                    </div>
                                </Card.Title>
                                <Card.Text style={{ fontSize: '0.9rem' }}>
                                    {array.content}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                )}

{array.depth === 1 &&array.visibilityStatus==0&& (
                    <div style={{ marginBottom: '20px', width: '100%' }}>
                        <Card style={{ width: '100%', maxWidth: '600px', margin: '0 auto', border: '1px solid #007bff', borderRadius: '10px' }}>
                            <Card.Body>
                                <Card.Title style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3>삭제된 댓글 입니다</h3>
                                </Card.Title>
              
                            </Card.Body>
                        </Card>
                    </div>
                )}
            </div>

            {/* 신고 팝업 */}
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
            </Modal>

            {/* 답글 작성 팝업 */}
            <Modal show={showModal2} onHide={handleCloseModal2}>
                <Modal.Header closeButton>
                    <Modal.Title>답글 입력</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="답글을 입력하세요"
                        style={{ width: '100%', padding: '10px' }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal2}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={commentText}>
                        답글작성
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* 답글 수정 팝업 */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>답글 수정</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        placeholder="수정할 내용을 입력하세요"
                        style={{ width: '100%', padding: '10px' }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={handleEditReply}>
                        수정하기
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ShopCommentList;
