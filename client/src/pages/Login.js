import './Login.css';
import { Link } from 'react-router-dom';

import { useState, React } from 'react';

import axios from 'axios';
import kakaoLoginClickHandler from '../components/SignUp/kakao';

export default function Login() {
  // let history = useHistory();

  const [isCorrect, setIsCorrect] = useState(true);
  const [userInfo, setUserInfo] = useState({
    email: null,
    password: null,
  });

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    const { email, password } = userInfo;
    if (userInfo) {
      await axios
        .post(
          `${process.env.REACT_APP_SERVER_API}/user/login`,
          {
            email: email,
            password: password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (!res.data.data) {
            setIsCorrect(false);
          } else if (res.data.data) {
            console.log('로그인성공');

            window.location.replace('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const guestLogin = async () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_API}/user/guest`, '',
        { withCredentials: true }
      )
      .then((res) => {
        if (!res.data.data) {
          setIsCorrect(false);
        } else if (res.data.data) {
          console.log('로그인성공');

          window.location.replace('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <div className='login-container'>
        <div id='title'>
          <img
            alt='login-title'
            className='login-title'
            src='img/logo.svg'
          ></img>
          <span className='login-logo'>느린 우체통</span>
        </div>
        <div className='login-input'>
          <input
            className='input-email'
            name='email'
            onChange={handleChange}
            placeholder='이메일을 입력하세요'
          ></input>
          <input
            className='input-password'
            type='password'
            name='password'
            onChange={handleChange}
            placeholder='비밀번호를 입력하세요'
          ></input>
          <div className='section-message'>
            <div className='section-confirm'>
              {isCorrect === true ? '' : '회원정보를 확인해주세요'}
            </div>
            <div id='find-password'>
              <Link
                to='/find-userinfo'
                style={{ color: 'inherit', textDecoration: 'inherit' }}
              >
                비밀번호찾기
              </Link>
            </div>
          </div>
        </div>

        <div className='login-buttons'>
          <button className='login-button' onClick={handleLogin}>
            로그인
          </button>
          <button className='signup-button'>
            <Link
              to='/signup'
              style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
              회원가입
            </Link>
          </button>
          <button className='oauth-button' onClick={kakaoLoginClickHandler}>
            <img src='/img/kakao_login_medium_narrow.png' alt='카카오로그인' />
          </button>
          <button onClick={guestLogin}> 게스트 로그인</button>
        </div>
      </div>
    </>
  );
}
