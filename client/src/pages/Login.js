import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
export default function Login() {


    return (
        <div className="login-container">
            <div id="title">느린우체통</div>
            <div className="login-input">
                <input className="input-email" placeholder="이메일을 입력하세요"></input>
                <input className="input-password" placeholder="비밀번호를 입력하세요"></input>
            </div>
            <div id="find-password">비밀번호찾기</div>
            <div className="login-buttons">
                <button className="login-button">로그인</button>
                <button className="signup-button">회원가입</button>
                <button className="oauth-button">카카오로그인</button>
            </div>
        </div>
    )
}