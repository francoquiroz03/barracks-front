import { API } from "../config";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const signup = user => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const signin = user => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        cookies.set('jwt', data, {path:"/", maxAge: 604800});
        next();
    }
};

export const signout = () => {
    if (typeof window !== "undefined") {
        cookies.remove('jwt', {path: '/'});
        return fetch(`${API}/signout`, {
            method: "GET"
        })
         .then(response => {
            return response;
         })
        .catch(err => console.log(err));
    }
};

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (cookies.get("jwt")) {
        return cookies.get("jwt");
    } else {
        return false;
    }
};