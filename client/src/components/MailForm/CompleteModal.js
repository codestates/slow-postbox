import './CompleteModal.css';

function CompleteModal({ handleCompleteModal }) {
  const handleClose = (e) => {
    if (e.target === e.currentTarget || e.target.className === 'btn-close') {
      handleCompleteModal();
      //todo 보낸 메일함으로 이동
    }
  };
  return (
    <>
      <div className='completeModal-container' onClick={handleClose}>
        <div className='modal-box'>
          <h3>느린 우체통</h3>
          <p>편지 예약이 완료되었습니다.</p>
          <p>
            <span>dagachi@gmail.com</span>님께 <span>2022.11.09</span>일에
            편지가 전달될 예정입니다
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
