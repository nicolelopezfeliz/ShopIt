import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IShoppingCartItem, ShoppingContext, ShoppingItemType} from '../../contexts/ShoppingContext';
import {mCreateUUID} from "../../../assets/mock-data/mock-functions";
import {Button, Card, Dialog, HelperText, Portal, RadioButton, TextInput, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Validator, {IShoppingValidator, shoppingValidatorInitialState} from './shopping-validator'
import { translate } from '../../translation/TranslationConfig';
import { tokens } from '../../translation/AppStrings';

interface IShoppingForm {
    editing: boolean,
    item?: IShoppingCartItem,
}

interface IErrorHandler {
    title: {
        type: string,
        error: boolean,
        message: string,
    }
}

const initialState: IShoppingCartItem = {
    id: '',
    title: '',
    description: '',
    amount: 0,
    quantity: 1,
    type: ShoppingItemType.peripheral
}

const ShoppingItemForm: React.FC<IShoppingForm> = ({editing, item}) => {

    const isEditing = editing
    const navigation = useNavigation();
    const theme = useTheme();
    const {styles} = useThemedStyles();
    const validator = new Validator();
    const {shopping: shoppingList, addItem, removeItem, updateItem} = useContext(ShoppingContext);

    const [oldItem] = useState<IShoppingCartItem>(item ? item : initialState);
    const [formValues, setFormValues] = useState<IShoppingCartItem>(item ? item : initialState);
    const [errors, setError] = useState<IShoppingValidator>(shoppingValidatorInitialState);

    const [disabledBtn, setDisabledBtn] = useState(false);
    const [hideSaveCancelBtn, setHideSaveCancelBtn] = useState(false);

    const [dialogVisible, setDialogVisible] = useState(false);
    // const [saveBtnEnabled, setSaveBtnEnabled] = useState(isEditing ? true : true);

    const showHideDialog = () => {
        setDialogVisible(!dialogVisible)
    }

    const onFormItemChange = (field: string, value: any) => {
        setFormValues({
            ...formValues,
            [field]: value
        })
    }

    const onSubmit = () => {
        const isValidFormInput = validator.validateFields(formValues)
        setError(isValidFormInput)

        if (isValidFormInput.formValid) {
            if (isEditing) {
                updateItem(oldItem, {
                    ...oldItem,
                    amount: formValues.amount,
                    description: formValues.description,
                    title: formValues.title,
                    type: formValues.type
                })
            } else {
                const titleExists = shoppingList?.find((x) => x.title === formValues.title)
                if (!titleExists) {
                    addItem({
                        id: mCreateUUID(),
                        amount: formValues.amount,
                        description: formValues.description,
                        quantity: 1,
                        title: formValues.title,
                        type: formValues.type
                    })
                } else {
                    setError({
                        ...errors,
                        name: false
                    })
                }
            }
            navigation.goBack();
        }
    }

    return (
        <View style={styles.container}>
            <Card style={styles.card}>

                <TextInput
                    mode="outlined"
                    label={translate(tokens.screens.shoppingItemForm.productNameText)}
                    placeholder={translate(tokens.screens.shoppingItemForm.placeholderProductNameText)}
                    defaultValue={formValues.title}
                    right={<TextInput.Icon name="label-outline" onPress={() => {
                    }}/>}
                    onChangeText={text => onFormItemChange("title", text)}
                    style={styles.textInput}/>


                <HelperText type="error" visible={!errors.name}>
                    {translate(tokens.screens.shoppingItemForm.validationNameInvalid)}
                </HelperText>

                <TextInput
                    mode="outlined"
                    label={translate(tokens.screens.shoppingItemForm.productDescriptionLabelText)}
                    placeholder={translate(tokens.screens.shoppingItemForm.productDescriptionPlaceholder)}
                    defaultValue={formValues.description}
                    right={<TextInput.Icon name="script-outline" onPress={() => {
                    }}/>}
                    onChangeText={text => onFormItemChange("description", text)}
                    style={styles.textInput}/>

                <HelperText type="error" visible={!errors.description}>
                    {translate(tokens.screens.shoppingItemForm.validationDescriptionInvalid)}
                </HelperText>

                <Button
                    style={styles.button}
                    mode={'contained'}
                    onPress={() => showHideDialog()}
                    icon='form-dropdown'
                >
                    Choose a type
                </Button>

                {
                    formValues?.type === ShoppingItemType.peripheral ?
                        <TextInput
                            mode="outlined"
                            label="Amount - Peripheral"
                            placeholder={'Enter amount above 0'}
                            // label={`Amount ${translate(tokens.screens.shoppingItemForm.peripheralDropdownLabelText)}`}
                            // placeholder={translate(tokens.screens.shoppingItemForm.peripheralDropdownPlaceholderPriceText)}
                            defaultValue={formValues.amount.toString()}
                            onChangeText={text => onFormItemChange("amount", Number(text))}
                            style={styles.textInput}
                            maxLength={4}
                            right={<TextInput.Icon name="currency-usd" onPress={() => {
                            }}/>}
                            keyboardType={"number-pad"}/>
                        :
                        <TextInput
                            mode="outlined"
                            label="Amount - Integrated"
                            placeholder={'Enter amount between $1500 - $2600'}
                            // label={translate(tokens.screens.shoppingItemForm.peripheralDropdownLabelText)}
                            // placeholder={translate(tokens.screens.shoppingItemForm.peripheralDropdownPlaceholderPriceText)}
                            defaultValue={formValues.amount.toString()}
                            onChangeText={text => onFormItemChange("amount", Number(text))}
                            style={styles.textInput}
                            right={<TextInput.Icon name="currency-usd" onPress={() => {
                            }}/>}
                            keyboardType={"number-pad"}/>
                }

                <HelperText type="error" visible={!errors.amount}>
                    {translate(tokens.screens.shoppingItemForm.validationAmountInvalid)}
                </HelperText>


            </Card>

            <View style={styles.actionButtonsRow}>

                <Button
                    icon="cancel"
                    mode={'text'}
                    style={styles.actionButtons}
                    onPress={() => {
                        navigation.goBack()
                    }}
                >{translate(tokens.screens.shoppingItemForm.cancelBtnText)}</Button>

                <Button
                    icon="download"
                    mode={'contained'}
                    style={styles.actionButtons}
                    onPress={() => {
                        onSubmit()
                    }}
                >{!isEditing ? translate(tokens.screens.shoppingItemForm.saveBtnText) : translate(tokens.screens.shoppingItemForm.update)}</Button>

            </View>

            <Portal>
                <Dialog visible={dialogVisible} onDismiss={() => showHideDialog()}>
                    <Dialog.Content>

                        <RadioButton.Group
                            onValueChange={newValue => {
                                onFormItemChange("type", newValue.toString())
                                console.log(newValue)
                            }}
                            value={formValues?.type}>

                            <RadioButton.Item color={theme.colors.primary} label="Peripheral" value={ShoppingItemType.peripheral}/>
                            <RadioButton.Item color={theme.colors.primary} label="Integrated" value={ShoppingItemType.integrated}/>

                            {/*<RadioButton.Item color={theme.colors.primary} label={translate(tokens.screens.shoppingItemForm.peripheralBtnText)} value={ShoppingItemType.peripheral}/>*/}
                            {/*<RadioButton.Item color={theme.colors.primary} label={translate(tokens.screens.shoppingItemForm.integratedBtnText)} value={ShoppingItemType.integrated}/>*/}

                        </RadioButton.Group>

                    </Dialog.Content>

                    <Dialog.Actions>
                        <Button onPress={() => showHideDialog()}>{translate(tokens.screens.shoppingItemForm.cancelBtnText)}</Button>
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

const useThemedStyles = () => {
    const theme = useTheme();
    return {
        styles: StyleSheet.create({
            container: {
                padding: 15,
            },
            card: {
                flexDirection: 'column',
                marginBottom: 10,
                padding: 20,
            },
            actionButtonsRow: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
            },
            actionButtons: {
                width: '45%',
            },
            itemTitle: {
                fontWeight: "600",
            },
            radioButton: {
                color: theme.colors.primary
            },
            button: {
                marginTop: 10,
            },
            saveCancelBtn: {
                padding: 10,
                marginBottom: 10,
            },
            itemContainer: {
                marginTop: 10,
                height: 150,
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
        }),
    };
};
