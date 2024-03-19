export const CHECK_NETWORK_STATUS = "CHECK_NETWORK_STATUS"

export const updateNetworkStatus = data => dispatch => {

    dispatch({
        type: CHECK_NETWORK_STATUS,
        payload: data,
    })
}