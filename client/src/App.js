import React from 'react';
import './App.css';
import Login from './pages/Login'
import FindUserInfo from './pages/FindUserInfo'
import SignUp from './pages/SignUp'
import CompleteSignUp from './components/SignUp/CompleteSignUp'

function App() {
  return (
    <>
      <Login />
      <FindUserInfo />
      <SignUp />
      <CompleteSignUp />
    </>
  );
}

export default App;
