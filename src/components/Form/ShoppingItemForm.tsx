import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IShoppingCartItem, ShoppingContext} from '../../contexts/ShoppingContext';
import {mCreateUUID} from "../../../assets/mock-data/mock-functions";
import {Button, Caption, Card, Dialog, Divider, Portal, Provider, RadioButton, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

interface IShoppingForm {
    editing: boolean,
    item?: IShoppingCartItem,
}

const initialState: IShoppingCartItem = {
    id: '',
    title: '',
    description: '',
    amount: 0,
    quantity: 1,
}

const ShoppingItemForm: React.FC<IShoppingForm> = ({editing, item}) => {
    const isEditing = useState(editing);
    const navigation = useNavigation()

    const {shopping: shoppingList, addItem, removeItem, updateItem} = useContext(ShoppingContext);
    const [formValues, setFormValues] = useState<IShoppingCartItem>(item ? item : initialState)

    const [disabledBtn, setDisabledBtn] = useState(false);
    const [hideSaveCancelBtn, setHideSaveCancelBtn] = useState(false);

    const [dialogVisible, setDialogVisible] = useState(false);
    const [saveBtnEnabled, setSaveBtnEnabled] = useState(false);

    const showHideDialog = () => {
        setDialogVisible(!dialogVisible)
    }

    const onFormItemChange = (field: string, value: string) => {
        setFormValues({
            ...formValues,
            [field]: value
        })
    }

    const onSubmit = () => {
        //TODO: validation....
        console.log('Formvalues:::', formValues)
    }

    useEffect(() => {
      console.log('FormVals initial::', formValues)
    })

    // useEffect(() => {
    //     setDisabledBtn(itemDescription?.length === 0 || itemAmount?.length === 0 ||
    //         dropdownItem?.length === 0 || itemAmount <= 999 || parseInt(itemAmount) >= 2601);
    // }, [itemDescription, itemAmount, dropdownItem])


    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Caption>Add item</Caption>

                <TextInput
                    mode="outlined"
                    label="Item Name"
                    defaultValue={formValues.title}
                    onChangeText={text => onFormItemChange("title", text)}
                    style={styles.textInput}/>

                <TextInput
                    mode="outlined"
                    label="Description"
                    defaultValue={formValues.description}
                    onChangeText={text => onFormItemChange("description", text)}
                    style={styles.textInput}/>

                <TextInput
                    mode="outlined"
                    label="$ Price ($1500 - $2600)"
                    defaultValue={formValues.amount.toString()}
                    onChangeText={text => onFormItemChange("amount", text)}
                    style={styles.textInput}
                    keyboardType={"number-pad"}/>

                <Provider>
                    <View>
                        <Button onPress={() => showHideDialog()}
                                icon='form-dropdown'
                                style={styles.dropdownBtn}>Välj en</Button>
                    </View>
                </Provider>

                <Divider style={styles.divider}/>

                <View style={styles.actionButtonsRow}>

                    <Button
                        icon="cancel"
                        mode={'text'}
                        style={styles.actionButtons}
                        // style={visible ? styles.disabeledBtn : styles.defautlBtn}
                        // disabled={dialogVisible}
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >CANCEL</Button>

                    <Button
                        icon="download"
                        mode={'contained'}
                        style={styles.actionButtons}
                        disabled={saveBtnEnabled}
                        // style={disabledBtn || visible ? styles.disabeledBtn : styles.defautlBtn}
                        onPress={() => {
                            console.log('log only supposed to work if conditions are fufilled')

                            addItem({
                                id: mCreateUUID(),
                                amount: formValues.amount,
                                description: formValues.description,
                                quantity: 1,
                                title: formValues.title,
                                type: formValues.type
                            })
                        }}
                    >SAVE</Button>

                </View>
            </Card>

            <Portal>
                <Dialog visible={dialogVisible} onDismiss={() => showHideDialog()}>
                    <Dialog.Content>

                        {/*<RadioButton.Group*/}
                        {/*    onValueChange={newValue => onFormItemChange("type", newValue)}>*/}

                        {/*    <View style={styles.container}>*/}
                        {/*        <Text>First</Text>*/}
                        {/*        <RadioButton value="first"/>*/}
                        {/*    </View>*/}

                        {/*    <View style={styles.container}>*/}
                        {/*        <Text>Second</Text>*/}
                        {/*        <RadioButton value="second"/>*/}
                        {/*    </View>*/}

                        {/*</RadioButton.Group>*/}

                    </Dialog.Content>

                    <Dialog.Actions style={styles.buttonRow}>
                        <Button onPress={() => showHideDialog()}>CANCEL</Button>
                        <Button onPress={() => {

                            showHideDialog()
                        }}>OK</Button>
                    </Dialog.Actions>

                </Dialog>
            </Portal>

        </View>
    );
}

export default ShoppingItemForm;


const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    actionButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    actionButtons: {
        width: '45%',
    },
    divider: {
        // marginTop: 15,
        // paddingTop: 15,
        backgroundColor: '#000000'
    },
    itemTitle: {
        fontWeight: "600",
    },
    dropdownBtn: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'flex-start'
    },
    buttonRow: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'flex-end',
        padding: 10,
        marginBottom: 10,
    },
    saveCancelBtn: {
        padding: 10,
        marginBottom: 10,
    },
    itemContainer: {
        marginTop: 10,
        height: 150,
    },
    card: {
        flexDirection: 'column',
        // marginBottom: 10,
        height: 400,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    text: {
        backgroundColor: 'blue'
    },
    textInput: {
        marginTop: 10,
    },
    defautlBtn: {},
    disabeledBtn: {},
    cancelBtn: {},
    dropdown: {
        padding: 10,
        backgroundColor: 'gray',
        borderColor: '#000000',
        marginBottom: 10,
    },
})

