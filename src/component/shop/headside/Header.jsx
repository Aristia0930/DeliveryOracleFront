// import React, { useEffect, useContext } from 'react';
// import { Navbar, Container } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import { AdminFlagContext } from "../../../flag/Flag.jsx";

// const Header = () => {

//     const { user,setUser,userDate,setUserDate,userId,setUserId,shopId,setShopid,user_x,setX,user_y,setY,userInfo,setUserInfo} = useContext(AdminFlagContext);
//     const navigate = useNavigate();  

    
//     const userlogin=(e)=>{
//         e.preventDefault()
//         navigate("/ShopUserLogin")

//     }

//     const userjoin=(e)=>{
//         e.preventDefault()
//         navigate("/ShopUserJoin")

//     }

//     const userlogout=(e)=>{
//         e.preventDefault()
//         setUser(null)
//         window.location.href = "/ShopMain";

//     }
//     return (
//         <Navbar bg="dark" variant="dark" expand="lg">
//             <Container>
//                 <Navbar.Brand><Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>Company Dashboard</Link></Navbar.Brand>
//             </Container>
//             <Container className="justify-content-end">
//                 <Form className="d-flex">
//                     {user == null &&
//                         <>
//                             <Button onClick={userlogin} className="me-2">로그인</Button>
//                             <Button onClick={userjoin}>회원가입</Button>
//                         </>
//                     }
//                     {user && <Button onClick={userlogout}>로그아웃</Button>}
//                 </Form>
//             </Container>
//         </Navbar>
//     );
// };

// export default Header;

import React, { useEffect, useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AdminFlagContext } from "../../../flag/Flag.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';  // Import custom CSS for Header

const Header = () => {
    const { user, setUser, userDate } = useContext(AdminFlagContext);
    const navigate = useNavigate();

    const userlogin = (e) => {
        e.preventDefault();
        navigate("/ShopUserLogin");
    };

    const userjoin = (e) => {
        e.preventDefault();
        navigate("/ShopUserJoin");
    };

    const userlogout = (e) => {
        e.preventDefault();
        setUser(null);
        window.location.href = "/ShopMain";
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="header-navbar">
            <Container>
                <Navbar.Brand as={Link} to="/ShopMain" className="brand">
                    Company Dashboard
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        {user ? (
                            <NavDropdown title="User Menu" id="user-menu-dropdown" alignRight>
                                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={userlogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Form className="d-flex">
                                <Button onClick={userlogin} className="me-2">로그인</Button>
                                <Button onClick={userjoin}>회원가입</Button>
                            </Form>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
