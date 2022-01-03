import './MailInfo.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, subDays } from 'date-fns';
import { useSelector } from 'react-redux';
const {
  getTomorrow,
  getDateStr,
  calcDateOption,
  getLeftDays,
} = require('../../funcs/dateFuncs');

function MailInfo({ formInfo, setFormInfo }) {
  const { email } = useSelector((state) => state.loginReducer);
  registerLocale('ko', ko);

  const [reservedDate, setReservedDate] = useState(getTomorrow());
  const [toMyself, setToMyself] = useState(false);
  const [optionSelected, setOptionSelected] = useState('');
  const [dday, setDday] = useState(0);
  const [selected, setSelected] = useState('');
  const [ isGuest, setIsGuest ] = useState(true)

  const handleChange = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  };
  const handleDatePicker = (date) => {
    setReservedDate(date); //datePicker 날짜 표기
    const calcDday = getLeftDays(date); //디데이 계산
    setDday(calcDday); //디데이 업데이트
    const reserved = getDateStr(date); //0000-00-00 형식으로 변경
    setFormInfo({ ...formInfo, reservedDate: reserved }); //formInfo 업데이트
    setOptionSelected(false); //select 태그 초기화
  };

  const handleDateSelect = (e) => {
    setSelected(e.target.value);
    const calcDate = calcDateOption(e.target.value);
    const calcDday = getLeftDays(calcDate); //디데이 계산
    setDday(calcDday); //디데이 업데이트
    const reserved = getDateStr(calcDate);
    setOptionSelected(e.target.value);
    setFormInfo({ ...formInfo, reservedDate: reserved });
    setReservedDate(calcDateOption(e.target.value)); //해당 날짜로 변경
  };

  const handleCheck = () => {
    setToMyself(!toMyself); //내게쓰기 체크박스 클릭시 반대로 변경(디폴트는 false)
    if (!!toMyself) {
      //내게쓰기가 false면
      setFormInfo({ ...formInfo, receiver: '' });
    } else {
      //내게쓰기가 true면
      setFormInfo({ ...formInfo, receiver: email });
    }
  };

  const checkGuest = async() => {
    const userData = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/user/auth`,
      {
        withCredentials: true,
      })
      if(!userData.data.data.isGuest) {
        setIsGuest(false)
      }
  }

  useEffect(()=> {
    checkGuest();
  },[])

  return (
    <>
      <div className='mailinfo-container'>
        <form>
          <label htmlFor='receiver'>
            받는사람
            {isGuest ? (
              <input
              type='email'
              name='receiver'
              placeholder='수신이메일을 작성해주세요'
              className='mailinfo-input-guest'
              value={formInfo.receiver}
              onChange={handleChange}
              disabled={toMyself ? 'disable' : ''}
            />
            ) : (
              <>
              <label htmlFor='tome' className='checkbox-tome'>
              <input  name='tome' type='checkbox' onChange={handleCheck} />
              내게쓰기
            </label>
            <input
            type='email'
            name='receiver'
            placeholder='수신이메일을 작성해주세요'
            className='mailinfo-input'
            value={formInfo.receiver}
            onChange={handleChange}
            disabled={toMyself ? 'disable' : ''}
          />
          </>
            ) }
          </label>
          <label htmlFor='title'>
            제목
            <input
              type='text'
              name='title'
              maxLength='30'
              placeholder='제목을 작성해주세요'
              className='mailinfo-input mailinfo-input-title'
              value={formInfo.title}
              onChange={handleChange}
            />
          </label>
          <label htmlFor='rsvDate' className='lastLabel'>
            전송날짜
            <div className='lastLabelDiv'>
              <select
                name='rsvDate'
                className='select-date'
                onChange={handleDateSelect}
                defaultValue='-날짜를 선택해주세요-'
                value={!optionSelected ? '-날짜를 선택해주세요-' : selected}
              >
                <option value='날짜미정'>-날짜를 선택해주세요-</option>
                <option value='1주일 후'>1주일 후</option>
                <option value='1개월 후'>1개월 후</option>
                <option value='3개월 후'>3개월 후</option>
                <option value='6개월 후'>6개월 후</option>
                <option value='1년 후'>1년 후</option>
              </select>
              <div>
                <DatePicker
                  selected={reservedDate}
                  onChange={(date) => handleDatePicker(date)}
                  locale='ko'
                  dateFormat='yyyy-MM-dd'
                  minDate={subDays(new Date(), -1)}
                  maxDate={addDays(new Date(), 365)}
                />
              </div>
              <span className='d-day'>D-{dday}</span>
            </div>
          </label>
        </form>
      </div>
    </>
  );
}
export default MailInfo;
