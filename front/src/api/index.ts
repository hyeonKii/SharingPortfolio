import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const get = async (endpoint: string, params = "") => {
    const {data} = await API.get(endpoint + "/" + params, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
    return data;
};

const post = async (endpoint: string, userData: UserProps) => {
    const {data} = await API.post(endpoint, userData, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
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
    const {data} = await API.delete(endpoint, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
    return data;
};

const upload = async (endpoint: string, params = "", file: FormData) => {
    try {
        const data = await API.post(endpoint + "/" + params, file, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    } catch (e) {
        console.log(e);
    }
};

// const del = async (endpoint: string, params = "") =>
//     axios.delete(serverUrl + endpoint + "/" + params, {
//         headers: {
//             Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
//         },
//     });

export {get, post, put, del, upload};
