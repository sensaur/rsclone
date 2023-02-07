import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from './hooks/redux';
import Empty from './components/Empty';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NavBarStart from './components/NavBarStart';

function App() {
  const { user } = useAppSelector((state) => state.userSlice);

  return (
    <>
      {!user ? <NavBarStart /> : null}
      <Routes>
        <Route path="/" element={<Empty />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
