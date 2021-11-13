import React from 'react'
import Paging from './Paging'
import './WholeReceivedMail.css'
import ReceiveMail from './ReceiveMail'
import ReservedMail from './ReservedMail'
import { useState } from 'react'


export default function WholeReceivedMail() {
	const [view, setView] = useState('ReceiveMail')



	return (
		<>
			<div className="wholeMailBox-container">
				<div className="wholeMailBox-grid" >
					<div className="sort-receiver" >
						문선영 님,
					</div>
					<div className="tabmenu-container" >
						<div className="bar-tabmenu">
							<div className={view === 'ReceiveMail' ? "tab-selected " : "toggle-onoff"} onClick={() => { setView("ReceiveMail") }}>
								<div className="toggle-boxcheck" style={{ color: "#E84B35" }}> ● </div>
								받은 편지함
							</div>
							<div className={view === 'ReservedMail' ? "tab-selected" : "toggle-onoff"} onClick={() => { setView("ReservedMail") }}>
								<div className="toggle-boxcheck" style={{ color: "#E84B35" }}> ● </div>
								도착 예정함
							</div>
						</div>
					</div>
					<div >
						{
							view === 'ReceiveMail'
								? <ReceiveMail />
								: <ReservedMail />
						}
					</div>
					<Paging />
				</div>
			</div>
		</>
	)
}



const buttontemp = [
	{/* <div>
						<button className="btn-MailboxLoad" onClick={() => setView('ReceiveMail')}>
							<div className="toggle-boxcheck"> ● </div>
							받은 편지함
						</button>
						<button className="btn-MailboxLoad" onClick={() => setView('ReservedMail')}>
							<div className="toggle-boxcheck"> ● </div>
							도착 예정함
						</button>
					</div> */}
]