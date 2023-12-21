import axios from "axios";
import { useState, useEffect, createContext } from "react";

//creamos el context
const AuthContext = createContext();



//creamos la función del proveedor
const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [charging, setCharging] = useState(true)

    useEffect(() => {
        const authenticate = async() => {
            const token = localStorage.getItem('token')

            if(!token) {
                setCharging(false);
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axios.get('/veterinarians/profile', config)

                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({})
            }

            setCharging(false)
        }
        authenticate();
    }, [])

    const closeSession = () => {
        localStorage.removeItem('token')
        setAuth({});
    }

    const updateProfile = async datos => {
        const token = localStorage.getItem('token')

        if(!token) {
            setCharging(false);
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
      
            //hacemos la petición
            const { data } = await axios.put(`veterinarians/profile/${datos._id}`, datos, config );

            return {
                msg: 'Almacenado correctamente' 
            }
            
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true,
            }
        }
    }

    const savePassword = async(datos) => {
        const token = localStorage.getItem('token')

        if(!token) {
            setCharging(false);
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.put('/veterinarians/update-password', datos, config)

            console.log(data);

            return {
                msg: data.msg
            }

        } catch (error) {
         return {
            msg: error.response.data.msg,
            error: true,
         }  
        }
    }
    
    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                charging,
                closeSession,
                updateProfile,
                savePassword,
            }}
        >
            {children}
        </AuthContext.Provider> 
    )
}

export {
    AuthProvider
}

export default AuthContext;