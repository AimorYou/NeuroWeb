import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import SigninPage from './pages/SigninPage';
import GetStartedPage from './pages/GetStartedPage';

import FAQPage from './pages/FAQPage'
import TeamPage from './pages/TeamPage'
import PrivatePolicy from './pages/PrivatePolicyPage'
import Register from './pages/RegisterPage'
import ForgotPassword from './pages/ForgotPassword'

import NLP from './pages/NLP';
import CV from './pages/CV';
import CLML from './pages/CLML';

import { Classes } from './pages/Classes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage/>} />
          <Route path='/signin' element={<SigninPage/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/get-started' element={<GetStartedPage/>} />

          <Route path='/faq' element={<FAQPage/>} />
          <Route path='/team' element={<TeamPage/>} />
          <Route path='/private_policy' element={<PrivatePolicy/>} />
          <Route path='/restore_password' element={<ForgotPassword/>} />

          <Route path='/nlp' element={<NLP/>} />
          <Route path='/cv' element={<CV/>} />
          <Route path='/clml' element={<CLML/>} />

          <Route path="/classes" element={<Classes />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
