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
  width: 190px;
  height: 30px;
  /* border: 1px solid red; */
  margin: 0 auto;
  padding: 17px 0;
`;
const StyledButton = styled.button`
  background: ${(props) => (props.send ? '#E84B35' : '#8D93AB')};
  color: white;
  font-weight: bold;
  float: ${(props) => (props.send ? 'right' : 'left')};
  &:hover {
    cursor: pointer;
  }
  border: none;
  padding: 0.35em 1em;
  border-radius: 10px;
`;

export default Buttons;
