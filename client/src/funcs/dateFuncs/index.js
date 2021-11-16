module.exports = {
  getDateStr: (date) => {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? '0' + String(month) : month;
    day = day < 10 ? '0' + String(day) : day;
    return year + '-' + month + '-' + day;
  },
  getTomorrow: () => {
    const today = new Date();
    const tomorrow = new Date(today.setDate(today.getDate() + 1));
    return tomorrow;
  },
  calcDateOption: (opt) => {
    let today = new Date();
    if (opt === '1주일 후') {
      today.setDate(today.getDate() + 7);
    }

    if (opt === '1개월 후') {
      today.setMonth(today.getMonth() + 1);
    }

    if (opt === '3개월 후') {
      today.setMonth(today.getMonth() + 3);
    }

    if (opt === '6개월 후') {
      today.setMonth(today.getMonth() + 6);
    }

    if (opt === '1년 후') {
      today.setFullYear(today.getFullYear() + 1);
    }
    return today;
  },
  getLeftDays: (date) => {
    const leftTimes = date.getTime();
    const nowTimes = new Date().getTime();
    const gap = leftTimes - nowTimes;
    const dDay = Math.ceil(gap / (1000 * 60 * 60 * 24));
    return dDay;
  },
};
