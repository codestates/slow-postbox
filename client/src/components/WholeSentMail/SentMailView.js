import { GoKebabVertical } from "react-icons/go";
import { FaTimes } from "react-icons/fa"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { modalmailview } from '../../actions'
import '../WholeReceiveMailBox/MailView.css'


export default function SentMailView({ maildata, mailChange }) {
  const dispatch = useDispatch();


  const modaloff = () => {
    dispatch(modalmailview({ modalmail: false }))
    mailChange(0)
  }

  const [isOpen, setIsOpen] = useState(false)

  function SubModalOnOff() {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className="mailview-container">
        <div className="mailview-grid">

          <div className="mailview-title"> {maildata.title} </div>
          <div className="mailview-receive-name"> 보낸사람 : {maildata.name} </div>
          <div> 보낸날짜 : {maildata.created_at.slice(0, 10)} / 도착날짜 : {maildata.reserved_at.slice(0, 10)} </div>
          <div className="modal-flex" style={{ border: "none" }}>
            <div className="modal-sort" >
              <GoKebabVertical onClick={SubModalOnOff} />

            </div>
            {isOpen === true
              ? <SentMailViewModal SubModalOnOff={SubModalOnOff} />
              : ""
            }
            <div className="mail-text" > {maildata.content} </div>
          </div>
          <button className="btn_close_m" onClick={() => (modaloff())}> 닫기 </button>
        </div>
      </div>

    </>
  )
}



function SentMailViewModal({ SubModalOnOff }) {
  const dummydata4 = [{ writerName: "문선영" }]
  const { writerName } = dummydata4[0]
  const testname = "문선영"

  return (
    <>
      <div className="mailViewModal-contanier">
        <div className="modal-show">
          <div className="btn-Modalclose" >
            <FaTimes onClick={SubModalOnOff} />
          </div>
          <div>
            <button className="btn_close_s">삭제</button>
          </div>
        </div>
      </div>
    </>
  )
}

