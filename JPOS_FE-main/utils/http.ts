import axios, { AxiosInstance } from "axios";

class Http {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: "https://2b3f-2402-800-63ae-9830-bdfd-7fc8-7065-a3a2.ngrok-free.app/jpos/api/",
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
                // Authorization: `"Bearer ${window?.localStorage?.getItem("token")}`,
            },
        });
    }

    setToken(token: string) {
        this.instance.defaults.headers.common["authToken"] = `${token}`;
    }
}

const http = new Http();

export default http;
