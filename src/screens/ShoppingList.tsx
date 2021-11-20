import React, {FC, useContext, useState} from 'react';
import {Button, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {ShoppingContext} from "../contexts/ShoppingContext";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {mCreateUUID} from "../../assets/mock-data/mock-functions";
import {Card, Paragraph, Title} from "react-native-paper";

interface ShoppingListInterface {
    navigation: NativeStackNavigationProp<any, any>,

}

export const ShoppingList: FC<ShoppingListInterface> = ({navigation}) => {

    const [shoppingItem, setShoppingItem] = useState('');
    // const [shoppingList, setShoppingList] = useState(['']);
    const {shopping: shoppingList, addItem, removeItem} = useContext(ShoppingContext);

    // const [btnState, setBtnState] = useState(false)

    // const addShoppingList = () => {
    //   //creatig a copy of the todo list and then adding the new todo item
    //   setShoppingList([...shoppingList, shoppingItem]);
    //   console.log(shoppingList);
    // }

    // useEffect(() => {
    //   if (btnState) {
    //       {navigation.navigate('AddItemScreen')}
    //   }
    // }, [btnState])


    return (
        <View>

            <View style={styles.container}>
                <View>
                    <TextInput
                        placeholder="Enter Item"
                        style={styles.textInput}
                        onChangeText={text => setShoppingItem(text)}
                        value={shoppingItem}
                    />
                    <Button
                        title="Add shopping Item"
                        onPress={() => {
                            console.log(shoppingList)
                            addItem({
                                id: mCreateUUID(),
                                amount: 150,
                                description: "A description",
                                quantity: 1,
                                title: "A title"
                            })
                            // navigation.navigate('ShoppingAddItem')
                        }}
                    />
                </View>

                <ScrollView>
                    {shoppingList?.map(item =>
                        <View key={item.id} style={styles.itemContainer}>
                            <Card style={styles.card}>
                                <Title style={styles.itemTitle}>{item.title}</Title>
                                <Paragraph style={styles.itemDescription}>{item.description}</Paragraph>
                                {/*<Card.Actions>*/}
                                {/*  <PaperButton>Remove</PaperButton>*/}
                                {/*</Card.Actions>*/}
                            </Card>
                        </View>)
                    }
                </ScrollView>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
        height: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    itemContainer: {
        marginTop: 10,
        height: 150,
        // backgroundColor: '#f2f2f2',
        // borderColor: 'gray'
    },
    itemTitle: {
        fontWeight: "600",
    },
    itemDescription: {
        marginTop: 10,
        fontSize: 12
    }
});

export default ShoppingList;
