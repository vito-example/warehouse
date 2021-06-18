import queryString from "querystring";
import {PAGE_SIZE} from "../../core/config/global";
import {
    CLEAR_TRANSFER_SEARCH_QUERY,
    CLOSE_TRANSFER_FORM, GET_TRANSFERS, SET_TRANSFERS_LOADING, SET_TRANSFERS_SEARCH_QUERY,
    SHOW_TRANSFER_FORM
} from "../../actions/transfer/transferTypes";

const initialState = {
    data: [],
    pagination: {
        loading: false,
        count: null,
        per_page: 10,
        current: 1,
        total: null,
        pageSize: 10,
    },
    searchQuery: `?pageSize=${PAGE_SIZE}`,
    showTransferForm: {
        show: false,
        product: {},
        warehouses: []
    },
}


export default function (state = initialState, action) {
    switch (action.type){
        case GET_TRANSFERS:
            return {
                ...state,
                data: action.payload.data,
                pagination: {
                    ...state.pagination,
                    ...action.payload.pagination,
                    loading: false
                }
            }
        case SET_TRANSFERS_LOADING:
            return {
                ...state,
                ...state.pagination,
                loading: true
            }
        case SET_TRANSFERS_SEARCH_QUERY:
            let searchQuery = queryString.parse(state.searchQuery)
            return {
                ...state,
                searchQuery: `?${queryString.stringify(getSearchQueryParams({...state.pagination, ...searchQuery, ...action.payload}))}`
            }
        case SHOW_TRANSFER_FORM:
            return {
                ...state,
                showTransferForm: {
                    show: true,
                    product: action.payload.product,
                    warehouses: action.payload.warehouses,
                }
            }
        case CLOSE_TRANSFER_FORM:
            return {
                ...state,
                showTransferForm: {
                    show: false,
                    product: {},
                    warehouses: [],
                }
            }
        case CLEAR_TRANSFER_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: `?pageSize=${PAGE_SIZE}`
            }
        default:
            return state;
    }
}

// Return only available search params
function getSearchQueryParams(searchData) {
    return {
        pageSize: searchData.pageSize,
        page: searchData.current,
        sort: searchData.sort,
        order: searchData.order
    }
}