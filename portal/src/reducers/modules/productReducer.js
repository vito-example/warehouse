import queryString from "querystring";

import {
    CLEAR_PRODUCT_SEARCH_QUERY,
    CLOSE_PRODUCT_FORM, GET_PRODUCTS, SET_PRODUCTS_LOADING, SET_PRODUCTS_SEARCH_QUERY,
    SET_UPDATED_PRODUCT,
    SHOW_PRODUCT_FORM
} from "../../actions/product/productTypes";
import {PAGE_SIZE} from "../../core/config/global";


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
    showProductForm: {
        show: false,
        modalProduct: {},
        suppliers: [],
        warehouses: []
    },
}


export default function (state = initialState, action) {
    switch (action.type){
        case GET_PRODUCTS:
            return {
                ...state,
                data: action.payload.data,
                pagination: {
                    ...state.pagination,
                    ...action.payload.pagination,
                    loading: false
                }
            }
        case SET_PRODUCTS_LOADING:
            return {
                ...state,
                ...state.pagination,
                loading: true
            }
        case SET_PRODUCTS_SEARCH_QUERY:
            let searchQuery = queryString.parse(state.searchQuery)
            return {
                ...state,
                searchQuery: `?${queryString.stringify(getSearchQueryParams({...state.pagination, ...searchQuery, ...action.payload}))}`
            }
        case SHOW_PRODUCT_FORM:
            return {
                ...state,
                showProductForm: {
                    show: true,
                    modalProduct: action.payload.product,
                    warehouses: action.payload.warehouses,
                    suppliers: action.payload.suppliers
                }
            }
        case CLOSE_PRODUCT_FORM:
            return {
                ...state,
                showProductForm: {
                    show: false,
                    modalProduct: {},
                    warehouses: [],
                    suppliers: []
                }
            }
        case CLEAR_PRODUCT_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: `?pageSize=${PAGE_SIZE}`
            }
        case SET_UPDATED_PRODUCT:
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