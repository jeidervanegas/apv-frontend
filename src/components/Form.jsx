import { useEffect, useState } from 'react'
import { Alert } from './Alert'
import usePatients from '../hooks/usePatients'

export const Form = () => {
  const [name, setName] = useState('')
  const [owner, setOwner] = useState('')
  const [email, setEmail] = useState('')
  const [fehca, setFehca] = useState('')
  const [symptoms, setSymptoms] = useState('')
  const [id, setId] = useState(null)

  const [alert, setAlert] = useState({})

  const { savePatient, patient } = usePatients()

  useEffect(() => {
    if(patient?.name) {
      setName(patient.name)
      setOwner(patient.owner)
      setEmail(patient.email)

      // setFehca(patient.fehca)
      //aquí aplicamos el formato
      setFehca(new Date(patient.fehca).toLocaleDateString('en-CA'));

      setSymptoms(patient.symptoms)
      setId(patient._id)
    }
  }, [patient])

  // console.log(patient);

  const handleSubmit = (e) => {
    e.preventDefault()

    // validar el formulario
    if ([name, owner, email, fehca, symptoms].includes('')) {
      setAlert({
        msg: 'todos los campos son obligatorios',
        error: true
      })

      return
    }

    savePatient({ name, owner, email, fehca, symptoms, id })
    setAlert({
      msg: 'Guardado correctamente'
    })

    setName('')
    setOwner('')
    setEmail('')
    setFehca('')
    setSymptoms('')
    setId('')
  }

  const { msg } = alert

  return (
    <>
      <h2 className="text-3xl font-black text-center">
        'Administrador de Pacientes'
      </h2>
      <p className="text-xl mt-5 mb-10 text-center ">
        Añade tus Pacientes y{' '}
        <span className="text-indigo-600 font-bold ">Adminítralos</span>
      </p>

      {msg && <Alert alert={alert} />}

      <form
        onSubmit={handleSubmit}
        className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
      >
        <div className="mb-5">
          <label htmlFor="pet" className="text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>
          <input
            type="text"
            id="pet"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-b-400 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="owner" className="text-gray-700 uppercase font-bold">
            Nombre Propietario
          </label>
          <input
            type="text"
            id="owner"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-b-400 rounded-md"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 uppercase font-bold">
            Email del propietario
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-b-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-gray-700 uppercase font-bold">
            Decha de Alta
          </label>
          <input
            id="date"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-b-400 rounded-md"
            value={fehca}
            onChange={(e) => setFehca(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="symptoms"
            className="text-gray-700 uppercase font-bold"
          >
            Síntomas
          </label>
          <textarea
            id="symptoms"
            placeholder="Describe los síntomas"
            className="border-2 w-full p-2 mt-2 placeholder-b-400 rounded-md"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 transition-colors cursor-pointer"
          value={id ? "Actualizar Paciente" : "Agregar Paciente"}
        />
      </form>
    </>
  )
}
