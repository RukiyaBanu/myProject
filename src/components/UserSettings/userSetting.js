import React, {Component} from 'react';
import './userSettings.css';
import Home from './Home/Home';
import General from './General/General';
import Delegation from './Delgation/Delegation'
import Favorites from './Favorites/Favorite';
import NewDelegation from "./Delgation/CreateDelegation/createDelegation";
import ViewDelegation from "./Delgation/CreateDelegation/viewDelegation";
import {BrowserRouter as Router,Route} from 'react-router-dom';

class UserSettings extends Component {
  render(){
  return (
    <Router>
    <div className="card">
     <Home/>
     <Route path="/" exact component={General}/>
     <Route path="/delegations" exact component={Delegation}/>
     <Route path="/favorites" exact component={Favorites}/>
     <Route path="/newDelegation" exact component={NewDelegation}/>
     <Route path="/viewDelegation" exact component={ViewDelegation}/>
    </div>
    </Router>
    
  );
}
}
 export default UserSettings
