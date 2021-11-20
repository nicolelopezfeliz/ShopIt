import React, {createContext, useState} from 'react';
import {mShoppingListData} from "../../assets/mock-data/mock-data";

//TÄNK ATT DENNA CONTEXTPROVIDER ÄR SOM "ISTÄLLET FÖR REDUX" där du sparar värden som nås inom
// <ShoppingContextProvider>
// Allt inom här når denna => props.children på rad 37 tar hand om att lägga alla inom denna
// </ShoppingContextProvider>,
// så här lägger vi en array av objects[] typ och
// funktioner för CRUD, create/add-read-update-delete till i shopping-cart
// isAddBtnPressed: boolean;
// toggleScreens: (btnState: any) => void;

interface IShoppingCartItem {
    id: string;
    title: string;
    description: string;
    amount: number;
    quantity: number;
}

interface IShoppingList extends Array<IShoppingCartItem>{}

interface InterfaceShoppingContext {
    shopping?: IShoppingList,
    addItem: (item: IShoppingCartItem) => void;
    removeItem: (item: IShoppingCartItem) => void;
}

export const initialValues = {
    shopping: [
        ...mShoppingListData,
    ] as IShoppingList,
    addItem: () => {},
    removeItem: () => {},
};


export const ShoppingContext = createContext<InterfaceShoppingContext>(initialValues);

export const ShoppingContextProvider: React.FC = ({children}) => {

    const [shoppingState, setShoppingState] = useState(initialValues)

    return (
        <ShoppingContext.Provider value={{
            ...shoppingState,
            addItem: (item: IShoppingCartItem) => {
                const list = shoppingState.shopping
                list.push(item)
                setShoppingState({
                    ...shoppingState,
                        shopping: list
                })
                // setShoppingState({...shoppingState, ...item})
            },
            removeItem: (item: IShoppingCartItem) => {
                setShoppingState({...shoppingState, ...item}) //REMOVE HERE
            }

        }}>
            {children}
        </ShoppingContext.Provider>
    );
}
