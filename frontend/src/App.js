import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { UserProvider } from '../src/context/UserContext';
import MainPage from './pages/MainPage';
import SigninPage from './pages/SigninPage';
import ChoosePretrainedOrNot from './pages/ChoosePretrainedOrNot';
import ChoosePretrainedModel from './pages/ChoosePretrainedModel';
import ChooseModel from './pages/ChooseModel';
import ChooseCVModel from './pages/ChooseCVModel';
import ChooseNLPModel from './pages/ChooseNLPModel';

import FAQPage from './pages/FAQPage'
import TeamPage from './pages/TeamPage'
import PrivatePolicy from './pages/PrivatePolicyPage'
import Register from './pages/RegisterPage'
import ForgotPassword from './pages/ForgotPassword'
import About from './pages/AboutPage';
import Job from './pages/Job';

import NLP from './pages/NLP';
import CV from './pages/CV';
import CLML from './pages/CLML';

import Classification from './pages/Classification';
import Emotions from './pages/Emotions';
import Detection from './pages/Detection';
import TextClassificationPretrained from './pages/TextClassificationPretrained/TextClassificationPretrained';
// CV
import { Classes } from './pages/Classes';
import { FaceRecognition } from './pages/FaceRecognition';
import { ImageDetection } from './pages/ImageDetection';
// NLP
import { Audio } from './pages/Audio';
import { TextClassification } from './pages/TextClassification';
// Classical ML
import Tables  from './pages/Tables';

function App() {
  return (
    <div className="App">
      <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage/>} />
          <Route path='/signin' element={<SigninPage/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/get-started' element={<ChoosePretrainedOrNot/>} />
          <Route path='/pretrained-models' element={<ChoosePretrainedModel/>} />
          <Route path='/models-to-train' element={<ChooseModel/>} />
          <Route path='/cv-models' element={<ChooseCVModel/>} />
          <Route path='/nlp-models' element={<ChooseNLPModel/>} />

          <Route path='/faq' element={<FAQPage/>} />
          <Route path='/team' element={<TeamPage/>} />
          <Route path='/private_policy' element={<PrivatePolicy/>} />
          <Route path='/restore_password' element={<ForgotPassword/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/job' element={<Job/>} />

          <Route path='/nlp' element={<NLP/>} />
          <Route path='/cv' element={<CV/>} />
          <Route path='/clml' element={<CLML/>} />

          <Route path='/classification' element={<Classification/>} />
          <Route path='/emotions' element={<Emotions/>} />
          <Route path='/detection' element={<Detection/>} />
          <Route path='/text-classification' element={<TextClassificationPretrained/>} />

          <Route path="/classes" element={<Classes />} />
          <Route path="/face-recognition" element={<FaceRecognition />} />
          <Route path="/image-detection" element={<ImageDetection />} />

          <Route path="/audio" element={<Audio />} />
          <Route path="/text" element={<TextClassification />} />

          <Route path="/tables" element={<Tables />} />
          

        </Routes>
      </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
