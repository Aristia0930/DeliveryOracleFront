import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


const ShopMain = () => {
    const navigate = useNavigate();    
    //이것또한 나중에 아이디 값으로 조회해서 역할이 상점 주인일경우에만 넘어가도록 요청 api를 추가한다.
    const [cookies] = useCookies(['jwtToken']);
    const [userDate,setUserDate]=useState("")
    //쿠키에 저장된 jwt를 기반으로 아이디값 받아오기
    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = cookies.jwtToken;
            console.log("jwt 불러오는ㄴ")
            try {
                const response = await axios.get('http://localhost:8080/api/api/userinfo', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                console.log(response.data.user_id);
                setUserDate(response.data.user_id)
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserInfo();
    }, [cookies]);
    
    const shopjoin=(e)=>{
    e.preventDefault()
    if(userDate){
        navigate("/ShopJoin",{state : {id:userDate}})
    }
    else{
        alert("로그인해주세요")
    }

    

    }

const shopRS=async(e)=>{
    e.preventDefault()
    //아이디값을 넘겨서 그 아이디값의 상점 주인이 승인 되었는 확인하는 절차

    //상점 아이디값이 받아오는
    try {
        const rs = await axios.get("http://localhost:8080/store/menuRs", {
            params: { id: userDate }
        });
        if (rs.status === 200) {
            console.log(rs.data)
            if (rs.data != -1) {
                navigate("/ShopMenu", { state: { approvalStatus: rs.data } });
            } else {
                console.log("승인받지 못함");
            }
        }
    } catch (e) {
        console.log("연결실패", e);
    }



}
    return (
        <div>
            <button onClick={shopjoin}>업체등록하기</button>
            <button onClick={shopRS}>메뉴목록</button>

        </div>
    );
};

export default ShopMain;