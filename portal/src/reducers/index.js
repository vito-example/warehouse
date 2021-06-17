import {combineReducers} from "redux";
import supplierReducer from "./modules/supplierReducer";
import warehouseReducer from "./modules/warehouseReducer";


export default combineReducers({
    suppliers: supplierReducer,
    warehouses: warehouseReducer
});
