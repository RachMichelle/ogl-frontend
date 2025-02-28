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
import HasPermissions from './Components/HasPermissions.jsx'

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

            {/* protected routes -> HasPermissions component will look for props targetPermissions (array) & redirect destination for unauthorized */}

            {/* Links to protected routes render conditionally in public route components based on whether or not a user is logged in and has permission to access them */}

            {/* protected -- admin or mod */}
            <Route path='/players/add'
              element={
                <HasPermissions
                  targetPermissions={['admin', 'mod']}
                  redirect='/'>
                  <AddForm
                    type='players'
                    subType='player'
                    identifier='alias'
                    fields={playerAddFormData} />
                </HasPermissions>} />

            <Route path='/players/edit/:alias'
              element={
                <HasPermissions
                  targetPermissions={['admin', 'mod']}
                  redirect='/'>
                  <EditForm
                    type='players'
                    subType='player'
                    fields={playerEditFormData} />
                </HasPermissions>} />

            <Route path='/players/teams/:alias' element={
              <HasPermissions
                targetPermissions={['admin', 'mod']}
                redirect='/players'>
                <AddAssociationForm />
              </HasPermissions>} />

            <Route path='/teams/add'
              element={
                <HasPermissions
                  targetPermissions={['admin', 'mod']}
                  redirect='/'>
                  <AddForm
                    type='teams'
                    subType='team'
                    identifier='code'
                    fields={teamAddFormData} />
                </HasPermissions>} />

            <Route path='/teams/edit/:code'
              element={
                <HasPermissions
                  targetPermissions={['admin', 'mod']}
                  redirect='/'>
                  <EditForm
                    type='teams'
                    subType='team'
                    fields={teamEditFormData} />
                </HasPermissions>} />

            {/* protected -- admin only */}
            <Route path='/staff/add'
              element={
                <HasPermissions
                  targetPermissions={['admin']}
                  redirect='/'>
                  <AddForm
                    type='staff'
                    subType='staff'
                    identifier='username'
                    fields={staffAddFormData} />
                </HasPermissions>} />

            <Route path='/players/delete/:alias' element={
              <HasPermissions
                targetPermissions={['admin']}
                redirect='/players'>
                <Delete type='players' />
              </HasPermissions>} />

            <Route path='/teams/delete/:code' element={
              <HasPermissions
                targetPermissions={['admin']}
                redirect='/teams'>
                <Delete type='teams' />
              </HasPermissions>} />

            <Route path='/staff/delete/:username' element={
              <HasPermissions
                targetPermissions={['admin']}
                redirect='/staff'>
                <Delete type='staff' />
              </HasPermissions>} />

            {/* protected -- admin or same user */}
            <Route path='/staff/edit/:username'
              element={
                <HasPermissions
                  targetPermissions={['admin', 'same']}
                  redirect='/'>
                  <EditForm
                    type='staff'
                    subType='staff'
                    fields={staffEditFormData} />
                </HasPermissions>} />

            {/* protected -- same user only */}
            <Route path='/staff/password/:username' element=
              {
                <HasPermissions
                  targetPermissions={['same']}
                  redirect='/' >
                  <PasswordForm />
                </HasPermissions>
              } />

            {/* 404 */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  )
}

export default App
