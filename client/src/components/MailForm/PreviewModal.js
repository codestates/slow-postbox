import './PreviewModal.css';
import parse from 'html-react-parser';

function PreviewModal({ handlePreviewModal, formInfo }) {
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      handlePreviewModal();
    }
  };
  return (
    <>
      <div className='previewModal-container' onClick={handleClose}>
        <div className='modal-box'>
          <ul className='preview-group'>
            <li>
              <span className='li-text'>받는 사람</span>
              <span className='li-props'>{formInfo.receiver}</span>
            </li>
            <li>
              <span className='li-text'>제목</span>
              <span className='li-props'>{formInfo.title}</span>
            </li>
            <li>
              <div className='li-props li-content'>
                {parse(formInfo.content)}
              </div>
            </li>
          </ul>
          <button className='btn-close' onClick={handlePreviewModal}>
            닫기
          </button>
        </div>
      </div>
    </>
  );
}
export default PreviewModal;
