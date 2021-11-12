import React,{ useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import AdminUser from '../components/AdminPage/AdminUser'
import AdminMail from '../components/AdminPage/AdminMail'
import './AdminPage.css';

export default function AdminPage() {

    const [ selection, setSelection ] = useState(true)


  return (
    <div className='adminPage-container'>
        <div className='box-admin'>
          <div className='admin-name'><FontAwesomeIcon icon={faCogs} /> 관리자 페이지</div>
          <div className='tab-menu'>
              <span className={selection? 'menu-users selected': 'menu-users'} onClick={()=> {setSelection(true)}}>유저 관리</span>
              <span className={selection? 'menu-mails': 'menu-mails selected'} onClick={()=> {setSelection(false)}}>편지 관리</span>
          </div>
          <div className='box-contents'>
          {selection
          ? <AdminUser/>
          : <AdminMail/>}
          </div>
        </div>
    </div>
  );
}