import { ADD_CONTACT, ADD_TELEPHONE, ADD_MAIL, ADD_ADRESSE } from "../action/addDataAction"

const initialState = { listContact: [], listTelephone: [], listMail: [], listAdresse: [] }

addDataReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_CONTACT:
            return {
                ...state,
                listContact: [...state.listContact, action.payload]
            }

        case ADD_TELEPHONE:
            return {
                ...state,
                listTelephone: [...state.listTelephone, action.payload]
            }

        case ADD_MAIL:
            return {
                ...state,
                listMail: [...state.listMail, action.payload]
            }

        case ADD_ADRESSE:
            return {
                ...state,
                listAdresse: [...state.listAdresse, action.payload]
            }

        default:
            return state
    }
}

export default addDataReducer