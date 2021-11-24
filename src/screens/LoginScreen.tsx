import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { useState, useEffect, useContext, FC } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {Button, Card, TextInput} from 'react-native-paper';
import { translate } from '../translation/TranslationConfig';
import { tokens } from '../translation/AppStrings';

interface LoginScreenInterface {
    navigation: NativeStackNavigationProp<any, any>,
}

type FirebaseUser = {
    userName: string,
    password: string,
}

const initialUserState: FirebaseUser = {
    userName: 'test@hotmail.com',
    password: '123456',
}

export const LoginScreen: FC<LoginScreenInterface> = ({navigation}) => {

    const [disabled, setDisabled] = useState(false);
    const authContext = useContext(AuthContext)
    const [userState, setUserState] = useState<FirebaseUser>(initialUserState)

    const onInputChange = (field: string, value: any) => {
        setUserState({
            ...userState,
            [field]: value
        })
    }

    useEffect(() => {
        setDisabled(userState.userName.length === 0 || userState.userName.length === 0);
    }, [userState.userName, userState.password])

    return (
        <View style={styles.container}>
            <Card style={styles.card}>

            <TextInput
                mode="outlined"
                label="e-mail"
                defaultValue={userState.userName}
                onChangeText={text => onInputChange("username", text)}
                style={styles.textInput}/>

            <TextInput
                mode="outlined"
                secureTextEntry
                label={translate(tokens.screens.loginScreen.passwordText)}
                defaultValue={userState.password}
                onChangeText={text => onInputChange("password", text)}
                style={styles.textInput}/>

            <Button
                color={disabled ? "gray" : undefined}
                disabled={disabled}
                style={[styles.width80, styles.margin10]}
                onPress={() => {
                    authContext?.login(userState.userName, userState.password)
                }}>{translate(tokens.screens.loginScreen.loginBtnText)}</Button>

            <Button
                style={[styles.width80, styles.margin10]}
                onPress={() => {navigation.navigate('RegisterScreen')}}>{translate(tokens.screens.loginScreen.registerBtnText)}</Button>
            </Card>
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },

    width80: {
        width: '80%'
    },

    margin10: {
        margin: 10,
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

    textInput: {
        marginTop: 10,
    },
})
