import React, {FC, useContext, useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {IShoppingCartItem, ShoppingContext} from "../contexts/ShoppingContext";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {Caption, Card, FAB, Paragraph, Title, useTheme} from "react-native-paper";

interface ShoppingListInterface {
    navigation: NativeStackNavigationProp<any, any>,
}

export const ShoppingList: FC<ShoppingListInterface> = ({navigation}) => {

    const {styles} = useThemedStyles();
    const {shopping: shoppingList, addItem} = useContext(ShoppingContext);

    useEffect(() => {
        console.log(shoppingList)
    })

    return (
        <View style={styles.container}>
            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={() =>
                    navigation.navigate('ShoppingAddItem')
                }
            />

            <FlatList
                data={shoppingList}
                keyExtractor={(item) => item.title}
                renderItem={({item}) =>
                    <ListItem {...item}/>
                }
            />

        </View>
    );
}

const ListItem = (item: IShoppingCartItem) => {
    const {styles} = useThemedStyles();
    const {title, description, amount} = item
    const {removeItem} = useContext(ShoppingContext)

    return (
        <Card style={styles.card}
            onLongPress={() => {
                removeItem(item)
            }}
        >
            <Title style={styles.itemTitle}>{title}</Title>
            <Paragraph style={styles.itemDescription}>{description}</Paragraph>
            <Caption style={styles.itemDescription}>{`${amount} kr/$`}</Caption>
        </Card>
    )
}

const useThemedStyles = () => {
    const theme = useTheme();
    return {
        styles: StyleSheet.create({
            container: {
                padding: 15,
                height: '100%',
            },
            textInput: {
                padding: 10,
                borderColor: '#000000',
                marginBottom: 10,
                borderWidth: 1
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
