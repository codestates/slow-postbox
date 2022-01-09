import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AnimatedNumbers from 'react-animated-numbers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link as SCLink } from 'react-scroll';
import Footer from './Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';

export default function Home() {
  const { isLogin } = useSelector((state) => state.loginReducer);
  const history = useHistory();

  const getMailNum = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API}`)
      .then((res) => {
        setNum(res.data.num);
      });
  };

  const hadleWriteMail = () => {
    if (isLogin) {
      history.push('/mailform');
    } else {
      history.push('/login');
    }
  };

  const [num, setNum] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
    getMailNum();
  }, []);

  return (
    <>
      <div className='home-container'>
        <div className='box-main'>
          <div className='box-animation'>
            {/* <animated.div {...bind()} style={{ x, y }}>
                        <div id="img-mail"><FontAwesomeIcon id="img-mail" icon={faPaperPlane} /></div>
                    </animated.div> */}
          </div>
          <div className='title'>느린 우체통</div>
          <div className='box-counting'>
            <div className='num-counting-up'>
              <AnimatedNumbers
                includeComma
                animateToNumber={num}
                fontStyle={{ fontSize: 40 }}
                configs={[
                  { mass: 1, tension: 30, friction: 10 },
                  { mass: 2, tension: 40, friction: 10 },
                  { mass: 3, tension: 30, friction: 10 },
                ]}
              ></AnimatedNumbers>
            </div>
            <div className='words-counting-up'>
              통의 편지가 도착 예정입니다.
            </div>
          </div>
          <div className='home-img'>
            <img
              alt='home-img-1'
              className='home-img-1'
              src='img/mailbox.svg'
            />
          </div>
          <button className='btn-write' onClick={hadleWriteMail}>
            편지쓰기
          </button>
          <SCLink to='home-explanation' spy={true} smooth={true} duration={500}>
            <div className='scroll-down'>
              <FontAwesomeIcon className='scroll-down' icon={faChevronDown} />
            </div>
          </SCLink>
        </div>
        <div className='home-explanation'>
          <div data-aos='fade-up' className='box-script-1'>
            <div className='img-script-1'>
              <img alt='img-script-1' src='img/undraw_mail.svg' />
            </div>
            <div className='explanation-script-1'>
              특별한 날, 특별한 사람에게 보내는
              <br />
              느린 우체통을 온라인으로 경험해보세요
              <br />
              <br />
              <p className='sub-text'>
                편지를 전송하면 설정한 예정일에 맞춰 편지가 전달됩니다.
                <br />
                도착 예정 메일함에서 나에게 전달될 편지의 남은시간을 확인할 수
                있습니다.
              </p>
            </div>
          </div>
          <div data-aos='fade-up' className='box-script-2'>
            <div className='img-script-2'>
              <img alt='img-script-2' src='img/undraw_team.svg' />
            </div>
            <div className='explanation-script-2'>
              편지가 도착할 때 까지
              <br />
              설렘을 느끼며 기다려보세요.
              <br />
              <br />
              <p className='sub-text'>
                받는 사람에게 편지 도착 예정 안내 메일이 발송되며,
                <br />
                느린 우체통 가입 후 받은 편지함에서 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
