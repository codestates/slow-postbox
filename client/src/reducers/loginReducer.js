import { LOGIN, LOGOUT } from '../actions/index';

const loginReducer = (
  state = {
    isLogin: false,
    isAdmin: false,
    id: null,
    name: '김소현',
    email: 'sohhyeonkim@gmail.com',
    oauth: false,
  },
  action
) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: action.payload.isLogin,
        isAdmin: action.payload.isAdmin,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        oauth: action.payload.oauth,
      };
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
        isAdmin: false,
        id: null,
        name: null,
        email: null,
        oauth: false,
      };

    default:
      return state;
  }
};

export default loginReducer;
