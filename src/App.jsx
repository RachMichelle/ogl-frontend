import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './stylesheets/App.css'

import {
  playerAddFormData,
  playerEditFormData,
  teamAddFormData,
  teamEditFormData,
  staffAddFormData,
  staffEditFormData
} from './data/formData.js'

import UserProvider from './UserProvider.jsx'

import Home from './Components/Home.jsx'
import NavBar from './Components/NavBar.jsx'
import NotFound from './Components/NotFound.jsx'
import PlayersList from './Components/PlayersList.jsx'
import TeamsList from './Components/TeamsList.jsx'
import StaffList from './Components/StaffList.jsx'
import Team from './Components/Team.jsx'
import Player from './Components/Player.jsx'
import LoginForm from './Components/LoginForm.jsx'
import AddForm from './Components/AddForm.jsx'
import EditForm from './Components/EditForm.jsx'
import PasswordForm from './Components/PasswordForm.jsx'
import Delete from './Components/Delete.jsx'
import AddAssociationForm from './Components/AddAssociationForm.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <NavBar />
          <Routes>
            {/* public */}
            <Route path='/' element={<Home />} />
            <Route path='/players' element={<PlayersList />} />
            <Route path='/players/:alias' element={<Player />} />
            <Route path='/teams' element={<TeamsList />} />
            <Route path='/teams/:code' element={<Team />} />
            <Route path='/staff' element={<StaffList />} />
            <Route path='/login' element={<LoginForm />} />

            {/* protected -- admin or mod */}
            <Route path='/players/add'
              element={<AddForm
                type='players'
                subType='player'
                identifier='alias'
                fields={playerAddFormData} />} />

            <Route path='/players/edit/:alias'
              element={<EditForm
                type='players'
                subType='player'
                fields={playerEditFormData} />} />

            <Route path='/players/teams/:alias' element={<AddAssociationForm />} />

            <Route path='/teams/add'
              element={<AddForm
                type='teams'
                subType='team'
                identifier='code'
                fields={teamAddFormData} />} />

            <Route path='/teams/edit/:code'
              element={<EditForm
                type='teams'
                subType='team'
                fields={teamEditFormData} />} />

            {/* protected -- admin only */}
            <Route path='/staff/add'
              element={<AddForm
                type='staff'
                subType='staff'
                identifier='username'
                fields={staffAddFormData} />} />

            <Route path='/players/delete/:alias' element={<Delete type='players' />} />
            <Route path='/teams/delete/:code' element={<Delete type='teams' />} />
            <Route path='/staff/delete/:username' element={<Delete type='staff' />} />

            {/* protected -- admin or same user */}
            <Route path='/staff/edit/:username'
              element={<EditForm
                type='staff'
                subType='staff'
                fields={staffEditFormData} />} />

            {/* protected -- same user only */}
            <Route path='/staff/password/:username' element={<PasswordForm />} />
            
            {/* 404 */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  )
}

export default App
