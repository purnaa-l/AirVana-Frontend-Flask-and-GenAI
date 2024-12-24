import axios from "axios";
const REST_API_BASE_URL="http://localhost:8080/api/aqi"
export const listAQIs=()=>{
    return axios.get(REST_API_BASE_URL);
}

export const postAQIs=(aqi)=>axios.post(REST_API_BASE_URL, aqi);