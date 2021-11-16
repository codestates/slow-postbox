import React from 'react';
import ChangePassword from '../components/FindUserInfo/ChangePassword';
import ConfirmEmail from '../components/FindUserInfo/ConfirmEmail';
import './FindUserInfo.css';

export default function FindUserInfo() {
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
      <div className='findUserInfo-container'>
      <div className='title'>
                <img alt='findUserInfo-title' className='findUserInfo-title' src='img/logo.svg'></img>
                <span className='findUserInfo-logo'>느린 우체통</span>
            </div>
        <div className='findPassword-section'>
          <div className='findPassword-title'>
            비밀번호를 찾으시려면 메일인증을 해주세요!
          </div>
          <div className='main-section'>
            {/* <ConfirmEmail /> */}
            <ChangePassword />
          </div>
        </div>
        <div className='bottom-section'></div>
      </div>
    </>
  );
}
