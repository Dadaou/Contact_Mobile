import { CHECK_NETWORK_STATUS, UPDATE_NOMBRE_CONTACT } from "../action/globalDataAction"
const initialState = { networkInfo: {}, nombreContact : ""}

const globalReducer = (state = initialState, action) => {

    switch (action.type) {

        case CHECK_NETWORK_STATUS:
            return {
                ...state,
                networkInfo: action.payload
            }

        case UPDATE_NOMBRE_CONTACT:
            return {
                    ...state,
                    nombreContact: action.payload
            }

        default:
            return state
    }
}

export default globalReducer