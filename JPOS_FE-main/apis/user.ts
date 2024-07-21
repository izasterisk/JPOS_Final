import http from "@/utils/http";

type LoginResponse = {
    message: string;
    item: {
        accessToken: string;
        userId: number;
        userRole: "Admin" | "Customer" | "Manager" | "Sale Staff" | "Product Staff" | "Design Staff";
    };
};

export const login = (_data: { email: string; password: string }) =>
    http.instance.post<LoginResponse>("v1/authen/login", _data);

export type SendContactParams = {
    fullname: string;
    email: string;
    phone: string;
    message: string;
};

export const sendContact = (_data: SendContactParams) => http.instance.post("v1/contacts", _data);

export type UserType = {
    id: number;
    username: string;
    fullname: string;
    email: string;
    password: string;
    phone: string | null;
    address: string | null;
    role: "Admin" | "Customer" | "Manager" | "Sale Staff" | "Product Staff" | "Design Staff";
    status: string;
};

export const getAllUsers = () =>
    http.instance.get<{
        message: string;
        page: number;
        size: number;
        total: number;
        totalPages: number;
        items: UserType[];
    }>("v1/users");
