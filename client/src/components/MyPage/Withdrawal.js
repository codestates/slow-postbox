import './Withdrawal.css';
import styled from 'styled-components';
function Withdrawal() {
  return (
    <>
      <div className='withdrawal-container'>
        <form className='form-withdrawal'>
          <h4>탈퇴하기</h4>
          <p>비밀번호 확인</p>
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
  background: ${(props) => (props.send ? 'palevioletred' : 'white')};
  color: ${(props) => (props.send ? 'white' : 'palevioletred')};
  float: ${(props) => (props.send ? 'right' : 'left')};
  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: palevioletred;
    color: white;
  }
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
export default Withdrawal;
