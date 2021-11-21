import React, {FC} from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';
import { TextInput } from '@react-native-material/core';
import NumericInput from 'react-native-numeric-input';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { ShoppingContext } from '../contexts/ShoppingContext';
import {mCreateUUID} from "../../assets/mock-data/mock-functions";
import SelectDropdown from 'react-native-select-dropdown';
import { IconButton, Paragraph, Dialog, Portal, Provider, Button, RadioButton, Card, Divider } from 'react-native-paper';

const ShoppingEditAddItem: FC = (props: any) => {

    const {shopping: shoppingList, addItem, removeItem} = useContext(ShoppingContext);

    const [descriptionInput, setDescriptionInput] = React.useState('');
    const [itemInputPrice, setItemPrice] = React.useState('');
    const [dropdownItem, setDropdownItem] = React.useState('second');
    const [disabledBtn, setDisabledBtn] = useState(false);
    const [hideSaveCancelBtn, setHideSaveCancelBtn] = useState(false);

    const dropdownItems = ["Food", "Kitchen supplies", "Bathroom supplies", "Extras"]

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);
  
    const hideDialog = () => setVisible(false);

    useEffect(() => {
        setDisabledBtn(descriptionInput.length === 0 || itemInputPrice.length === 0 ||
            dropdownItem.length === 0 || parseInt(itemInputPrice) <= 999 || parseInt(itemInputPrice) >= 2601);
    }, [descriptionInput, itemInputPrice, dropdownItem])

    // useEffect(() => {
    //     console.log(props.route.params?.editing)
    //     console.log(props.route.params?.item)
    // })

    //const [nameInput, setNameInput] = React.useState('');

    return (
        <View style={styles.card}>

            <Card style={styles.card}>
            <Text style={styles.itemTitle}> Add item </Text>
            
            <Divider/>

            <TextInput 
                variant="outlined"
                label="Item Name" 
                onChangeText={text => setDescriptionInput(text)}
                style={styles.textInput}/>

            <TextInput
                variant="outlined"
                label="$ Price ($1500 - $2600)" 
                onChangeText={text => setItemPrice(text)}
                style={styles.textInput}
                keyboardType={"number-pad"}/>

            <Provider>
                <View>
                    <Button onPress={showDialog} 
                        icon='form-dropdown' 
                        style={styles.dropdownBtn}>Välj en</Button>

                    <Portal>
                        <Dialog visible={visible} onDismiss={hideDialog}>
                            <Dialog.Content>

                            <RadioButton.Group onValueChange={newValue => setDropdownItem(newValue)} value={dropdownItem}>

                                <View style={styles.container}>
                                    <Text>First</Text>
                                    <RadioButton value="first" />
                                </View>
                                
                                <View style={styles.container}>
                                    <Text>Second</Text>
                                    <RadioButton value="second" />
                                </View>

                            </RadioButton.Group>
                                
                            </Dialog.Content>

                            <Dialog.Actions style={styles.buttonRow}>

                                <Button onPress={() => {console.log('nu får vi se om det klickas')}}>CANCEL</Button>
                                <Button onPress={() => {hideDialog}}>OK</Button>

                            </Dialog.Actions>

                        </Dialog>
                    </Portal>
                </View>
            </Provider>

            <Divider/>

            <View style={styles.container}>
                <Button 
                style={disabledBtn || visible ? styles.disabeledBtn : styles.defautlBtn} 
                disabled={disabledBtn}
                icon="download" 
                onPress={() => {
                    console.log('log only supposed to work if conditions are fufilled')

                    addItem({
                        id: mCreateUUID(),
                        amount: 150,
                        description: descriptionInput,
                        quantity: 1,
                        title: dropdownItem
                    })             
                }}
                >SAVE</Button>

                <Button 
                icon="cancel"
                style={visible ? styles.disabeledBtn : styles.defautlBtn}
                disabled={visible}
                onPress={() => {
                    console.log('cancel btn always supposed to work')
                    props.navigation.goBack()
                }}
                 >CANCEL</Button>
            </View>
            </Card>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        height: '60%',
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-between'
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
        marginBottom: 10,
        height: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },

    text: {
        backgroundColor: 'blue'
    },
    textInput: {
        padding: 10,
        borderColor: '#000000',
        marginBottom: 10,
    },

    defautlBtn: {
        padding: 10,
        marginBottom: 10,
    },

    disabeledBtn: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        opacity: 0
    },
    cancelBtn: {
        padding: 10,
        backgroundColor: '#000000',
        marginBottom: 10,
        borderWidth: 1
    },

    dropdown: {
        padding: 10,
        backgroundColor: 'gray',
        borderColor: '#000000',
        marginBottom: 10,
    },
})

export default ShoppingEditAddItem;
