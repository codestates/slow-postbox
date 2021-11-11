import React from 'react'
import './ChangePassword.css'

export default function ChangePassword() {

    return (
        <div className="changePassword-container">
            <div className='section-password'>
                <span className="title-newpassword">새로운 비밀번호</span><input className='input-password' />
            </div>

            <div className='section-password-check'>
                <span className="title-newpassword-check">비밀번호 확인</span> <input className='input-password' />
            </div>
            <div className='section-submit-button'>
                <button className='change-password-button'>변경하기</button>
            </div>
        </div>
    )
}