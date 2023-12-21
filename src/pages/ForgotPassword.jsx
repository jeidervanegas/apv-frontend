import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Alert } from '../components/Alert'
import axios from 'axios'


export const ForgotPassword = () => {

  const [email, setEmail] = useState('')
  const [alert, setAlert] = useState({})

 

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(email === '' || email.length < 6) {
      setAlert({msg: 'El email es obligatorio',error: true})
      return
    }
    try {
      const { data } = await axios.post('/veterinarians/forget-password', {email})

      console.log(data);

      setAlert({msg: data.msg})

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }

  }

  const {msg} = alert;

  return (
    <>
      <div className="">
        <h1 className="text-indigo-600 font-black text-6xl ">
          Recupera tu Acceso y no Pierdas{' '}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 bg-white rounded-2xl">
        {msg && <Alert
          alert={alert}
        />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              htmlFor=""
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Correo
            </label>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              className=" w-full p-3 mt-3 bg-gray-50 rounded-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Enviar instrucciones"
            className="bg-indigo-700 w-full py-3 px-10 rounded-full text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 transition-all md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
          <Link className="block text-center my-5 text-gray-500" to="/register">
            ¿No tienes una cuenta? Regístrate
          </Link>
        </nav>
      </div>
    </>
  )
}
