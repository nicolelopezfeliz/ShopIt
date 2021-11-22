import React from 'react';
import { useState } from 'react';
import { logInToFirebase, registerUserFirebase } from '../services/FirebaseServices';


interface IAuthContext {
    isUserSignedIn: boolean;
    register: (firstName: string, lastname: string, username: string, password: string) => void;
    login: (username: string, password: string, loginState: any) => void;
    logOut: () => void
}

export const AuthContext = React.createContext<IAuthContext | undefined> (undefined);

export const AuthContextProvider: React.FC = (props) => {

    const [isUserSignedIn, setIsUserSignedIn] = useState(false);

    const login = async (userName: string, password: string, loginState: any) => {
        const userCidentials = await logInToFirebase(userName, password)

        if (userCidentials) {
            if(userCidentials.user) {
                setIsUserSignedIn(true);
                loginState(true)
            }
        } else {
            alert("Wrong username/password")
            loginState(false)
        }
    }

    const register = async (firstName: string, lastname: string, username: string, password: string) => {
        await registerUserFirebase(firstName, lastname, username, password);
    }

    const logOut = () => {
        setIsUserSignedIn(false);
    }

    return(
        <AuthContext.Provider value={{isUserSignedIn, register, login, logOut}}>
            {props.children}
        </AuthContext.Provider>
    );
} 