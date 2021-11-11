import styled from 'styled-components';

function Buttons({ handleConfirmModal, handlePreviewModal }) {
  const tempSave = () => {
    handlePreviewModal();
  };
  const sendMail = () => {
    handleConfirmModal();
  };
  return (
    <>
      <StyledDiv>
        <StyledButton onClick={tempSave}>미리보기</StyledButton>
        <StyledButton send onClick={sendMail}>
          전송하기
        </StyledButton>
      </StyledDiv>
    </>
  );
}
const StyledDiv = styled.div`
  width: 240px;
  height: 36px;
  border: 1px solid red;
  margin: 1em auto;
`;
const StyledButton = styled.button`
  background: ${(props) => (props.send ? 'palevioletred' : 'white')};
  color: ${(props) => (props.send ? 'white' : 'palevioletred')};
  float: ${(props) => (props.send ? 'right' : 'left')};
  &:hover {
    cursor: pointer;
  }
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export default Buttons;
