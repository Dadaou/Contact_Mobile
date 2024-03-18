import { createStore, combineReducers, applyMiddleware } from "redux"
import { thunk } from "redux-thunk"
import addDataReducer from "./reducer/addDataReducer"
import updateDataReducer from "./reducer/updateDataReducer"


const rootReducer = combineReducers({ addDataReducer, updateDataReducer })
export const store = createStore(rootReducer, applyMiddleware(thunk))