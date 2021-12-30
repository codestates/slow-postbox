//받은편지함
import React, { useEffect, useState } from 'react'
import { GoMailRead, GoMail } from "react-icons/go";
import './ReceiveMail.css'
import "./Paging.css";
import axios from 'axios';
import { useSelector } from 'react-redux'
import MailView from './MailView';
import Pagination from "react-js-pagination";

export default function ReceiveMail() {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { email } = useSelector(state => state.loginReducer)
  const [maildata, setMailData] = useState({ created_at: '0000-00-00', reserved_at: '0000-00-00' })
  const [modalmail, setModalmail] = useState(false)


  const getReceivedData = async () => {
    await setIsLoading(true)
    const authCheck = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/user/auth`,
      {
        withCredentials: true,
      }
    )
    await axios.get(`${process.env.REACT_APP_SERVER_API}/mail/receive`, { params: { email: authCheck.data.data.email, page } })
      .then((res) => {
        setData(res.data.data);
        setCount(res.data.count)
      })
    await setIsLoading(false)
  }

  const getReceivedDataPage = async () => {
    axios.get(`${process.env.REACT_APP_SERVER_API}/mail/receive`, { params: { email, page } })
      .then((res) => {
        console.log(res, '받은편지함')
        setData(res.data.data);
        setCount(res.data.count)
      })
  }

  useEffect(() => {
    getReceivedData();
  }, [])

  useEffect(() => {
    getReceivedDataPage();
  }, [page])

  const getMailcontent = async (el) => {
    await axios.get(`${process.env.REACT_APP_SERVER_API}/mail/receive/${el}`)
      .then((res) => {
        setMailData(res.data.data)
        setModalmail(true)
      })
      .catch((err) => {
        console.log(err)
      })

  }


  return (
    <div className="mailradius">
      <div className='box-received-mail'>
        {modalmail
          ? <MailView maildata={maildata} setModalmail={setModalmail} getReceivedDataPage={getReceivedDataPage} />
          : isLoading ? (
            <img src='img/spinner.svg' />
          )
            : (data.length === 0
              ? <div className="mailbox-container-empty"> 받은 편지가 없습니다.</div>
              : data.map((el, idx) => {
                return (
                  <div key={idx} className="mailbox-container select" onClick={() => { getMailcontent(el.id) }} >

                    <div className="sort-readCheck"> {el.isRead === 0 ? "안읽음" : "읽음"} </div>
                    <div className="icon-mail">
                      {el.isRead === 0
                        ? <GoMail size="50" />
                        : <GoMailRead size="50" />}
                    </div>
                    <div className="text-mail"> {el.title} </div>
                    <div className="text-mail" >
                      {`보낸사람 : 
									${el.name
                          ? el.name
                          : el.writerEmail.split('(삭제)').join("")} / ${el.reserved_at.slice(0, 10)}`}
                    </div>
                  </div>

                )
              }))

        }
      </div>

      {!modalmail && (
        <Pagination
          activePage={page}
          itemsCountPerPage={5}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={setPage}
        />
      )}

    </div>
  )
}


