import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Pagination from 'react-js-pagination';
import Loding from '../Loding/Loding';

export default function AdminUser() {
  const [page, setPage] = useState(1);
  const [isLoding, setIsLoding] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState('이름');
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [searchWord, setSearchWord] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const selectList = ['이름', '이메일'];

  const handleSelect = (e) => {
    setSelected(e.target.value);
    setSearchWord('');
    setName(null);
    setEmail(null);
  };
  const handleSearchWord = (e) => {
    if (selected === '이름') {
      setSearchWord(e.target.value);
      setName(e.target.value);
      setEmail(null);
    } else {
      setSearchWord(e.target.value);
      setName(null);
      setEmail(e.target.value);
    }
  };

  const getUserData = async () => {
    await setIsLoding(true);
    await axios.get(
      `${process.env.REACT_APP_SERVER_API}/admin/user-list`,
      { params: { page, name, email } }
    )
    .then((res)=>{
      setData(res.data.data);
      setCount(res.data.count);
    })
    await setIsLoding(false);
  };

  const getUserDataPage = async () => {
    axios.get(
      `${process.env.REACT_APP_SERVER_API}/admin/user-list`,
      { params: { page, name, email } }
    )
    .then((res)=>{
      setData(res.data.data);
      setCount(res.data.count);
    })
  };

  const getFilterdData = async () => {
    await setIsLoding(true);
    await setPage(1);
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/admin/user-list`,
      { params: { page, name, email } }
    );
    await setData(res.data.data);
    await setCount(res.data.count);
    await setIsLoding(false);
  };

  const deleteUserData = async () => {
    axios.delete(`${process.env.REACT_APP_SERVER_API}/admin/user`, {
      data: { id: deleteId },
      withCredentials: true,
    });
    
  };

  useEffect(() => {
    getUserDataPage();
  }, [page]);

  useEffect(() => {
    getUserData();
  }, []);


  return (
    <div className='adminUser-container'>
      <div className='box-search'>
        <div class='search-box'>
          <input
            type='text'
            id='search'
            placeholder='검색어를 입력하세요'
            value={searchWord}
            onChange={handleSearchWord}
          ></input>
          <span>
            <button id='searchButton'>
              <FontAwesomeIcon icon={faSearch} onClick={getFilterdData} />
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
          <th>이름</th>
          <th>이메일</th>
          <th>보낸 편지 수</th>
          <th>받은 편지 수</th>
          <th>가입일</th>
          <th className='withdraw'>
            <span>탈퇴</span>
          </th>
          {isLoding ? (
            <tr className='box-loding'>
              <td colSpan='7'>
                <Loding />
              </td>
            </tr>
          ) : (
            data.length!==0 ? (
              data.map((el, id) => {
              return (
                <UserList
                  setDeleteId={setDeleteId}
                  setConfirm={setConfirm}
                  el={el}
                  key={id}
                />
              );
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
        <ConfirmUser
          setDeleteId={setDeleteId}
          setConfirm={setConfirm}
          setModal={setModal}
          deleteUserData={deleteUserData}
        />
      ) : (
        ''
      )}
      {modal ? <ModalUser setDeleteId={setDeleteId} setModal={setModal} getUserData={getUserData}/> : ''}
    </div>
  );
}

function UserList({ el, setConfirm, setDeleteId }) {
  return (
    <tr>
      <td>{el.id}</td>
      <td>{el.name}</td>
      <td>{el.email}</td>
      <td>{el.writeNum}</td>
      <td>{el.receiveNum}</td>
      <td>{el.created_at.slice(0, 10)}</td>
      <td className='withdraw'>
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

function ConfirmUser({ setConfirm, setModal, setDeleteId, deleteUserData }) {
  return (
    <div className='confirmUser-container'>
      <div className='box-confirm'>
        <img src='img/delete.svg' />
        <div className='confirm-message'>
          해당 유저 정보를 삭제하시겠습니까?
        </div>
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
              deleteUserData();
            }}
          >
            확인
          </span>
        </div>
      </div>
    </div>
  );
}

function ModalUser({ setModal, setDeleteId, getUserData }) {
  return (
    <div className='modalUser-container'>
      <div className='box-modal'>
        <img src='img/success.svg' />
        <div className='modal-message'>삭제되었습니다.</div>
        <div>
          <span
            onClick={() => {
              setModal(false);
              setDeleteId(null);
              getUserData();
            }}
          >
            확인
          </span>
        </div>
      </div>
    </div>
  );
}
