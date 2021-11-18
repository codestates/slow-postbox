import React from 'react'
import axios from 'axios';
import Loding from '../Loding/Loding';
import { GoMailRead, GoMail } from "react-icons/go";
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Pagination from "react-js-pagination";

export default function ReservedSentMail() {
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true)

	const { email } = useSelector(state => state.loginReducer)
	function getDay(e) {
		let date = (e.slice(0, 10) + "T00:00+0900")
		let setDate = new Date(date)

		let temp = `${new Date()}"`.slice(0, 16) + "00:00:00 GMT+0900"
		let today = new Date(temp)

		const distance = setDate.getTime() - today.getTime();

		const day = Math.floor(distance / (1000 * 60 * 60 * 24));
		const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		if (day > 0) {
			return day + "일"
		} else if (hours > 0) {
			return hours + "시간"
		} else {
			return minutes + "분"
		}
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
										<div className="text-mail">  {getDay(el.reserved_at)} 후 편지 전달예정 </div>
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