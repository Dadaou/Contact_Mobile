export const CHECK_NETWORK_STATUS = "CHECK_NETWORK_STATUS"
export const UPDATE_NOMBRE_CONTACT = " UPDATE_NOMBRE_CONTACT"
export const UPDATE_NOMBRE_CONTACT_PERSO = "UPDATE_NOMBRE_CONTACT_PERSO"
export const UPDATE_NOMBRE_FAVORI = "UPDATE_NOMBRE_FAVORI"
export const UPDATE_NOMBRE_CONTACT_CORBEILLE = "UPDATE_NOMBRE_CONTACT_CORBEILLE"
export const MANAGE_LOGIN = "MANAGE_LOGIN"
export const MANAGE_USER_TOKEN = "MANAGE_USER_TOKEN"
export const MANAGE_USER_INFO = "MANAGE_USER_INFO"
export const MANAGE_NOTIFICATION_MESSAGE = "MANAGE_NOTIFICATION_MESSAGE"
export const MANAGE_APPARITION_NOTIFICATION = "MANAGE_APPARITION_NOTIFICATION"
export const MANAGE_DATE_DERNIER_SYNCHRO = "MANAGE_DATE_DERNIER_SYNCHRO"

export const updateNetworkStatus = data => dispatch => {

    dispatch({
        type: CHECK_NETWORK_STATUS,
        payload: data,
    })
}

export const updateNombreContact = nombre => dispatch => {

    dispatch({
        type: UPDATE_NOMBRE_CONTACT,
        payload: nombre,
    })

}

export const updateNombreContactPersonnel = nombre => dispatch => {

    dispatch({
        type: UPDATE_NOMBRE_CONTACT_PERSO,
        payload: nombre,
    })

}

export const updateNombreFavori = nombre => dispatch => {

    dispatch({
        type: UPDATE_NOMBRE_FAVORI,
        payload: nombre,
    })

}

export const updateNombreContactCorbeille = nombre => dispatch => {

    dispatch({
        type: UPDATE_NOMBRE_CONTACT_CORBEILLE,
        payload: nombre,
    })

}

export const manageLogin = etat => dispatch => {

    dispatch({
        type: MANAGE_LOGIN,
        payload: etat,
    })

}

export const manageUserToken = token => dispatch => {

    dispatch({
        type: MANAGE_USER_TOKEN,
        payload: token,
    })

}

export const manageUserInfo = data => dispatch => {

    dispatch({
        type: MANAGE_USER_INFO,
        payload: data,
    })
}

export const manageApparitionNotification = etat => dispatch => {

    dispatch({
        type: MANAGE_APPARITION_NOTIFICATION,
        payload: etat,
    })

}

export const manageNotificationMessage = msg => dispatch => {

    dispatch({
        type: MANAGE_NOTIFICATION_MESSAGE,
        payload: msg,
    })

}

export const manageDateDernierSynchro = dateTime => dispatch => {

    dispatch({
        type: MANAGE_DATE_DERNIER_SYNCHRO,
        payload: dateTime,
    })

}
