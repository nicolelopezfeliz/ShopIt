import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { TextInput, Button } from '@react-native-material/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackScreens } from '../helpers/types';
import { useEffect, useContext, useState, FC } from 'react';

import { AuthContext } from '../contexts/AuthContext';

export const RegisterScreen: FC = (props: any) => {
    const [disabled, setDisabled] = useState(false);

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

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

    return (
        <View style={styles.container}>
            <TextInput variant="outlined" label="First name" style={[styles.width80, styles.margin10]} onChangeText={setFirstName}/>
            <TextInput variant="outlined" label="Last Name" style={[styles.width80, styles.margin10]} onChangeText={setLastName}/>
            <TextInput  variant="outlined"label="e-mail" style={[styles.width80, styles.margin10]} onChangeText={setUsername}/>

            <TextInput 
                secureTextEntry
                label="Password" 
                style={[styles.width80, styles.margin10]}
                onChangeText={setPassword}
                />

            <TextInput 
                secureTextEntry
                label="Repeat Password" 
                style={[styles.width80, styles.margin10]}
                onChangeText={setRepeatPassword}
                />

            <Button 
                color={disabled ? "gray" : undefined}
                disabled={disabled}
                title="Register" 
                style={[styles.width80, styles.margin10]} 
                onPress={async () => {
                    await authContext?.register(firstName, lastName, userName, password);
                    props.navigation.goBack()
                }}/>
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