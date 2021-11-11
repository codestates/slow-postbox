module.exports = {
  availablePw: (password) => {
    let reg = /^[a-zA-Z0-9]{10,15}$/; //숫자와 영문자 조합으로 10~15자리를 사용
    return reg.test(password);
  },

  matchingPw: (password1, password2) => {
    return password1 === password2;
  },
};
