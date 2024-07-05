import React from 'react';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <div className="header-wrapper">
            <Container>
                <div className="logo-container">
                    <img src="/asset/logo.png" alt="Delivery.Oracle" className="logo" />
                    
                    <div className="headertitle">
                        <h1>Do Eat!</h1>
                        <h1>Delivery Oracle</h1>
                        <p>홈페이지에 오신 것을 환영합니다.</p>
                    </div>
                    
                </div>
            </Container>
        </div>
    );
};

export default Header;
