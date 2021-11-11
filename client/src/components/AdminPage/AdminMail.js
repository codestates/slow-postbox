import React, { useState } from 'react';
import Pagination from 'react-js-pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import Loding from '../Loding/Loding';

export default function AdminMail() {
  const [page, setPage] = useState(1);
  const [isLoding, setIsLoding] = useState(false);

  const count = 40;

  const dummyData = [
    {
      id: 1,
      writerEmail: 'sunyeong2222@gmail.com',
      receiverEmail: 'sohhyeonkim@gmail.com',
      isRead: 0,
      reserved_at: '2021-12-30T15:00:00.000Z',
      created_at: '2021-11-09T01:25:02.000Z',
    },
    {
      id: 2,
      writerEmail: 'yubineric@gmail.com',
      receiverEmail: 'sunyeong2222@gmail.com',
      isRead: 0,
      reserved_at: '2021-12-30T15:00:00.000Z',
      created_at: '2021-11-09T01:25:02.000Z',
    },
    {
      id: 3,
      writerEmail: 'sohhyeonkim@gmail.com',
      receiverEmail: 'yubineric@gmail.com',
      isRead: 0,
      reserved_at: '2021-12-30T15:00:00.000Z',
      created_at: '2021-11-09T01:25:02.000Z',
    },
    {
      id: 4,
      writerEmail: 'sunyeong2222@gmail.com',
      receiverEmail: 'sohhyeonkim@gmail.com',
      isRead: 0,
      reserved_at: '2021-12-30T15:00:00.000Z',
      created_at: '2021-11-09T01:25:02.000Z',
    },
    {
      id: 5,
      writerEmail: 'yubineric@gmail.com',
      receiverEmail: 'sunyeong2222@gmail.com',
      isRead: 0,
      reserved_at: '2021-12-30T15:00:00.000Z',
      created_at: '2021-11-09T01:25:02.000Z',
    },
    {
      id: 6,
      writerEmail: 'sohhyeonkim@gmail.com',
      receiverEmail: 'yubineric@gmail.com',
      isRead: 0,
      reserved_at: '2021-12-30T15:00:00.000Z',
      created_at: '2021-11-09T01:25:02.000Z',
    },
    {
      id: 7,
      writerEmail: 'sunyeong2222@gmail.com',
      receiverEmail: 'sohhyeonkim@gmail.com',
      isRead: 0,
      reserved_at: '2021-12-30T15:00:00.000Z',
      created_at: '2021-11-09T01:25:02.000Z',
    },
    {
      id: 8,
      writerEmail: 'yubineric@gmail.com',
      receiverEmail: 'sunyeong2222@gmail.com',
      isRead: 0,
      reserved_at: '2021-12-30T15:00:00.000Z',
      created_at: '2021-11-09T01:25:02.000Z',
    },
    {
      id: 9,
      writerEmail: 'sohhyeonkim@gmail.com',
      receiverEmail: 'yubineric@gmail.com',
      isRead: 0,
      reserved_at: '2021-12-30T15:00:00.000Z',
      created_at: '2021-11-09T01:25:02.000Z',
    },
    {
      id: 10,
      writerEmail: 'sunyeong2222@gmail.com',
      receiverEmail: 'sohhyeonkim@gmail.com',
      isRead: 0,
      reserved_at: '2021-12-30T15:00:00.000Z',
      created_at: '2021-11-09T01:25:02.000Z',
    },
  ];

  return (
    <div className='adminMail-container'>
      <div className='box-search'>
        <select>
          <option value='receiverEmail' selected='selected'>
            받는사람
          </option>
          <option value='writerEmail'>보낸사람</option>
        </select>
        <input type='text'></input>
        <button>검색</button>
      </div>
      <div className='box-table'>
        <table>
          <th>id</th>
          <th>읽음/안읽음</th>
          <th>보낸 사람</th>
          <th>받는 사람</th>
          <th>전송 날짜</th>
          <th>예약 날짜</th>
          <th>삭제</th>
          {isLoding ? (
            <tr>
              <td colSpan='7'>
                <Loding />
              </td>
            </tr>
          ) : (
            dummyData.map((el, id) => {
              return <MailList el={el} key={id} />;
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
    </div>
  );
}

function MailList({ el }) {
  return (
    <tr>
      <td>{el.id}</td>
      <td>
        {el.isRead ? (
          <FontAwesomeIcon icon={faEnvelopeOpen} />
        ) : (
          <FontAwesomeIcon icon={faEnvelope} />
        )}
      </td>
      <td>{el.writerEmail}</td>
      <td>{el.receiverEmail}</td>
      <td>{el.created_at.slice(0, 10)}</td>
      <td>{el.reserved_at.slice(0, 10)}</td>
      <td>삭제</td>
    </tr>
  );
}
