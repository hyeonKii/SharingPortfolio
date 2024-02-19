import axios from "axios";

// const API = axios.create({
//     baseURL: import.meta.env.VITE_BASE_URL,
//     headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
//     },
// });

// const get = async (endpoint: string, params = "") => {
//     const {data} = await API.get(endpoint + "/" + params);
//     return data;
// };

// const post = async (endpoint: string, userData: UserProps) => {
//     const {data} = await API.post(endpoint, userData);
//     return data;
// };

// const put = async (endpoint: string, userData: UserProps) => {
//     const {data} = await API.put(endpoint, userData);
//     return data;
// };

// const del = async (endpoint: string, params = "") => {
//     const {data} = await API.put(endpoint + "/" + params);
//     return data;
// };

// export {get, post, put, del as delete};

const backendPortNumber = "5001";
const serverUrl =
    "http://" + window.location.hostname + ":" + backendPortNumber + "/";

// interface APIProps {
//     endpoint: string;
//     params?: string;
//     data?: UserProps;
// }

const get = async (endpoint: string, params = "") =>
    axios.get(serverUrl + endpoint + "/" + params, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });

const post = async (endpoint: string, data: UserProps) => {
    const bodyData = JSON.stringify(data);
    return axios.post(serverUrl + endpoint, bodyData, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
};

const put = async (endpoint: string, data: UserProps) => {
    const bodyData = JSON.stringify(data);
    return axios.put(serverUrl + endpoint, bodyData, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
};

const del = async (endpoint: string, params = "") =>
    axios.delete(serverUrl + endpoint + "/" + params, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });

export {get, post, put, del as delete};
