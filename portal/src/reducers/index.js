import {combineReducers} from "redux";
import supplierReducer from "./modules/supplierReducer";
import warehouseReducer from "./modules/warehouseReducer";
import productReducer from "./modules/productReducer";


export default combineReducers({
    suppliers: supplierReducer,
    warehouses: warehouseReducer,
    products: productReducer
});
