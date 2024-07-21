import http from "@/utils/http";

type GetCategoriesResponse = {
    message: string;
    page: number;
    size: number;
    total: number;
    totalPages: number;
    items: {
        id: number;
        name: string;
    }[];
};

export const getCategories = (page: number, size: number) =>
    http.instance.get<GetCategoriesResponse>(`v1/categories?page=${page}&size=${size}`);

type GetProductsResponse = {
    message: string;
    page: number;
    size: number;
    total: number;
    totalPages: number;
    items: ProductType[];
};

export type ProductType = {
    id: number;
    cate_id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    status: "ACTIVED";
};

export const getProductsByCategory = (categoryId: number, page: number) =>
    http.instance.get<GetProductsResponse>(`v1/categories/${categoryId}/products?page=${page}`);

export const getAllProduct = (page: number, size: number) =>
    http.instance.get<GetProductsResponse>(`v1/products?page=${page}&size=${size}`);
