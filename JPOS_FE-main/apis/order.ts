import http from "@/utils/http";

export const createOrderAPI = (_data: { name: string; email: string; phone_number: string; message: string }) =>
    http.instance.post("order/create", {
        _data,
    });

type status = "PENDING" | "ACCEPTED" | "PROCESSING" | "DONE" | "REJECTED";

export type Contact = {
    contactId: number;
    cusId: number;
    fullname: string;
    email: string;
    phone: string;
    message: string;
    time: number;
    status: "NEW" | "ACCEPTED" | "REJECTED" | "DESIGNING" | "DESIGNED" | "PRODUCING" | "COMPLETED";
};

type ContactListResponse = {
    messsage: string;
    page: number;
    size: number;
    total: number;
    totalPages: number;
    items: Contact[];
};

export const getContactList = (page: number, size: number, status: string) =>
    http.instance.get<ContactListResponse>(`v1/contacts?page=${page}&size=${size}&status=${status}`);

export const contactResponse = ({ contactId, message }: { contactId: number; message: string }) =>
    http.instance.post("v1/staff/contacts-response", {
        contactId,
        message,
    });

export type ContactResponse = {
    id: number;
    fullname: string;
    email: string;
    phone: string;
    message: string;
    time: number;
    status: string;
};

export const getAllContactsResponse = ({
    page,
    size = 10,
    status = "NewAcceptedRejcttedDesigningProducingCompletedComplete DesigningComplete Producing",
}: {
    page: number;
    size?: number;
    status?: string;
}) =>
    http.instance.get<{
        message: string;
        page: number;
        size: number;
        total: number;
        totalPages: number;
        items: ContactResponse[];
    }>(`v1/contacts-response?page=${page}&size=${size}&status=${status}`);

export type Order = {
    id: number;
    customerId: number;
    totalPrice: number;
    time: number;
    status: string;
};

export const getAllOrders = ({ page = 1, size = 20 }: { page?: number; size?: number }) =>
    http.instance.get(`v1/orders?page=${page}&size=${size}`);

export const getTotalPrice = () =>
    http.instance.get<{
        message: string;
        item: {
            totalPrice: number;
        };
    }>("v1/orders/total");

export const completeContact = (contactId: number, price: number) =>
    http.instance.post(`v1/contacts-response/complete/${contactId}`, { totalPrice: price });

export const updateOrderStatus = (orderId: number, status: string) =>
    http.instance.patch(`v1/contacts-response/${orderId}?status=${status}`);
