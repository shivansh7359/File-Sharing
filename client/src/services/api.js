import axios from "axios";

const API_URL = 'http://localhost:4000'

export const uploadFile = async(data) => {
    try{
        let response = await axios.post(`${API_URL}/upload`, data);

        return response.data;
    }
    catch(err){
        console.log("Error --> ", err.message );
    }
}