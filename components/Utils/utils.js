import { listPays } from "./IsoCode"

export const genererID = () => {
    return 'xxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

export const getIsoCode = (isoCode) => {

    for (const pays of listPays) {
        if (pays.iso === isoCode) {
            return pays.iso
        }
    }
    return null
}


export const convertirChaineEnArray = (data) => {

    return data.map(item => {

        const telephones = item.telephone === null || item.telephone === "" ? [""] : item.telephone.split(",")
        const mails = item.mail === null || item.mail === "" ? [""] : item.mail.split(",")

        return {
            ...item,
            telephone: telephones,
            mail: mails,
        }
    })
}
