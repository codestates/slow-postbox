export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const MODALMAILVIEW = "MODALMAILVIEW";
export const MAILVIEW = "MAILVIEW";

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

export const modalmailview = (state) => {
  return {
    type: MODALMAILVIEW,
    payload: {
      modalmail: state.modalmail
    },
  };
};

export const mailview = (state) => {
  return {
    type: MAILVIEW,
    payload: {
      content: state.content,
      created_at: state.created_at,
      name: state.name,
      reserved_at: state.reserved_at,
      receiverEmail: state.receiverEmail,
      title: state.title,
      writerEmail: state.writerEmail,
      id: state.id,
      email: state.email
    },
  };
};