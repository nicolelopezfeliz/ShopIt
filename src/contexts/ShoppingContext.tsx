import React from 'react';
import { useState } from 'react';

interface InterfaceShoppingContext {
    //TÄNK ATT DENNA CONTEXTPROVIDER ÄR SOM "ISTÄLLET FÖR REDUX" där du sparar värden som nås inom
    // <ShoppingContextProvider>
    // Allt inom här når denna => props.children på rad 37 tar hand om att lägga alla inom denna
    // </ShoppingContextProvider>,
    // så här lägger vi en array av objects[] typ och
    // funktioner för CRUD, create/add-read-update-delete till i shopping-cart
    // isAddBtnPressed: boolean;
    // toggleScreens: (btnState: any) => void;
}



export const ShoppingContext = React.createContext<InterfaceShoppingContext | undefined> (undefined);

export const ShoppingContextProvider: React.FC<InterfaceShoppingContext> = (props) => {

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
        <ShoppingContext.Provider value={{isAddBtnPressed, toggleScreens}}>
            {props.children}
        </ShoppingContext.Provider>
    );
}
