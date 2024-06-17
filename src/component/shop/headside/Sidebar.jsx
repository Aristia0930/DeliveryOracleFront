import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Sidebar = () => {
    return (
        <Nav defaultActiveKey="/dashboard" className="flex-column bg-light" style={{ height: '100vh', padding: '10px' }}>
            <LinkContainer to="/ShopJoin">
                <Nav.Link>업체 등록</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/ShopMenu">
                <Nav.Link>메뉴 목록</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/manager-approve">
                <Nav.Link>댓글 관리</Nav.Link>
            </LinkContainer>
            {/* Add more links as needed */}
        </Nav>
    );
};

export default Sidebar;