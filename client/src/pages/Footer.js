import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

export default function Footer() {
  return (
    <div className='footer-container'>
      <table className='table-footer'>
        <th className='creator'>CREATORS</th>
        <th className='Github'>
          <FontAwesomeIcon icon={faGithub} />
        </th>
        <th className='Mail'>
          <FontAwesomeIcon icon={faEnvelope} />
        </th>
        <tr>
          <td>
            <ul>
              <li>
                <a href='https://velog.io/@kaitlin_k'>SOHYEON KIM</a>
              </li>
              <li>
                <a href='https://velog.io/@sssssssssy'>SEONYEONG MOON</a>
              </li>
              <li>
                <a href='https://velog.io/@limuubin'>YUBIN LIM</a>
              </li>
              <li>
                <a href='https://velog.io/@bbaa3218'>GWANGUI AN</a>
              </li>
            </ul>
          </td>
        </tr>
      </table>
      <div className='copyright'>© 2021 Codeplay. All Rights Reserved</div>
    </div>
  );
}
