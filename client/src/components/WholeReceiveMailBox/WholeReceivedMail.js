import React, { useEffect } from 'react'
import './WholeReceivedMail.css'
import ReceiveMail from './ReceiveMail'
import ReservedMail from './ReservedMail'
import ModalLogin from '../../pages/ModalLogin'
import { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux'


export default function WholeReceivedMail({ hadleisChecked }) {

	const [modalLogin, setModalLogin] = useState(false);
	const [view, setView] = useState('ReceiveMail')


	const [isChecked, setIsChecked] = useState(false)
	const userInfo = useSelector(state => state.loginReducer)
	const { email, name, id } = userInfo

	function viewChange() {
		setView("ReservedMail")
	}

	function viewChange2() {
		setView("ReceiveMail")
	}


	const handleCheckReserved = async () => {
		await axios.patch(`${process.env.REACT_APP_SERVER_API}/mails/reserved/notiCheck`,
			{ email })
			.then((res) => {
				getReservedChecked();
			})
			.then(() => { hadleisChecked(); })
			.catch((err) => {
				console.log(err)
			})
	}

	const checkGuest = async () => {
		const userData = await axios.get(
			`${process.env.REACT_APP_SERVER_API}/users/auth`,
			{
				withCredentials: true,
			})

		if (userData.data.data.isGuest) {
			setView('guest')
		}
	}

	useEffect(() => {
		checkGuest();
	}, [])



	const getReservedChecked = async () => {
		axios.get(`${process.env.REACT_APP_SERVER_API}/mails/notiCount`, { params: { email } })
			.then((res) => {
				setIsChecked(res.data.count)
			})
	}

	const isAuthenticated = () => {
		axios
			.get(`${process.env.REACT_APP_SERVER_API}/users/auth`, {
				withCredentials: true,
			})
			.catch((err) => {
				setModalLogin(true)
			});
	};

	useEffect(() => {
		isAuthenticated();
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

		<div className="wholeMailBox-container">
			<div className="wholeMailBox-grid" >
				<div className="sort-receiver" >
					{name} 님
				</div>
				<div className="tabmenu-container" >
					{view === 'guest'
						? (
							<div className="bar-tabmenu">
								<div className='guest'>
									<div className="toggle-boxcheck-hide" > ● </div>
									받은 편지함
								</div>
								<div className='guest' >
									<div className={isChecked ? "toggle-boxcheck" : "toggle-boxcheck-hide"} style={{ color: "rgb(250, 127, 127)" }} > ● </div>
									도착 예정함
								</div>
							</div>
						)
						: (
							<div className="bar-tabmenu">
								<div className={view === 'ReceiveMail' ? "tab-selected " : "toggle-onoff"} onClick={tabMenu1}>
									<div className="toggle-boxcheck-hide" > ● </div>
									받은 편지함
								</div>
								<div className={view === 'ReservedMail' ? "tab-selected" : "toggle-onoff"} onClick={tabMenu2}>
									<div className={isChecked ? "toggle-boxcheck" : "toggle-boxcheck-hide"} style={{ color: "rgb(250, 127, 127)" }}> ● </div>
									도착 예정함
								</div>
							</div>
						)
					}

				</div>
				<div className="mailradius">
					{view === 'ReceiveMail'
						? <ReceiveMail />
						: (view === 'ReservedMail'
							? <ReservedMail />
							: <div className='guest-text'>회원만 이용 할 수 있는 서비스 입니다</div>
						)
					}
				</div>
				{modalLogin && <ModalLogin />}
			</div>
		</div>
	)
}

