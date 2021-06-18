import axios from 'axios'
import {
    CLEAR_PRODUCT_SEARCH_QUERY,
    CLOSE_PRODUCT_FORM, GET_PRODUCTS, SET_PRODUCTS_LOADING,
    SET_PRODUCTS_SEARCH_QUERY,
    SET_UPDATED_PRODUCT,
    SHOW_PRODUCT_FORM
} from "./productTypes";
import {PAGE_SIZE} from "../../core/config/global";


const url = process.env.MIX_SERVER_API_URL;

// Get Products
export const getProducts = () => (dispatch, getState) => {
    dispatch(setProductsLoading());
    const {searchQuery} = getState().products
    axios
        .get(`${url}/product${searchQuery}`)
        .then(res =>
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PRODUCTS,
                payload: {}
            })
        );
};

// Update product
export const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        axios.patch(`${url}/product/${id}`, data)
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}

// Get product by id
export const getProductById = (id) => {
    return new Promise(async (resolve, reject) => {
        axios
            .get(`${url}/product/${id}`)
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    })
}

// Get product for store
export const getCreateProduct = () => {
    return new Promise(async (resolve, reject) => {
        axios
            .get(`${url}/product/create`)
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    })
}

// Get product for edit
export const getEditProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        axios
            .get(`${url}/product/${id}/edit`)
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    })
}

// Create new product
export const createProduct = data => (dispatch, getState) => {
    const {searchQuery} = getState().products;
    return new Promise(async (resolve, reject) => {
        axios
            .post(`${url}/product`, data)
            .then(res => {
                searchQuery === `?pageSize=${PAGE_SIZE}` ? dispatch(getProducts()) : dispatch(clearProductSearchQuery())
                resolve(res.data)
            })
            .catch(err => reject(err))
    })
}

// Delete Product
export const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        axios
            .delete(`${url}/product/${id}`)
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    })
}

// Set product loading
export const setProductsLoading = () => {
    return {
        type: SET_PRODUCTS_LOADING
    };
};

// Set product search query
export const setProductSearchQuery = (payload = {}) => {
    return {
        type: SET_PRODUCTS_SEARCH_QUERY,
        payload
    }
}

// Show product (create,update) form.
export const showProductForm = (payload = {}) => {
    return {
        type: SHOW_PRODUCT_FORM,
        payload
    }
}

// Close product (create,update) form.
export const closeProductForm = () => {
    return {
        type: CLOSE_PRODUCT_FORM
    }
}


// Clear product searchQuery
export const clearProductSearchQuery = () => {
    return {
        type: CLEAR_PRODUCT_SEARCH_QUERY
    }
}

// Merge updated product.
export const setUpdateProduct = (payload) => {
    return {
        type: SET_UPDATED_PRODUCT,
        payload
    }
}