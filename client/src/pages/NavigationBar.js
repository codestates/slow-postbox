import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
          <div
            className='home'
            onClick={() => {
              window.location.replace('/');
            }}
          >
            느린 우체통
          </div>
          <div className={isLogin ? 'mailBox' : 'mailBox hidden'}>
            <Link
              to='/mailbox'
              style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
              받은 편지함
            </Link>
          </div>
          <div className={isLogin ? 'sent' : 'sent hidden'}>
            <Link
              to='/sent-mailbox'
              style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
              보낸 편지함
            </Link>
          </div>
          <div className={isLogin ? 'write' : 'write hidden'}>
            <Link
              to='/mailform'
              style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
              편지 쓰기
            </Link>
          </div>
          {isLogin ? (
            <>
              <div className='mypage'>
                <Link
                  to='/mypage'
                  style={{ color: 'inherit', textDecoration: 'inherit' }}
                >
                  마이페이지
                </Link>
              </div>
              <div className='login'>
                <span>
                  <Link
                    to='/login'
                    style={{ color: 'inherit', textDecoration: 'inherit' }}
                  >
                    로그아웃
                  </Link>
                </span>
              </div>
            </>
          ) : (
            <>
              <div className='login'>
                <span>
                  <Link
                    to='/login'
                    style={{ color: 'inherit', textDecoration: 'inherit' }}
                  >
                    로그인
                  </Link>
                </span>
              </div>
              <div className='signup'>
                <Link
                  to='/signup'
                  style={{ color: 'inherit', textDecoration: 'inherit' }}
                >
                  회원가입
                </Link>
              </div>
            </>
          )}
          {isLogin && isAdmin ? (
            <div className='admin'>
              <Link
                to='/admin'
                style={{ color: 'inherit', textDecoration: 'inherit' }}
              >
                <FontAwesomeIcon icon={faCog} />
              </Link>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
}
