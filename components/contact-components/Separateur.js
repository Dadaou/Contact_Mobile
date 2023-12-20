import { View, StyleSheet } from "react-native"

const Separateur = () => {

    return (

        <View style = {styles.separateur}></View>

    )

}


const styles = StyleSheet.create({

    separateur: {

        alignItems : 'center',
        justifyContent : 'center',

        borderBottomWidth: 1,
        borderBottomColor: "red",
        borderBottomStyle : "solid"   
    }
    
    
})


export default Separateur