import { CHECK_NETWORK_STATUS, UPDATE_NOMBRE_CONTACT, UPDATE_NOMBRE_FAVORI, MANAGE_LOGIN, MANAGE_USER_TOKEN } from "../action/globalDataAction"
const initialState = { networkInfo: {}, nombreContact: 0, nombreFavori: 0, isLogin: false, _token: null }

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
                nombreContact: parseInt(action.payload)
            }

        case UPDATE_NOMBRE_FAVORI:
            return {
                ...state,
                nombreFavori: parseInt(action.payload)
            }

        case MANAGE_LOGIN:
            return {
                ...state,
                isLogin: action.payload
            }

        case MANAGE_USER_TOKEN:
            return {
                ...state,
                _token: action.payload
            }

        default:
            return state
    }
}

export default globalReducer