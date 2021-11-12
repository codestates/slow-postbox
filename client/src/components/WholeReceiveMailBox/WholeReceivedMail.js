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
				<div className="wholeMailBox-grid">
					<div className="sort-receiver" >
						문선영 님,
					</div>
					<div>
						<button className="btn-receiveMail" onClick={() => setView('ReceiveMail')}>
							<div className="toggle-boxcheck"> ● </div>
							받은 편지함
						</button>
						<button className="btn-reservedMail" onClick={() => setView('ReservedMail')}>
							<div className="toggle-boxcheck"> ● </div>
							도착 예정함
						</button>
					</div>
					<div>
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


