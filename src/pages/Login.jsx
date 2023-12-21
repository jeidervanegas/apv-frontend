import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useState } from "react"
import {Alert } from '../components/Alert'
import axios from "axios"


export const Login = () => {
  const navigate = useNavigate();

  const [dataUser, setDataUser] = useState({email:'', password:''});
  const [alert, setAlert] = useState({})

  const { setAuth } = useAuth();

  const handleOnChange = (e) => {
    setDataUser({...dataUser, [e.target.name]: e.target.value})
  }


  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const {email, password} = dataUser;

    if([email, password].includes('')) {
      
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true

      })
      return
    }

    try {
      const { data } = await axios.post('/veterinarians/', {email, password})



      localStorage.setItem('token', data.token)

      setAuth(data)

      navigate('/admin')

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }

  }


  const { msg } = alert;

  return (
    <>
      <div className="">
        <h1 className="text-indigo-600 font-black text-6xl ">Inicia Sesión y Administra tus {' '} <span className="text-black">Pacientes</span></h1>
      </div>
      
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 bg-white rounded-2xl">
        {msg && <Alert
            alert={alert}
          />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label 
              htmlFor=""
              className="uppercase text-gray-600 block text-xl font-bold "
              >Correo</label>
            <input 
              type="email" 
              placeholder="Ingresa tu correo" 
              className=" w-full p-3 mt-3 bg-gray-50 rounded-full"
              name="email"
              onChange={handleOnChange}
            />
          </div>
          <div className="my-5">
            <label 
              htmlFor=""
              className="uppercase text-gray-600 block text-xl font-bold"
              >Contraseña</label>
            <input 
              type="password" 
              placeholder="Ingresa tu contraseña" 
              className=" w-full p-3 mt-3 bg-gray-50 rounded-full"
              name="password"
              onChange={handleOnChange}
            />
          </div>

          <input 
            type="submit" 
            value='Inciar Sesión'
            className="bg-indigo-700 w-full py-3 px-10 rounded-full text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 transition-all md:w-auto"

          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link 
            className="block text-center my-5 text-gray-500"
            to='/register'
            >¿No tienes una cuenta? Regístrate</Link>
          <Link 
            className="block text-center my-5 text-gray-500"
            to='/forgot-password'
            >Olvidé mi contraseña</Link>
        </nav>
      </div>
    </>
  )
}
