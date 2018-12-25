// const localhost = 'http://192.168.0.111:8080/DeliveryFoodServices/rest';
// const URL_LOGIN = localhost + '/UserService/users/login';
// const URL_REGISTRY = localhost + '/UserService/users/registry';
// const URL_TOPSELLER = localhost + '/ProductService/products/bestseller';
// const URL_PRODUCT_CATEGORY = localhost + '/ProductService/products/category';

const localhost = 'http://ldvmservices.somee.com';

const URL_LOGIN = localhost + '/Store_User/UserLogin';
const URL_REGISTRY = localhost + '/Store_User/AddUserNotParaments'
const URL_UPDATE_USER = localhost + '/Store_User/Update_UserNotParaments';

const URL_TOPSELLER = localhost + '/Product/Get15_ProductWithHighestTimesBookListsList';
const URL_PRODUCTS = localhost + '/Product/GetProductLists';
const URL_PRODUCTS_BY_CATEGORY = localhost + '/Product/GetProductListsWithCategory/?id_cate=';
const URL_PRODUCT_CATEGORY = localhost + '/Product_Category/GetProduct_CategoryLists';
const URL_ORDER = localhost +'/Product/ORDER';
const URL_ORDER_HISTORY = localhost + '/Invoice_Detail/GetAllInvoice_DetailOneUser/?id_user=';
const URL_PRODUCTS_BY_INVOICE_ID = localhost + '/Invoice_Detail/GetAllInvoice_DetailOfInvoiceWithProduct/';

export {URL_TOPSELLER};
export {URL_LOGIN};
export {URL_UPDATE_USER};
export {URL_REGISTRY};
export {URL_PRODUCTS};
export {URL_PRODUCT_CATEGORY};
export {URL_PRODUCTS_BY_CATEGORY};
export {URL_ORDER};
export {URL_ORDER_HISTORY};
export {URL_PRODUCTS_BY_INVOICE_ID};
