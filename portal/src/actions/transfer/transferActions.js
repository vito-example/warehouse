import axios from 'axios'

import {PAGE_SIZE} from "../../core/config/global";
import {
    CLEAR_TRANSFER_SEARCH_QUERY,
    CLOSE_TRANSFER_FORM, GET_TRANSFERS, SET_TRANSFERS_LOADING,
    SET_TRANSFERS_SEARCH_QUERY,
    SHOW_TRANSFER_FORM
} from "./transferTypes";


const url = process.env.MIX_SERVER_API_URL;

// Get transfer
export const getTransfers = () => (dispatch, getState) => {
    dispatch(setTransferLoading());
    const {searchQuery} = getState().transfers
    axios
        .get(`${url}/transfer${searchQuery}`)
        .then(res =>
            dispatch({
                type: GET_TRANSFERS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_TRANSFERS,
                payload: {}
            })
        );
};

// Get transfer for store
export const getCreateTransfer = (id) => {
    return new Promise(async (resolve, reject) => {
        axios
            .get(`${url}/transfer/${id}/create`)
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    })
}



// Create new transfer
export const createTransfer = (id,data) => (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
        axios
            .post(`${url}/transfer/${id}/store`, data)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => reject(err))
    })
}



// Set transfer loading
export const setTransferLoading = () => {
    return {
        type: SET_TRANSFERS_LOADING
    };
};

// Set transfer search query
export const setTransferSearchQuery = (payload = {}) => {
    return {
        type: SET_TRANSFERS_SEARCH_QUERY,
        payload
    }
}

// Show transfer (create,update) form.
export const showTransferForm = (payload = {}) => {
    return {
        type: SHOW_TRANSFER_FORM,
        payload
    }
}

// Close transfer  form.
export const closeTransferForm = () => {
    return {
        type: CLOSE_TRANSFER_FORM
    }
}


// Clear transfer searchQuery
export const clearTransferSearchQuery = () => {
    return {
        type: CLEAR_TRANSFER_SEARCH_QUERY
    }
}

