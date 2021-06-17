import axios from 'axios'
import {
    CLEAR_WAREHOUSE_SEARCH_QUERY,
    CLOSE_WAREHOUSE_FORM, GET_WAREHOUSES,
    SET_UPDATED_WAREHOUSE, SET_WAREHOUSES_LOADING, SET_WAREHOUSES_SEARCH_QUERY,
    SHOW_WAREHOUSE_FORM
} from "./warehouseTypes";
import {PAGE_SIZE} from "../../core/config/global";

const url = process.env.MIX_SERVER_API_URL;

// Get Warehouses
export const getWarehouses = () => (dispatch, getState) => {
    dispatch(setWarehousesLoading());
    const {searchQuery} = getState().warehouses
    axios
        .get(`${url}/warehouse${searchQuery}`)
        .then(res =>
            dispatch({
                type: GET_WAREHOUSES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_WAREHOUSES,
                payload: {}
            })
        );
};

// Update warehouse
export const updateWarehouse = (id,data) => {
    return new Promise(async (resolve,reject) => {
        axios.patch(`${url}/warehouse/${id}`,data)
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}

// Get warehouse by id
export const getWarehouseById = (id) => {
    return new Promise(async (resolve, reject) => {
        axios
            .get(`${url}/warehouse/${id}`)
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    })
}

// Create new warehouse
export const createWarehouse = data => (dispatch,getState) => {
    const {searchQuery} = getState().warehouses;
    return new Promise(async (resolve, reject) => {
        axios
            .post(`${url}/warehouse`, data)
            .then(res => {
                searchQuery === `?pageSize=${PAGE_SIZE}` ? dispatch(getWarehouses()) : dispatch(clearWarehouseSearchQuery())
                resolve(res.data)
            })
            .catch(err => reject(err))
    })
}

// Delete Warehouse
export const deleteWarehouse = (id) => {
    return new Promise(async (resolve, reject) => {
        axios
            .delete(`${url}/warehouse/${id}`)
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    })
}

// Set Warehouses loading
export const setWarehousesLoading = () => {
    return {
        type: SET_WAREHOUSES_LOADING
    };
};

// Set warehouse search query
export const setWarehouseSearchQuery = (payload = {}) => {
    return {
        type: SET_WAREHOUSES_SEARCH_QUERY,
        payload
    }
}

// Show warehouse (create,update) form.
export const showWarehouseForm = (payload = {}) => {
    return {
        type: SHOW_WAREHOUSE_FORM,
        payload
    }
}

// Close warehouse (create,update) form.
export const closeWarehouseForm = () => {
    return {
        type: CLOSE_WAREHOUSE_FORM
    }
}


// Clear warehouse searchQuery
export const clearWarehouseSearchQuery = () => {
    return {
        type: CLEAR_WAREHOUSE_SEARCH_QUERY
    }
}

// Merge updated warehouse.
export const setUpdateWarehouse = (payload) => {
    return {
        type: SET_UPDATED_WAREHOUSE,
        payload
    }
}
