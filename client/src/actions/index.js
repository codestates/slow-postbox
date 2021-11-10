export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

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