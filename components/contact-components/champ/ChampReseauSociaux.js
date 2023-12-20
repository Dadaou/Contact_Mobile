import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native"

const ChampReseauSociaux = () => {

    const [twitter, setTwitter] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [facebook, setFacebook] = useState('')
    const [skype, setSkype] = useState('')


    return (

        <View style = {{flex : 1}}>

            <View style = {styles.sectionLogoEtInput}>

                <TextInput

                    style={styles.input}
                    placeholder="Twitter"
                    onChangeText={(text) => setTwitter(text)}
                    value={twitter} />
            </View>


            <View style = {styles.sectionLogoEtInput}>

                <TextInput

                    style={styles.input}
                    placeholder="Linkedin"
                    onChangeText={(text) => setLinkedin(text)}
                    value={linkedin} />

            </View>

            <View style = {styles.sectionLogoEtInput}>

                <TextInput

                    style={{ ...styles.input}}
                    placeholder="Facebook"
                    onChangeText={(text) => setFacebook(text)}
                    value={facebook} />

            </View>

            <View style = {styles.sectionLogoEtInput}>

                <TextInput

                    style={{ ...styles.input}}
                    placeholder="Skype"
                    onChangeText={(text) => setSkype(text)}
                    value={skype} />

            </View>

        </View>

    )

}


const styles = StyleSheet.create({


    sectionLogoEtInput : {
        
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'      
    },

    logo : {

        padding : 10,
        /*resizeMode : 'stretch',
        alignItems : 'center',*/
        width: 40, 
        height: 40
    },

    input: {

        height: 50,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius : 7,
        borderColor: "#808080",
        backgroundColor : "#FEFFFF",
        fontSize : 16
    }
    
    
})


export default ChampReseauSociaux