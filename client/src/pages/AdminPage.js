import React, { useState } from 'react';
import AdminUser from '../components/AdminPage/AdminUser';
import AdminMail from '../components/AdminPage/AdminMail';
import './AdminPage.css';

export default function AdminPage() {
  const [selection, setSelection] = useState(true);

  return (
    <div className='adminPage-container'>
      <div className='admin-name'>관리자 님</div>
      <div className='tab-menu'>
        <span
          className={selection ? 'menu-users selected' : 'menu-users'}
          onClick={() => {
            setSelection(true);
          }}
        >
          유저 관리
        </span>
        <span
          className={selection ? 'menu-mails' : 'menu-mails selected'}
          onClick={() => {
            setSelection(false);
          }}
        >
          편지 관리
        </span>
      </div>
      <div className='box-contents'>
        {selection ? <AdminUser /> : <AdminMail />}
      </div>
    </div>
  );
}
