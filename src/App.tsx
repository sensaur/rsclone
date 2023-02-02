import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Empty from './Empty';
import SignIn from './SignIn';
import NavBarStart from './NavBarStart';

function App() {
  const dispatch = useDispatch();
  // @ts-ignore
  const user = useSelector((state) => state.user);
  useEffect(() => {
    // @ts-ignore
    dispatch(() => {});
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {!user ? <NavBarStart /> : null}
      <Routes>
        <Route path="/" element={<Empty />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
