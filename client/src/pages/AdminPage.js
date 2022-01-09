import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import AdminUser from '../components/AdminPage/AdminUser';
import AdminMail from '../components/AdminPage/AdminMail';
import axios from 'axios';
import './AdminPage.css';
import './AdminPage(480px).css';
import { set } from 'date-fns';

export default function AdminPage() {
  const [selection, setSelection] = useState(true);
  const [modal, setModal] = useState(false);

  const isAuthenticated = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/users/auth`, {
        withCredentials: true,
      })
      .then((res) => {
        if (!res.data.data.admin) {
          setModal(true);
        }
      })
      .catch((err) => {
        setModal(true);
        console.log(err);
      });
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <div className='adminPage-container'>
      <div className='box-admin'>
        <div className='admin-name'>
          <FontAwesomeIcon icon={faCogs} /> 관리자 페이지
        </div>
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
      {modal && <ModalAdmin />}
    </div>
  );
}

function ModalAdmin() {
  return (
    <div className='modalAdmin-container'>
      <div className='box-modal'>
        <div className='modal-message'>관리자만 접근할 수 있습니다.</div>
        <div>
          <span
            onClick={() => {
              window.location.replace('/');
            }}
          >
            확인
          </span>
        </div>
      </div>
    </div>
  );
}
