import axios from "axios"
import { host } from "./API_urls"

const instance = axios.create({
  baseURL: host + '/api/v1/',
});

export const  headerConfig = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem("jwt_access_token")}`,
    "Content-Type": "application/json",
  }
}

export default instance;