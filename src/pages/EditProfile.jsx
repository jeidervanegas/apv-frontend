import { useEffect, useState } from 'react';
import { AdminNav } from '../components/AdminNav'
import useAuth from '../hooks/useAuth'
import {Alert} from '../components/Alert'

export const EditProfile = () => {

    const { auth, updateProfile } = useAuth();
    const [profile, setProfile] = useState({})
    const [alert, setAlert] = useState({})

    useEffect(() => {
        setProfile(auth)
    },[auth])

    const handleSubmit = async e => {
        e.preventDefault();

        const { name, email } = profile;

        if([name, email].includes('')) {
            setAlert({
                msg: 'El Email y el Nombre son obligatorios',
                error: true
            })
            return
        }

        const result = await updateProfile(profile)

        setAlert(result)
        setTimeout(() => {
          setAlert({})
        }, 3000)

    }

    const { msg } = alert



  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu{' '}
        <span className="text-indigo-600 font-bold">Información aquí</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

            {msg && <Alert alert={alert}/>}
          <form
            onSubmit={handleSubmit}
          >
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Nombre
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="name"
                value={profile.name || ''}
                onChange={e => setProfile({
                    ...profile,
                    [e.target.name] : e.target.value
                })}
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Sitio Web
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="web"
                value={profile.web || ''}
                onChange={e => setProfile({
                    ...profile,
                    [e.target.name] : e.target.value
                })}
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Telefono
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="phone"
                value={profile.phone || ''}
                onChange={e => setProfile({
                    ...profile,
                    [e.target.name] : e.target.value
                })}
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Email
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="email"
                value={profile.email || ''}
                onChange={e => setProfile({
                    ...profile,
                    [e.target.name] : e.target.value
                })}
              />
            </div>
            <input 
                type="submit" 
                value='Guardar Cambios'
                className='text-center w-full uppercase text-white bg-indigo-700 hover:bg-indigo-800 transition-colors hover:cursor-pointer py-3 px-10 font-bold rounded-lg mt-5'
                
            />
          </form>
        </div>
      </div>
    </>
  )
}
