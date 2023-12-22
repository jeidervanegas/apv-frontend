import usePatients from "../hooks/usePatients"



export const Patient = ({ patient }) => {
  const { email, fehca, name, owner, symptoms, _id } = patient

  const { setEdit, deletePatient } = usePatients();

  const formatDate = (date) => {
    const newDate = new Date(date)
    return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(newDate)
  }

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
      <p className="font-bold uppercase text-indigo-700 my-2">
        Nombre:{' '}
        <span className="font-normal normal-case text-black ">{patient.name}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700 my-2">
        Propietario:{' '}
        <span className="font-normal normal-case text-black ">{patient.owner}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700 my-2">
        Contácto:{' '}
        <span className="font-normal normal-case text-black ">{patient.email}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700 my-2">
        Fecha de Alta:{' '}
        <span className="font-normal normal-case text-black ">{formatDate(fehca)}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700 my-2">
        Síntomas:{' '}
        <span className="font-normal normal-case text-black ">{patient.symptoms}</span>
      </p>

      <div className="flex justify-between my-5 gap-4">
        <button
          onClick={() => setEdit(patient)}
          type="button"
          className="py-2 px-6 w-2/4 md:w-48 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white uppercase font-bold rounded-lg"
        >Editar</button>
        <button
          onClick={() => deletePatient(_id)}
          type="button"
          className="py-2 px-3 w-2/4 md:w-48  bg-red-600 hover:bg-red-700 transition-colors text-white uppercase font-bold rounded-lg"
        >Eliminar</button>
      </div>

    </div>
  )
}
