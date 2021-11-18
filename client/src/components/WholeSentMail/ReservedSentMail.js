import React from 'react'
import axios from 'axios';
import Loding from '../Loding/Loding';
import { GoMailRead, GoMail } from "react-icons/go";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from "react-js-pagination";

export default function ReservedSentMail() {
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true)

	const { email } = useSelector(state => state.loginReducer)

	function getDay(e) {
		const today = new Date()
		const setDate = new Date(e.slice(0, 10))
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

	useEffect(() => {
		getReservedSent();
	}, [])

	useEffect(() => {
		getReservedSentPage();
	}, [page])


	return (
		<>
			<div className='box-received-mail'>
				{isLoading ? (
					<Loding />
				) : data.length === 0
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
				activePage={page}
				itemsCountPerPage={5}
				totalItemsCount={count}
				pageRangeDisplayed={5}
				prevPageText={"‹"}
				nextPageText={"›"}
				onChange={setPage}
			/>
		</>
	)
}