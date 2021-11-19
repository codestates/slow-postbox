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

        </div>
        <div className='explain-section'>

          느린우체통 가입을 환영합니다.<br />
          미래의 나에게,또는 소중한 누군가에게,<br />
          지금은 아니더라도<br />
          먼 훗날 전하고 싶은 얘기가 있다면<br />
          느린우체통에서 마음을 전달해요!<br />

        </div>
        <div className='button-section'>
          <button className='login-button'><Link to='/login' style={{ color: "inherit", textDecoration: "inherit" }}>전달하러가기</Link></button>
        </div>
        <div className='bottom-section'></div>
      </div>
    </>
  );
}
