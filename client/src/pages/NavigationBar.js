import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import './NavigationBar.css';

export default function NavigationBar() {
  const [isLogin, setIsLogin] = useState(true);

  const [isAdmin, setIsAdmin] = useState(true);

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
      <div className='navBar-container'>
        <div className='bar'>
          <div className='home'>느린 우체통</div>
          <div className={isLogin ? 'mailBox' : 'mailBox hidden'}>
            받은 편지함
          </div>
          <div className={isLogin ? 'sent' : 'sent hidden'}>보낸 편지함</div>
          <div className={isLogin ? 'write' : 'write hidden'}>편지 쓰기</div>
          {isLogin ? (
            <>
              <div className='mypage'>마이페이지</div>
              <div className='login'>
                <span>로그아웃</span>
              </div>
            </>
          ) : (
            <>
              <div className='login'>
                <span>로그인</span>
              </div>
              <div className='signup'>회원가입</div>
            </>
          )}
          {isLogin && isAdmin ? (
            <div className='admin'>
              <FontAwesomeIcon icon={faCog} />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
}
