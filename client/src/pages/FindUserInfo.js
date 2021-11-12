import React from 'react'
import ChangePassword from '../components/FindUserInfo/ChangePassword'
import ConfirmEmail from '../components/FindUserInfo/ConfirmEmail'
import './FindUserInfo.css'

export default function FindUserInfo() {

    return (
        <div className="findUserInfo-container">
            <div className='title'>느린우체통</div>
            <div className='findPassword-section'>
                <div className='findPassword-title'>비밀번호찾기</div>
                <div className='main-section'>
                    <ConfirmEmail />
                    {/* <ChangePassword /> */}
                </div>
            </div>
            <div className='bottom-section'></div>
        </div>
    )
}