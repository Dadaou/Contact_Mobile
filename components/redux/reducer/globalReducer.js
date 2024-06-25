import { CHECK_NETWORK_STATUS, UPDATE_NOMBRE_CONTACT, UPDATE_NOMBRE_CONTACT_PERSO, UPDATE_NOMBRE_FAVORI, UPDATE_NOMBRE_CONTACT_CORBEILLE, MANAGE_LOGIN, MANAGE_USER_TOKEN, MANAGE_USER_INFO, MANAGE_NOTIFICATION_MESSAGE, MANAGE_APPARITION_NOTIFICATION, MANAGE_DATE_DERNIER_SYNCHRO } from "../action/globalDataAction"
const initialState = { networkInfo: {}, nombreContact: 0, nombreContactPersonnel: 0, nombreFavori: 0, nombreContactCorbeille: 0, isLogin: false, _tokenUtilisateur: null, _infoUtilisateur: {}, msgNotificationToast: "", showNotificationToast: false, dateDernierSynchro: "" }

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

        case UPDATE_NOMBRE_CONTACT_PERSO:
            return {
                ...state,
                nombreContactPersonnel: parseInt(action.payload)
            }

        case UPDATE_NOMBRE_FAVORI:
            return {
                ...state,
                nombreFavori: parseInt(action.payload)
            }

        case UPDATE_NOMBRE_CONTACT_CORBEILLE:

            return {
                ...state,
                nombreContactCorbeille: parseInt(action.payload)
            }

        case MANAGE_LOGIN:
            return {
                ...state,
                isLogin: action.payload
            }

        case MANAGE_USER_TOKEN:
            return {
                ...state,
                _tokenUtilisateur: action.payload
            }

        case MANAGE_USER_INFO:
            return {
                ...state,
                _infoUtilisateur: action.payload
            }

        case MANAGE_APPARITION_NOTIFICATION:
            return {
                ...state,
                showNotificationToast: action.payload
            }

        case MANAGE_NOTIFICATION_MESSAGE:
            return {
                ...state,
                msgNotificationToast: action.payload
            }

        case MANAGE_DATE_DERNIER_SYNCHRO:
            return {
                ...state,
                dateDernierSynchro: action.payload
            }

        default:
            return state
    }
}

export default globalReducer