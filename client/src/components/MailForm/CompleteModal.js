import './CompleteModal.css';
import { useHistory } from 'react-router-dom';

function CompleteModal({ handleCompleteModal, formInfo }) {
  let history = useHistory();
  const handleClose = (e) => {
    if (e.target === e.currentTarget || e.target.className === 'btn-close') {
      handleCompleteModal();
      //todo 보낸 메일함으로 이동
      history.push('/mailbox');
    }
  };
  return (
    <>
      <div className='completeModal-container' onClick={handleClose}>
        <div className='modal-box'>
          <h3 className='modal-title'>느린 우체통</h3>
          <p>편지 예약이 완료되었습니다.</p>
          <p>
            <span>{formInfo.receiver}</span>님께
            <span>{formInfo.reservedDate}</span>에 편지가 전달될 예정입니다
          </p>
          <button className='btn-close' onClick={handleClose}>
            확인
          </button>
        </div>
      </div>
    </>
  );
}
export default CompleteModal;
