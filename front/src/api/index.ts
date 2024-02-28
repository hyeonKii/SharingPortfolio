import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

//서버로 요청 보내기 전 interceptors를 활용해 세션스토리지에서 이전에 서버에서 받은 토큰을 header 설정 후에 요청 
API.interceptors.request.use((config) => {
    const accessToken = sessionStorage.getItem("userToken");
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
    const {data} = await API.put(endpoint, userData);
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
