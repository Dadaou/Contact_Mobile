import { UPDATE_CONTACT, UPDATE_TELEPHONE, UPDATE_MAIL, UPDATE_ADRESSE } from "../action/updateDataAction"

const initialState = { listUpdatedContact: [], listUpdatedTelephone: [], listUpdatedMail: [], listUpdatedAdresse: [] }

const updateDataReducer = (state = initialState, action) => {

    switch (action.type) {

        case UPDATE_CONTACT:
            return {
                ...state,
                listUpdatedContact: [...state.listUpdatedContact, action.payload]
            }

        case UPDATE_TELEPHONE:
            return {
                ...state,
                listUpdatedTelephone: [...state.listUpdatedTelephone, action.payload]
            }

        case UPDATE_MAIL:
            return {
                ...state,
                listUpdatedMail: [...state.listUpdatedMail, action.payload]
            }

        case UPDATE_ADRESSE:
            return {
                ...state,
                listUpdatedAdresse: [...state.listUpdatedAdresse, action.payload]
            }

        default:
            return state
    }
}

export default updateDataReducer