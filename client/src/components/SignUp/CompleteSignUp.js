import React from 'react';
import './CompleteSignUp.css';
export default function CompleteSignUp() {
  return (
    <div className='completeSignUp-container'>
      <div className='title'>
        <img className='completeSignUp-title' src='img/Logintitle.png'></img>
      </div>
      <div className='completeSignUp-message'>
        느린우체통 가입을 축하합니다.
      </div>
      <div className='explain-section'>설명</div>
      <div className='button-section'>
        <button className='login-button'>로그인</button>
      </div>
      <div className='bottom-section'></div>
    </div>
  );
}
