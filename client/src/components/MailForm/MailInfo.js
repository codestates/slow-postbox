import './MailInfo.css';
import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, subDays } from 'date-fns';
const { getTomorrow } = require('../../funcs/dateFuncs');

function MailInfo() {
  const startDate = getTomorrow();
  registerLocale('ko', ko);

  const [emailInfo, setEmailInfo] = useState({
    title: '',
    receiver: '',
  });
  const [reservDate, setReservDate] = useState('');
  console.log(reservDate);
  const handleChange = (e) => {
    setEmailInfo({ ...emailInfo, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className='mailinfo-container'>
        <form>
          <label htmlFor='receiver'>
            받는사람
            <label htmlFor='tome' className='checkbox-tome'>
              <input name='tome' type='checkbox' />
              내게쓰기
            </label>
            <input
              type='email'
              name='receiver'
              placeholder='수신이메일을 작성해주세요'
              className='mailinfo-input'
              value={emailInfo.receiver}
              onChange={handleChange}
            />
          </label>
          <label htmlFor='title'>
            제목
            <input
              type='text'
              name='title'
              placeholder='제목을 작성해주세요'
              className='mailinfo-input mailinfo-input-title'
              value={emailInfo.title}
              onChange={handleChange}
            />
          </label>
          <label htmlFor='rsvDate'>
            전송날짜
            <select name='rsvDate' className='mailinfo-input select-date'>
              <option value=''>-날짜를 선택해주세요-</option>
              <option value='1주일 후'>1주일 후</option>
              <option value='1개월 후'>1개월 후</option>
              <option value='3개월 후'>3개월 후</option>
              <option value='6개월 후'>6개월 후</option>
              <option value='1년 후'>1년 후</option>
            </select>
            <DatePicker
              selected={startDate}
              onChange={setReservDate}
              locale='ko'
              dateFormat='yyyy-MM-dd'
              minDate={subDays(new Date(), -1)}
              maxDate={addDays(new Date(), 365)}
              // className="Mailinfo-input datepicker-custom"
              popperModifiers={{ preventOverflow: { enable: true } }}
            />
          </label>
        </form>
      </div>
    </>
  );
}
export default MailInfo;
