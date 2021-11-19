import React from 'react';
import {Appearance, StyleSheet, View} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Header from './src/components/Header';
import ShoppingList from './src/screens/ShoppingList';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'green',
        accent: 'yellow',
    },
};

export default function App() {

    return (
        <PaperProvider theme={theme}>
            <View>
                <Header/>
                <ShoppingList/>
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({});
