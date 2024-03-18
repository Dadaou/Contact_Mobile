export const ADD_CONTACT = "ADD_CONTACT"
export const ADD_TELEPHONE = "ADD_TELEPHONE"
export const ADD_MAIL = "ADD_MAIL"
export const ADD_ADRESSE = "ADD_ADRESSE"


export const addContact = contact => dispatch => {

    dispatch({
        type: ADD_CONTACT,
        payload: contact ,
    })
}

export const addTelephone = telephone => dispatch => {
    dispatch({
        type: ADD_TELEPHONE,
        payload: telephone,
    })
}

export const addMail = mail => dispatch => {
    dispatch({
        type: ADD_MAIL,
        payload: mail,
    })
}

export const addAdresse = adresse => dispatch => {
    dispatch({
        type: ADD_ADRESSE,
        payload: adresse,
    })
}