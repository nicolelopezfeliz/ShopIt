import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, {createContext, FC, useEffect } from 'react';
import { useState } from 'react';
import {fbInit, logInToFirebase, registerUserFirebase, signOutUser } from '../services/FirebaseServices';

interface IAuthContext {
    isUserSignedIn: boolean;
    register: (displayName: string, username: string, password: string) => void;
    login: (username: string, password: string) => void;
    logOut: () => void,
}

export const AuthContext = createContext<IAuthContext | undefined> (undefined);

export const AuthContextProvider: FC = (props) => {

    const [isUserSignedIn, setIsUserSignedIn] = useState(false);

    useEffect(() => {
        fbInit();
    })

    const login = async (userName: string, password: string) => {
        // console.log('Trying sign in...', userName, password)
        const userCredentials = await logInToFirebase(userName, password)

        if (userCredentials) {
            if(userCredentials.user) {
                // console.log('Successful signin.', userCredentials.user)
                setIsUserSignedIn(true);
            }
        } else {
            alert("Wrong username/password")
            // loginState(false)
        }
    }

    const register = async (displayName: string, username: string, password: string) => {
        await registerUserFirebase(displayName, username, password);
    }

    const logOut = async () => {
        const signOut = await signOutUser()
        console.log('signout', signOut)
        setIsUserSignedIn(false);
    }

    return(
        <AuthContext.Provider value={{isUserSignedIn, register, login, logOut}}>
            {props.children}
        </AuthContext.Provider>
    );
}
