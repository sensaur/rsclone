/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
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
import Footer from './components/Footer';
import EditProfile from './components/EditProfile';
import AllBoards from './components/AllBoards';
import { BoardsContext } from './context';
import { IBoard } from './types/IBoard';
import Board from './components/Boards/Board';

function App() {
  const { user } = useAppSelector((state) => state.userSlice);
  const [boards, setBoards] = useState<IBoard[]>([]);

  return (
    <BoardsContext.Provider value={{ boards, setBoards }}>
      <div className="min-h-screen flex flex-col">
        {!user ? <NavBarStart /> : <NavBarLogged />}
        <div className="flex-auto px-10 py-4">
          <Routes>
            <Route path="/" element={<StartPageEmpty />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/logout" element={<SignOut />} />
            <Route path="/boards/:id" element={<Board />} />
            <Route
              path="/boards"
              element={(
                <ProtectedRoute>
                  <AllBoards />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/editprofile"
              element={(
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
                )}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BoardsContext.Provider>
  );
}

export default App;
