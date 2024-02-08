import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json" || "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
});

const get = async (endpoint: string, params = "") => {
    const {data} = await API.get(endpoint + "/" + params);
    return data;
};

const post = async (endpoint: string, userData: UserProps) => {
    const {data} = await API.post(endpoint, userData);
    return data;
};

const put = async (endpoint: string, userData: UserProps) => {
    const {data} = await API.put(endpoint, userData);
    return data;
};

const del = async (endpoint: string, params = "") => {
    const {data} = await API.put(endpoint + "/" + params);
    return data;
};

export {get, post, put, del as delete};
