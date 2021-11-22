import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { TextInput, Button } from '@react-native-material/core';
import { useState, useEffect, useContext, FC } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {NativeStackNavigationProp} from "react-native-screens/native-stack";

interface LoginScreenInterface {
    navigation: NativeStackNavigationProp<any, any>,
}

export const LoginScreen: FC<LoginScreenInterface> = ({navigation}) => {

    const [disabled, setDisabled] = useState(false);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginState, setLoginState] = useState(false)

    const authContext = useContext(AuthContext)

    useEffect(() => {
        setDisabled(username.length === 0 || password.length === 0);
    }, [username, password])

    useEffect(() => {
        if (loginState) {
            {navigation.navigate('ShoppingList')}
        } else {
            alert("Wrong username/password")
        }
    },[loginState])

    return (
        <View style={styles.container}>
            <TextInput 
                variant="outlined"
                label="e-mail" 
                onChangeText={setUsername}
                style={[styles.width80, styles.margin10]}/>
            <TextInput 
                variant="outlined"
                secureTextEntry
                label="Password" 
                onChangeText={setPassword}
                style={[styles.width80, styles.margin10]}/>
            <Button 
                color={disabled ? "gray" : undefined}
                title="Login" 
                disabled={disabled}
                style={[styles.width80, styles.margin10]} 
                onPress={() => {
                    authContext?.login( username, password, setLoginState)

                    
                }}/>
            <Button 
                title="Register" 
                style={[styles.width80, styles.margin10]} 
                onPress={() => {navigation.navigate('RegisterScreen')}}/>
        </View>
    )
}

export default LoginScreen;

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