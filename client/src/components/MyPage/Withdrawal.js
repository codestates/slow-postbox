import './Withdrawal.css';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function Withdrawal() {
  const { email, oauth } = useSelector((state) => state.loginReducer);
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  const handleWithdrawal = (e) => {
    if (password.length === 0) {
      e.preventDefault();
      alert('입력하지 않은 항목이 존재합니다');
      return;
    }
    if (!oauth && window.confirm('정말 탈퇴하시겠습니까?')) {
      axios
        .delete(`${process.env.REACT_APP_SERVER_API}/users/withdrawal`, {
          data: {
            email,
            password,
          },
        })
        .then((res) => {
          if (res.data.message === 'success') {
            window.location.replace('/');
            return;
          } else {
            alert('비밀번호를 다시 확인해주세요');
            e.preventDefault();
            return;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (oauth && window.confirm('정말 탈퇴하시겠습니까?')) {
      axios
        .delete(`${process.env.REACT_APP_SERVER_API}/users/kakaoWithdrawal`, {
          data: {
            email: password,
          },
        })
        .then((res) => {
          if (res.data.message === 'success') {
            window.location.replace('/');
          } else if (res.data.message === 'not authorized') {
            e.preventDefault();
            return alert('이메일을 확인해주세요');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      e.preventDefault();
    }
  };
  return (
    <>
      <div className='withdrawal-container'>
        <form className='form-withdrawal'>
          <p className='withdrawal-title'>탈퇴하기</p>
          <p className='withdrawal-text'>
            {oauth ? '이메일 확인' : '비밀번호 확인'}
          </p>
          <input
            type={oauth ? 'email' : 'password'}
            className='input-withdrawal-pw'
            value={password}
            onChange={handleChange}
          />
          <button
            type='button'
            onClick={handleWithdrawal}
            className='btn-close'
          >
            확인
          </button>
        </form>
      </div>
    </>
  );
}

export default Withdrawal;
