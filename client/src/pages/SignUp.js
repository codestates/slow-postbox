import React from "react"
import "./SignUp.css"

export default function SignUp() {

    return (
        <div className="signUp-container">
            <div id="title">느린우체통</div>
            <div id="input-containers">
                <div className="margin-container"></div>
                <div className="input-container">

                    <div className='section-email'>
                        <span className="title">이메일</span><input className='input-email' />@<input className='input-domain' />
                        <button className='send-authcode-button'>인증코드발송</button>
                    </div>
                    <div className='section-auth'>
                        <input className='input-authcode'></input>
                        <button className='check-auth'>인증코드 확인</button>
                    </div>
                    <div className='section-name'>
                        <span className="title">이름</span><input className='input-name' />
                    </div>

                    <div className='section-password'>
                        <span className="title">비밀번호</span><input className='input-password' />
                    </div>

                    <div className='section-password-check'>
                        <span className="title">비밀번호 확인</span> <input className='input-password' />
                    </div>

                    <div className='section-complete-button'><button className='complete'>가입완료</button></div>

                </div>
                <div className="margin-container"></div>
            </div>
        </div>
    )
}