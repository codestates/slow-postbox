import './ConfirmModal.css';
function ConfirmModal({ handleConfirmModal, handleCompleteModal }) {
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      handleConfirmModal();
    } else if (e.target.className === 'btn-submit') {
      handleConfirmModal();
      handleCompleteModal();
    }
  };
  return (
    <>
      <div className='confirmModal-container' onClick={handleClose}>
        <div className='modal-box'>
          <p>
            예약이 완료된 편지는 전송취소가 불가합니다. 편지를 보내시겠습니까?
          </p>
          <div className='btn-box'>
            <button className='btn-close' onClick={handleConfirmModal}>
              취소
            </button>
            <button className='btn-submit' onClick={handleClose}>
              보내기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ConfirmModal;
