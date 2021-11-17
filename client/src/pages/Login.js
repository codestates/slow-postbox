
import './Login.css'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router';
import { useState, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import kakaoLoginClickHandler from '../components/SignUp/kakao'
// import { LOGIN } from '../actions';

const crypto = require('crypto')


export default function Login() {

    let history = useHistory();

    const [haveToken, setHaveToken] = useState(false)
    // const [isLogin, setIsLogin] = useState(false)

    const [userInfo, setUserInfo] = useState({
        email: null,
        password: null,
    })

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    }


    const handleLogin = async () => {
        const {
            email,
            password
        } = userInfo


        if (userInfo) {
            await axios
                .post(`${process.env.REACT_APP_SERVER_API}/user/getsalt`, {
                    email: email

                })
                .then((res) => {
                    console.log(res.data.data)
                    console.log(email)
                    const salt = res.data.data[0].salt
                    const hashPassword = crypto.createHash('sha512').update(password + salt).digest('hex');
                    axios
                        .post(`${process.env.REACT_APP_SERVER_API}/user/login`, {
                            email: email,
                            password: hashPassword,
                        },
                            { withCredentials: true })
                        .then((res) => {
                            console.log('로그인성공')
                            console.log(res.data)
                            setHaveToken(true)
                            window.location.replace('/')
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
        }
        else {
            return alert('이메일을 확인 후 다시 시도해주십시오')
        }

    }


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
                    <img alt='login-title' className='login-title' src='img/logo.svg'></img>
                    <span className='login-logo'>느린 우체통</span>
                </div>
                <div className='login-input'>
                    <input className='input-email' name='email' onChange={handleChange} placeholder='이메일을 입력하세요'></input>
                    <input className='input-password' type='password' name='password' onChange={handleChange} placeholder='비밀번호를 입력하세요'></input>
                </div>
                <div id='find-password'><Link to="/find-userinfo" style={{ color: "inherit", textDecoration: "inherit" }}>비밀번호찾기</Link></div>
                <div className='login-buttons'>
                    <button className='login-button' onClick={handleLogin}>로그인</button>
                    <button className='signup-button'><Link to="/signup" style={{ color: "inherit", textDecoration: "inherit" }}>회원가입</Link></button>
                    <button className='oauth-button' onClick={kakaoLoginClickHandler} >카카오로그인</button>
                </div>
            </div>
        </>
    )
}