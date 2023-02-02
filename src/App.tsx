import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Empty from './Empty';
import SignIn from './SignIn';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Empty />} />
      <Route path="/login" element={<SignIn />} />
    </Routes>
  );
}

export default App;
