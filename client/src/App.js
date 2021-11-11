// import React from 'react';

// function App() {
//   return <div>App</div>;
// }

// export default App;

import React from 'react'
import './App.css';
import { Switch, Route } from "react-router-dom";
import WholeReceivedMail from './components/WholeReceiveMailBox/WholeReceivedMail'
// import WholeSentMail from './components/send/WholeSentMail'
// import MailView from './components/MailView'

function App() {
  return (
    <div>

      <Switch>
        <Route path="/WholeReceivedMail" component={WholeReceivedMail} />
        {/* <Route path="/WholeSentMail" component={WholeSentMail} /> */}
        {/* <Route path="/MailView" component={MailView} /> */}
      </Switch>
    </div>
  );
}

export default App;
