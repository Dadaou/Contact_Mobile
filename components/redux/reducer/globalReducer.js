import { CHECK_NETWORK_STATUS } from "../action/globalDataAction"
const initialState = { networkInfo: {}}

const globalReducer = (state = initialState, action) => {

    switch (action.type) {

        case CHECK_NETWORK_STATUS:
            return {
                ...state,
                networkInfo: action.payload
            }

        default:
            return state
    }
}

export default globalReducer