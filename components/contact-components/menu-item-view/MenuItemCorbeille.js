import { useState, useCallback, memo } from 'react'
import { Menu } from 'react-native-paper'
import { View } from 'react-native'
import ListView from '../ListView'
import { dbLocalName } from '../../utils/Constant'
import * as SQLite from 'expo-sqlite'

const MenuItemCorbeille = memo(({ ctt_id, src_id, corbeille, photo, prenom, nom, favori, telephone, mail, onRefreshList }) => {


    const reqToRestoreContact = "UPDATE contact SET ctt_corbeille = 0 WHERE ctt_id = ?"
    const reqToUpdateFlagRestauration = "UPDATE contact SET est_restaurer = 1 WHERE ctt_id = ?"

    const db = SQLite.openDatabase(dbLocalName)

    const [visible, setVisible] = useState({})
    const [coordMenuContextuel, setCoordMenuContextuel] = useState({ x: 0, y: 0 })


    const toggleMenu = (name) => () => setVisible({ ...visible, [name]: !visible[name] })
    const getVisible = (name) => !!visible[name]

    const handleLongPress = (event) => {

        const { nativeEvent } = event
        setCoordMenuContextuel({
            x: nativeEvent.pageX,
            y: nativeEvent.pageY,
        })
        setVisible({ menuContextuel: true })
    }

    const procederRestauration = useCallback((idContact) => {
        db.transaction((tx) => {
            tx.executeSql(reqToRestoreContact, [idContact])
            tx.executeSql(reqToUpdateFlagRestauration, [idContact])
        })
        setVisible({ menuContextuel: false })
        onRefreshList(true)
    }, [])

    return (

        <View style={{ flex: 1 }}>

            <Menu
                visible={getVisible('menuContextuel')}
                onDismiss={toggleMenu('menuContextuel')}
                anchor={coordMenuContextuel}
                contentStyle={{ backgroundColor: "#FEFEFA", width: 180 }}
            >


                <Menu.Item leadingIcon="rotate-left" onPress={() => procederRestauration(ctt_id)} title="Restaurer" />

            </Menu>

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
                onLongPressCallback={handleLongPress}
            />

        </View>

    )

})

export default MenuItemCorbeille