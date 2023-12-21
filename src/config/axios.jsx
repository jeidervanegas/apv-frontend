import axios from "axios";

const clientAxios = axios.create({
    baseURL:`http://localhost:3026/api`
})

export default clientAxios