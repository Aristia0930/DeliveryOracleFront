import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Search from './Search';


const Header = () => {
    return (
        
        <Navbar expand="xl" className="navbar">
            <Container>
                <p>배달</p>

                <Search/>
                <Form className="d-flex">
                </Form><p>로그인</p>
            </Container>


        </Navbar >

    );
};

export default Header;