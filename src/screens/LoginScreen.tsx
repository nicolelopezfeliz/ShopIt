import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { useState, useEffect, useContext, FC } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {Button, Card, TextInput} from 'react-native-paper';

interface LoginScreenInterface {
    navigation: NativeStackNavigationProp<any, any>,
}

export const LoginScreen: FC<LoginScreenInterface> = ({navigation}) => {

    const [disabled, setDisabled] = useState(false);
    const [username, setUsername] = useState("test@hotmail.com")
    const [password, setPassword] = useState("123456")
    const [loginState, setLoginState] = useState(false)
    const [loginSuccsess, setLoginSuccsess] = useState(true)

    const authContext = useContext(AuthContext)

    useEffect(() => {
        setDisabled(username.length === 0 || password.length === 0);
    }, [username, password])

    useEffect(() => {
        if (loginState) {
            {navigation.navigate('ShoppingList')}
        } else {
            setLoginSuccsess(false);
            if(loginSuccsess == false){
                //alert("Wrong username/password");
            }
        }
    },[loginState])

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
            <TextInput
                mode="outlined"
                label="e-mail"
                defaultValue={username}
                onChangeText={setUsername}
                style={styles.textInput}/>
            <TextInput
                mode="outlined"
                secureTextEntry
                label="Password"
                defaultValue={password}
                onChangeText={setPassword}
                style={styles.textInput}/>

            <Button
                color={disabled ? "gray" : undefined}
                disabled={disabled}
                style={[styles.width80, styles.margin10]}
                onPress={() => {
                    authContext?.login( username, password, setLoginState)
                }}>Login</Button>

            <Button
                style={[styles.width80, styles.margin10]}
                onPress={() => {navigation.navigate('RegisterScreen')}}>Register</Button>
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
