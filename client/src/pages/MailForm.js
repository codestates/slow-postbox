import Mailinfo from '../components/MailForm/MailInfo';
import Editor from '../components/MailForm/Editor';
import Buttons from '../components/MailForm/Buttons';
import ConfirmModal from '../components/MailForm/ConfirmModal';
import CompleteModal from '../components/MailForm/CompleteModal';
import PreviewModal from '../components/MailForm/PreviewModal';
import './MailForm.css';
import { useState } from 'react';

function MailForm() {
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
export default MailForm;
