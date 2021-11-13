import React from 'react'
import ChangePassword from '../components/FindUserInfo/ChangePassword'
import ConfirmEmail from '../components/FindUserInfo/ConfirmEmail'
import './FindUserInfo.css'

export default function FindUserInfo() {

    return (
        <div className="findUserInfo-container">
            <div className='title'>
                <img className='findUserInfo-title' src='img/Logintitle.png'></img>
            </div>
            <div className='findPassword-section'>
                <div className='findPassword-title'>비밀번호를 찾으시려면 메일인증을 해주세요!</div>
                <div className='main-section'>
                    {/* <ConfirmEmail /> */}
                    <ChangePassword />
                </div>
            </div>
            <div className='bottom-section'></div>
        </div>
    )
}