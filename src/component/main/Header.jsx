import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import '../../css/Header.css';

const Header = () => {
    const txtArr = ['Do Eat!', 'Delivery Oracle'];
    //userState 훅을 사용해 현재 텍스트 currentTxt, 현 텍스트의 인덱스(index) 그리고 삭제중인지 아닌지 여부(isDeleting)를 관리한다.
    const [index, setIndex] = useState(0);
    const [currentTxt, setCurrentTxt] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    //useEffect 훅을 사용해 'currentTxt', 'isDeleting', 'index' 상태가 변결될 때마다 애니메이션 처리
    useEffect(() => {
        let timer;

        /* 텍스트가 모두 작성되었을때 'currentTxt === txtArr[index]'가 3초간 대기 후
           !isDeleting => isDeleting : (true)로 전환된다.
        */
        if (!isDeleting && currentTxt === txtArr[index]) {
            timer = setTimeout(() => setIsDeleting(true), 3000);
        
        /* 텍스트가 모두 삭제되었을때 currentTxt === '' 다음 텍스트로 전환하고, 
           작성 모드 isDeleting : false로 전환된다.
        */
        } else if (isDeleting && currentTxt === '') {
            setIsDeleting(false);
            setIndex((prevIndex) => (prevIndex + 1) % txtArr.length);
        } else {
            timer = setTimeout(() => {
                setCurrentTxt((prev) => {
                    if (isDeleting) {
                        return prev.slice(0, -1);
                    } else {
                        return txtArr[index].slice(0, prev.length + 1);
                    }
                });
                //텍스트를 작성 또는 삭제하는 동안 0~100ms 사이의 지연시간을 설정해 애니메이션 효과를 만든다.
            }, Math.floor(Math.random() * 150)); // 동작시켰을때 너무 빨라 보여서 여기서는 150으로 설정해서 지연시간을 조금 더 길게 잡아 주었다.
        }

        return () => clearTimeout(timer);
    }, [currentTxt, isDeleting, index]);

    return (
        <div className="header-wrapper">
            <Container>
                <div className="logo-container">
                    <img src="/asset/logo.png" alt="Delivery.Oracle" className="logo" />
                    <div className="headertitle">
                        <h2><span>{currentTxt}</span></h2>
                        <p>홈페이지에 오신 것을 환영합니다.</p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Header;


// 기존에 작성된 코드
// import React from 'react';
// import { Container } from 'react-bootstrap/Container';
// import 'bootstrap/dist/css/bootstrap.min.css';
// const Header = () => {
//     return (
//         <div className="header-wrapper">
//             <Container>
//                 <div className="logo-container">
//                     <img src="/asset/logo.png" alt="Delivery.Oracle" className="logo" />
                    
//                     <div className="headertitle">
//                         <h1>Do Eat!</h1>
//                         <h1>Delivery Oracle</h1>
//                         <p>홈페이지에 오신 것을 환영합니다.</p>
//                     </div>
                    
//                 </div>
//             </Container>
//         </div>
//     );
// };
// export default Header;