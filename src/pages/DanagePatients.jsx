import { useState } from 'react'
import { Form } from '../components/Form'
import { PatientList } from '../components/PatientList'

export const DanagePatients = () => {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="flex flex-col md:flex-row">
      <button
        type="button"
        className="bg-indigo-600 text-white font-bold uppercase mx-10 mb-10 p-3 rounded-md md:hidden"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Ocultar formulario' : 'Mostrar formulario'}
      </button>
      <div
        className={`${
          showForm ? 'block' : 'hidden'
        } md:block md:w-1/2 lg:w-2/5`}
      >
        <Form />
      </div>
      <div className="md_w-1/2 lg:w-3/5">
        <PatientList />
      </div>
    </div>
  )
}
