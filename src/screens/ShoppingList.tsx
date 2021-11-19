import React, {FC, useContext, useEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {ShoppingContext} from "../contexts/ShoppingContext";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";

interface ShoppingListInterface {
    navigation: NativeStackNavigationProp<any,any>,

}

export const ShoppingList: FC<ShoppingListInterface> = ({navigation}) => {

  const [shoppingItem, setShoppingItem] = useState('');
  const [shoppingList, setShoppingList] = useState(['']);
  const context = useContext(ShoppingContext);

  const [btnState, setBtnState] = useState(false)

  const addShoppingList = () => {
    //creatig a copy of the todo list and then adding the new todo item
    setShoppingList([...shoppingList, shoppingItem]);
    console.log(shoppingList);
  }

  useEffect(() => {
    if (btnState) {
        {navigation.navigate('AddItemScreen')}
    }
  }, [btnState])

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
            onPress={() =>
                navigation.navigate('ShoppingAddItem')

            }
          />
        </View>

        <ScrollView>
          {shoppingList.map(todo =>
            <View key={todo} style={styles.todoItem}>
              <Text>
                {todo}
              </Text>
            </View>)
          }
        </ScrollView>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  textInput: {
    padding: 10,
    borderColor: '#000000',
    marginBottom: 10,
    borderWidth: 1
  },
  todoItem: {
    marginTop: 10,
    padding: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray'

  }
});

export default ShoppingList;
