import React from 'react'
import './ConfirmEmail.css'

export default function ConfirmEmail() {

    return (
        <div className="confirmEmail-container">
            <div className='section-email'>
                <div className='title-email'>이메일</div>
                <div className='input-container'>
                    <input className='input-email' />@<input className='input-domain' />
                </div>
                <button className='send-authcode-button'>인증코드발송</button>
            </div>
            <div className='section-auth'>
                <div className='title-auth'>인증코드</div>
                <input className='input-authcode'></input>
                <button className='check-auth'>인증코드 확인</button>
            </div>
        </div>
    )
}