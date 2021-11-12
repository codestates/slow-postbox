import React from 'react'
import { GoMailRead, GoMail } from "react-icons/go";


export default function ReservedMail() {
	const dummydata2 = []

	return (
		<>
			{dummydata2.length === 0
				? <div className="mailbox-container-empty"> 도착예정 편지가 없습니다.</div>
				: dummydata2.map((el, id) => {
					return (
						<>
							<div className="mailbox-container" key={id} >
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

