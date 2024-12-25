import axios from "axios";
const REST_API_BASE_URL="http://localhost:8080/api/aqi"
const REST_API_HISTORICAL_URL="http://localhost:8080/api/historical-data"
export const listAQIs=()=>{
    return axios.get(REST_API_HISTORICAL_URL);
}


export const postAQIs=(aqi)=>axios.post(REST_API_BASE_URL, aqi);
