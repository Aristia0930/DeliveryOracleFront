import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const Main = () => {
    const navigate = useNavigate();

    //연결테스트

    const onButtonClick=async(e) =>{
        e.preventDefault();

        try{
            const rs=await axios.get("http://localhost:8080/api/hello")
            console.log(rs.data)
        }catch(error){
            console.log(error)
        }


    }

    //유저로그인 페이지이동 
    const userbutton=(e)=>{
        e.preventDefault()
         navigate("/UserMain")

    }

    //업체 페이지 이동
    const shopbutton=(e)=>{
        e.preventDefault()
       navigate("/ShopMain")

    }
    //관리자 페이지 이동


    return (
        <div>
            <button onClick={userbutton}>유저 페이지</button>
            <button onClick={shopbutton}>업체 페이지</button>

            <button onClick={onButtonClick}>연결테스트</button>
            
        </div>
    );
};

export default Main;