import React from 'react';
import { useNavigate } from 'react-router-dom';



const ShopMain = () => {
    const navigate = useNavigate();    
const shopjoin=(e)=>{
    e.preventDefault()
    navigate("/ShopJoin")

}
    return (
        <div>
            <button onClick={shopjoin}>업체등록하기</button>
            <button onClick={shopjoin}>업체등록하기</button>
        </div>
    );
};

export default ShopMain;