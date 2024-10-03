export const ROOT_URL = import.meta.env.VITE_ROOT_URL || 'http://localhost:3000/';

export const ENDPOINTS = Object.freeze({
    //login
    LOGIN: `${ROOT_URL}api/login`,
    //account
    ACCOUNTS: `${ROOT_URL}api/accounts`,
    //product
    PRODUCTS: `${ROOT_URL}api/products`,
    //topping
    TOPPINGS: `${ROOT_URL}api/toppings`,
    //category
    CATEGORIES: `${ROOT_URL}api/categories`,
    //order
    ORDERS: `${ROOT_URL}api/orders`
});

export const POSITION = Object.freeze([
  { value: 'ADMIN', label: 'ADMIN' },
  { value: 'STAFF', label: 'STAFF' }
])

export const ORDER_STATUS = Object.freeze([
  {value: "1", label: "Đang đợi xử lý"},
  {value: "2", label: "Thanh toán thành công"},
  {value: "3", label: "Đơn đã hủy"}
])