import React from 'react'
import { GoMailRead, GoMail } from "react-icons/go";
import './ReceiveMail.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'

export default function ReceiveMail({ mailListReceive }) {



  return (
    <>
      {mailListReceive.length === 0
        ? <div className="mailbox-container-empty"> 받은 편지가 없습니다.</div>
        : mailListReceive.map((el, id) => {
          return (
            <div key={id} className="mailbox-container" >
              <div className="sort-readCheck"> {el.isRead === 0 ? "안읽음" : "읽음"} </div>
              <div className="icon-mail">
                {el.isRead === 0
                  ? <GoMail size="60" />
                  : <GoMailRead size="60" />}
              </div>
              <div className="text-mail"> {el.title} </div>
              <div className="text-mail" >
                보낸사람 : {el.name} / 도착날짜 : {el.reserved_at.slice(0, 10)}
              </div>
            </div>
          )
        })}
    </>
  )
}
