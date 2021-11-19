import React from 'react';
import { useState } from 'react';

interface IContext {
    isAddBtnPressed: boolean;
    toggleScreens: (btnState: any) => void;
}

export const Context = React.createContext<IContext | undefined> (undefined);

export const ContextProvider: React.FC = (props) => {

    const [isAddBtnPressed, setIsAddBtnPressed] = useState(false);

    const toggleScreens = (btnState: any) => {

        if(isAddBtnPressed) {
            setIsAddBtnPressed(false)
            btnState(false)
        } else {
            setIsAddBtnPressed(true)
            btnState(true)
        }
    }

    return(
        <Context.Provider value={{isAddBtnPressed, toggleScreens}}>
            {props.children}
        </Context.Provider>
    );
} 