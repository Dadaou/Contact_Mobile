export const CHECK_NETWORK_STATUS = "CHECK_NETWORK_STATUS"
export const  UPDATE_NOMBRE_CONTACT = " UPDATE_NOMBRE_CONTACT"
export const  UPDATE_NOMBRE_FAVORI = "UPDATE_NOMBRE_FAVORI"

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

export const updateNombreFavori = nombre => dispatch => {

    dispatch({
        type: UPDATE_NOMBRE_FAVORI,
        payload: nombre,
    })

}