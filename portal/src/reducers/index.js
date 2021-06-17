import {combineReducers} from "redux";
import supplierReducer from "./modules/supplierReducer";


export default combineReducers({
    suppliers: supplierReducer
});
