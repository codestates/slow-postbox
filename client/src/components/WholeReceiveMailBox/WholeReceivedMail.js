import React, { useEffect } from 'react'
import './WholeReceivedMail.css'
import ReceiveMail from './ReceiveMail'
import ReservedMail from './ReservedMail'
import { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'


export default function WholeReceivedMail({ hadleisChecked }) {

	const [view, setView] = useState('ReceiveMail')
	const [isChecked, setIsChecked] = useState(false)
	const userInfo = useSelector(state => state.loginReducer)
	const { email, name } = userInfo

	function viewChange() {
		setView("ReservedMail")
	}

	function viewChange2() {
		setView("ReceiveMail")
	}


	const handleCheckReserved = async () => {
		await axios.patch(`${process.env.REACT_APP_SERVER_API}/mail/reserved`,
			{ email })
			.then((res) => {
				getReservedChecked();
			})
			.then(() => { hadleisChecked(); })
			.catch((err) => {
				console.log(err)
			})
	}

	const getReservedChecked = async () => {
		axios.get(`${process.env.REACT_APP_SERVER_API}/mail/check`, { params: { email } })
			.then((res) => {
				setIsChecked(res.data.count)
			})
	}

	useEffect(() => {
		getReservedChecked();
	}, [])


	function tabMenu1() {
		viewChange2()
	}

	function tabMenu2() {
		viewChange()
		handleCheckReserved();
	}

	return (
		<>
			<div className="wholeMailBox-container">
				<div className="wholeMailBox-grid" >
					<div className="sort-receiver" >
						{name} 님
					</div>
					<div className="tabmenu-container" >
						<div className="bar-tabmenu">
							<div className={view === 'ReceiveMail' ? "tab-selected " : "toggle-onoff"} onClick={tabMenu1}>
								<div className="toggle-boxcheck-hide" style={{ color: "#E84B35" }}> ● </div>
								받은 편지함
							</div>
							<div className={view === 'ReservedMail' ? "tab-selected" : "toggle-onoff"} onClick={tabMenu2}>
								<div className={isChecked ? "toggle-boxcheck" : "toggle-boxcheck-hide"} style={{ color: "#E84B35" }}> ● </div>
								도착 예정함
							</div>
						</div>
					</div>
					<div className="mailradius">
						{view === 'ReceiveMail'
							? <ReceiveMail />
							: <ReservedMail />
						}
					</div>
				</div>
			</div>
		</>
	)
}

