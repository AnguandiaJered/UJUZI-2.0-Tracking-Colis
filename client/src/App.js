import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import {Localisations} from './pages/Localisations';
import Message from './pages/Message';
import {Clients} from './pages/Clients';
import {Sidebar} from './components/Sidebar';



function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path='/dashboard' component={Dashboard} />       
        <Route path='/login' component={Login} />
        <Route path='/users' component={Utilisateur} />
        <Route path='/client' component={Clients} />
        <Route path='/colis' component={Cols} />
        <Route path='/destination' component={Destinations} />
        <Route path='/agent' component={Agents} />
        <Route path='/expedition' component={Expeditions} />
        <Route path='/localisation' component={Localisations} />
        <Route path='/paiement' component={Paiements} />
        <Route path='/message' component={Message} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
