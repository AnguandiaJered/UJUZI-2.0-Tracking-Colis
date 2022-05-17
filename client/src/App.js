import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/' element={<Dashboard/>} />
        <Route path='/client' element={<Clients/>} />
        <Route path='/users' element={<Utilisateur/>} />
        <Route path='/colis' element={<Cols/>} />
        <Route path='/destination' element={<Destinations/>} />
        <Route path='/agent' element={<Agents/>} />
        <Route path='/expedition' element={<Expeditions/>} />
        <Route path='/localisation' element={<Localisations/>} />
        <Route path='/paiement' element={<Paiements/>} />
        <Route path='/message' element={<Message/>} /> 
        {/* <Route path='/' render={() => (
                  token === "true" ? (<Dashboard/>) : (<Navigate to="/login"/>)
                )}/>     
        <Route path='/users' render={() => (
              token === "true" ? (<Utilisateur/>) : (<Navigate to="/login"/>)
            )} />
        <Route path='/client' render={() => (
                    token === "true" ? (<Clients/>) : (<Navigate to="/login"/>)
                )}/>
        <Route path='/colis' render={() => (
                    token === "true" ? (<Cols/>) : (<Navigate to="/login"/>)
                )}/>
        <Route path='/destination' render={() => (
                    token === "true" ? (<Destinations/>) : (<Navigate to="/login"/>)
                )}/>
        <Route path='/agent' render={() => (
                    token === "true" ? (<Agents/>) : (<Navigate to="/login"/>)
                )}/>
        <Route path='/expedition' render={() => (
                    token === "true" ? (<Expeditions/>) : (<Navigate to="/login"/>)
                )}/>
        <Route path='/localisation' render={() => (
                    token === "true" ? (<Localisations/>) : (<Navigate to="/login"/>)
                )}/>
        <Route path='/paiement' render={() => (
                    token === "true" ? (<Paiements/>) : (<Navigate to="/login"/>)
                )}/>
        <Route path='/message' render={() => (
                    token === "true" ? (<Message/>) : (<Navigate to="/login"/>)
                )}/> */}
        <Route element={ErrorPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
