import React, { useEffect } from 'react'
import './WholeReceivedMail.css'
import ReceiveMail from './ReceiveMail'
import ReservedMail from './ReservedMail'
import { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { modalmailview } from '../../actions'
import Loding from '../Loding/Loding';


export default function WholeReceivedMail() {
	const dispatch = useDispatch();

	const [view, setView] = useState('ReceiveMail')
	const [mailListReceive, setMailListReceive] = useState([])
	const [mailListReserved, setMailListReserved] = useState([])
	const [mailNum, setMailNum] = useState(0)
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0)
	const [isLoding, setIsLoding] = useState(true);

	const userInfo = useSelector(state => state.loginReducer)
	const { email, name } = userInfo



	const modaloff = () => {
		dispatch(modalmailview(false))
	}

	function viewChange() { // 컴포넌트 view change 시키기
		setView("ReservedMail")
	}

	function viewChange2() { // 컴포넌트 view change 시키기
		setView("ReceiveMail")
	}

	function mailChange(el) {
		setMailNum(el)
	}

	const toggleOnOff = async () => {
		await axios.patch(`${process.env.REACT_APP_SERVER_API}/mail/reserved`,
			{ data: { email } })
			.then((res) => {
				console.log(res)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const mailListUp = async () => { // 받은편지함 list 받아오기 
		// await setIsLoding(true);
		await axios.get(`${process.env.REACT_APP_SERVER_API}/mail/receive`, {
			params: { email, page }
		})
			.then((res) => {
				setCount(res.data.count)
				setMailListReceive(res.data.data)
			})
			.catch((err) => {
				console.log(err)
			})
		// await setIsLoding(false);
	}


	const mailListUp2 = async () => { // 도착 예정함 list 받아오기
		await axios.get(`${process.env.REACT_APP_SERVER_API}/mail/reserved`, {
			params: { email, page }
		})
			.then((res) => {
				setCount(res.data.count)
				setMailListReserved(res.data.data)
			})
			.catch((err) => {
				console.log(err)
			})
	}



	function tabMenu1() {
		mailListUp()
		viewChange2()
		modaloff()
	}

	function tabMenu2() {
		toggleOnOff()
		mailListUp2()
		viewChange()
		modaloff()
	}


	useEffect(async () => { // 화면 랜더링 될 때 
		await mailListUp()
		await mailListUp2()
	}, [])

	useEffect(() => {
		mailListUp()
	}, [mailNum])


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
						{name} 님,
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
					<div>
						{
							// isLoding ? (
							// 	<tr className='box-loding'>
							// 		<td colSpan='7'>
							// 			<Loding />
							// 		</td>
							// 	</tr>
							// ) : (
							view === 'ReceiveMail'
								? <ReceiveMail mailListReceive={mailListReceive} mailChange={mailChange} page={page} count={count} setPage={setPage} />
								: <ReservedMail mailListReserved={mailListReserved} mailChange={mailChange} page={page} count={count} setPage={setPage} />
							// )
						}
					</div>
				</div>
			</div>
		</>
	)
}

