export const UPDATE_CONTACT = "UPDATE_CONTACT"
export const UPDATE_TELEPHONE = "UPDATE_TELEPHONE"
export const UPDATE_MAIL = "UPDATE_MAIL"
export const UPDATE_ADRESSE = "UPDATE_ADRESSE"


export const updateContact = contact => dispatch => {

    dispatch({
        type: UPDATE_CONTACT,
        payload: contact ,
    })
}

export const updateTelephone = telephone => dispatch => {
    dispatch({
        type: UPDATE_TELEPHONE,
        payload: telephone,
    })
}

export const updateMail = mail => dispatch => {
    dispatch({
        type: UPDATE_MAIL,
        payload: mail,
    })
}

export const updateAdresse = adresse => dispatch => {
    dispatch({
        type: UPDATE_ADRESSE,
        payload: adresse,
    })
}