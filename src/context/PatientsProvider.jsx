import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'

//creamos el context
const PatientsContext = createContext()

//cramos la finción del proveedor
export const PatientsProvider = ({ children }) => {
  const [patients, setPatients] = useState([])
  const [patient, setPatient] = useState({})

  const { auth } = useAuth();

  useEffect(() => {
    const getPatients = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        const { data } = await axios.get('/patients/get-patient', config)

        setPatients(data)
      } catch (error) {
        console.log(error)
      }
    }
    getPatients()
  }, [auth])

  const savePatient = async (patient) => {
    console.log(patient);

    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    if (patient.id) {
      try {
        //hacemos la petición
        const { data } = await axios.put(`/patients/${patient.id}`, patient, config)

        const PatientActual = patients.map(patientState => patientState._id === data._id ? data :patientState )
        
        setPatients(PatientActual)

      } catch (error) {
        console.log(error);
      }
    } else {
      try {

        //hacemos la petición al backend
        const { data } = await axios.post(
          '/patients/add-patient/',
          patient,
          config
        )

        const { createdAt, updatedAt, __v, ...storedPatient } = data

        setPatients([storedPatient, ...patients])
      } catch (error) {
        console.log(error.response.data.msg)
      }
    }
  }

  const setEdit = (patient) => {
    setPatient(patient)
  }

  const deletePatient = async id => {
    const confirmar = confirm('¿Esta seguro que de sea eliminar?')

    if(confirmar) {
      try {
        const token = localStorage.getItem('token')
        if (!token) return

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }

        const { data } = await axios.delete(`/patients/${id}`, config);

        const updatedPatients = patients.filter(patientState => patientState._id !== id);
        setPatients(updatedPatients)
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <PatientsContext.Provider
      value={{
        patients,
        savePatient,
        setEdit,
        patient,
        deletePatient,
      }}
    >
      {children}
    </PatientsContext.Provider>
  )
}

export default PatientsContext
