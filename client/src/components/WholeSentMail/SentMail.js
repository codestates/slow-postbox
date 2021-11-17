import React from 'react'
import { GoMailRead, GoMail } from "react-icons/go";
import './SentMail.css'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from "react-js-pagination";
import Loding from '../Loding/Loding';
import SentMailView from './SentMailView';


export default function SentMail({ mailChange }) {
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0)
	const [maildata, setMailData] = useState({})
	const modalChecked = useSelector(state => state.mailReducer)
	const [ modalmail, setModalmail ] = useState(false)
	const [ data , setData ] = useState([])
	const [isLoading, setIsLoding] = useState(false)

	const {email} = useSelector(state => state.loginReducer)


	const getSentData = async () => {
		await setIsLoding(true)
		await axios.get(`${process.env.REACT_APP_SERVER_API}/mail/sent`, {
			params: { email, page }
		})
			.then((res) => {
				console.log(res.data)
				setData(res.data.data)
				setCount(res.data.count)
			})
			.catch((err) => {
				console.log(err)
			})
		await setIsLoding(false)

	}

	const getSentDataPage = async () => {
		axios.get(`${process.env.REACT_APP_SERVER_API}/mail/sent`, {
			params: { email, page }
		})
			.then((res) => {
				setData(res.data.data)
				setCount(res.data.count)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	useEffect(()=> {
		getSentData();
	},[])

	useEffect(()=> {
		getSentDataPage();
	},[page])



	const getMailcontent = async (el) => { // 보낸편지함 list 받아오기
		await axios.get(`${process.env.REACT_APP_SERVER_API}/mail/sent/${el}`)
			.then((res) => {
				setMailData(res.data.data)
				setModalmail(true)
			})
			.catch((err) => {
				console.log(err)
			})

	}


	return (
		<>
		<div className='box-received-mail'>
			{modalmail
				? <SentMailView maildata={maildata} setModalmail={setModalmail} getSentDataPage={getSentDataPage}/>
				: isLoading ? (
					<Loding />
				) : (data.length === 0
					? <div className="mailbox-container-empty"> 받은 편지가 없습니다.</div>
					: data.map((el, idx) => {
						return (
							<div className="mailbox-container select" key={idx} onClick={() => { getMailcontent(el.id) }}>
								<div className="sort-readCheck"> {el.isRead === 0 ? "안읽음" : "읽음"} </div>
								<div className="icon-mail">
									{el.isRead === 0
										? <GoMail size="60" />
										: <GoMailRead size="60" />}
								</div>
								<div className="text-mail"> {el.title} </div>
								<div className="text-mail" >{`받는사람 : 
									${el.name
										? el.name
										: el.receiverEmail.split('(삭제)').join()} / ${el.reserved_at.slice(0, 10)}`}
								</div>
							</div>
						)
					}))
			}
			</div>
			{!modalmail && (
				< Pagination
					activePage={page} // 현재페이지
					itemsCountPerPage={5} // 한 페이지당 보여줄 리스트 아이템 개수
					totalItemsCount={count} // 총 아이템 개수
					pageRangeDisplayed={5} // Paginator 내에서 보여줄 페이지의 범위
					prevPageText={"‹"} //"이전"을 나타낼 텍스트 (prev, <, ...)
					nextPageText={"›"} //"다음"을 나타낼 텍스트
					onChange={setPage} // 페이지가 바뀔 때 핸들링해줄 함수
				/>
			)}
		</>
	)
}


