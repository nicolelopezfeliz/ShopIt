import React, {FC, useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {FAB, useTheme} from "react-native-paper";

import {IShoppingCartItem, ShoppingContext} from "../contexts/ShoppingContext";
import {ShoppingItem} from '../components/ShoppingItem';
import { SimpleConfirmationDialog } from '../components/SharedComponents/SimpleConfirmationDialog';

interface ShoppingListInterface {
    navigation: NativeStackNavigationProp<any, any>,
}



export const ShoppingList: FC<ShoppingListInterface> = ({navigation}) => {

    const {styles} = useThemedStyles();
    const {shopping: shoppingList, removeItem} = useContext(ShoppingContext);
    const [dialogVisiblity, setDialogVisiblity] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IShoppingCartItem | undefined>(undefined);

    const showDialog = () => {
        setDialogVisiblity(true)
    }

    const hideDialog = () => {
        setDialogVisiblity(false)
    }

    const onItemLongClick = (item: IShoppingCartItem) => {
        setSelectedItem(item)
        showDialog()
    }

    const onRemoveItemConfirmation = () => {
        removeItem(selectedItem)
        hideDialog()
    }

    return (
        <>
            <View style={styles.container}>
                <FAB
                    style={styles.fab}
                    small
                    icon="plus"
                    onPress={() =>
                        navigation.navigate('ShoppingEditAddItem')
                    }
                />

                <FlatList
                    data={shoppingList}
                    keyExtractor={(item) => item.title}
                    renderItem={({item}) =>
                        <ShoppingItem styles={styles} onPress={() => {
                            navigation.navigate('ShoppingEditAddItem', {editing: true, item: item})
                        }} onLongPress={() => {
                            onItemLongClick(item)
                        }} item={item}/>
                    }
                />
            </View>
            <SimpleConfirmationDialog visible={dialogVisiblity} showHideDialog={() => hideDialog()} onPress={() => onRemoveItemConfirmation()} />
        </>
    );
}



const useThemedStyles = () => {
    const theme = useTheme();
    return {
        styles: StyleSheet.create({
            container: {
                padding: 15,
                height: '100%',
            },
            card: {
                marginBottom: 10,
                height: 150,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 10,
                paddingBottom: 10,
            },
            itemContainer: {
                marginTop: 10,
                height: 150,
            },
            itemTitle: {
                fontWeight: "600",
            },
            itemDescription: {
                marginTop: 10,
                fontSize: 12
            },
            itemAmount: {
                fontWeight: "600"
            },
            fab: {
                position: 'absolute',
                backgroundColor: theme.colors.primary,
                margin: 22,
                right: 0,
                bottom: 0,
                zIndex: 100,
            },
        }),
    };
};


export default ShoppingList;


