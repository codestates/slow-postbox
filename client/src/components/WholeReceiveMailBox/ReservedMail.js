import React, { useEffect, useState } from 'react'
import { GoMailRead, GoMail } from "react-icons/go";
import Pagination from "react-js-pagination";
import Loding from '../Loding/Loding';
import axios from 'axios';
import { useSelector } from 'react-redux';


export default function ReservedMail() {
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(false)

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

	const getReservedData = async () => {
		await setIsLoading(true)
		await axios.get(`${process.env.REACT_APP_SERVER_API}/mail/reserved`, { params: { email, page } })
			.then((res) => {
				setData(res.data.data);
				setCount(res.data.count)
			})
		await setIsLoading(false)
	}

	const getReservedDataPage = async () => {
		axios.get(`${process.env.REACT_APP_SERVER_API}/mail/reserved`, { params: { email, page } })
			.then((res) => {
				setData(res.data.data);
				setCount(res.data.count)
			})
	}

	useEffect(() => {
		getReservedData();
	}, [])

	useEffect(() => {
		getReservedDataPage();
	}, [page])


	return (
		<div>
			<div className='box-received-mail'>
				{isLoading ? (
					<Loding />
				) : (data.length === 0
					? <div className="mailbox-container-empty"> 도착예정 편지가 없습니다.</div>
					: data.map((el, id) => {
						return (
							<>
								<div className="mailbox-container" key={id} >
									<div className="sort-readCheck">  </div>
									<div className="icon-mail">
										{el.isRead === 0
											? <GoMail size="60" />
											: <GoMailRead size="60" />}
									</div>
									<div className="text-mail">  {getDay(el.reserved_at)} 후 편지 도착예정 </div>

								</div>
							</>
						)
					}

					))}

			</div>
			<Pagination
				activePage={page}
				itemsCountPerPage={5}
				totalItemsCount={count}
				pageRangeDisplayed={5}
				prevPageText={"‹"}
				nextPageText={"›"}
				onChange={setPage}
			/>
		</div>
	)
}


