import axios from "axios"

const instance = axios.create({
    baseURL: "http://149.28.142.81:4000",
    headers: { "Content-Type" : "application/json;charset=utf-8" }
})
export default instance
