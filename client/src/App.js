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
import {Mobiles} from './pages/Mobile';
import Message from './pages/Message';
import {Clients} from './pages/Clients';
import {Sidebar} from './components/Sidebar';



function App() {
  const token = localStorage.getItem("token");    
  console.log(token)
    return (
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/' element={
                    token === "true" ? (<Dashboard/>) : (<Navigate replace to="/login"/>)
                  }/>     
          <Route path='/users' element={
                token === "true" ? (<Utilisateur/>) : (<Navigate replace to="/login"/>)
              } />
          <Route path='/client' element={
                      token === "true" ? (<Clients/>) : (<Navigate replace to="/login"/>)
                  }/>
          <Route path='/colis' element={
                      token === "true" ? (<Cols/>) : (<Navigate replace to="/login"/>)
                  }/>
          <Route path='/destination' element={
                      token === "true" ? (<Destinations/>) : (<Navigate replace to="/login"/>)
                  }/>
          <Route path='/agent' element={
                      token === "true" ? (<Agents/>) : (<Navigate replace to="/login"/>)
                  }/>
          <Route path='/expedition' element={
                      token === "true" ? (<Expeditions/>) : (<Navigate replace to="/login"/>)
                  }/>
          <Route path='/mobile' element={
                      token === "true" ? (<Mobiles/>) : (<Navigate replace to="/login"/>)
                  }/>
          <Route path='/paiement' element={
                      token === "true" ? (<Paiements/>) : (<Navigate replace to="/login"/>)
                  }/>
          <Route path='/message' element={
                      token === "true" ? (<Message/>) : (<Navigate replace to="/login"/>)
                  }/>
          <Route element={ErrorPage} />
        </Routes>
      </BrowserRouter>
    );
  }

export default App;
