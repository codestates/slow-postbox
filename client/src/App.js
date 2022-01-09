import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NavigationBar from './pages/NavigationBar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import FindUserInfo from './pages/FindUserInfo';
import WholeReceivedMail from './components/WholeReceiveMailBox/WholeReceivedMail';
import WholeSentMail from './components/WholeSentMail/WholeSentMail';
import MailForm from './pages/MailForm';
import MyPage from './pages/MyPage';
import AdminPage from './pages/AdminPage';
import './App.css';
import axios from 'axios';
import { login } from './actions';

function App() {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const { email } = useSelector((state) => state.loginReducer);

  const isAuthenticated = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_SERVER_API}/users/auth`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.data) {
          dispatch(
            login({
              isLogin: res.data.data.isLogin,
              isAdmin: res.data.data.admin,
              id: res.data.data.id,
              name: res.data.data.name,
              email: res.data.data.email,
              oauth: res.data.data.oauth,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hadleisChecked = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/users/auth`, {
        withCredentials: true,
      })
      .then((res) => {
        axios
          .get(`${process.env.REACT_APP_SERVER_API}/checked-mail`, {
            params: { email: res.data.data.email },
          })
          .then((res) => {
            setIsChecked(res.data.isChecked);
          });
      });
  };

  useEffect(() => {
    isAuthenticated();
    hadleisChecked();
  }, []);

  return (
    <div>
      <NavigationBar isChecked={isChecked} setIsChecked={setIsChecked} />
      <div className='area-nav'></div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route path='/find-userinfo' component={FindUserInfo} />
        <Route
          path='/mailbox'
          render={(props) => (
            <WholeReceivedMail hadleisChecked={hadleisChecked} {...props} />
          )}
        />
        <Route path='/sent-mailbox' component={WholeSentMail} />
        <Route path='/mailform' component={MailForm} />
        <Route path='/mypage' component={MyPage} />
        <Route path='/admin' component={AdminPage} />
      </Switch>
    </div>
  );
}

export default App;
