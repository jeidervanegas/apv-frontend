import { useState } from 'react';
import { AdminNav } from '../components/AdminNav'
import { Alert } from '../components/Alert';
import useAuth from '../hooks/useAuth';


export const ChangePassword = () => {

  const { savePassword } = useAuth();

  const [alert, setAlert] = useState({})
  const [password, setPassword] = useState({
    pwd_actual: '',
    pwd_new: '',
  })

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(Object.values(password).some( campo => campo === '')) {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      })
      return
    }

    if(password.pwd_new.length < 6) {
      setAlert({
        msg: 'La contraseña debe tener mínimo 6 caracteres',
        error: true,
      })
    }

    const  resp = await savePassword(password)

    setAlert(resp)
  }


  const { msg } = alert; 

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">
        Cambiar Contraseña
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu{' '}
        <span className="text-indigo-600 font-bold">Contraseña</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alert alert={alert} />}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Contraseña Actual
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="pwd_actual"
                placeholder='Escribe tu contraseña actual'
                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value,
                })}
   
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Nueva Contraseña
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="pwd_new"
                placeholder='Escribe tu nueva contraseña '
                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value,
                })}
              />
            </div>



            <input
              type="submit"
              value="Actualizar Contraseña"
              className="text-center w-full uppercase text-white bg-indigo-700 hover:bg-indigo-800 transition-colors hover:cursor-pointer py-3 px-10 font-bold rounded-lg mt-5"
            />
          </form>
        </div>
      </div>
    </>
  )
}
