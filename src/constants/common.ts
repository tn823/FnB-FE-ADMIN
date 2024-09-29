export const ROOT_URL = import.meta.env.VITE_ROOT_URL || 'http://localhost:3000/';

export const ENDPOINTS = Object.freeze({
    //login
    LOGIN: `${ROOT_URL}api/login`,
    //account
    ACCOUNTS: `${ROOT_URL}api/accounts`,
    //product
    PRODUCTS: `${ROOT_URL}api/products`,
    //category
    CATEGORIES: `${ROOT_URL}api/categories`,
    //order
});

export const POSITION = Object.freeze([
  { value: 'ADMIN', label: 'ADMIN' },
  { value: 'STAFF', label: 'STAFF' }
])