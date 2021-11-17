import React, { useEffect, useState } from 'react'
import { GoMailRead, GoMail } from "react-icons/go";
import './ReceiveMail.css'
import "./Paging.css";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import MailView from './MailView';
import Pagination from "react-js-pagination";
import Loding from '../Loding/Loding';


export default function ReceiveMail({ mailChange}) {
  // console.log(mailListReceive)
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [data, setData ] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const { email } = useSelector(state => state.loginReducer)

  const dispatch = useDispatch();
  const [maildata, setMailData] = useState({created_at: '0000-00-00', reserved_at:'0000-00-00'})

  const [modalmail, setModalmail] = useState(false)


  const getReceivedData = async() => {
    await setIsLoading(true)
    await axios.get(`${process.env.REACT_APP_SERVER_API}/mail/receive`, {params: {email, page}})
    .then((res) => {
      setData(res.data.data);
      setCount(res.data.count)
    })
    await setIsLoading(false)
  }

  const getReceivedDataPage = async() => {
    axios.get(`${process.env.REACT_APP_SERVER_API}/mail/receive`, {params: {email, page}})
    .then((res) => {
      setData(res.data.data);
      setCount(res.data.count)
    })
  }

  useEffect(()=> {
    getReceivedData();
  },[])

  useEffect(()=> {
    getReceivedDataPage();
  },[page])

  const getMailcontent = async (el) => { // 받은편지함 list 받아오기
    await axios.get(`${process.env.REACT_APP_SERVER_API}/mail/receive/${el}`)
      .then((res) => {
        // console.log(res.data.data)
        setMailData(res.data.data)
        setModalmail(true)
      })
      .catch((err) => {
        console.log(err)
      })

  }


  return (
    <div>
      <div className='box-received-mail'>
      {modalmail
        ? <MailView maildata={maildata} setModalmail={setModalmail} getReceivedDataPage={getReceivedDataPage}/>
        : isLoading ? (
          <Loding/>
        )
        :(data.length === 0
          ? <div className="mailbox-container-empty"> 받은 편지가 없습니다.</div>
          : data.map((el, idx) => {
            return (
              <div key={idx} className="mailbox-container select" onClick={() => { getMailcontent(el.id) }} >

                <div className="sort-readCheck"> {el.isRead === 0 ? "안읽음" : "읽음"} </div>
                <div className="icon-mail">
                  {el.isRead === 0
                    ? <GoMail size="60" />
                    : <GoMailRead size="60" />}
                </div>
                <div className="text-mail"> {el.title} </div>
                <div className="text-mail" >
                {`보낸사람 : 
									${el.name
										? el.name
										: el.writerEmail.split('(삭제)').join()} / ${el.reserved_at.slice(0, 10)}`}
                </div>
              </div>

            )
          }))

      }
      </div>

      {!modalmail && (
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
