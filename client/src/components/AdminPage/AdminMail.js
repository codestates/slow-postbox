import React, { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {
  faEnvelope,
  faEnvelopeOpen,
  faSearch,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import Loding from '../Loding/Loding';

export default function AdminMail() {
  const [page, setPage] = useState(1);
  const [isLoding, setIsLoding] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState('받는 사람');
  const [receiverEmail, setReceiverEmail] = useState(null);
  const [writerEmail, setWriterEmail] = useState(null);
  const [searchWord, setSearchWord] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const selectList = ['받는 사람', '보낸 사람'];


  const handleSelect = (e) => {
    setSelected(e.target.value);
    setSearchWord('');
    setReceiverEmail(null);
    setWriterEmail(null);
  };
  const handleSearchWord = (e) => {
    if (selected === '받는 사람') {
      setSearchWord(e.target.value);
      setReceiverEmail(e.target.value);
      setWriterEmail(null);
    } else {
      setSearchWord(e.target.value);
      setReceiverEmail(null);
      setWriterEmail(e.target.value);
    }
  };

  const getMailData = async () => {
    await setIsLoding(true);
    await axios.get(
      `${process.env.REACT_APP_SERVER_API}/admin/mail-list`,
      { params: { page, receiverEmail, writerEmail } }
    )
      .then((res) => {
        setData(res.data.data);
        setCount(res.data.count);
      })
    await setIsLoding(false);
  };

  const getMailDataPage = async () => {
    axios.get(
      `${process.env.REACT_APP_SERVER_API}/admin/mail-list`,
      { params: { page, receiverEmail, writerEmail } }
    )
      .then((res) => {
        setData(res.data.data);
        setCount(res.data.count);
      })
  };

  const getFilterdData = async () => {
    await setIsLoding(true);
    await setPage(1);
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/admin/mail-list`,
      { params: { page, receiverEmail, writerEmail } }
    );
    await setData(res.data.data);
    await setCount(res.data.count);
    await setIsLoding(false);
  };

  const deleteMailData = async () => {
    axios.delete(`${process.env.REACT_APP_SERVER_API}/admin/mail`, {
      data: { id: deleteId },
      withCredentials: true,
    });

  };

  useEffect(() => {
    getMailDataPage();
  }, [page]);

  useEffect(() => {
    getMailData();
  }, []);

  return (
    <div className='adminMail-container'>
      <div className='box-search'>
        <div class='search-box'>
          <input
            type='text'
            id='search'
            placeholder='검색어를 입력하세요'
            value={searchWord}
            onChange={handleSearchWord}
            onKeyPress={(e)=>{if(e.key==='Enter') getFilterdData();}}
          ></input>
          <span>
            <button id='searchButton' onClick={getFilterdData}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </span>
        </div>
        <select onChange={handleSelect} value={selected}>
          {selectList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className='box-table'>
        <table>
          <th className='id'>
            <span>id</span>
          </th>
          <th className='read'>읽음/안읽음</th>
          <th>보낸 사람</th>
          <th>받는 사람</th>
          <th>전송 날짜</th>
          <th>예약 날짜</th>
          <th className='delete'>
            <span>삭제</span>
          </th>
          {isLoding ? (
            <tr className='box-loding'>
              <td colSpan='7'>
                <Loding />
              </td>
            </tr>
          ) : (
            data.length !== 0 ? (
              data.map((el, id) => {
                return <MailList setDeleteId={setDeleteId} setConfirm={setConfirm} el={el} key={id} />;
              })
            ) : (
              <tr className='box-none'>
                <td colSpan='7'>
                  일치하는 데이터가 없습니다.
                </td>
              </tr>
            )
          )}
        </table>
      </div>
      <div>
        <Pagination
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          prevPageText={'‹'}
          nextPageText={'›'}
          onChange={setPage}
        />
      </div>
      {confirm ? (
        <ConfirmMail setDeleteId={setDeleteId}
          setConfirm={setConfirm}
          setModal={setModal}
          deleteMailData={deleteMailData} />
      ) : (
        ''
      )}
      {modal ? <ModalMail setDeleteId={setDeleteId} setModal={setModal} getMailData={getMailData} /> : ''}
    </div>
  );
}

function MailList({ el, setConfirm, setDeleteId }) {
  return (
    <tr>
      <td className='el-id'>{el.id}</td>
      <td>
        {el.isRead ? (
          <FontAwesomeIcon icon={faEnvelopeOpen} />
        ) : (
          <FontAwesomeIcon icon={faEnvelope} />
        )}
      </td>
      <td className='email'><span>{el.writerEmail}</span></td>
      <td className='email'><span>{el.receiverEmail}</span></td>
      <td>{el.created_at.slice(0, 10)}</td>
      <td>{el.reserved_at.slice(0, 10)}</td>
      <td className='delete'>
        <FontAwesomeIcon
          icon={faTrashAlt}
          onClick={() => {
            setConfirm(true);
            setDeleteId(el.id);
          }}
        />
      </td>
    </tr>
  );
}

function ConfirmMail({ setConfirm, setModal, setDeleteId, deleteMailData }) {
  return (
    <div className='confirmMail-container'>
      <div className='box-confirm'>
        <img src='img/delete.svg' />
        <div className='confirm-message'>해당 메일를 삭제하시겠습니까?</div>
        <div className='box-confirm-btn'>
          <span
            id='btn-cancel'
            onClick={() => {
              setConfirm(false);
              setDeleteId(null);
            }}
          >
            취소
          </span>
          <span
            id='btn-confirm'
            onClick={() => {
              setConfirm(false);
              setModal(true);
              deleteMailData();
            }}
          >
            확인
          </span>
        </div>
      </div>
    </div>
  );
}

function ModalMail({ setModal, setDeleteId, getMailData }) {
  return (
    <div className='modalMail-container'>
      <div className='box-modal'>
        <img src='img/success.svg' />
        <div className='modal-message'>삭제되었습니다.</div>
        <div>
          <span
            onClick={() => {
              setModal(false);
              setDeleteId(null);
              getMailData();
            }}
          >
            확인
          </span>
        </div>
      </div>
    </div>
  );
}
