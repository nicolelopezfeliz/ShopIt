import React, {FC, useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import LoginForm, {ILoginFormValues} from '../components/Form/LoginForm';

interface LoginScreenInterface {
    navigation: NativeStackNavigationProp<any, any>,
}

export const LoginScreen: FC<LoginScreenInterface> = ({navigation}) => {

    const [disabled, setDisabled] = useState(false);

    const onSignUpPress = () => {
        navigation.navigate('RegisterScreen')
    }

    return (
        <View style={styles.container}>
            <LoginForm onSignUpPress={onSignUpPress}/>
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
