// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const UserJoin = () => {
//     const navigate=useNavigate()
//     const emailPass=false

//     const [name,setName] = useState("")
//     const [email,setEmail] = useState("")
//     const [password,setPassword]=useState("")

    
//     //회원가입
//     const joinClick= (e) => {
//         e.preventDefault();
//         if(name&&email&&password&&emailPass){
//         const signupData = {
//             email: email,
//             password: password,
//             name: name
            
//           };
          
//           // JWT 토큰을 설정합니다.
          
          
//           // POST 요청을 보냅니다.
//           axios.post('http://localhost:8080/user', signupData

//           )
//         .then(rs => {
//             const response = rs.data;
//             console.log(rs.data);

//             // 회원가입 성공 여부 확인
//             if (response == "SUCCESS") {
//                 navigate('/');
//             }else if(response=="emailFAIL"){
//                 alert("이메일이 중복입니다")
//             } else {
//                 alert("가입 실패");
//             }
//         }).catch(error => {
//             console.log(error);
//             alert("오류가 발생했습니다. 다시 시도해 주세요.");
//         });


//     }else{
//         alert("빈칸을채워주세요")
//     }}

//     //중복확인
//     const emailPassButton=(e)=>{
//         e.preventDefault()
//     }

//     //이메일 바뀔때마다 이메일 확인false로 변경하기 useEffect 로 
//     return (

//     <div>
//         <div id="main_container">
    
//             <div class="form_container">
    
//                 <div class="form">
    
    
//                     <form action="#">
//                         <p class="user_email">
//                             <label for="user_email">이메일(Id) </label><button class="btn_con2" onClick={emailPassButton}>중복확인</button> 
//                             <input type="email" id="user_email" onChange={(e)=>setEmail(e.target.value)}/>
//                         </p>
//                         <p class="user_name">
//                             <label for="user_name">사용자명(닉네임)</label>
//                             <input type="text" id="user_name" onChange={(e)=>setName(e.target.value)}/>
//                         </p>


//                     {/* <button  class="submit_btn">이메일 인증하기</button>
//                     {emailPass==true && <p class="login_user_password"> <label for="user_password">인증번호 확인:
//                     </label><input type="text"  class="emailpass" /> <button  class="btn_con">확인</button></p>}
//      */}
//                         <p class="user_password">
//                             <label for="user_password">비밀번호</label>
//                             <input type="password" id="user_password" onChange={(e)=>setPassword(e.target.value)}/>
//                         </p>
 
    
//                         <input type="submit" id="submit_btn" value="회원가입" class="submit_btn" onClick={joinClick}/>
//                     </form>
    
    
    
//         </div>
 
//     </div>
    
//     </div>
                
//             </div>
//     );
// };

// export default UserJoin;


import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserJoin = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailPass, setEmailPass] = useState(false);
    const [emailError, setEmailError] = useState("");

    // 회원가입
    const joinClick = (e) => {
        e.preventDefault();
        if (name && email && password && emailPass) {
            const signupData = {
                email: email,
                password: password,
                name: name
            };

            // POST 요청을 보냅니다.
            axios.post('http://localhost:8080/user', signupData)
                .then(rs => {
                    const response = rs.data;
                    console.log(rs.data);

                    // 회원가입 성공 여부 확인
                    if (response === "SUCCESS") {
                        navigate('/');
                    } else if (response === "emailFAIL") {
                        alert("이메일이 중복입니다");
                    } else {
                        alert("가입 실패");
                    }
                }).catch(error => {
                    console.log(error);
                    alert("오류가 발생했습니다. 다시 시도해 주세요.");
                });
        } else {
            alert("빈칸을 채워주세요");
        }
    };

    // 중복확인
    const emailPassButton = (e) => {
        e.preventDefault();
        // 나중에 주석 취소하기
        // if (emailError) {
        //     alert("올바른 이메일 형식을 입력해주세요.");
        //     return;
        // }

        axios.post('http://localhost:8080/user/checkEmail', { email: email })
            .then(rs => {
                const response = rs.data;
                if (response === "available") {
                    setEmailPass(true);
                    alert("사용 가능한 이메일입니다.");
                } else {
                    setEmailPass(false);
                    alert("이미 사용 중인 이메일입니다.");
                }
            }).catch(error => {
                console.log(error);
                alert("오류가 발생했습니다. 다시 시도해 주세요.");
            });
    };

    // 이메일 변경 시 이메일 형식 검증
    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address");
            setEmailPass(false);
        } else {
            setEmailError("");
        }
    }, [email]);

    return (
        <div>
            <div id="main_container">
                <div className="form_container">
                    <div className="form">
                        <form action="#">
                            <p className="user_email">
                                <label htmlFor="user_email">이메일(Id) </label>
                                <button className="btn_con2" onClick={emailPassButton}>중복확인</button>
                                <input
                                    type="email"
                                    id="user_email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                            </p>
                            <p className="user_name">
                                <label htmlFor="user_name">사용자명(닉네임)</label>
                                <input
                                    type="text"
                                    id="user_name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </p>
                            <p className="user_password">
                                <label htmlFor="user_password">비밀번호</label>
                                <input
                                    type="password"
                                    id="user_password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </p>
                            <input
                                type="submit"
                                id="submit_btn"
                                value="회원가입"
                                className="submit_btn"
                                onClick={joinClick}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserJoin;
