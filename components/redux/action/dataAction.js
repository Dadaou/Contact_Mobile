export const ADD_TO_CONTACT = "ADD_TO_CONTACT"
export const ADD_TO_TELEPHONE = "ADD_TO_TELEPHONE"
export const ADD_TO_MAIL = "ADD_TO_MAIL"
export const ADD_TO_ADRESSE = "ADD_TO_ADRESSE"


export const addContact = contact => dispatch => {

    dispatch({
        type: ADD_TO_CONTACT,
        payload: contact ,
    })
}

export const addTelephone = telephone => dispatch => {
    dispatch({
        type: ADD_TO_TELEPHONE,
        payload: telephone,
    })
}

export const addMail = mail => dispatch => {
    dispatch({
        type: ADD_TO_MAIL,
        payload: mail,
    })
}

export const addAdresse = adresse => dispatch => {
    dispatch({
        type: ADD_TO_ADRESSE,
        payload: adresse,
    })
}