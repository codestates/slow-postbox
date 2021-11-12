import React from 'react'
import { GoMailRead, GoMail } from "react-icons/go";
import './SentMail.css'

export default function SentMail() {
	const dummydata3 = [
		{ id: 1, title: "제목제1111111111111111111111", writerName: "문선영", received_at: "2021.12.31", isChecked: true, isRead: false },
		{ id: 2, title: "제목222222222222222222222222", writerName: "김소현", received_at: "2021.12.31", isChecked: true, isRead: false },
	]


	return (
		<>
			{dummydata3.length === 0
				? <div className="mailbox-container-empty"> 받은 편지가 없습니다.</div>
				: dummydata3.map(el => {
					return (
						<>
							<div className="mailbox-container" >
								<div className="sort-readCheck"> {el.isRead === false ? "안읽음" : "읽음"} </div>
								<div className="icon-mail">
									{el.isRead === false
										? <GoMail size="60" />
										: <GoMailRead size="60" />}
								</div>
								<div className="text-mail"> {el.title} </div>
								<div className="text-mail" >
									{el.writerName} / {el.received_at}
								</div>
							</div>
						</>
					)
				})}


		</>
	)
}


