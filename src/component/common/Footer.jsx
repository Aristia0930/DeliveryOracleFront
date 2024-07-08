import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../css/Footer.css';

const Footer = () => {
    return (
        
        <footer className="footer mt-auto py-3" >
            <Container>
                <Row>
                    <Col md={4} className="footer-column text-md-left">
                        <h5>(주) DeliveryOracle</h5>
                        <p>소비자와 업체는 모두 우리의 소중한 고객이라는 생각으로 서비스하는 배달 플랫폼입니다.</p>
                    </Col>
                    <Col md={4} className="footer-column text-md-center">
                        <h5>Contact Us</h5>
                        <ul className="list-unstyled">
                            <li>Email: deliveryoracle@deliveryoracle_support.com</li>
                            <li>Phone: 010-1111-2222</li>
                            <li>Address: 서울특별시 금천구 독산동</li>
                        </ul>
                    </Col>
                    <Col md={4} className="footer-column text-md-right">
                        <p className="rights-text">&copy; {new Date().getFullYear()} DeliveryOracle. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

// const Footer = () => {
//     return (
//         <footer className="footer">
//             <Container>
//                 <Row>
//                     <Col md={4} className="footer-column text-md-left">
//                         <h5>(주) DeliveryOracle</h5>
//                         <p>소비자와 업체는 모두 우리의 소중한 고객이라는 생각으로 서비스하는 
//                            배달 플랫폼 DeliveryOracle!</p>
//                     </Col>
//                     <Col md={4} className="footer-column text-md-center">
//                         <h5>Contact Us</h5>
//                         <ul className="list-unstyled">
//                             <li>Email: deliveryoracle@deliveryoracle_support.com</li>
//                             <li>Phone: 010-1111-2222</li>
//                             <li>Address: 서울특별시 금천구 독산동</li>
//                         </ul>
//                     </Col>
//                     <Col md={4} className="footer-column text-md-right">
//                         <p className="rights-text">&copy; {new Date().getFullYear()} DeliveryOracle. All rights reserved.</p>
//                     </Col>
//                 </Row>
//             </Container>
//         </footer>
//     );
// };

export default Footer;