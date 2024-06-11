import React from 'react';
import { useNavigate } from 'react-router-dom';



const ShopMain = () => {
    const navigate = useNavigate();    
const shopjoin=(e)=>{
    e.preventDefault()
    navigate("/ShopJoin")

}

const shopRS=(e)=>{
    e.preventDefault()
    navigate("/ShopMenu")

}
    return (
        <div>
            <button onClick={shopjoin}>업체등록하기</button>
            <button onClick={shopRS}>메뉴목록</button>

        </div>
    );
};

export default ShopMain;