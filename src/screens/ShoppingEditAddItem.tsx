import React, {FC, useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {mCreateUUID} from "../../assets/mock-data/mock-functions";
import {Button, Caption, Card, Dialog, Divider, Portal, Provider, RadioButton, TextInput} from 'react-native-paper';

import {ShoppingContext} from '../contexts/ShoppingContext';


const ShoppingEditAddItem: FC = (props: any) => {

    const isEditing = useState(props?.route?.params?.editing);

    const {shopping: shoppingList, addItem, removeItem, updateItem} = useContext(ShoppingContext);

    const [itemTitle, setItemTitle] = useState(isEditing ? props?.route?.params?.item?.title : null);
    const [itemDescription, setItemDescription] = useState(isEditing ? props.route.params?.item?.description : null);
    const [itemAmount, setItemAmount] = useState(isEditing ? props.route.params?.item?.amount.toString() : null);
    const [dropdownItem, setDropdownItem] = useState('second');
    const [disabledBtn, setDisabledBtn] = useState(false);
    const [hideSaveCancelBtn, setHideSaveCancelBtn] = useState(false);

    const dropdownItems = ["Food", "Kitchen supplies", "Bathroom supplies", "Extras"]

    const [dialogVisible, setDialogVisible] = useState(false);
    const [saveBtnEnabled, setSaveBtnEnabled] = useState(false);

    const showHideDialog = () => {
        setDialogVisible(!dialogVisible)
    }

    useEffect(() => {
        setDisabledBtn(itemDescription?.length === 0 || itemAmount?.length === 0 ||
            dropdownItem?.length === 0 || parseInt(itemAmount) <= 999 || parseInt(itemAmount) >= 2601);
    }, [itemDescription, itemAmount, dropdownItem])

    // useEffect(() => {
    //     console.log(props.route.params?.editing)
    //     console.log(props.route.params?.item)
    // })

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Caption>Add item</Caption>

                <TextInput
                    mode="outlined"
                    label="Item Name"
                    defaultValue={itemTitle}
                    onChangeText={text => setItemDescription(text)}
                    style={styles.textInput}/>


                <TextInput
                    mode="outlined"
                    label="$ Price ($1500 - $2600)"
                    defaultValue={itemAmount}
                    onChangeText={text => setItemAmount(text)}
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
                        // mode={'outlined'}
                        // style={visible ? styles.disabeledBtn : styles.defautlBtn}
                        // disabled={dialogVisible}
                        onPress={() => {
                            console.log('cancel btn always supposed to work')
                            props.navigation.goBack()
                        }}
                    >CANCEL</Button>

                    <Button
                        icon="download"
                        // color={disabledBtn ? "gray" : undefined}
                        disabled={saveBtnEnabled}
                        // style={disabledBtn || visible ? styles.disabeledBtn : styles.defautlBtn}
                        onPress={() => {
                            console.log('log only supposed to work if conditions are fufilled')

                            addItem({
                                id: mCreateUUID(),
                                amount: 150,
                                description: itemDescription,
                                quantity: 1,
                                title: dropdownItem
                            })
                        }}
                    >SAVE</Button>

                </View>
            </Card>

            <Portal>
                <Dialog visible={dialogVisible} onDismiss={() => showHideDialog()}>
                    <Dialog.Content>

                        <RadioButton.Group onValueChange={newValue => setDropdownItem(newValue)} value={dropdownItem}>

                            <View style={styles.container}>
                                <Text>First</Text>
                                <RadioButton value="first"/>
                            </View>

                            <View style={styles.container}>
                                <Text>Second</Text>
                                <RadioButton value="second"/>
                            </View>

                        </RadioButton.Group>

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

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    actionButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
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

export default ShoppingEditAddItem;
