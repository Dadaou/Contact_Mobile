import { LIST_CONTACT } from "../action/listDataAction"

const initialState = { listContact: [] }

const listDataReducer = (state = initialState, action) => {

    switch (action.type) {

        case LIST_CONTACT:
            return {
                ...state,
                listContact: action.payload
            }

        default:
            return state
    }
}

export default listDataReducer