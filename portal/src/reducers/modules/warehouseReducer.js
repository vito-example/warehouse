import queryString from "querystring";
import {
    CLEAR_WAREHOUSE_SEARCH_QUERY,
    CLOSE_WAREHOUSE_FORM, GET_WAREHOUSES,
    SET_UPDATED_WAREHOUSE, SET_WAREHOUSES_LOADING, SET_WAREHOUSES_SEARCH_QUERY, SHOW_WAREHOUSE_FORM
} from "../../actions/warehouse/warehouseTypes";
import {PAGE_SIZE} from "../../core/config/global";


const initialState = {
    data: [],
    pagination: {
        loading: false,
        count: null,
        per_page: 10,
        current: 1,
        total: null,
        pageSize: PAGE_SIZE,
    },
    searchQuery: `?pageSize=${PAGE_SIZE}`,
    showWarehouseForm: {
        show: false,
        modalWarehouse: {}
    },
}


export default function (state = initialState, action) {
    switch (action.type){
        case GET_WAREHOUSES:
            return {
                ...state,
                data: action.payload.data,
                pagination: {
                    ...state.pagination,
                    ...action.payload.pagination,
                    loading: false
                }
            }
        case SET_WAREHOUSES_LOADING:
            return {
                ...state,
                ...state.pagination,
                loading: true
            }
        case SET_WAREHOUSES_SEARCH_QUERY:
            let searchQuery = queryString.parse(state.searchQuery)
            return {
                ...state,
                searchQuery: `?${queryString.stringify(getSearchQueryParams({...state.pagination, ...searchQuery, ...action.payload}))}`
            }
        case SHOW_WAREHOUSE_FORM:
            return {
                ...state,
                showWarehouseForm: {
                    show: true,
                    modalWarehouse: action.payload
                }
            }
        case CLOSE_WAREHOUSE_FORM:
            return {
                ...state,
                showWarehouseForm: {
                    show: false,
                    modalWarehouse: {}
                }
            }
        case CLEAR_WAREHOUSE_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: `?pageSize=${PAGE_SIZE}`
            }
        case SET_UPDATED_WAREHOUSE:
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
