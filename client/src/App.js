import React from 'react';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';
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
  const token = localStorage.getItem("token");
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/client' component={Clients} />
        <Route exact path='/' render={() => (
                    token === "true" ? (<Dashboard/>) : (<Redirect to="/login"/>)
                )}/>     
        <Route path='/users' render={() => (
          token === "true" ? (<Utilisateur/>) : (<Redirect to="/login"/>)
        )} />
        {/* <Route path='/client' render={() => (
                    token === "true" ? (<Clients/>) : (<Redirect to="/login"/>)
                )}/> */}
        <Route path='/colis' render={() => (
                    token === "true" ? (<Cols/>) : (<Redirect to="/login"/>)
                )}/>
        <Route path='/destination' render={() => (
                    token === "true" ? (<Destinations/>) : (<Redirect to="/login"/>)
                )}/>
        <Route path='/agent' render={() => (
                    token === "true" ? (<Agents/>) : (<Redirect to="/login"/>)
                )}/>
        <Route path='/expedition' render={() => (
                    token === "true" ? (<Expeditions/>) : (<Redirect to="/login"/>)
                )}/>
        <Route path='/localisation' render={() => (
                    token === "true" ? (<Localisations/>) : (<Redirect to="/login"/>)
                )}/>
        <Route path='/paiement' render={() => (
                    token === "true" ? (<Paiements/>) : (<Redirect to="/login"/>)
                )}/>
        <Route path='/message' render={() => (
                    token === "true" ? (<Message/>) : (<Redirect to="/login"/>)
                )}/>
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
