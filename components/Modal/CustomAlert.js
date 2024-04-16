import { View } from 'react-native'
import { Button, Dialog, PaperProvider, Portal, Text } from 'react-native-paper'

const CustomAlert = ({ isVisible, onVisible, msg, actionBouton }) => {

    const fermerModal = () => {
        actionBouton()
        onVisible(false)
    }

    return (

        <PaperProvider>
            <View>
                <Portal>
                    <Dialog visible={isVisible} onDismiss={fermerModal} style={{ backgroundColor: "#F8F8FF" }}>
                        <Dialog.Content>
                            <Text variant="bodyMedium">{msg}</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button textColor='#54626F' onPress={fermerModal}>OK</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </PaperProvider>
    )
}

export default CustomAlert