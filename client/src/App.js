// import React from 'react';
// import './App.css'

// function App() {
//   return <div>App</div>;
// }

// export default App;


// ----------------------------------- //

import './App.css';
import { Switch, Route } from "react-router-dom";
import { Link, useHistory } from 'react-router-dom';
import WholeReceivedMail from './components/WholeReceiveMailBox/WholeReceivedMail';
import WholeSentMail from './components/WholeSentMail/WholeSentMail'
import MailView from './components/MailView/MailView'
import Nav from './pages/NavigationBar'
import Home from './pages/Home'

function App() {
  return (
    <div>

      <Switch>

        <Route path="/WholeReceivedMail" component={WholeReceivedMail} />
        <Route path="/WholeSentMail" component={WholeSentMail} />
        <Route path="/MailView" component={MailView} />
        <Route path="/Nav" component={Nav} />
        <Route path="/Home" component={Home} />


      </Switch>
      {/* <Nav /> */}
    </div>
  );
}

export default App;

