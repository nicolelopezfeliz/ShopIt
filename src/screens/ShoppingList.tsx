import React, { useState } from 'react';
import { useContext } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { Context } from './../contexts/Context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackScreens } from '../helpers/types';
import { useEffect } from 'react';

//export default function ShoppingList() {
export const shoppingList: React.FC<NativeStackScreenProps<StackScreens, "ShoppingList">> = (props) => {

  const [shoppingItem, setShoppingItem] = useState('');
  const [shoppingList, setShoppingList] = useState(['']);
  const context = useContext(Context);

  const [btnState, setBtnState] = useState(false)

  const addShoppingList = () => {
    //creatig a copy of the todo list and then adding the new todo item
    setShoppingList([...shoppingList, shoppingItem]);
    console.log(shoppingList);
  }

  useEffect(() => {
    if (btnState) {
        {props.navigation.navigate('AddItemScreen')}
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
                props.navigation.navigate('AddItemScreen')

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
    padding: 30
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

export default shoppingList;