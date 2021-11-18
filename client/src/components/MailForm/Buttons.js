import styled from 'styled-components';

function Buttons({ tempSave, handleConfirmModal, formInfo }) {
  const showConfirmModal = () => {
    console.log('clicked');
    if (formInfo.receiver === '') {
      alert('수신자 이메일을 확인해주세요');
      return;
    }
    if (formInfo.reservedDate === '') {
      alert('전송날짜를 선택해주세요');
      return;
    }
    if (formInfo.content === '') {
      alert('메일내용을 작성해주세요');
      return;
    }
    if (formInfo.title === '') {
      if (window.confirm('빈 제목으로 보내시겠습니까?')) {
        handleConfirmModal();
      }
    } else {
      handleConfirmModal();
    }
  };

  return (
    <>
      <StyledDiv>
        <StyledButton onClick={tempSave}>미리보기</StyledButton>
        <StyledButton send onClick={showConfirmModal}>
          전송하기
        </StyledButton>
      </StyledDiv>
    </>
  );
}
const StyledDiv = styled.div`
  width: 240px;
  height: 30px;
  margin: 25px auto;
  @media (min-width: 481px) and (max-width: 768px) {
    width: 250px;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    width: 250px;
  }
`;
const StyledButton = styled.button`
  background: ${(props) => (props.send ? '#E84B35' : '#8D93AB')};
  color: white;
  font-size: 1em;
  font-weight: bold;
  float: ${(props) => (props.send ? 'right' : 'left')};
  &:hover {
    cursor: pointer;
  }
  border: none;
  padding: 0.35em 1em;
  border-radius: 10px;
  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 0.95em;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 1em;
  }
`;

export default Buttons;
