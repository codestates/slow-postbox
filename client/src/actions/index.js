export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const MAILSHOW = "MAILSHOW";

export const login = (state) => {
  return {
    type: LOGIN,
    payload: {
      isLogin: state.isLogin,
      isAdmin: state.isAdmin,
      id: state.id,
      name: state.name,
      email: state.email,
      oauth: state.oauth
    },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const mailshow = (state) => {
  return {
    type: MAILSHOW,
    payload: {
      id: state.id,
      isChecked: state.isChecked,
      isRead: state.isRead,
      received_at: state.received_at,
      title: state.title,
      writerName: state.writerName
    },
  };
};