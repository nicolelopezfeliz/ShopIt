import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './src/components/Header';
import ShoppingList from './src/screens/ShoppingList';

export default function App() {

  return (
    <View>
      <Header title="Shopping List"/>

      <ShoppingList />
      
    </View>
  );
}

const styles = StyleSheet.create({
  
});
