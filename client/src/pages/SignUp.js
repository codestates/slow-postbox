import React from "react"
import "./SignUp.css"

export default function SignUp() {

    return (
        <div className="signUp-container">
            <div id="title">느린우체통</div>
            <div id="input-containers">
                <div className="input-container">
                    <div className='section-email'>
                        <div className="title-input">이메일</div><input className='input-email' />@<input className='input-domain' />
                        <button className='send-authcode-button'>인증코드발송</button>
                    </div>

                    <div className='section-name'>
                        <div className="title-input">이름</div><input className='input-name' />
                    </div>

                    <div className='section-password'>
                        <div className="title-input">비밀번호</div><input className='input-password' />
                    </div>

                    <div className='section-password-check'>
                        <div className="title-input">비밀번호 확인</div> <input className='input-password' />
                    </div>

                    <div className='section-complete-button'><button className='complete'>가입완료</button></div>
                </div>
            </div>
        </div>
    )
}