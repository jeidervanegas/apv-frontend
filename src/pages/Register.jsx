import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from '../components/Alert'

export const Register = () => {


  const navigate = useNavigate();
  // const [dataUser, setDataUser] = useState({name:'', email:'', password:'', repitPassword:''});

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repitPassword, setrepitPassword] = useState('')

  const [alert, setAlert] = useState({})

  const handleSubmit = async(e) => {
    e.preventDefault();

    if([name, email, password, repitPassword].includes('')) {
      return setAlert({msg: 'Todos los campos son obligatorios', error: true});
    }

    if(password !== repitPassword) {
      return setAlert({msg: 'Las contraseñas no son iguales', error: true});
    }

    if(password.length < 6) {
      return setAlert({msg: 'La contraseña es muy corta, agrega mínimo 6 caracteres', error: true});
      
    }

    setAlert({})

    //creamos el usuario en la api

    try {
      //hacemos la petición
      const resp = await axios.post('/veterinarians/register', {name, email, password,})

      setAlert({
        msg: 'Creado correctamente, ya puedes iniciar sesión',
        error: false
      })


      setTimeout(() => {
        navigate('/')
      }, 1500)
      console.log(resp);

    } catch (error) {
      setAlert({
        error: true,
        msg: error.response.data.msg
      })
    }
  }

  const {msg} = alert;

  return (


    <>
      <div className="">
        <h1 className="text-indigo-600 font-black text-6xl ">
          Crea tu Cuenta y Administra {' '}
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
              Nombre
            </label>
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              className=" w-full p-3 mt-3 bg-gray-50 rounded-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              htmlFor=""
              className="uppercase text-gray-600 block text-xl font-bold "
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

          <div className="my-5">
            <label
              htmlFor=""
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              className=" w-full p-3 mt-3 bg-gray-50 rounded-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              htmlFor=""
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Repetir contraseña
            </label>
            <input
              type="password"
              placeholder="Repite tu contraseña"
              className=" w-full p-3 mt-3 bg-gray-50 rounded-full"
              value={repitPassword}
              onChange={(e) => setrepitPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Crear cuenta"
            className="bg-indigo-700 w-full py-3 px-10 rounded-full text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 transition-all md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
          {/* <Link
            className="block text-center my-5 text-gray-500"
            to="/forgot-password"
          >
            Olvidé mi contraseña
          </Link> */}
        </nav>

      </div>
    </>
  )
}
