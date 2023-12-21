import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Alert } from '../components/Alert'
import axios from 'axios'

export const NewPassword = () => {
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState({})
  const [tokenValid, setTokenValid] = useState(false)
  const [passwordModify, setPasswordModify] = useState(false)

  const params = useParams()

  const { token } = params
  console.log(token)

  useEffect(() => {
    const validateToken = async () => {
      try {
        await axios.get(`/veterinarians/forget-password/${token}`)
        setAlert({
          msg: 'Coloca tu nueva contraseña'
        })
        setTokenValid(true)
      } catch (error) {
        setAlert({
          msg: 'Hubo un error con el enlace',
          error: true
        })
      }
    }
    validateToken()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password.length < 6) {
      setAlert({
        msg: 'El password debe ser mínimo de seis caracteres',
        error: true
      })
      return
    }

    try {
      const { data } = await axios.post(
        `/veterinarians/forget-password/${token}`,
        { password }
      )

      setAlert({
        msg: data.msg
      })

      setPasswordModify(true)
      setPassword('')
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alert

  return (
    <>
      <div className="">
        <h1 className="text-indigo-600 font-black text-6xl ">
          Restablece tu contraseña y no pierdas acceso a{' '}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 bg-white rounded-2xl">
        {msg && <Alert alert={alert} />}

        {tokenValid && (
          <>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="my-5">
                  <label
                    htmlFor=""
                    className="uppercase text-gray-600 block text-xl font-bold"
                  >
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    placeholder="Ingresa una nueva contraseña"
                    className=" w-full p-3 mt-3 bg-gray-50 rounded-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Guardar nueva contraseña"
                  className="bg-indigo-700 w-full py-3 px-10 rounded-full text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 transition-all md:w-auto"
                />
              </form>
            </div>
            {passwordModify && (
              <Link className="block text-center my-5 text-gray-500" to="/">
                Iniciar sesión
              </Link>
            )}
          </>
        )}
      </div>
    </>
  )
}
