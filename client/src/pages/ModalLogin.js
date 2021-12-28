import React from 'react'
import './ModalLogin.css';

export default function ModalLogin() {
    return (
      <div className='modalLogin-container'>
        <div className='box-modal'>
          <div className='modal-message'>로그인 후 이용 가능합니다.</div>
          <div>
            <span
              onClick={() => {
                window.location.replace('/login');
              }}
            >
              확인
            </span>
          </div>
        </div>
      </div>
    );
  }