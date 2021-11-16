import React from 'react'
import { GoMailRead, GoMail } from "react-icons/go";
import './SentMail.css'

export default function SentMail({ sent }) {

	return (
		<>
			{sent.length === 0
				? <div className="mailbox-container-empty"> 받은 편지가 없습니다.</div>
				: sent.map((el, idx) => {
					return (
						<div className="mailbox-container" key={idx}>
							<div className="sort-readCheck"> {el.isRead === 0 ? "안읽음" : "읽음"} </div>
							<div className="icon-mail">
								{el.isRead === 0
									? <GoMail size="60" />
									: <GoMailRead size="60" />}
							</div>
							<div className="text-mail"> {el.title} </div>
							<div className="text-mail" >
								{el.name
									? el.name
									: el.receiverEmail} / {el.reserved_at.slice(0, 10)}
							</div>
						</div>
					)
				})}


		</>
	)
}


