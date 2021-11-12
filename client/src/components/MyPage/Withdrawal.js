import './Withdrawal.css';
import styled from 'styled-components';
function Withdrawal() {
  return (
    <>
      <div className='withdrawal-container'>
        <form className='form-withdrawal'>
          <p className='withdrawal-title'>탈퇴하기</p>
          <p className='withdrawal-text'>비밀번호 확인</p>
          <input type='password' className='input-withdrawal-pw' />
          <StyledButton>확인</StyledButton>
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
