import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShopMenu = () => {
    const navigate=useNavigate()


    //메뉴 추가버튼 누르기전에 현재 업체가 승인 되었는지 먼전 확인하는 절차 완성하기

    const shopRS=(e)=>{
        e.preventDefault()
        navigate("/ShopMenuRs")
    
    }
    return (
        <div>
            <button onClick={shopRS}>메뉴추가하기</button>
        </div>
    );
};

export default ShopMenu;