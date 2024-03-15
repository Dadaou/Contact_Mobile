import { createStore, combineReducers, applyMiddleware } from "redux"
import dataReducer from "./reducer/dataReducer"
import { thunk } from 'redux-thunk'

export const store = createStore(dataReducer, applyMiddleware(thunk))