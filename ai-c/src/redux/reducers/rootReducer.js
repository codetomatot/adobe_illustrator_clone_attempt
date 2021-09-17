import { combineReducers } from "redux";
import { CU } from "./CU";

const rootReducer = combineReducers({
    user: CU,
});
export default rootReducer;