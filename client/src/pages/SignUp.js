import "./SignUp.css"
import axios from "axios"
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CompleteSignUp from '../components/SignUp/CompleteSignUp'

export default function SignUp() {

    const [userInfo, setUserInfo] = useState({
        name: "",
        password: "",
        passwordconfirm: "",
        emailId: "",
        emailDomain: "",
        verificationCode: "",
    })


    const [name, setName] = useState("");
    const [emailCode, setEmailCode] = useState("");
    const [isPossiblePassword, setIsPossiblePassword] = useState(0);
    const [isConfirmPassword, setIsConfirmPassword] = useState(0);
    const [isConfirmEmail, setIsConFirmEmail] = useState(0);
    const [completeSignUp, setCompleteSignUp] = useState(false)



    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
        // console.log(userInfo)
    };

    let history = useHistory()

    const handleConfirmEmail = () => {
        if (userInfo.verificationCode === emailCode) {
            setEmailCode(1);
        } else {
            setEmailCode(-1);
        }
        // console.log(emailCode);
    };

    const handleSubmit = () => {
        const {
            name,
            password,
            emailId,
            emailDomain,
        } = userInfo;

        const email = `${emailId}@${emailDomain}`;

        if (isConfirmEmail === -1 || isConfirmEmail === 0) {
            return alert("이메일 인증 절차를 진행하세요");
        }

        if (name && password && emailId && emailDomain) {
            axios({
                url: `${process.env.REACT_APP_SERVER_API}/user/signup`,
                method: "post",
                data: {
                    name,
                    password,
                    email,
                },
            }).then(() => {
                console.log("회원가입 완료");
                setCompleteSignUp(true)
                console.log(completeSignUp)
            })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            return alert("입력하지 않은 항목이 존재합니다.");
        }
    };


    const handleConfirmPassword = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
        if (e.target.value !== userInfo.password) {
            setIsConfirmPassword(-1);
        }
        if (e.target.value === userInfo.password) {
            setIsConfirmPassword(1);
        }
    };

    const verifyPassword = (password) => {
        let reg = /^[a-zA-Z0-9]{10,15}$/; //숫자와 영문자 조합으로 10~15자리를 사용
        return reg.test(password);
    };


    const handleEmailVerification = () => {
        axios({
            url: `${process.env.REACT_APP_SERVER_API}/user/mailverify`,
            method: "post",
            data: { receiver: `${userInfo.emailId}@${userInfo.emailDomain}` },
        })
            .then((res) => {
                if (res.data.data) {
                    //res.data.data 가 문자열일때 (이메일 계정으로 회원가입 가능)
                    setEmailCode(res.data.data);
                    // console.log(res.data.data)
                    setIsConFirmEmail(1);
                } else {
                    //res.data.data === null (해당 이메일 계정이 이미 존재할때)
                    setIsConFirmEmail(-1);
                }
                //console.log(emailCode);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    useEffect(() => {
        setName(userInfo.name);
    }, [userInfo.name]);


    useEffect(() => {
        //console.log(userInfo.password);
        if (!verifyPassword(userInfo.password) && userInfo.password === "") {
            setIsPossiblePassword(0);
        } else if (verifyPassword(userInfo.password)) {
            setIsPossiblePassword(1);
        } else {
            setIsPossiblePassword(-1);
        }
    }, [userInfo.password]);




    return (
        <>
            {completeSignUp
                ? (
                    <CompleteSignUp />
                )
                : (
                    <>
                        <head>
                            <link rel='preconnect' href='https://fonts.googleapis.com' />
                            <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
                            <link
                                href='https://fonts.googleapis.com/css2?family=Gaegu:wght@300&display=swap'
                                rel='stylesheet'
                            />
                        </head>
                        <div className="signUp-container">
                            <div className='title'>
                                <img alt='login-title' className='login-title' src='img/logo.svg'></img>
                                <span className='login-logo'>느린 우체통</span>
                            </div>
                            <div className='signUp-section'>
                                <div className='main-section'>

                                    <div className='section-email'>
                                        <div className='title-email'>이메일</div>
                                        <div className='input-container'>
                                            <input className='input-email' name='emailId' onChange={handleChange} />@<input className='input-domain' name='emailDomain' onChange={handleChange} />
                                        </div>
                                        <button className='send-authcode-button' onClick={handleEmailVerification}>인증코드발송</button>

                                    </div>
                                    <div className='section-confirm-email'>{isConfirmEmail === 1 ? '이메일로 코드를 전송했습니다' : ''}{isConfirmEmail === -1 ? '해당이메일로 가입된 계정이 있습니다.' : ''}</div >


                                    <div className='section-auth'>
                                        <div className='title-auth'>인증코드</div>
                                        <input className='input-authcode' name='verificationCode' onChange={handleChange}></input>
                                        <button className='check-auth' onClick={handleConfirmEmail}>인증코드 확인</button>
                                    </div>
                                    <div className='scetion-check-authcode'>{emailCode === 1 ? '인증에 성공하였습니다' : ''}{emailCode === -1 ? '인증번호가 다릅니다' : ''}</div>


                                    <div className='section-name'>
                                        <div className='title-name'>이름</div>
                                        <input className='input' name='name' onChange={handleChange}></input>
                                    </div>


                                    <div className='section-password'>
                                        <div className='title-password'>비밀번호</div>
                                        <input className='input' type='password' name='password' onChange={handleChange}></input>
                                    </div>
                                    <div className='section-possible'> {isPossiblePassword === 1 ? '사용가능한 비밀번호입니다' : ''}
                                        {isPossiblePassword === -1 ? '비밀번호는 숫자와 영문자 조합으로 10~15자리를 사용해야합니다.' : ''}</div>

                                    <div className='section-password'>
                                        <div className='title-password'>비밀번호확인</div>
                                        <input className='input' type='password' name='passwordconfirm' onChange={handleConfirmPassword}></input>
                                    </div>
                                    <div className='section-confirm'>{isConfirmPassword === 1 ? '비밀번호가 일치합니다' : ''}{isConfirmPassword === -1 ? '비밀번호가 일치하지 않습니다.' : ''}</div >

                                    <div className='section-submit'>
                                        <div className='title-button'>
                                            <button className='submit-button' onClick={handleSubmit}>가입완료</button>
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div className='bottom-section'></div>
                        </div>
                    </>
                )}
        </>


    )
}