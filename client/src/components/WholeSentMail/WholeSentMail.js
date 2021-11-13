import Paging from './Paging'
// import './WholeSendMail.css'
import '../WholeReceiveMailBox/WholeReceivedMail.css'
import SentMail from './SentMail'
import ReservedSentMail from './ReservedSentMail'
import { useState } from 'react'


export default function WholeSentMail() {
	const [view, setView] = useState('SentMail')


	return (
		<>
			<div className="wholeMailBox-container">
				<div className="wholeMailBox-grid">
					<div className="sort-receiver"> 문선영 님, </div>
					<div className="tabmenu-container" >
						<div className="bar-tabmenu">
							<div className={view === 'SentMail' ? "tab-selected " : ""} onClick={() => { setView("SentMail") }}>
								보낸 편지함
							</div>
							<div className={view === 'ReservedSentMail' ? "tab-selected" : ""} onClick={() => { setView("ReservedSentMail") }}>
								전달 예정함
							</div>
						</div>
					</div>
					<div>
						{
							view === 'SentMail'
								? <SentMail />
								: <ReservedSentMail />
						}
					</div>
					<Paging />
				</div>
			</div>
		</>
	)
}


