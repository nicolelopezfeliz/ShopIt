import React, {FC, useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ShoppingContext} from '../contexts/ShoppingContext';
import {mCreateUUID} from "../../assets/mock-data/mock-functions";
import {Button, Paragraph, TextInput} from "react-native-paper";

const ShoppingEditAddItem: FC = (props: any) => {

    const {shopping: shoppingList, addItem, removeItem} = useContext(ShoppingContext);

    const [productName, setProductName] = React.useState(props.route.params?.editing ? props.route.params?.item?.title : null);
    const [description, setDescription] = React.useState(props.route.params?.editing ? props.route.params?.item?.description : null);
    const [amount, setAmount] = React.useState(props.route.params?.editing ? props.route.params?.item?.amount.toString() : null);
    const [dropdownItem, setDropdownItem] = React.useState('');
    const [disabledBtn, setDisabledBtn] = useState(props.route.params?.editing ? false : true);

    const dropdownItems = ["Food", "Kitchen supplies", "Bathroom supplies", "Extras"]

    // useEffect(() => {
    //     setDisabledBtn(description?.length === 0 || amount?.lengh === 0 ||
    //         parseInt(amount) <= 999 || parseInt(amount) >= 2601);
    // }, [description, amount])

    useEffect(() => {
        console.log(amount)
        // console.log(props.route.params?.editing)
        // console.log(props.route.params?.item?.amount)
    })

    return (
        <View style={styles.container}>

            <TextInput
                label="Product name"
                placeholder={'Enter new product name'}
                mode={'outlined'}
                style={styles.inputBase}
                value={productName}
                right={<TextInput.Icon name="label-outline" onPress={() => {
                }}/>}
                onChangeText={text => setProductName(text)}
            />

            <TextInput
                label="Description"
                placeholder={'Enter product-description'}
                mode={'outlined'}
                style={styles.inputBase}
                value={description}
                right={<TextInput.Icon name="script-outline" onPress={() => {
                }}/>}
                onChangeText={text => setDescription(text)}
            />

            <Paragraph style={styles.picker}>Add picker here</Paragraph>
            {/*<SelectDropdown*/}
            {/*    buttonStyle={styles.dropdown}*/}

            {/*    data={dropdownItems}*/}

            {/*    onSelect={(selectedItem, index) => {*/}
            {/*        console.log(selectedItem, index)*/}
            {/*        setDropdownItem(selectedItem);*/}
            {/*    }}*/}

            {/*    buttonTextAfterSelection={(selectedItem, index) => {*/}
            {/*        return selectedItem*/}
            {/*    }}*/}

            {/*    rowTextForSelection={(item, index) => {*/}
            {/*        return item*/}
            {/*    }} />*/}

            <TextInput
                label="Price"
                mode={'outlined'}
                placeholder={'Enter amount between $1500 - $2600'}
                style={styles.inputBase}
                // defaultValue={props.route.params?.editing ? props.route.params?.item?.amount.toString(): null}
                keyboardType='number-pad'
                value={amount}
                right={<TextInput.Icon name="currency-usd" onPress={() => {
                }}/>}
                onChangeText={(text) => {
                    const numreg = /[^0-9]/g;
                    if (numreg.test(text)) {
                        setAmount(text.replace(/[^0-9]/g, ''))
                    } else {
                        setAmount(text)
                    }
                }}
            />

            <View style={styles.buttonsContainer}>
                <Button
                    icon="download"
                    mode="outlined"
                    disabled={disabledBtn}
                    style={disabledBtn ? styles.btnDisabled : styles.btnEnabled}
                    onPress={() => {
                        console.log('log only supposed to work if conditions are fufilled')

                        addItem({
                            id: mCreateUUID(),
                            amount: amount,
                            description: description,
                            quantity: 1,
                            title: dropdownItem
                        })
                    }
                    }>
                    {props.route.params?.editing ? 'Save changes' : 'Add item'}
                </Button>

                <Button
                    mode="contained"
                    style={styles.cancelBtn}
                    onPress={() => {
                        console.log('cancel btn always supposed to work')
                        props.navigation.goBack()
                    }}>
                    Cancel
                </Button>

            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    buttonsContainer: {
        marginTop: 50,
    },
    card: {
        marginBottom: 10,
        height: 250,
    },
    text: {
        backgroundColor: 'blue'
    },
    inputBase: {
        marginTop: 10,
    },
    btnEnabled: {
        padding: 10,
        marginTop: 10,
    },
    btnDisabled: {
        marginTop: 10,
    },
    cancelBtn: {
        backgroundColor: 'lightgray',
        marginTop: 10,
    },
    picker: {
        fontSize: 22,
        color: 'red',
        padding: 15,
    },
    dropdown: {
        padding: 10,
        backgroundColor: 'gray',
        borderColor: '#000000',
        marginBottom: 10,
    },
})

export default ShoppingEditAddItem;
