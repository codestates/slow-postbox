import React from 'react'
import { GoMailRead, GoMail } from "react-icons/go";
import './ReceiveMail.css'

export default function ReceiveMail() {
  const dummydata = [
    { id: 1, title: "제목제1111111111111111111111", writerName: "문선영", received_at: "2021.12.31", isChecked: true, isRead: false },
    { id: 2, title: "제목222222222222222222222222", writerName: "김소현", received_at: "2021.12.31", isChecked: true, isRead: false },
    { id: 3, title: "제목333333333333333333333333", writerName: "안광의", received_at: "2021.12.31", isChecked: true, isRead: true },
    { id: 4, title: "제목제44444444444444444444444", writerName: "임유빈", received_at: "2021.12.31", isChecked: true, isRead: true },
    { id: 5, title: "제목제44444444444444444444444", writerName: "임유빈", received_at: "2021.12.31", isChecked: true, isRead: true },

  ]

  return (
    <>
      {dummydata.length === 0
        ? <div className="mailbox-container-empty"> 받은 편지가 없습니다.</div>
        : dummydata.map((el, id) => {
          return (
            <div key={id} className="mailbox-container" >
              <div className="sort-readCheck"> {el.isRead === false ? "안읽음" : "읽음"} </div>
              <div className="icon-mail">
                {el.isRead === false
                  ? <GoMail size="60" />
                  : <GoMailRead size="60" />}
              </div>
              <div className="text-mail"> {el.title} </div>
              <div className="text-mail" >
                보낸사람 : {el.writerName} / 도착날짜 : {el.received_at}
              </div>
            </div>
          )
        })}
    </>
  )
}
