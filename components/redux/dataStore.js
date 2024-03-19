import { createStore, combineReducers, applyMiddleware } from "redux"
import { thunk } from "redux-thunk"
import addDataReducer from "./reducer/addDataReducer"
import updateDataReducer from "./reducer/updateDataReducer"
import globalReducer from "./reducer/globalReducer"


const rootReducer = combineReducers({ addDataReducer, updateDataReducer, globalReducer })
export const store = createStore(rootReducer, applyMiddleware(thunk))