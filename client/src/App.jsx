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
import Shop from './Pages/Shop/Shop.jsx';

import LayoutUser from './Layout/LayoutUser.jsx';
import Login from './Pages/Login/Login.jsx';
import SignUp from './Pages/Signup/Signup.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
          <Route path="/" element={<LayoutUser />}>
            <Route path='Login' element={<Login />} />
            <Route path='Signup' element={<SignUp />} />
          </Route>

            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='Wallet' element={<Wallet/> }/>
              <Route path='History' element={<History/> }/>
              <Route path='Invite' element={<Invite/> }/>
              <Route path='Leaderboard' element={<Leaderboard/> }/>
              <Route path='Shop' element={<Shop/> }/>
            </Route>

          </Routes>
        </Provider>
      </BrowserRouter>
      {/* <Canvas3D /> */}
    </>
  )
}

export default App
