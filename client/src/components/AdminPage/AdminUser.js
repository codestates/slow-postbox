import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Pagination from 'react-js-pagination';
import Loding from '../Loding/Loding';

export default function AdminUser() {
  const [page, setPage] = useState(1);
  const [isLoding, setIsLoding] = useState(false);
  const [ confirm, setConfirm ] = useState(false);
  const [ modal, setModal ] = useState(false);

  const count = 40;

  const dummyData = [
    {
      id: 1,
      name: 'Lyssa Prozillo',
      email: 'lprozillo0@nyu.edu',
      numOfSent: 44,
      numOfReceived: 76,
      created_at: '2021-07-18',
    },
    {
      id: 2,
      name: 'Sher Motion',
      email: 'smotion1@engadget.com',
      numOfSent: 23,
      numOfReceived: 26,
      created_at: '2021-11-07',
    },
    {
      id: 3,
      name: 'Wynne Atkirk',
      email: 'watkirk2@chicagotribune.com',
      numOfSent: 15,
      numOfReceived: 37,
      created_at: '2021-07-15',
    },
    {
      id: 4,
      name: 'Elwira Headland',
      email: 'eheadland3@columbia.edu',
      numOfSent: 100,
      numOfReceived: 96,
      created_at: '2021-07-20',
    },
    {
      id: 5,
      name: 'Francisca Haney`',
      email: 'fhaney4@state.tx.us',
      numOfSent: 100,
      numOfReceived: 27,
      created_at: '2021-10-18',
    },
    {
      id: 6,
      name: 'Jazmin Meineken',
      email: 'jmeineken5@g.co',
      numOfSent: 79,
      numOfReceived: 18,
      created_at: '2021-05-13',
    },
    {
      id: 7,
      name: 'Venita Vasquez',
      email: 'vvasquez6@xinhuanet.com',
      numOfSent: 7,
      numOfReceived: 64,
      created_at: '2021-07-23',
    },
    {
      id: 8,
      name: 'Brion Gillean',
      email: 'bgillean7@mtv.com',
      numOfSent: 13,
      numOfReceived: 69,
      created_at: '2021-07-14',
    },
    {
      id: 9,
      name: 'Angelle Piotrkowski',
      email: 'apiotrkowski8@mit.edu',
      numOfSent: 66,
      numOfReceived: 59,
      created_at: '2021-08-25',
    },
    {
      id: 10,
      name: 'Fidelity Giacubbo',
      email: 'fgiacubbo9@stumbleupon.com',
      numOfSent: 23,
      numOfReceived: 94,
      created_at: '2021-02-26',
    },
  ];

  return (
    <div className='adminUser-container'>
      <div className='box-search'>
        <div class='search-box'>
          <input
            type='text'
            id='search'
            placeholder='검색어를 입력하세요'
          ></input>
          <span>
            <button id='searchButton'>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </span>
        </div>
        <select>
          <option value='name' selected='selected'>
            이름
          </option>
          <option value='email'>이메일</option>
        </select>
      </div>
      <div className='box-table'>
        <table>
          <th className="id"><span>id</span></th>
          <th>이름</th>
          <th>이메일</th>
          <th>보낸 편지 수</th>
          <th>받은 편지 수</th>
          <th>가입일</th>
          <th className="withdraw"><span>탈퇴</span></th>
          {isLoding ? (
            <tr>
              <td colSpan='7'>
                <Loding />
              </td>
            </tr>
          ) : (
            dummyData.map((el, id) => {
              return <UserList setConfirm={setConfirm} el={el} key={id} />;
            })
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
      {confirm?<ConfirmUser setModal={setModal} setConfirm={setConfirm}/>:""}
      {modal?<ModalUser setModal={setModal}/>:""}
    </div>
  );
}

function UserList({ el, setConfirm }) {
  return (
    <tr>
      <td>{el.id}</td>
      <td>{el.name}</td>
      <td>{el.email}</td>
      <td>{el.numOfSent}</td>
      <td>{el.numOfReceived}</td>
      <td>{el.created_at.slice(0, 10)}</td>
      <td className="withdraw"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>{setConfirm(true)}}/></td>
    </tr>
  );
}

function ConfirmUser({setConfirm, setModal}) {
  return (
    <div className="confirmUser-container">
    <div className="box-confirm">
      <img src="img/delete.svg"/>
      <div className="confirm-message">해당 유저 정보를 삭제하시겠습니까?</div>
      <div className="box-confirm-btn"><span id="btn-cancel" onClick={()=>{setConfirm(false)}}>취소</span><span id="btn-confirm" onClick={()=>{setConfirm(false)
      setModal(true)}}>확인</span></div>
    </div>
  </div>
  );
}

function ModalUser({setModal}) {
  return (
    <div className="modalUser-container">
    <div className="box-modal">
      <img src="img/success.svg"/>
      <div className="modal-message">삭제되었습니다.</div>
      <div><span onClick={()=>{setModal(false)}}>확인</span></div>
    </div>
  </div>
  );
}