import React, {createContext, useState} from 'react';
import {mShoppingListData} from "../../assets/mock-data/mock-data";

export enum ShoppingItemType {
    peripheral = "Peripheral",
    integrated = "Integrated",
}

export interface IShoppingCartItem {
    id: string,
    title: string,
    description: string,
    amount: number,
    quantity: number,
    type: ShoppingItemType.peripheral,
}

export interface IShoppingList extends Array<IShoppingCartItem> {}

export interface InterfaceShoppingContext {
    shopping?: IShoppingList,
    addItem: (item: IShoppingCartItem) => void;
    removeItem: (item: IShoppingCartItem) => void;
    updateItem: (oldItem: IShoppingCartItem, newItem: IShoppingCartItem) => void;
}

export const initialValues = {
    shopping: [
        ...mShoppingListData,
    ] as IShoppingList,
    addItem: () => {
    },
    removeItem: () => {
    },
    updateItem: () => {
    },
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
                    shopping: shoppingState.shopping.filter((i) => {
                        return i.title != item.title
                    })
                })
            },
            updateItem: (oldItem: IShoppingCartItem, newItem: IShoppingCartItem) => {
                const newList = shoppingState.shopping.slice()
                newList.splice(shoppingState.shopping.findIndex((x) => x.title === oldItem.title), 1, newItem)
                setShoppingState({
                    ...shoppingState,
                    shopping: newList
                })
            }
        }}>
            {children}
        </ShoppingContext.Provider>
    );
}
