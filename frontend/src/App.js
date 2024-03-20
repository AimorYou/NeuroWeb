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

import Classification from './components/Classification/Classification';
import Emotions from './pages/Emotions';
import Detection from './pages/Detection';

import { Classes } from './pages/Classes';
import { Audio } from './pages/Audio';

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

          <Route path='/classification' element={<Classification/>} />
          <Route path='/emotions' element={<Emotions/>} />
          <Route path='/detection' element={<Detection/>} />

          <Route path="/classes" element={<Classes />} />
          <Route path="/audio" element={<Audio />} />
          

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
