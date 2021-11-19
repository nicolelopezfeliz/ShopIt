import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Header from './src/components/Header';
import ShoppingList from './src/screens/ShoppingList';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        accent: 'yellow',
    },
};

export default function App() {

  return (
      <PaperProvider>
        <View>
          <Header/>
          <ShoppingList />
        </View>
      </PaperProvider>
  );
}

const styles = StyleSheet.create({

});
