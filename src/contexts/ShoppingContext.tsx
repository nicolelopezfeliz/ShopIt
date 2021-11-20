import React, {createContext, useState} from 'react';
import {mShoppingListData} from "../../assets/mock-data/mock-data";

export interface IShoppingCartItem {
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
            },
            removeItem: (item: IShoppingCartItem) => {
                setShoppingState({
                    ...shoppingState,
                    shopping: shoppingState.shopping.filter((i) => { return i.title != item.title})
                })
            }
        }}>
            {children}
        </ShoppingContext.Provider>
    );
}
