import { Link } from 'react-router-dom';
import './MailView.css'
import { GoKebabVertical } from "react-icons/go";
import { FaTimes } from "react-icons/fa"
import { useState } from 'react';
import './MailViewModal.css'


export default function MailView() {
  const dummydata4 = [{ id: 1, title: "제목제1111111111111111111111", writerName: "문선영", created_at: "2021.12.31", received_at: "2021.12.31", isChecked: true, isRead: false, content: "컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 " }]
  const { id, content, isChecked, isRead, created_at, received_at, title, writerName } = dummydata4[0];
  const [isOpen, setIsOpen] = useState(false)

  function ModalOnOff() {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className="mailview-container">
        <div className="mailview-grid">

          <div> {title} </div>
          <div> 받는사람 : {writerName} </div>
          <div> 보낸날짜 : {created_at} / 도착날짜 : {received_at} </div>
          <div className="modal-flex">
            <div className="modal-sort" onClick={ModalOnOff} > <GoKebabVertical /> </div>

            {isOpen === true
              ? <MailViewModal ModalOnOff={ModalOnOff} />
              : ""
            }

            <div className="mail-text"> {content} </div>
          </div>
          <Link to="WholeSentMail">
            <button> 닫기 </button>
          </Link>
        </div>
      </div>

    </>
  )
}



function MailViewModal({ ModalOnOff }) {
  const dummydata4 = [{ id: 1, title: "제목제1111111111111111111111", writerName: "문선영", created_at: "2021.12.31", received_at: "2021.12.31", isChecked: true, isRead: false, content: "컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 컨텐트 " }]
  const { writerName } = dummydata4[0]
  const testname = "김소현"

  return (
    <>
      <div className="mailViewModal-contanier">
        <div className="modal-show">


          {writerName === testname
            ? (
              <>
                <div className="btn-Modalclose" >
                  <FaTimes onClick={ModalOnOff} />
                </div>
                <div><button>답장</button></div>
                <div><button>삭제</button></div>
              </>
            )
            : (
              <>
                <div className="btn-Modalclose" >
                  <FaTimes onClick={ModalOnOff} />
                </div>
                <div><button>삭제</button></div>
              </>
            )
          }

        </div>
      </div>
    </>
  )
}

