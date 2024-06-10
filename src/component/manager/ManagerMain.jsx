import React from 'react';
import { useNavigate } from 'react-router-dom';

const ManagerMain = () => {
    const navigate = useNavigate();    
    
    const approve=(e)=>{
        e.preventDefault()
        navigate("/ManagerApprove")
    }
    return (
        <div>
            <button onClick={approve}>업체승인하기</button>
        </div>
    );
};

export default ManagerMain;