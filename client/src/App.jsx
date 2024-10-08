import { useState } from 'react'
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './Redux/store.jsx';

import Layout from './Layout/Layout.jsx';

import Canvas2D from './Pages/canvas.jsx';

import Home from './Pages/Home/Home.jsx';
import Wallet from './Pages/Wallet/Wallet.jsx';
import History from './Pages/History/History.jsx';
import Invite from './Pages/Invites/Invite.jsx';
import Leaderboard from './Pages/Leaderboard/Leaderboard.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            {/* <Route path='Login' element={<Login />} /> */}
            {/* <Route path='register' element={<SignUp />} /> */}

            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='Wallet' element={<Wallet/> }/>
              <Route path='History' element={<History/> }/>
              <Route path='Invite' element={<Invite/> }/>
              <Route path='Leaderboard' element={<Leaderboard/> }/>
            </Route>

          </Routes>
        </Provider>
      </BrowserRouter>
      {/* <Canvas3D /> */}
    </>
  )
}

export default App
