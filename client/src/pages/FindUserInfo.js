import React, { useState } from 'react';
import ChangePassword from '../components/FindUserInfo/ChangePassword';
import ConfirmEmail from '../components/FindUserInfo/ConfirmEmail';
import isConfirmEmail from '../components/FindUserInfo/ConfirmEmail'
import './FindUserInfo.css';


export default function FindUserInfo() {

  const [isConfirmEmail, setIsConFirmEmail] = useState(0);
  const [userEmail, setUserEmail] = useState('')

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
            비밀번호 변경하기
          </div>
          <div className='main-section'>
            {isConfirmEmail === 1 ? <ChangePassword userEmail={userEmail} /> :
              <ConfirmEmail
                userEmail={userEmail}
                setUserEmail={setUserEmail}
                isConfirmEmail={isConfirmEmail}
                setIsConFirmEmail={setIsConFirmEmail} />}
            {/* <ChangePassword /> */}
          </div>
        </div>
        <div className='bottom-section'></div>
      </div>
    </>
  );
}
