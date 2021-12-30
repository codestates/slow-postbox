import '../WholeReceiveMailBox/WholeReceivedMail.css'
import SentMail from './SentMail'
import ReservedSentMail from './ReservedSentMail'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function WholeSentMail() {
	const [view, setView] = useState('SentMail')

	const userInfo = useSelector(state => state.loginReducer)
	const { name, id } = userInfo

	function viewChange() {
		setView("SentMail")
	}

	function viewChange2() {
		setView("ReservedSentMail")
	}

	function tabMenu1() {
		viewChange()
	}

	function tabMenu2() {
		viewChange2()
	}

	function authCheck() {
		if (!id) {
			window.location.replace('/');
		}
	}

	useEffect(() => {
		authCheck()
	}, [])



	return (
		<>
			<div className="wholeMailBox-container">
				<div className="wholeMailBox-grid">
					<div className="sort-receiver"> {name} 님</div>
					<div className="tabmenu-container" >
						<div className="bar-tabmenu">
							<div className={view === 'SentMail' ? "tab-selected " : ""} onClick={tabMenu1}>
								보낸 편지함
							</div>
							<div className={view === 'ReservedSentMail' ? "tab-selected" : ""} onClick={tabMenu2}>
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
				</div>
			</div>
		</>
	)
}


