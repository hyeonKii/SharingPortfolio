import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

API.interceptors.request.use((config) => {
    const accessToken = sessionStorage.getItem("userToken");
    config.headers["Content-Type"] = "application/json";
    config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
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
    const {data} = await API.put(endpoint, userData, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
    return data;
};

const del = async (endpoint: string) => {
    const {data} = await API.delete(endpoint);
    return data;
};

const upload = async (endpoint: string, params = "", file: FormData) => {
    const data = await API.post(endpoint + "/" + params, file, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
};

export {get, post, put, del, upload};
