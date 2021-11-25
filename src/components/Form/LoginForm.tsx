import {Formik, FormikErrors} from "formik";
import React, {FC, useContext, useState} from "react";
import {StyleSheet, View} from "react-native";
import { HelperText } from "react-native-paper";
import {Button, Card, TextInput} from "react-native-paper";
import {AuthContext} from "../../contexts/AuthContext";
import {tokens} from "../../translation/AppStrings";
import {translate} from "../../translation/TranslationConfig";
import {isValidEmail, isValidPassword} from "./login-validations";

export interface ILoginFormValues {
    email: string;
    password: string;
}

interface ILoginForm {
    onSignUpPress: () => void,
}

const initialFormValues = {
    email: '',
    password: '',
} as ILoginFormValues

const LoginForm: FC<ILoginForm> = ({onSignUpPress}) => {

    const authContext = useContext(AuthContext);
    const [errors, setHasError] = useState<FormikErrors<ILoginFormValues>>({});

    return (
        <View>
            <Formik
                initialValues={{...initialFormValues}}
                validate={(values) => {

                    let errors: FormikErrors<ILoginFormValues> = {};

                    if (!values.email) {
                        errors.email = translate(tokens.screens.forms.validationFieldRequired);
                    }
                    else if (!isValidEmail(values.email)) {
                        errors.email = translate(tokens.screens.forms.validationEmailInvalid);
                    }
                    if (!values.password) {
                        errors.password = translate(tokens.screens.forms.validationFieldRequired);
                    }
                    else if (!isValidPassword(values.password)) {
                        errors.password = translate(tokens.screens.forms.validationPasswordInvalidLength);
                    }

                    setHasError(errors)
                    return errors;

                }}
                onSubmit={(values) => {
                    if(!errors.email && !errors.password){
                        authContext?.login(values.email, values.password)
                    } else {
                        console.log('INVALID', values)
                    }
                }}
            >
                {({handleChange, handleSubmit, values}) => (
                    <View>
                        <Card style={styles.card}>

                            <TextInput
                                mode="outlined"
                                label="E-mail"
                                onChangeText={handleChange('email')}
                                right={<TextInput.Icon name="account" onPress={() => {
                                }}/>}
                                style={styles.textInput}/>

                            <HelperText type="error">
                                {errors.email}
                            </HelperText>

                            <TextInput
                                mode="outlined"
                                secureTextEntry
                                label={translate(tokens.screens.loginScreen.passwordText)}
                                onChangeText={handleChange('password')}
                                right={<TextInput.Icon name="lock"/>}
                                style={styles.textInput}/>

                            <HelperText type="error">
                                {errors.password}
                            </HelperText>
                        </Card>

                        <View style={styles.buttonRow}>
                            <Button
                                mode={'contained'}
                                color={'#fff'}
                                icon={'draw'}
                                onPress={() => {
                                    onSignUpPress()
                                }}>
                                {translate(tokens.screens.loginScreen.registerBtnText)}
                            </Button>
                            <Button
                                mode={'contained'}
                                icon={'login'}
                                onPress={() => handleSubmit()}>{translate(tokens.screens.loginScreen.loginBtnText)}</Button>
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    );
};

export default LoginForm;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
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
