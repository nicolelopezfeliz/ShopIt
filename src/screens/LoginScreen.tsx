import React, {FC, useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {Button, Card, TextInput} from 'react-native-paper';
import {translate} from '../translation/TranslationConfig';
import {tokens} from '../translation/AppStrings';

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
                    label="E-mail"
                    defaultValue={userState.userName}
                    onChangeText={text => onInputChange("username", text)}
                    right={<TextInput.Icon name="account" onPress={() => {
                    }}/>}
                    style={styles.textInput}/>

                <TextInput
                    mode="outlined"
                    secureTextEntry
                    label={translate(tokens.screens.loginScreen.passwordText)}
                    defaultValue={userState.password}
                    right={<TextInput.Icon name="lock"/>}
                    onChangeText={text => onInputChange("password", text)}
                    style={styles.textInput}/>
            </Card>

            <View style={styles.buttonRow}>
                <Button
                    mode={'contained'}
                    color={'#fff'}
                    icon={'draw'}
                    onPress={() => {
                        navigation.navigate('RegisterScreen')
                    }}>
                    {translate(tokens.screens.loginScreen.registerBtnText)}
                </Button>

                <Button
                    color={disabled ? "gray" : undefined}
                    disabled={disabled}
                    mode={'contained'}
                    icon={'login'}
                    onPress={() => {
                        authContext?.login(userState.userName, userState.password)
                    }}>{translate(tokens.screens.loginScreen.loginBtnText)}</Button>
            </View>
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        height: 400,
        marginTop: 15,
    },
    card: {
        flexDirection: 'column',
        // marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
    textInput: {
        marginTop: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 25,
        justifyContent: 'space-evenly'
    },
})
