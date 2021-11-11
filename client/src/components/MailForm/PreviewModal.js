import './PreviewModal.css';
function PreviewModal({ handlePreviewModal }) {
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      handlePreviewModal();
    }
  };
  return (
    <>
      <div className='previewModal-container' onClick={handleClose}>
        <div className='modal-box'>
          <span>
            보낸 메일함에서 개별 메일을 클릭했을때 나오는 컴포넌트를 보여줄
            예정입니다
          </span>
          <button className='btn-close' onClick={handlePreviewModal}>
            닫기
          </button>
        </div>
      </div>
    </>
  );
}
export default PreviewModal;
