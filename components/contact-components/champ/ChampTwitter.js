import { View, TextInput, StyleSheet, Image } from "react-native"

const ChampTwitter = ({paramTwitter, onChangeTwitter}) => {

    return (

        <View style = {styles.input}>

            <Image source={require('../../../assets/x.jpg')} style={{ width: 30, height: 30  }} />

            <TextInput

                style={{fontSize : 16, paddingLeft : 10}}
                placeholder="Twitter"
                onChangeText={(text) => onChangeTwitter(text)}
                value={paramTwitter} />

        </View>

    )

}


const styles = StyleSheet.create({

    input: {
        flex : 1, 
        flexDirection: "row",  
        alignItems: 'center',
        height: 50,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius : 5,
        borderColor: "#808080",
        backgroundColor : "#FEFFFF",
    }
    
    
})


export default ChampTwitter