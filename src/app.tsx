/* eslint-disable react/jsx-no-constructed-context-values */
import MainContext from 'contexts/MainContext';
import LoginPage from 'pages/auth/login/login';
import RegistrationPage from 'pages/auth/registration/register';
import HomePage from 'pages/Homepage/index';
import RecipePage from 'pages/Recipepage';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => (
  <MainContext.Provider value={{}}>
    <BrowserRouter>
      <Routes>

        <Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
        </Route>

        <Route path="/auth">
          <Route path="/auth/register" element={<RegistrationPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </MainContext.Provider>
);

export default App;
