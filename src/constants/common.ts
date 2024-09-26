export const ROOT_URL = import.meta.env.VITE_ROOT_URL || 'http://localhost:3000/';

export const ENDPOINTS = Object.freeze({
    //login
    LOGIN: `${ROOT_URL}api/login`,
    //account
    //product
    //category
    CATEGORIES: `${ROOT_URL}api/categories`,
    //order
});