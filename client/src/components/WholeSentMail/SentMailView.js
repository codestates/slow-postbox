import { GoKebabVertical } from "react-icons/go";
import axios from 'axios';
import { FaTimes } from "react-icons/fa"
import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import '../WholeReceiveMailBox/MailView.css'


export default function SentMailView({ maildata, setModalmail, getSentDataPage }) {
  const [isOpen, setIsOpen] = useState(false)

  function SubModalOnOff() {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    getSentDataPage();
  }, [])

  return (
    <>
      <div className="mailview-container">
        <div className="mailview-grid">

          <div className="mailview-title"> {maildata.title} </div>
          <div className="mailview-receive-name"> 받는 사람 : {maildata.name ? `${maildata.name} (${maildata.receiverEmail.split("삭제").join('')})` : maildata.writerEmail} </div>
          <div className='view-text'> 보낸 날짜 : {maildata.created_at.slice(0, 10)} / 도착 날짜 : {maildata.reserved_at.slice(0, 10)} </div>
          <div className="modal-flex" style={{ border: "none" }}>
            <div className="modal-sort" >
              <GoKebabVertical onClick={SubModalOnOff} />

            </div>
            {isOpen === true
              ? <SentMailViewModal SubModalOnOff={SubModalOnOff} getSentDataPage={getSentDataPage} setModalmail={setModalmail} maildata={maildata} />
              : ""
            }
            <div className="mail-text" > {parse(maildata.content)} </div>
          </div>
          <button className="btn_close_m" onClick={() => { setModalmail(false) }}> 닫기 </button>
        </div>
      </div>

    </>
  )
}



function SentMailViewModal({ SubModalOnOff, getSentDataPage, setModalmail, maildata }) {

  const { id, writerEmail } = maildata
  const mailremove = async () => {
    await axios.patch(`${process.env.REACT_APP_SERVER_API}/mails`, {
      id, writerEmail
    })
      .then((res) => {
        getSentDataPage();
      })
      .then(() => { SubModalOnOff() })
      .then(() => { setModalmail(false) })

  }

  return (
    <>
      <div className="mailViewModal-contanier">
        <div className="modal-show">
          <div className="btn-Modalclose" >
            <FaTimes onClick={SubModalOnOff} />
          </div>
          <div>
            <button className="btn_close_s" onClick={mailremove}>삭제</button>
          </div>
        </div>
      </div>
    </>
  )
}

