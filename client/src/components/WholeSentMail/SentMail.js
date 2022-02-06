import React from 'react'
import { GoMailRead, GoMail } from "react-icons/go";
import './SentMail.css'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Pagination from "react-js-pagination";
import Loding from '../Loding/Loding';
import MailView from '../WholeReceiveMailBox/MailView';

export default function SentMail() {
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0)
	const [maildata, setMailData] = useState({})
	const [mailView, setMailView] = useState(false)
	const [data, setData] = useState([])
	const [isLoading, setIsLoding] = useState(false)

	const { email } = useSelector(state => state.loginReducer)


	const getSentData = async () => {
		await setIsLoding(true)
		const authCheck = await axios.get(
			`${process.env.REACT_APP_SERVER_API}/users/auth`,
			{
				withCredentials: true,
			}
		);

		await axios.get(`${process.env.REACT_APP_SERVER_API}/mails/sent`, {
			params: { email: authCheck.data.data.email, page }
		})
			.then((res) => {
				setData(res.data.data)
				setCount(res.data.count)
			})
			.catch((err) => {
				console.log(err)

			})
		await setIsLoding(false)

	}

	const getSentDataPage = async () => {
		axios.get(`${process.env.REACT_APP_SERVER_API}/mails/sent`, {
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

	useEffect(() => {
		getSentData();
	}, [])

	useEffect(() => {
		getSentDataPage();
	}, [page])



	const getMailcontent = async (el) => {
		await axios.get(`${process.env.REACT_APP_SERVER_API}/mails/viewSent/${el}`)
			.then((res) => {
				setMailData(res.data.data)
				setMailView(true)
			})
			.catch((err) => {
				console.log(err)
			})

	}
	if (isLoading) return <Loding />
	if (mailView) return <MailView maildata={maildata} setMailView={setMailView} getSentDataPage={getSentDataPage} />


	return (
		<>
			<div className='box-received-mail'>
				{(data.length === 0
					? <div className="mailbox-container-empty"> 보낸 편지가 없습니다.</div>
					: data.map((el, idx) => {
						return (
							<div className="mailbox-container select" key={idx} onClick={() => { getMailcontent(el.id) }}>
								<div className="sort-readCheck"> {el.isRead === 0 ? "안읽음" : "읽음"} </div>
								<div className="icon-mail">
									{el.isRead === 0
										? <GoMail className='mailIcon' />
										: <GoMailRead className='mailIcon' />}
								</div>
								<div className="text-mail"> {el.title} </div>
								<div className="text-mail" >{`받는사람 : 
									${el.name
										? el.name
										: el.receiverEmail.split('(삭제)').join("")} / ${el.reserved_at.slice(0, 10)}`}
								</div>
							</div>
						)
					}))
				}
			</div>
			{!mailView && (
				< Pagination
					activePage={page}
					itemsCountPerPage={5}
					totalItemsCount={count}
					pageRangeDisplayed={5}
					prevPageText={"‹"}
					nextPageText={"›"}
					onChange={setPage}
				/>
			)}
		</>
	)
}


