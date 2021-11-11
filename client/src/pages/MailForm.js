import Mailinfo from './Mailinfo';
import Editor from './Editor';
import Buttons from './Buttons';
import ConfirmModal from './ConfirmModal';
import CompleteModal from './CompleteModal';
import './Mailform.css';
import { useState } from 'react';
import PreviewModal from './PreviewModal';
function Mailform() {
  //Buttons에서 <전송하기> 버튼 눌렀을때 상태변경해서 모달창 띄우기
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const handleConfirmModal = () => {
    setIsConfirmModalOpen(!isConfirmModalOpen);
  };

  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const handleCompleteModal = () => {
    setIsCompleteModalOpen(!isCompleteModalOpen);
  };

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const handlePreviewModal = () => {
    setIsPreviewModalOpen(!isPreviewModalOpen);
  };

  return (
    <>
      <div className='mailform-container'>
        <Mailinfo />
        <Editor />
        <Buttons
          handleConfirmModal={handleConfirmModal}
          handlePreviewModal={handlePreviewModal}
        />
        {isPreviewModalOpen && (
          <PreviewModal handlePreviewModal={handlePreviewModal} />
        )}
        {isConfirmModalOpen && (
          <ConfirmModal
            handleConfirmModal={handleConfirmModal}
            handleCompleteModal={handleCompleteModal}
          />
        )}
        {isCompleteModalOpen && (
          <CompleteModal
            handleConfirmModal={handleConfirmModal}
            handleCompleteModal={handleCompleteModal}
          />
        )}
      </div>
    </>
  );
}
export default Mailform;
