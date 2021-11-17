import React, { useEffect, useState } from 'react'
import { GoMailRead, GoMail } from "react-icons/go";
import Pagination from "react-js-pagination";
import Loding from '../Loding/Loding';
import axios from 'axios';
import { useSelector } from 'react-redux';


export default function ReservedMail({ mailChange}) {
	const [ page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const [ data, setData ] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const { email } = useSelector(state => state.loginReducer)


	function getDay(e) {
		const today = new Date() // Tue Nov 16 2021 14:09:45 GMT+0900 (한국 표준시)
		const setDate = new Date(e.slice(0, 10)) // Thu Dec 30 2021 09:00:00 GMT+0900 (한국 표준시)
		const distance = setDate.getTime() - today.getTime();

		const day = Math.floor(distance / (1000 * 60 * 60 * 24));
		return day
	}

	const getReservedData = async() => {
		await setIsLoading(true)
		await axios.get(`${process.env.REACT_APP_SERVER_API}/mail/reserved`, {params: {email, page}})
		.then((res) => {
		  setData(res.data.data);
		  setCount(res.data.count)
		})
		await setIsLoading(false)
	  }
	
	  const getReservedDataPage = async() => {
		axios.get(`${process.env.REACT_APP_SERVER_API}/mail/reserved`, {params: {email, page}})
		.then((res) => {
		  setData(res.data.data);
		  setCount(res.data.count)
		})
	  }
	
	  useEffect(()=> {
		getReservedData();
	  },[])
	
	  useEffect(()=> {
		getReservedDataPage();
	  },[page])


	return (
		<>
		<div className='box-received-mail'>
			{isLoading ? (
				<Loding />
			): (data.length === 0
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
				}))}
				</div>
			<Pagination
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


