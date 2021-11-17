import React from 'react';
import './CompleteSignUp.css';
import { Link } from 'react-router-dom';
export default function CompleteSignUp() {


  return (
    <>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Gaegu:wght@300&display=swap'
          rel='stylesheet'
        />
      </head>
      <div className='completeSignUp-container'>
        <div className='title'>
          <img alt='login-title' className='login-title' src='img/logo.svg'></img>
          <span className='login-logo'>느린 우체통</span>
        </div>
        <div className='completeSignUp-message'>
          느린우체통 가입을 축하합니다.
        </div>
        <div className='explain-section'>설명</div>
        <div className='button-section'>
          <button className='login-button'><Link to='/login' style={{ color: "inherit", textDecoration: "inherit" }}>로그인</Link></button>
        </div>
        <div className='bottom-section'></div>
      </div>
    </>
  );
}
