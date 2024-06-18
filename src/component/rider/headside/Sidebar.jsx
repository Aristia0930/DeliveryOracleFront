import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Sidebar = () => {

    return (
        <Nav defaultActiveKey="/dashboard" className="flex-column bg-light" style={{ height: '100vh', padding: '10px' }}>
            <LinkContainer to="/">
                <Nav.Link>콜받기</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/manager-main">
                <Nav.Link>주문내역확인</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/manager-approve">
                <Nav.Link>money</Nav.Link>
            </LinkContainer>
            {/* Add more links as needed */}
        </Nav>
    );
};

export default Sidebar;