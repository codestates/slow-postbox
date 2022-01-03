import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import './MyPage.css';
import emptyImg from '../img/empty.png';
import receivedmail from '../img/receivedmail.svg';
import sentmail from '../img/sentmail.svg';
import reservedmail from '../img/reservedmail.svg';
import ModalLogin from './ModalLogin';
import { useState, useEffect } from 'react';
import Withdrawal from '../components/MyPage/Withdrawal';
const { availablePw, matchingPw } = require('../funcs/userFuncs');

function MyPage() {
  const [modalLogin, setModalLogin] = useState(false);
  const { email, oauth } = useSelector((state) => state.loginReducer);

  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const [innerToggleState, setInnerToggleState] = useState(1);
  const innerToggleTab = (index) => {
    setInnerToggleState(index);
  };
  const [passwords, setPasswords] = useState({
    newPassword: '',
    matchingPassword: '',
  });
  const [confirmedPassword, setConfrimedPassword] = useState('');
  const [isAvailable, setIsAvailable] = useState('');
  const [isMatching, setIsMatching] = useState('');

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const changePassword = (e) => {
    if (
      isAvailable === '사용가능한 비밀번호입니다' &&
      isMatching === '비밀번호가 일치합니다'
    ) {
      axios
        .patch(`${process.env.REACT_APP_SERVER_API}/user/modifypw`, {
          email,
          password: passwords.newPassword,
        })
        .then((res) => {
          if (res.data.message === 'success') {
            window.location.replace('/');
          } else {
            alert('항목을 다시 확인해주세요');
            e.preventDefault();
            return;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('항목을 다시 확인해주세요');
      e.preventDefault();
      return;
    }
  };

  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(false); //변경x
  const [currentPage, setCurrentPage] = useState(1); //변경x
  const [postsPerPage, setPostsPerPage] = useState(10); //변경d
  const [total, setTotal] = useState(0); //변경x
  const [minPage, setMinPage] = useState(1); //변경x
  const [maxPage, setMaxPage] = useState(5); //변경x

  const isAuthenticated = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/user/auth`, {
        withCredentials: true,
      })
      .catch((err) => {
        setModalLogin(true);
      });
  };

  useEffect(() => {
    isAuthenticated();
    const fetchReceived = async () => {
      setLoading(true);
      const authCheck = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/user/auth`,
        {
          withCredentials: true,
        }
      );
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/mail/receivedlogs?receiverEmail=${authCheck.data.data.email}`
      );
      setReceived(res.data.data);
      setLoading(false);
    };
    fetchReceived();
  }, []);

  useEffect(() => {
    const fetchSent = async () => {
      setLoading(true);
      const authCheck = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/user/auth`,
        {
          withCredentials: true,
        }
      );
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/mail/sentlogs?writerEmail=${authCheck.data.data.email}`
      );
      setSent(res.data.data);
      setLoading(false);
    };

    fetchSent();
  }, []);

  useEffect(() => {
    let timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (availablePw(passwords.newPassword)) {
        setIsAvailable('사용가능한 비밀번호입니다');
        setConfrimedPassword(passwords.newPassword);
      } else if (
        !availablePw(passwords.newPassword) &&
        passwords.newPassword !== ''
      ) {
        setIsAvailable('비밀번호는 10자리 이상 15자리 이하여야합니다');
      }
    }, 500);
  }, [passwords.newPassword]);

  useEffect(() => {
    let timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (
        matchingPw(confirmedPassword, passwords.matchingPassword) &&
        passwords.matchingPassword !== ''
      ) {
        setIsMatching('비밀번호가 일치합니다');
      } else if (
        !matchingPw(confirmedPassword, passwords.matchingPassword) &&
        passwords.matchingPassword !== ''
      ) {
        setIsMatching('비밀번호가 일치하지 않습니다');
      }
    }, 500);
  }, [confirmedPassword, passwords.matchingPassword]);

  return (
    <>
      <div className='mypage-container'>
        <div className='tab-wrapper'>
          <StyledTabs>
            <span
              className={
                toggleState === 1 ? 'tab-text active-tabs' : 'tab-text'
              }
              onClick={() => toggleTab(1)}
            >
              활동로그
            </span>
            <span className='tab-divider'>|</span>
            <span
              className={
                toggleState === 2 || toggleState === 3
                  ? 'tab-text active-tabs'
                  : 'tab-text'
              }
              onClick={() => toggleTab(2)}
            >
              개인정보 수정
            </span>
          </StyledTabs>
          <div className='styledTabContent-wrapper'>
            <div
              className={
                toggleState === 1 ? 'active-content' : 'inactive-content'
              }
            >
              <StyledTabContent>
                <StyledTabs innerTab>
                  <span
                    className={
                      innerToggleState === 1
                        ? 'tab-text active-tabs'
                        : 'tab-text'
                    }
                    onClick={() => innerToggleTab(1)}
                  >
                    받은 편지
                  </span>
                  <span
                    className={
                      innerToggleState === 2
                        ? 'tab-text active-tabs'
                        : 'tab-text'
                    }
                    onClick={() => innerToggleTab(2)}
                  >
                    보낸 편지
                  </span>
                </StyledTabs>
                <StyledLogs>
                  <div
                    className={
                      innerToggleState === 1
                        ? 'active-content'
                        : 'inactive-content'
                    }
                  >
                    <ul className='ul-mailbox'>
                      {sent.length > 0 ? (
                        sent.map((post) => {
                          return (
                            <li key={post.id} className='li-mail'>
                              <img
                                src={
                                  new Date() >= new Date(post.reserved_at)
                                    ? receivedmail
                                    : reservedmail
                                }
                                className='li-icon flex-item'
                                alt='보낸메일'
                              />
                              <span className='li-title'>{post.title}</span>
                              <span className='li-date'>
                                {post.reserved_at.slice(0, 10)}
                              </span>
                            </li>
                          );
                        })
                      ) : (
                        <>
                          <p className='no-logs'>내역이 없습니다</p>
                        </>
                      )}
                    </ul>
                  </div>
                  <div
                    className={
                      innerToggleState === 2
                        ? 'active-content'
                        : 'inactive-content'
                    }
                  >
                    {received.length > 0 ? (
                      received.map((post) => {
                        return (
                          <li key={post.id} className='li-mail'>
                            <img
                              src={
                                new Date() >= new Date(post.reserved_at)
                                  ? sentmail
                                  : reservedmail
                              }
                              className='li-icon flex-item'
                              alt='받은메일'
                            />
                            <span className='li-title'>{post.title}</span>
                            <span className='li-date'>
                              {post.reserved_at.slice(0, 10)}
                            </span>
                          </li>
                        );
                      })
                    ) : (
                      <>
                        <p className='no-logs'>내역이 없습니다</p>
                      </>
                    )}
                  </div>
                </StyledLogs>
              </StyledTabContent>
            </div>
            <div
              className={
                toggleState === 2 ? 'active-content' : 'inactive-content'
              }
            >
              {!oauth && toggleState === 2 ? (
                <div className='form-renewPw'>
                  <p className='p-renew-title'>비밀번호 변경하기</p>
                  <p className='p-renew-pw'>새로운 비밀번호</p>
                  <input
                    type='password'
                    className='input-renew-pw'
                    name='newPassword'
                    value={passwords.newPassword}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className={
                      isAvailable === '사용가능한 비밀번호입니다'
                        ? 'span-alert available'
                        : 'span-alert unavailable'
                    }
                  >
                    {isAvailable}
                  </span>
                  <p className='p-renew-pw'>비밀번호 확인</p>
                  <input
                    type='password'
                    className='input-renew-pw'
                    name='matchingPassword'
                    value={passwords.matchingPassword}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className={
                      isMatching === '비밀번호가 일치합니다'
                        ? 'span-alert available'
                        : 'span-alert unavailable'
                    }
                  >
                    {isMatching}
                  </span>
                  <button
                    type='button'
                    className='btn-submit'
                    onClick={changePassword}
                  >
                    변경하기
                  </button>
                  <button
                    type='button'
                    className='btn-withdrawal'
                    onClick={() => toggleTab(3)}
                  >
                    탈퇴하기
                  </button>
                </div>
              ) : (
                <Withdrawal />
              )}
            </div>
            <div
              className={
                toggleState === 3 ? 'active-content' : 'inactive-content'
              }
            >
              <Withdrawal />
            </div>
          </div>
        </div>
        {modalLogin && <ModalLogin />}
      </div>
    </>
  );
}
const StyledTabContent = styled.div`
  align-items: flex-start;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  height: 500px;
`;

const StyledTabs = styled.div`
  flex: 1 1 auto;
  font-size: ${(props) => (props.innerTab ? '1em' : '1.2em')};
  padding: ${(props) => (props.innerTab ? '1.2em' : '0.55em 1em')};
  color: #a6a6a6;
  @media (min-width: 481px) and (max-width: 768px) {
    font-size: ${(props) => (props.innerTab ? '1.3em' : '1.45em')};
  }
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: ${(props) => (props.innerTab ? '1.2em' : '1.3em')};
  }
`;

const StyledLogs = styled.div`
  min-width: 100%;
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
  @media (min-width: 481px) and (max-width: 768px) {
    width: 100%;
    font-size: 1.15em;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    font-size: 1.1em;
  }
`;

export default MyPage;
