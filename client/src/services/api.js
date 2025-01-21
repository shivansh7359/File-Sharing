import axios from "axios";

const API_URL = 'http://localhost:4000'
const token = localStorage.getItem('authToken');

export const uploadFile = async(data) => {
    try{
        let response = await axios.post(`${API_URL}/api/file/upload`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    }
    catch(err){
        console.log("Error --> ", err.message );
    }
}