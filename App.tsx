import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Context, ContextProvider } from './src/contexts/Context';
import { useContext } from 'react';

import Header from './src/components/Header';
import ShoppingList from './src/screens/ShoppingList';
import AddItemScreen from './src/screens/AddItemScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  const context = useContext(Context);

  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name={"ShoppingList"}
                component={ShoppingList}
                options={{title: "Shopping list screen"}}
            />

              <Stack.Screen 
                name={"AddItemScreen"}
                component={AddItemScreen}
                options={{title: "Add item screen"}}
              />

        {/*<View>
      <Header title="Shopping List"/>

      <ShoppingList />
      
    </View>*/}
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>    
  );
}

const styles = StyleSheet.create({
  
});
