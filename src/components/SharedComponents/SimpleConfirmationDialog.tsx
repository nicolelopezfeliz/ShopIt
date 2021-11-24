import React, { FC } from "react";
import { Dialog } from "react-native-paper";
import { Portal, Paragraph, Button } from "react-native-paper";

interface ISimpleConfirmationDialog {
    visible: boolean,
    showHideDialog: () => void,
    onPress: () => void,
}


export const SimpleConfirmationDialog: FC<ISimpleConfirmationDialog> = ({visible, showHideDialog, onPress}) => {

    return(
        <Portal>
            <Dialog visible={visible} onDismiss={() => showHideDialog()}>
                <Dialog.Title>{'Delete item'}</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>{'Are you sure you want to delete the selected item?'}</Paragraph>
                </Dialog.Content>

                <Dialog.Actions>
                    <Button onPress={() => {showHideDialog()}}>Cancel</Button>
                    <Button onPress={() => {
                        onPress()
                    }}>{"Yes"}</Button>

                </Dialog.Actions>

            </Dialog>
        </Portal>
    );
};
