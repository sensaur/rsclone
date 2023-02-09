import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from './hooks/redux';
import StartPageEmpty from './components/StartPageEmpty';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';
import NavBarStart from './components/NavBarStart';
import NavBarLogged from './components/NavBarLogged';
import ProtectedRoute from './components/ProtectedRoute';
import AllDesks from './components/AllDesks';

function App() {
  const { user } = useAppSelector((state) => state.userSlice);
  return (
    <>
      {!user ? <NavBarStart /> : <NavBarLogged />}
      <Routes>
        <Route path="/" element={<StartPageEmpty />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<SignOut />} />
        <Route
          path="/alldesks"
          element={(
            <ProtectedRoute>
              <AllDesks />
            </ProtectedRoute>
          )}
        />
      </Routes>
    </>
  );
}

export default App;
