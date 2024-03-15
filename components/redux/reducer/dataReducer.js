import { ADD_TO_CONTACT, ADD_TO_TELEPHONE, ADD_TO_MAIL, ADD_TO_ADRESSE } from "../action/dataAction"

const initialState = { listContact : [] , listTelephone : [], listMail : [], listAdresse : [] }

dataReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_TO_CONTACT :
            return {
                    ...state,
                    listContact : [...state.listContact, action.payload]
            }

        case ADD_TO_TELEPHONE :
            return {
                    ...state,
                    listTelephone : [...state.listTelephone, action.payload]
            }

        case ADD_TO_MAIL :
            return {
                    ...state,
                    listMail : [...state.listMail, action.payload]
            }

        case ADD_TO_ADRESSE :
            return {
                    ...state,
                    listAdresse : [...state.listAdresse, action.payload]
            }

        default:
            return state
    }
}

export default dataReducer