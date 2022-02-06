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
  const [mailView, setMailView] = useState(false)


  const getReceivedData = async () => {
    await setIsLoading(true)
    const authCheck = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/users/auth`,
      {
        withCredentials: true,
      }
    )
    await axios.get(`${process.env.REACT_APP_SERVER_API}/mails/received`, { params: { email: authCheck.data.data.email, page } })
      .then((res) => {
        setData(res.data.data);
        setCount(res.data.count)
      })
    await setIsLoading(false)

  }

  const getReceivedDataPage = async () => {
    axios.get(`${process.env.REACT_APP_SERVER_API}/mails/received`, { params: { email, page } })
      .then((res) => {
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
    await axios.get(`${process.env.REACT_APP_SERVER_API}/mails/viewReceived/${el}`)
      .then((res) => {
        setMailData(res.data.data)
        setMailView(true)
      })
      .catch((err) => {
        console.log(err)
      })

  }

  const getInfo = (info) => {
    const { name, writerEmail, reserved_at } = info
    const writer = name ? name : writerEmail.split('(삭제)').join("")

    return `보낸사람 : ${writer} / ${reserved_at.slice(0, 10)}`
  }

  if (isLoading) return <img src='img/spinner.svg' />
  if (mailView) return <MailView maildata={maildata} setMailView={setMailView} getReceivedDataPage={getReceivedDataPage} />



  return (
    <div>
      <div className='box-received-mail'>
        {data.length === 0
          ? <div className="mailbox-container-empty"> 받은 편지가 없습니다.</div>
          : data.map((el, idx) => {
            return (
              <div key={idx} className="mailbox-container select" onClick={() => { getMailcontent(el.id) }} >
                <div className="sort-readCheck"> {el.isRead === 0 ? "읽지않음" : "읽음"} </div>
                <div className="icon-mail">
                  {el.isRead === 0
                    ? <GoMail className='mailIcon' />
                    : <GoMailRead className='mailIcon' />}
                </div>
                <div className="text-mail"> {el.title} </div>
                <div className="text-mail" > {getInfo(el)}</div>
              </div>

            )
          })
        }
      </div>

      {!mailView && (
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


