import React from "react"
import "./SignUp.css"

export default function SignUp() {

    return (
        <>
        <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
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
                            <input className='input-email' />@<input className='input-domain' />
                        </div>
                        <button className='send-authcode-button'>인증코드발송</button>
                    </div>


                    <div className='section-auth'>
                        <div className='title-auth'>인증코드</div>
                        <input className='input-authcode'></input>
                        <button className='check-auth'>인증코드 확인</button>
                    </div>


                    <div className='section-name'>
                        <div className='title-name'>이름</div>
                        <input className='input'></input>
                    </div>


                    <div className='section-password'>
                        <div className='title-password'>비밀번호</div>
                        <input className='input'></input>
                    </div>
                    <div className='section-password'>
                        <div className='title-password'>비밀번호확인</div>
                        <input className='input'></input>
                    </div>


                    <div className='section-submit'>
                        <div className='title-button'>
                            <button className='submit-button'>가입완료</button>
                        </div>
                    </div>


                </div>
            </div>
            <div className='bottom-section'></div>
        </div>
        </>


    )
}