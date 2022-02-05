import './MailView.css'
import { GoKebabVertical } from "react-icons/go";
import { FaTimes } from "react-icons/fa"
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import axios from 'axios';

export default function MailView({ maildata, setMailView, getReceivedDataPage }) {
  const [isOpen, setIsOpen] = useState(false)

  const SubModalOnOff = () => setIsOpen(isOpen => !isOpen)

  useEffect(() => {
    getReceivedDataPage();
  }, [])

  return (
    <>
      <div className="mailview-container">
        <div className="mailview-grid">
          <div className="mailview-title"> {maildata.title} </div>
          <div className="mailview-receive-name"> 보낸 사람 : {maildata.name ? `${maildata.name} (${maildata.writerEmail.split("삭제").join('')})` : maildata.writerEmail} </div>
          <div className="view-text"> 보낸 날짜 : {maildata.created_at.slice(0, 10)} / 도착 날짜 : {maildata.reserved_at.slice(0, 10)} </div>
          <div className="modal-flex" style={{ border: "none" }}>
            <div className="modal-sort" >
              <GoKebabVertical onClick={SubModalOnOff} />
            </div>
            {isOpen === true
              ? <MailViewModal getReceivedDataPage={getReceivedDataPage} setMailView={setMailView} maildata={maildata} SubModalOnOff={SubModalOnOff} />
              : ""
            }
            <div className="mail-text" > {parse(maildata.content)} </div>
          </div>
          <button className="btn_close_m" onClick={() => { setMailView(false) }}> 닫기 </button>
        </div>
      </div>
    </>
  )
}



function MailViewModal({ SubModalOnOff, maildata, setMailView, getReceivedDataPage }) {
  const { id, receiverEmail } = maildata

  const mailremove = async () => {
    await axios.patch(`${process.env.REACT_APP_SERVER_API}/mails/email`, {
      id, receiverEmail
    })
      .then((res) => {
        getReceivedDataPage();
      })
      .then(() => { SubModalOnOff() })
      .then(() => { setMailView(false) })
  }

  return (
    <>
      <div className="mailViewModal-contanier"></div>
      <div className="modal-show">
        <div className="btn-Modalclose" >
          <FaTimes style={{ cursor: "pointer" }} onClick={SubModalOnOff} />
        </div>
        <div><button className="btn_close_s" onClick={mailremove}>삭제</button></div>
      </div>
    </>
  )
}

