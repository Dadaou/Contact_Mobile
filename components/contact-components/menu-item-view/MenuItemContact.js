import { memo } from 'react'
import { View } from 'react-native'
import ListView from '../ListView'

const MenuItemContact = memo(({ ctt_id, src_id, corbeille, photo, prenom, nom, favori, telephone, mail }) => {

    return (

        <View style={{ flex: 1 }}>

            <ListView
                ctt_id={ctt_id}
                src_id={src_id}
                corbeille={corbeille}
                photo={photo}
                prenom={prenom}
                nom={nom}
                favori={favori}
                telephone={telephone}
                mail={mail}
            />

        </View>

    )

})

export default MenuItemContact