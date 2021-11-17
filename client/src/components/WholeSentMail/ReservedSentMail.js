import React from 'react'
import axios from 'axios';
import Loding from '../Loding/Loding';
import { GoMailRead, GoMail } from "react-icons/go";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from "react-js-pagination";

export default function ReservedSentMail({ reservedsent }) {
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const [ data , setData ] = useState([]);
	const [isLoading, setIsLoading] = useState(true)

	const { email } = useSelector(state => state.loginReducer)

	function getDay(e) {
		const today = new Date() // Tue Nov 16 2021 14:09:45 GMT+0900 (한국 표준시)
		const setDate = new Date(e.slice(0, 10)) // Thu Dec 30 2021 09:00:00 GMT+0900 (한국 표준시)
		const distance = setDate.getTime() - today.getTime();

		const day = Math.floor(distance / (1000 * 60 * 60 * 24));
		return day
	}

	const getReservedSent = async () => {
		await setIsLoading(true)
		await axios.get(`${process.env.REACT_APP_SERVER_API}/mail/reservedsent`, {
			params: { email, page }
		})
			.then((res) => {
				setData(res.data.data)
				setCount(res.data.count)
			})
			.catch((err) => {
				console.log(err)
			})
		await setIsLoading(false)
	}

	const getReservedSentPage = async () => {
		axios.get(`${process.env.REACT_APP_SERVER_API}/mail/reservedsent`, {
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
		getReservedSent();
	  },[])
	
	  useEffect(()=> {
		getReservedSentPage();
	  },[page])


	return (
		<>
		<div className='box-received-mail'>
			{isLoading ? (
				<Loding />
			): data.length === 0
				? <div className="mailbox-container-empty"> 전달예정 편지가 없습니다.</div>
				: data.map((el, id) => {
					return (
						<div key={id}>
							<div className="mailbox-container"  >
								<div className="sort-readCheck">  </div>
								<div className="icon-mail">
									{el.isRead === 0
										? <GoMail size="60" />
										: <GoMailRead size="60" />}
								</div>
								<div className="text-mail" >
									<div className="text-mail">  {getDay(el.reserved_at)}일 후 편지 전달예정 </div>
								</div>
							</div>
						</div>
					)
				})}
				</div>
				< Pagination
					activePage={page} // 현재페이지
					itemsCountPerPage={5} // 한 페이지당 보여줄 리스트 아이템 개수
					totalItemsCount={count} // 총 아이템 개수
					pageRangeDisplayed={5} // Paginator 내에서 보여줄 페이지의 범위
					prevPageText={"‹"} //"이전"을 나타낼 텍스트 (prev, <, ...)
					nextPageText={"›"} //"다음"을 나타낼 텍스트
					onChange={setPage} // 페이지가 바뀔 때 핸들링해줄 함수
				/>
		</>
	)
}