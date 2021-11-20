import React, {FC, PropsWithChildren} from "react";
import {Button, Dialog, Divider, Portal} from "react-native-paper";
import {Image} from "react-native";

export const FunnyGif: FC<PropsWithChildren<any>> = ({isDisplaying, onPress}) => {
    return (
        <Portal>
            <Dialog visible={isDisplaying} onDismiss={onPress()}>
                <Dialog.Content>
                    <Image
                        style={{width: 300, height: 200}}
                        source={{uri: 'https://media3.giphy.com/media/wWue0rCDOphOE/giphy.gif'}}/>
                </Dialog.Content>
                <Divider/>
                <Dialog.Actions>
                    <Button onPress={onPress()}>Stäng</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}
