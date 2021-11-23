import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { TextInput} from '@react-native-material/core';
import { useEffect, useContext, useState, FC } from 'react';
import {Button} from 'react-native-paper';

import { AuthContext } from '../contexts/AuthContext';
import { translate } from '../translation/TranslationConfig';
import { tokens } from '../translation/AppStrings';

export const RegisterScreen: FC = (props: any) => {
    const [disabled, setDisabled] = useState(false);
    const [loginState, setLoginState] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const authContext = useContext(AuthContext);

    useEffect(() => {
        setDisabled(
            firstName.length === 0 || 
            lastName.length === 0 || 
            userName.length === 0 || 
            password.length === 0 || 
            repeatPassword.length === 0 || 
            password !== repeatPassword);
    }, [
        firstName,
        lastName,
        userName,
        password,
        repeatPassword
    ])

    useEffect(() => {
        if (loginState) {
            {props.navigate('ShoppingList')}
        } else {
            alert('oopsie!');
        }
    },[loginState])

    return (
        <View style={styles.container}>
            <TextInput variant="outlined" label={translate(tokens.screens.registerScreen.firstNameText)} style={[styles.width80, styles.margin10]} onChangeText={setFirstName}/>
            <TextInput variant="outlined" label={translate(tokens.screens.registerScreen.lastNameText)} style={[styles.width80, styles.margin10]} onChangeText={setLastName}/>
            <TextInput  variant="outlined"label="e-mail" style={[styles.width80, styles.margin10]} onChangeText={setUsername}/>

            <TextInput 
                secureTextEntry
                label={translate(tokens.screens.registerScreen.passwordText)}
                style={[styles.width80, styles.margin10]}
                onChangeText={setPassword}
                />

            <TextInput 
                secureTextEntry
                label={translate(tokens.screens.registerScreen.repeatPasswordText)}
                style={[styles.width80, styles.margin10]}
                onChangeText={setRepeatPassword}
                />

            <Button 
                color={disabled ? "gray" : undefined}
                disabled={disabled}
                style={[styles.width80, styles.margin10]} 
                onPress={async () => {
                    await authContext?.register(firstName, lastName, userName, password);
                    authContext?.login( userName, password, setLoginState) 
                }}>{translate(tokens.screens.loginScreen.loginBtnText)}</Button>
        </View>
    )
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center'
    },

    width80: {
        width: '80%'
    },

    margin10: {
        margin: 10,
    }
})