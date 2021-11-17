import '../WholeReceiveMailBox/WholeReceivedMail.css'
import SentMail from './SentMail'
import ReservedSentMail from './ReservedSentMail'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modalmailview } from '../../actions'

export default function WholeSentMail() {
	const dispatch = useDispatch();

	const [view, setView] = useState('SentMail')
	const [sent, setSent] = useState([])
	const [reservedsent, setReservedsent] = useState([])
	const [page, setPage] = useState(1)
	const [mailNum, setMailNum] = useState(0)

	const userInfo = useSelector(state => state.loginReducer)
	const { email, name } = userInfo

	function viewChange() { // 컴포넌트 view change 시키기
		setView("SentMail")
	}

	function viewChange2() { // 컴포넌트 view change 시키기
		setView("ReservedSentMail")
	}

	const modaloff = () => {
		dispatch(modalmailview(false))
	}

	function mailChange(el) {
		setMailNum(el)
	}

	const sentmailListUp = async () => {
		await axios.get(`${process.env.REACT_APP_SERVER_API}/mail/sent`, {
			params: { email, page }
		})
			.then((res) => {
				console.log(res)
				setSent(res.data.data)
			})
			.catch((err) => {
				console.log(err)
			})

	}

	const sentmailListUp2 = async () => {
		await axios.get(`${process.env.REACT_APP_SERVER_API}/mail/reservedsent`, {
			params: { email, page }
		})
			.then((res) => {
				console.log(res.data)
				setReservedsent(res.data.data)
			})
			.catch((err) => {
				console.log(err)
			})

	}


	function tabMenu1() {
		sentmailListUp()
		viewChange()
		modaloff()
	}

	function tabMenu2() {
		sentmailListUp2()
		viewChange2()
		modaloff()
	}

	useEffect(() => {
		sentmailListUp()
	}, [])

	return (
		<>
			<div className="wholeMailBox-container">
				<div className="wholeMailBox-grid">
					<div className="sort-receiver"> {name} 님, </div>
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
								? <SentMail sent={sent} mailChange={mailChange} />
								: <ReservedSentMail reservedsent={reservedsent} />
						}
					</div>
				</div>
			</div>
		</>
	)
}


