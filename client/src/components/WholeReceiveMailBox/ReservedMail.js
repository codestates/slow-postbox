import React from 'react'
import { GoMailRead, GoMail } from "react-icons/go";


export default function ReservedMail({ mailListReserved }) {
	console.log(mailListReserved)

	function getDay(e) {
		const today = new Date() // Tue Nov 16 2021 14:09:45 GMT+0900 (한국 표준시)
		const setDate = new Date(e.slice(0, 10)) // Thu Dec 30 2021 09:00:00 GMT+0900 (한국 표준시)
		const distance = setDate.getTime() - today.getTime();

		const day = Math.floor(distance / (1000 * 60 * 60 * 24));
		return day
	}


	return (
		<>
			{mailListReserved.length === 0
				? <div className="mailbox-container-empty"> 도착예정 편지가 없습니다.</div>
				: mailListReserved.map((el, id) => {
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
				})}

		</>
	)
}


