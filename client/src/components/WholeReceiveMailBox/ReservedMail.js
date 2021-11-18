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
		const today = new Date()
		const setDate = new Date(e.slice(0, 10))
		const distance = setDate.getTime() - today.getTime();

		const day = Math.floor(distance / (1000 * 60 * 60 * 24));
		return day
	}

	const getReservedData = async () => {
		await setIsLoading(true)
		// const authCheck = await axios.get(
		// 	`${process.env.REACT_APP_SERVER_API}/user/auth`,
		// 	{
		// 		withCredentials: true,
		// 	}
		// )
		// console.log(authCheck)
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
									<div className="text-mail">  {getDay(el.reserved_at)}일 후 편지 도착예정 </div>

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


