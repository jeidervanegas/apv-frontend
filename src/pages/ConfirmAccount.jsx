import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { Alert } from '../components/Alert';

export const ConfirmAccount = () => {
  const [accountConfirm, setAccountConfirm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState({})
  const params = useParams();

  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        //hacemos lampetición al backend
        const url = `/veterinarians/confirm/${id}`
        const { data } = await axios(url);

        setAccountConfirm(true)

          setAlert({
          msg: data.msg
        })

      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }

      setLoading(false)
    }
    confirmAccount()
  },[])

  return (
    <>
      <div className="">
        <h1 className="text-indigo-600 font-black text-6xl ">
          Confirma tu Cuenta y comienza a Administrar {' '}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 bg-white rounded-2xl">
      {!loading && <Alert
        alert={alert}
      />}

      {accountConfirm && (
        <Link
        className='block text-center my-5 text-gray-500'
        to='/'
        >Inicia Sesión</Link>
      )}
      </div>
    </>
  )
}
