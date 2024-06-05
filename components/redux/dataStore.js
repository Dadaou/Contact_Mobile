import { createStore, combineReducers, applyMiddleware } from "redux"
import { thunk } from "redux-thunk"
import listDataReducer from "./reducer/listDataReducer"
import globalReducer from "./reducer/globalReducer"


const rootReducer = combineReducers({ listDataReducer, globalReducer })
export const store = createStore(rootReducer, applyMiddleware(thunk))