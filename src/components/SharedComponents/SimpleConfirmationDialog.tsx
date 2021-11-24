import React, { FC } from "react";
import { Dialog } from "react-native-paper";
import { Portal, Paragraph, Button } from "react-native-paper";
import {translate} from '../../translation/TranslationConfig';
import {tokens} from '../../translation/AppStrings';

interface ISimpleConfirmationDialog {
    visible: boolean,
    showHideDialog: () => void,
    onPress: () => void,
    text: {
        title: string,
        paragraph: string,
    }
}


export const SimpleConfirmationDialog: FC<ISimpleConfirmationDialog> = ({visible, showHideDialog, onPress, text}) => {

    return(
        <Portal>
            <Dialog visible={visible} onDismiss={() => showHideDialog()}>
                <Dialog.Title>{text.title}</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>{text.paragraph}</Paragraph>
                </Dialog.Content>

                <Dialog.Actions>
                    <Button onPress={() => {showHideDialog()}}>{translate(tokens.screens.general.abort)}</Button>
                    <Button onPress={() => {
                        onPress()
                    }}>{translate(tokens.screens.general.yes)}</Button>

                </Dialog.Actions>

            </Dialog>
        </Portal>
    );
};
