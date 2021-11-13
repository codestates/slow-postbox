import React from 'react';
import { Route, Switch } from 'react-router-dom';
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

function App() {
  return (
    <div>
      <NavigationBar />
      <div className='area-nav'></div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route path='/find-userinfo' component={FindUserInfo} />
        <Route path='/mailbox' component={WholeReceivedMail} />
        <Route path='/sent-mailbox' component={WholeSentMail} />
        <Route path='/mailform' component={MailForm} />
        <Route path='/mypage' component={MyPage} />
        <Route path='/admin' component={AdminPage} />
      </Switch>
    </div>
  );
}

export default App;
