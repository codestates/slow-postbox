import './Withdrawal.css';
import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function Withdrawal() {
  const { email } = useSelector((state) => state.loginReducer);
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  const handleWithdrawal = (e) => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      axios
        .delete(`${process.env.REACT_APP_SERVER_API}/user/withdraw`, {
          data: {
            email,
            password,
          },
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            window.location.replace('/');
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
          <p className='withdrawal-text'>비밀번호 확인</p>
          <input
            type='password'
            className='input-withdrawal-pw'
            value={password}
            onChange={handleChange}
          />
          <StyledButton onClick={handleWithdrawal}>확인</StyledButton>
        </form>
      </div>
    </>
  );
}
const StyledButton = styled.button`
  width: 100px;
  margin: 20px auto 0 auto;
  background-color: #e84b35;
  color: white;
  float: ${(props) => (props.send ? 'right' : 'left')};
  cursor: pointer;
  border: none;
  padding: 0.35em 1em;
  border-radius: 10px;
  font-weight: bold;
`;
export default Withdrawal;
