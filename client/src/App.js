import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ErrorPage from './components/ErrorPage';

import Login from './components/Login';
import {Utilisateur} from './pages/Utilisateur';
import {Paiements} from './pages/Paiements';
import {Cols} from './pages/Colis';
import {Destinations} from './pages/Destinations';
import {Expeditions} from './pages/Expeditions';
import {Agents} from './pages/Agents';
import {Mobiles} from './pages/Mobile';
import Message from './pages/Message';
import {Clients} from './pages/Clients';
import {Sidebar} from './components/Sidebar';
import PrivateRouter from './components/PrivateRouter'



function App() {
  const dashboard = localStorage.getItem("token");
    return (
      <Router> 
        {dashboard && (<><Navbar /><Sidebar /></>)}     
        
        
          <Switch>
            <Route exact path='/login' component={Login} />
            <PrivateRouter exact path='/' component={Dashboard}/>     
            <PrivateRouter path='/users' component={Utilisateur}/>
            <PrivateRouter path='/client' component={Clients}/>
            <PrivateRouter path='/colis' component={Cols}/>
            <PrivateRouter path='/destination' component={Destinations}/>
            <PrivateRouter path='/agent' component={Agents}/>
            <PrivateRouter path='/expedition' component={Expeditions}/>
            <PrivateRouter path='/mobile' component={Mobiles}/>
            <PrivateRouter path='/paiement' component={Paiements}/>
            <PrivateRouter path='/message' component={Message}/>
            <Route component={ErrorPage} />
          </Switch>
      </Router>
    );
  }

export default App;
