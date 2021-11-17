import React from 'react'
import './ChangePassword.css'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export default function ChangePassword({ userEmail }) {
    const [userInfo, setUserInfo] = useState({
        password: "",
        passwordconfirm: "",

    })
    const [isPossiblePassword, setIsPossiblePassword] = useState(0);
    const [isConfirmPassword, setIsConfirmPassword] = useState(0);
    const verifyPassword = (password) => {
        let reg = /^[a-zA-Z0-9]{10,15}$/; //숫자와 영문자 조합으로 10~15자리를 사용
        return reg.test(password);
    };



    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleConfirmPassword = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
        if (e.target.value !== userInfo.password) {
            setIsConfirmPassword(-1);
        }
        if (e.target.value === userInfo.password) {
            setIsConfirmPassword(1);
        }
    };

    const changePassword = async () => {
        if (isConfirmPassword === 1) {
            await axios
                .patch(`${process.env.REACT_APP_SERVER_API}/user/modifypw`, {
                        email: userEmail,
                        password: userInfo.password
            })
                .then((res) => {
                    if (res.status === 200) {
                        alert('비밀번호변경이 완료되었습니다')
                        window.location.replace('/login');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    }


    useEffect(() => {
        //console.log(userInfo.password);
        if (!verifyPassword(userInfo.password) && userInfo.password === "") {
            setIsPossiblePassword(0);
        } else if (verifyPassword(userInfo.password)) {
            setIsPossiblePassword(1);
        } else {
            setIsPossiblePassword(-1);
        }
    }, [userInfo.password]);




    return (
        <div className="changePassword-container">
            <div className='section-password'>새 비밀번호
                <input className='title-newpassword' type='password' name='password' onChange={handleChange}></input>
            </div>
            <div className='section-possible'> {isPossiblePassword === 1 ? '사용가능한 비밀번호입니다.' : ''}
                {isPossiblePassword === -1 ? '비밀번호는 숫자와 영문자 조합으로 10~15자리를 사용해야합니다.' : ''}</div>

            <div className='section-password-check'>비밀번호확인
                <input className='title-newpassword-check' type='password' name='passwordconfirm' onChange={handleConfirmPassword}></input>
            </div>
            <div className='section-confirm'>{isConfirmPassword === 1 ? '비밀번호가 일치합니다.' : ''}{isConfirmPassword === -1 ? '비밀번호가 일치하지 않습니다.' : ''}</div >
            <div className='section-submit-button'>
                <button className='change-password-button' onClick={changePassword}>변경하기</button>
            </div>
        </div>
    )
}
