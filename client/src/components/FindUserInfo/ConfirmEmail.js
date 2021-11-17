import React, { useState, useEffect } from 'react'
import './ConfirmEmail.css'
import axios from 'axios';

export default function ConfirmEmail({ isConfirmEmail, setIsConFirmEmail, setUserEmail }) {
    const [userInfo, setUserInfo] = useState({
        emailId: "",
        emailDomain: "",
        verificationCode: "",
    })

    const [isSendEmail, setIsSendEmail] = useState(0)
    const [emailCode, setEmailCode] = useState(0);

    const handleConfirmEmail = () => {
        if (userInfo.verificationCode === emailCode) {
            setEmailCode(1);
            setIsConFirmEmail(1);
            setUserEmail(`${userInfo.emailId}@${userInfo.emailDomain}`)
        } else {
            setEmailCode(-1);
        }
    };
    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });

    };



    const handleEmailVerification = () => {
        axios({
            url: `${process.env.REACT_APP_SERVER_API}/user/finduserinfo`,
            method: "post",
            data: { receiver: `${userInfo.emailId}@${userInfo.emailDomain}` },
        })
            .then((res) => {
                if (res.data.data) {
                    setEmailCode(res.data.data);
                    setIsSendEmail(1)
                    setUserEmail(res.data.email)
                    // setIsConFirmEmail(1);
                } else {
                    setIsConFirmEmail(-1);
                    setIsSendEmail(-1);
                }

            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="confirmEmail-container">
            <div className='section-email'>
                <div className='title-email'>이메일</div>
                <div className='input-container'>
                    <input className='input-email' name='emailId' onChange={handleChange} />@<input className='input-domain' name='emailDomain' onChange={handleChange} />
                </div>
                <button className='send-authcode-button' onClick={handleEmailVerification}>인증코드발송</button>
            </div>
            <div className='section-confirm-email'>{isSendEmail === 1 ? '이메일로 코드를 전송했습니다' : ''}{isSendEmail === -1 ? '가입된 정보가 없습니다.' : ''}</div >
            <div className='section-auth'>
                <div className='title-auth'>인증코드</div>
                <input className='input-authcode' name='verificationCode' onChange={handleChange} ></input>
                <button className='check-auth' onClick={handleConfirmEmail}>인증코드 확인</button>
            </div>
            <div className='scetion-check-authcode'>{emailCode === 1 ? '인증에 성공하였습니다' : ''}{emailCode === -1 ? '인증번호가 다릅니다' : ''}</div>
        </div>
    )
}