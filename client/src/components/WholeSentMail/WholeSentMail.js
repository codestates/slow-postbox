import Paging from './Paging'
import './WholeSendMail.css'
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
					<div>
						<button classname="btn-receiveMail" onClick={() => setView('SentMail')}> 보낸 편지함 </button>
						<button classname="btn-reservedMail" onClick={() => setView('ReservedSentMail')}> 전달 예정 </button>
					</div>
					<div className="test-1">
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


