import React, { useEffect } from 'react'
import Paging from './Paging'
import './WholeReceivedMail.css'
import ReceiveMail from './ReceiveMail'
import ReservedMail from './ReservedMail'
import { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'


export default function WholeReceivedMail() {
	const [view, setView] = useState('ReceiveMail')
	const [mailListReceive, setMailListReceive] = useState([])
	const [mailListReserved, setMailListReserved] = useState([])
	// const userInfo = useSelector(state => state.loginReducer)
	// const { email, name } = userInfo

	const testemail = "sunyeong2222@gmail.com" // 로그인 리듀서에 있는 값


	function viewChange() { // 컴포넌트 view change 시키기
		setView("ReservedMail")
	}

	function viewChange2() { // 컴포넌트 view change 시키기
		setView("ReceiveMail")
	}

	const toggleOnOff = async () => {
		await axios.patch(`${process.env.REACT_APP_SERVER_API}/mail/receive`,
			{ data: { testemail } })
			.then((res) => {
				console.log(res)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const toggleOnOff2 = async () => {
		await axios.patch(`${process.env.REACT_APP_SERVER_API}/mail/reserved`,
			{ data: { testemail } })
			.then((res) => {
				console.log(res)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const mailListUp = async () => { // 받은편지함 list 받아오기 
		await axios.get(`${process.env.REACT_APP_SERVER_API}/mail/receive`, {
			params: { testemail }
		})
			.then((res) => {
				console.log(res)
				setMailListReceive(res.data.data)
			})
			.catch((err) => {
				console.log(err)
			})

	}


	const mailListUp2 = async () => { // 도착 예정함 list 받아오기
		await axios.get(`${process.env.REACT_APP_SERVER_API}/mail/reserved`, {
			params: { testemail }
		})
			.then((res) => {
				setMailListReserved(res.data.data)
			})
			.catch((err) => {
				console.log(err)
			})
	}



	function tabMenu1() {
		toggleOnOff()
		mailListUp()
		viewChange2()
	}

	function tabMenu2() {
		toggleOnOff2()
		mailListUp2()
		viewChange()
	}
	// 페이지가 랜더링되면 받은편지함의 업데이트 구문을 실행한다
	// 받은편지함 리스트를 받아온다
	// 도착예정함 도착예정함 리스트를 받아와서 toggle 여부를 확인한다
	// 도착예정함을 누르면 업데이트 구문을 실행한다
	// 도착예정함 리스트를 받아온다

	useEffect(async () => { // 화면 랜더링 될 때 
		await mailListUp()
		await mailListUp2()  // 도착예정함 편지 받아오기
	}, [])

	const togglerFilter = (e) => {
		const filterNum = e.filter(el => el.isChecked === 0)
		if (filterNum.length > 0) return true
		return false
	}

	return (
		<>
			<div className="wholeMailBox-container">
				<div className="wholeMailBox-grid" >
					<div className="sort-receiver" >
						name 님,
					</div>
					<div className="tabmenu-container" >
						<div className="bar-tabmenu">
							<div className={view === 'ReceiveMail' ? "tab-selected " : "toggle-onoff"} onClick={tabMenu1}>
								<div className="toggle-boxcheck-hide" style={{ color: "#E84B35" }}> ● </div>
								받은 편지함
							</div>
							<div className={view === 'ReservedMail' ? "tab-selected" : "toggle-onoff"} onClick={tabMenu2}>
								<div className={togglerFilter(mailListReserved) ? "toggle-boxcheck" : "toggle-boxcheck-hide"} style={{ color: "#E84B35" }}> ● </div>
								도착 예정함
							</div>
						</div>
					</div>
					<div >
						{
							view === 'ReceiveMail'
								? <ReceiveMail mailListReceive={mailListReceive} />
								: <ReservedMail mailListReserved={mailListReserved} />
						}
					</div>
					<Paging />
				</div>
			</div>
		</>
	)
}

