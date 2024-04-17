import { listPays } from "./IsoCode"

export const genererID = () => {
    return 'xxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

export const getIsoCode = (countryCallingCode) => {

    for (const pays of listPays) {
        if (pays.ccc === countryCallingCode) {
            return pays.iso
        }
    }
    return null
}
