import axios from "axios";
import {apiUrl} from "./globalConstant.ts";


const axiosAPI = axios.create({
    baseURL: apiUrl,
});

export default axiosAPI;