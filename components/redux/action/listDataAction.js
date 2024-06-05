export const LIST_CONTACT = "LIST_CONTACT"

export const manageListContact = contact => dispatch => {

    dispatch({
        type: LIST_CONTACT,
        payload: contact,
    })
}
