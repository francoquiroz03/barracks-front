import { API } from "../config";
import Cookies from "universal-cookie";

export const getMovie = async () => {
    const cookies = new Cookies();
    try {
        const response = await fetch(`${API}/movies?order=desc&limit=6`, {
            method: "GET",
            headers:{
                Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': cookies.get("jwt").token,
            }
        });
        if(response.status === 401){
            return response;
        }
        return await response.json();
    } catch (err) {
        return err;
    }
};

export const getRecord = async () => {
    const cookies = new Cookies();
    try {
        const response = await fetch(`${API}/record/all`, {
            method: "GET",
            headers:{
                Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': cookies.get("jwt").token,
            }
        });
        if(response.status === 401){
            return response;
        }
        return await response.json();
    } catch (err) {
        return err;
    }
};