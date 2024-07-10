import React, { useEffect } from 'react';
import { useContext } from "react";
import { AdminFlagContext } from "../../flag/Flag.jsx";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Kakao = () => {
    const navigate = useNavigate();
    const {user,setUser}=useContext(AdminFlagContext)
    useEffect(() => {
        
        const code = new URL(window.location.href).searchParams.get("code");
        if (code) {
            console.log(code)
            const loginClick = async(e) => {
    
        
                try{
                const rs=await axios.get("http://localhost:8080/kakao/kakaoToken",{params:{code:code} })
                const data=rs.data
                const headers=rs.headers
                console.log(headers.authorization.replace("Bearer ",""))
                console.log(rs)
                if (rs.status==200){
        
                    //토큰으로 저장
                    // setCookie('jwtToken', headers.authorization.replace("Bearer ",""), { path: '/', maxAge: 100 }); // 쿠키 유효 기간을 설정
                    //플래그에 유저 인증 jwt 토큰 저장
                    setUser(headers.authorization.replace("Bearer ",""))
        
                    navigate("/UserMain")
                }
                
                
            }
                catch(e){
                    console.log("로그인오류",e)
                    alert("로그인 오류")
                }


            }

            loginClick();

        }
    }, []);
    return (
        <div>
            로그인중입니다
        </div>
    );
};

export default Kakao;