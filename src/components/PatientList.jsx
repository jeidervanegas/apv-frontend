import usePatients from '../hooks/usePatients'
import { Patient } from './Patient'

export const PatientList = () => {
  const { patients } = usePatients()

  return (
    <>
      {patients.length ? 
      (
        <>
          <h2 className="text-3xl font-black text-center">
            'Listado de Pacientes'
          </h2>

          <p className='text-xl mt-5 mb-10 text-center'>
            Administra tus {' '} 
            <span className='text-indigo-600 font-bold'>Pacientes y citas</span>
          </p>

          {patients.map(patient => (
            <Patient
              key={patient._id}
              patient={patient}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className="text-3xl font-black text-center">
            'No hay pacientes'
          </h2>

          <p className='text-xl mt-5 mb-10 text-center'>
            Comienza agregando pacientes 
            <span className='text-indigo-600 font-bold'>y aparecerán en este lugar</span>
          </p>
        </>
      )}
      {/* {patients.map((item, i)) => (
      <tr key={}>
        <td></td>
      </tr>
    )} */}
    </>
  )
}
