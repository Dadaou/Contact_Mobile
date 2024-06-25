import { View } from 'react-native'
import { Button, Dialog, Portal, Text } from 'react-native-paper'

const CustomAlert = ({ isVisible, onVisible, msg, actionBouton, typeAlerte = "Confirmation" }) => {

    const annulerAction = () => {
        onVisible(false)
    }

    const procederAction = () => {
        actionBouton()
        onVisible(false)
    }

    return (


        <View>
            <Portal>
                <Dialog visible={isVisible} onDismiss={annulerAction} style={{ backgroundColor: "#F8F8FF" }}>
                    <Dialog.Content>
                        <Text variant="bodyMedium">{msg}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        {typeAlerte === "Confirmation" ? (
                            <>
                                <Button textColor="#54626F" onPress={procederAction}>OUI</Button>
                                <Button textColor="#54626F" onPress={annulerAction}>NON</Button>
                            </>
                        ) : (
                            <Button textColor="#54626F" onPress={annulerAction}>OK</Button>
                        )}
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>

    )
}

export default CustomAlert