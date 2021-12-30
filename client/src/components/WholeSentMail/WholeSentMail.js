import '../WholeReceiveMailBox/WholeReceivedMail.css'
import SentMail from './SentMail'
import axios from 'axios'
import ReservedSentMail from './ReservedSentMail'
import ModalLogin from '../../pages/ModalLogin'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function WholeSentMail() {

	const [ modalLogin, setModalLogin ] = useState(false);
	const [view, setView] = useState('SentMail')

	const userInfo = useSelector(state => state.loginReducer)
	const { name, id } = userInfo

	const isAuthenticated = () => {
		axios
		  .get(`${process.env.REACT_APP_SERVER_API}/user/auth`, {
			withCredentials: true,
		  })
		  .catch((err) => {
			setModalLogin(true)
		  });
	  };

	  useEffect(() => {
		isAuthenticated();
	}, [])

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
				{modalLogin && <ModalLogin/>}
			</div>
		</>
	)
}


