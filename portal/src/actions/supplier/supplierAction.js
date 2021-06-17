import axios from 'axios'
import {
    CLEAR_SUPPLIER_SEARCH_QUERY,
    CLOSE_SUPPLIER_FORM,
    GET_SUPPLIERS,
    SET_SUPPLIERS_LOADING,
    SET_SUPPLIERS_SEARCH_QUERY, SET_UPDATED_SUPPLIER,
    SHOW_SUPPLIER_FORM
} from "./supplierTypes";
import {PAGE_SIZE} from "../../core/config/global";

const url = process.env.MIX_SERVER_API_URL;

// Get Suppliers
export const getSuppliers = () => (dispatch, getState) => {
    dispatch(setSuppliersLoading());
    const {searchQuery} = getState().suppliers
    axios
        .get(`${url}/supplier${searchQuery}`)
        .then(res =>
            dispatch({
                type: GET_SUPPLIERS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_SUPPLIERS,
                payload: {}
            })
        );
};

// Update supplier
export const updateSupplier = (id,data) => {
    return new Promise(async (resolve,reject) => {
        axios.patch(`${url}/supplier/${id}`,data)
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}

// Get supplier by id
export const getSupplierById = (id) => {
    return new Promise(async (resolve, reject) => {
        axios
            .get(`${url}/supplier/${id}`)
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    })
}

// Create new supplier
export const createSupplier = data => (dispatch,getState) => {
    const {searchQuery} = getState().suppliers;
    return new Promise(async (resolve, reject) => {
        axios
            .post(`${url}/supplier`, data)
            .then(res => {
                searchQuery === `?pageSize=${PAGE_SIZE}` ? dispatch(getSuppliers()) : dispatch(clearSupplierSearchQuery())
                resolve(res.data)
            })
            .catch(err => reject(err))
    })
}

// Delete supplier
export const deleteSupplier = (id) => {
    return new Promise(async (resolve, reject) => {
        axios
            .delete(`${url}/supplier/${id}`)
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    })
}

// Set Suppliers loading
export const setSuppliersLoading = () => {
    return {
        type: SET_SUPPLIERS_LOADING
    };
};

// Set supplier search query
export const setSupplierSearchQuery = (payload = {}) => {
    return {
        type: SET_SUPPLIERS_SEARCH_QUERY,
        payload
    }
}

// Show supplier (create,update) form.
export const showSupplierForm = (payload = {}) => {
    return {
        type: SHOW_SUPPLIER_FORM,
        payload
    }
}

// Close supplier (create,update) form.
export const closeSupplierForm = () => {
    return {
        type: CLOSE_SUPPLIER_FORM
    }
}


// Clear supplier searchQuery
export const clearSupplierSearchQuery = () => {
    return {
        type: CLEAR_SUPPLIER_SEARCH_QUERY
    }
}

// Merge updated supplier.
export const setUpdateSupplier = (payload) => {
    return {
        type: SET_UPDATED_SUPPLIER,
        payload
    }
}
