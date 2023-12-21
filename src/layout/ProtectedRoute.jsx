import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { Footer } from '../components/Footer'
import { Headers } from '../components/Headers'

export const ProtectedRoute = () => {
  const { auth, charging } = useAuth()

  // console.log(auth)

  // console.log(charging)
  // console.log(charging);

  if (charging) return 'Cargando...'

  return (
    <>
      <Headers />
      {auth?._id ? (
        <main className="w-11/12 mx-auto mt-10">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />
      )}
      <Footer />
    </>
  )
}
