import React, {FC} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import { TextInput, Button } from '@react-native-material/core';
import NumericInput from 'react-native-numeric-input';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { ShoppingContext } from '../contexts/ShoppingContext';
import {mCreateUUID} from "../../assets/mock-data/mock-functions";
import SelectDropdown from 'react-native-select-dropdown';

const ShoppingEditAddItem: FC = (props: any) => {

    const {shopping: shoppingList, addItem, removeItem} = useContext(ShoppingContext);

    const [descriptionInput, setDescriptionInput] = React.useState('');
    const [itemInputPrice, setItemPrice] = React.useState('');
    const [dropdownItem, setDropdownItem] = React.useState('');
    const [disabledBtn, setDisabledBtn] = useState(false);

    const dropdownItems = ["Food", "Kitchen supplies", "Bathroom supplies", "Extras"]

    useEffect(() => {
        setDisabledBtn(descriptionInput.length === 0 || itemInputPrice.length === 0 ||
            parseInt(itemInputPrice) <= 999 || parseInt(itemInputPrice) >= 2601);
    }, [descriptionInput, itemInputPrice])

    // useEffect(() => {
    //     console.log(props.route.params?.editing)
    //     console.log(props.route.params?.item)
    // })

    //const [nameInput, setNameInput] = React.useState('');

    return (
        <View style={styles.card}>

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
            

            <SelectDropdown
                buttonStyle={styles.dropdown}

	            data={dropdownItems}

	            onSelect={(selectedItem, index) => {
		            console.log(selectedItem, index)
                    setDropdownItem(selectedItem);
	            }}   

	            buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
	            }}

	            rowTextForSelection={(item, index) => {
		            return item
	            }} />
                

            <Button 
                color={disabledBtn ? "gray" : undefined}
                title="ADD ITEM" 
                disabled={disabledBtn}
                style={disabledBtn ? styles.disabeledBtn : styles.defautlBtn} 
                onPress={() => {
                    console.log('log only supposed to work if conditions are fufilled')

                    addItem({
                        id: mCreateUUID(),
                        amount: 150,
                        description: descriptionInput,
                        quantity: 1,
                        title: dropdownItem
                    })             
                }}/>

            <Button 
                title="CANCEL" 
                style={styles.cancelBtn} 
                onPress={() => {
                    console.log('cancel btn always supposed to work')
                    props.navigation.goBack()
                }}/>

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        borderColor: '#000000',
        marginBottom: 10,
        borderWidth: 1
    },

    disabeledBtn: {
        padding: 10,
        borderColor: 'pink',
        marginBottom: 10,
        borderWidth: 1
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
