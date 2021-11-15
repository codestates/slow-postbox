import Mailinfo from '../components/MailForm/MailInfo';
import Editor from '../components/MailForm/Editor';
import Buttons from '../components/MailForm/Buttons';
import ConfirmModal from '../components/MailForm/ConfirmModal';
import CompleteModal from '../components/MailForm/CompleteModal';
import PreviewModal from '../components/MailForm/PreviewModal';
import './MailForm.css';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function MailForm() {
  const { email, name } = useSelector((state) => state.loginReducer);
  //Editor에서 수정한 내용 업데이트
  const [formInfo, setFormInfo] = useState({
    receiver: '',
    title: '',
    reservedDate: '',
    content: '',
  });
  //console.log(formInfo);

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

  //미리보기, 전송버튼 이벤트 핸들러
  const tempSave = () => {
    handlePreviewModal();
  };
  const sendMail = () => {
    if (formInfo.title === '') {
      alert('빈 제목으로 보내시겠습니까?');
    }
    if (formInfo.receiver !== '' && formInfo.reservedDate && formInfo.content) {
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_API}/mail/create`,
        body: {
          writerEmail: email,
          receiverEmail: formInfo.receiver,
          title: formInfo.title,
          content: formInfo.content,
          reservedDate: formInfo.reservedDate,
        },
      })
        .then((res) => {
          axios({
            method: 'POST',
            url: `${process.env.REACT_APP_SERVER_API}/user/alertmail`,
            body: {
              name,
              receiverEmail: formInfo.receiver,
              reservedDate: formInfo.reservedDate,
            },
          })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    handleConfirmModal();
  };
  return (
    <>
      <div className='mailform-container'>
        <Mailinfo formInfo={formInfo} setFormInfo={setFormInfo} />
        <Editor formInfo={formInfo} setFormInfo={setFormInfo} />
        <Buttons
          handleConfirmModal={handleConfirmModal}
          handlePreviewModal={handlePreviewModal}
          sendMail={sendMail}
          tempSave={tempSave}
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
