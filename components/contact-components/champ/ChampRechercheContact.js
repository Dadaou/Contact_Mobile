import { View, TextInput, StyleSheet } from "react-native"

const ChampRechercheContact = () => {

    return (

        <>
            <View style ={{alignItems : 'center'}}>

                <TextInput

                    style={styles.input}
                    placeholder="Rechercher un contact" />
            </View>

        </>
    )
}


const styles = StyleSheet.create({

    input: {
        
        height: 50,
        width: 350,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius : 100,
        borderColor: "#808080",
        backgroundColor : "#FEFFFF",
        fontSize : 16
    },

})

export default ChampRechercheContact