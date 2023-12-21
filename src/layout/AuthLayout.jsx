import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div >
      <main className="w-11/12 mx-auto md:grid md:grid-cols-2 gap-10 pt-12  px-5 pb-5 items-center">
        <Outlet />
      </main>
    </div>
  )
}
