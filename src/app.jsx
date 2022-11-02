/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
import * as React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage/index';
import RecipePage from './pages/Recipepage';
import RegistrationPage from './pages/auth/registration/register';
import LoginPage from './pages/auth/login/index';
import FavoritesPage from './pages/Favorites/index';

const App = () => {
  console.log('=======================================================================');

return (
  <BrowserRouter>
    <Routes>

      <Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
      </Route>

      <Route path="/auth">
        <Route path="/auth/register" element={<RegistrationPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
      </Route>

    </Routes>
  </BrowserRouter>
);
};
export default App;
