import Mailinfo from '../components/MailForm/MailInfo';
import Editor from '../components/MailForm/Editor';
import Buttons from '../components/MailForm/Buttons';
import ConfirmModal from '../components/MailForm/ConfirmModal';
import CompleteModal from '../components/MailForm/CompleteModal';
import PreviewModal from '../components/MailForm/PreviewModal';
import ModalLogin from './ModalLogin';
import './MailForm.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function MailForm() {
  const [modalLogin, setModalLogin] = useState(false);
  const { email, name } = useSelector((state) => state.loginReducer);
  //Editor에서 수정한 내용 업데이트
  const [formInfo, setFormInfo] = useState({
    receiver: '',
    title: '',
    reservedDate: '',
    content: '',
  });
  const [isLoading, setIsLoading] = useState(false);

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

  const isAuthenticated = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/users/auth`, {
        withCredentials: true,
      })
      .catch((err) => {
        setModalLogin(true);
      });
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  //미리보기, 전송버튼 이벤트 핸들러
  const tempSave = () => {
    handlePreviewModal();
  };
  const sendMail = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_API}/mails`, {
        writerEmail: email,
        receiverEmail: formInfo.receiver,
        title: formInfo.title,
        content: formInfo.content,
        reserved_at: formInfo.reservedDate,
      })
      .then((res) => {
        console.log('worked');
        axios
          .post(`${process.env.REACT_APP_SERVER_API}/users/reservationNotice`, {
            name,
            receiverEmail: formInfo.receiver,
            reserved_at: formInfo.reservedDate,
          })
          .then((res) => {
            handleCompleteModal();
          })
          .catch((err) => {
            console.log('alertmail 에러발생');
            console.log(err);
          });
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.status);
          console.log(err.response.data);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log('Error', err.message);
        }
      });
  };
  return (
    <>
      <div className='mailform-container'>
        <Mailinfo formInfo={formInfo} setFormInfo={setFormInfo} />
        <Editor formInfo={formInfo} setFormInfo={setFormInfo} />
        <Buttons
          handleConfirmModal={handleConfirmModal}
          handlePreviewModal={handlePreviewModal}
          tempSave={tempSave}
          formInfo={formInfo}
        />
        {isPreviewModalOpen && (
          <PreviewModal
            handlePreviewModal={handlePreviewModal}
            formInfo={formInfo}
          />
        )}
        {isConfirmModalOpen && (
          <ConfirmModal
            handleConfirmModal={handleConfirmModal}
            handleCompleteModal={handleCompleteModal}
            sendMail={sendMail}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
        {isCompleteModalOpen && (
          <CompleteModal
            handleConfirmModal={handleConfirmModal}
            handleCompleteModal={handleCompleteModal}
            formInfo={formInfo}
          />
        )}
        {modalLogin && <ModalLogin />}
      </div>
    </>
  );
}
export default MailForm;
