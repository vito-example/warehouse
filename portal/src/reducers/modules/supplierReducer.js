import {
    CLEAR_SUPPLIER_SEARCH_QUERY,
    CLOSE_SUPPLIER_FORM,
    GET_SUPPLIERS,
    SET_SUPPLIERS_LOADING,
    SET_SUPPLIERS_SEARCH_QUERY, SET_UPDATED_SUPPLIER,
    SHOW_SUPPLIER_FORM
} from "../../actions/supplier/supplierTypes";
import queryString from "querystring";


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
    searchQuery: '?pageSize=1',
    showSupplierForm: {
        show: false,
        modalSupplier: {}
    },
}


export default function (state = initialState, action) {
    switch (action.type){
        case GET_SUPPLIERS:
            return {
                ...state,
                data: action.payload.data,
                pagination: {
                    ...state.pagination,
                    ...action.payload.pagination,
                    loading: false
                }
            }
        case SET_SUPPLIERS_LOADING:
            return {
                ...state,
                ...state.pagination,
                loading: true
            }
        case SET_SUPPLIERS_SEARCH_QUERY:
            let searchQuery = queryString.parse(state.searchQuery)
            return {
                ...state,
                searchQuery: `?${queryString.stringify(getSearchQueryParams({...state.pagination, ...searchQuery, ...action.payload}))}`
            }
        case SHOW_SUPPLIER_FORM:
            return {
                ...state,
                showSupplierForm: {
                    show: true,
                    modalSupplier: action.payload
                }
            }
        case CLOSE_SUPPLIER_FORM:
            return {
                ...state,
                showSupplierForm: {
                    show: false,
                    modalSupplier: {}
                }
            }
        case CLEAR_SUPPLIER_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: '?pageSize=1'
            }
        case SET_UPDATED_SUPPLIER:
            return {
                ...state,
                data: state.data.map(el => el.id === action.payload.id ? action.payload : el)
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