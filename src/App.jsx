import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthLayout } from './layout/AuthLayout'
import { Login } from './pages/Login'

import { ConfirmAccount } from './pages/ConfirmAccount'
import { ForgotPassword } from './pages/ForgotPassword'
import { Register } from './pages/Register'
import { Perfil } from './pages/Perfil'
import axios from 'axios'
import { NewPassword } from './pages/NewPassword'

import { AuthProvider } from './context/AuthProvider'
import { PatientsProvider } from './context/PatientsProvider'

import { ProtectedRoute } from './layout/ProtectedRoute'
import { DanagePatients } from './pages/DanagePatients'
import { EditProfile } from './pages/EditProfile'
import { ChangePassword } from './pages/ChangePassword'
// axios.defaults.baseURL = 'http://localhost:3026/api'
axios.defaults.baseURL = 'https://apv-backend-dev-dtah.4.us-1.fl0.io/api'


function App() {
  return (
    <BrowserRouter className="">
      <AuthProvider>
        <PatientsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password/:token" element={<NewPassword />} />
              <Route path="confirm/:id" element={<ConfirmAccount />} />
            </Route>

            <Route path="/admin" element={<ProtectedRoute />}>
              <Route index element={<DanagePatients />} />
              <Route path='profile' element={<EditProfile/>}/>
              <Route path='change-password' element={<ChangePassword/>}/>
            </Route>
          </Routes>
        </PatientsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
