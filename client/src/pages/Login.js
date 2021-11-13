import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
export default function Login() {


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
        <div className='login-container'>
            <div id='title'>
                <img alt='login-title' className='login-title' src='img/logo.svg'></img>
                <span className='login-logo'>느린 우체통</span>
            </div>
            <div className='login-input'>
                <input className='input-email' placeholder='이메일을 입력하세요'></input>
                <input className='input-password' placeholder='비밀번호를 입력하세요'></input>
            </div>
            <div id='find-password'><Link to="/find-userinfo" style={{ color: "inherit", textDecoration: "inherit" }}>비밀번호찾기</Link></div>
            <div className='login-buttons'>
                <button className='login-button'>로그인</button>
                <button className='signup-button'><Link to="/signup" style={{ color: "inherit", textDecoration: "inherit" }}>회원가입</Link></button>
                <button className='oauth-button'>카카오로그인</button>
            </div>
        </div>
        </>
    )
}