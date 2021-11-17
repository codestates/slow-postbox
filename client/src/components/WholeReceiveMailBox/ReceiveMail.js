import React, { useEffect, useState } from 'react'
import { GoMailRead, GoMail } from "react-icons/go";
import './ReceiveMail.css'
import "./Paging.css";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import Paging from './Paging'
import MailView from './MailView';
import { modalmailview } from '../../actions'
import Pagination from "react-js-pagination";


export default function ReceiveMail({ mailListReceive, mailChange, page, count }) {
  // console.log(mailListReceive)
  const [pagee, setPage] = useState(1);

  const dispatch = useDispatch();
  const [maildata, setMailData] = useState()

  const modalChecked = useSelector(state => state.mailReducer)
  const { modalmail } = modalChecked

  const modalon = () => {
    dispatch(modalmailview({ modalmail: true }))
  }

  const getMailcontent = async (el) => { // 받은편지함 list 받아오기
    // console.log(el)
    mailChange(el)
    await axios.get(`${process.env.REACT_APP_SERVER_API}/mail/receive/${el}`)
      .then((res) => {
        // console.log(res.data.data)
        setMailData(res.data.data)
        modalon()
      })
      .catch((err) => {
        console.log(err)
      })

  }


  return (
    <div>
      {modalmail === true
        ? <MailView maildata={maildata} mailChange={mailChange} />
        : (mailListReceive.length === 0
          ? <div className="mailbox-container-empty"> 받은 편지가 없습니다.</div>
          : mailListReceive.map((el, idx) => {
            return (
              <div key={idx} className="mailbox-container" onClick={() => { getMailcontent(el.id) }} >

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
          }))

      }

      {modalmail === false && (
        <Pagination
          activePage={page} // 현재페이지
          itemsCountPerPage={5} // 한 페이지당 보여줄 리스트 아이템 개수
          totalItemsCount={count} // 총 아이템 개수
          pageRangeDisplayed={5} // Paginator 내에서 보여줄 페이지의 범위
          prevPageText={"‹"} //"이전"을 나타낼 텍스트 (prev, <, ...)
          nextPageText={"›"} //"다음"을 나타낼 텍스트 
          onChange={setPage} // 페이지가 바뀔 때 핸들링해줄 함수
        />
      )}

    </div>
  )
}
