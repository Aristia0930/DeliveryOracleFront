import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <Navbar bg="#8ddba0" variant="dark">
            <Container>
                <Navbar.Brand href="/">User Dashboard</Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default Header;