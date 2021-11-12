import React from 'react'
import './ConfirmEmail.css'

export default function ConfirmEmail() {

    return (
        <div className="confirmEmail-container">
            <div className='section-email'>
                <span className='title-email'>이메일</span>
                <input className='input-email' />@<input className='input-domain' />
                <button className='send-authcode-button'>인증코드발송</button>
            </div>
            <div className='section-auth'>
                <span className='title-auth'>인증코드</span>
                <input className='input-authcode'></input>
                <button className='check-auth'>인증코드 확인</button>
            </div>
        </div>
    )
}