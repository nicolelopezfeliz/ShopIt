import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {theme} from "./utilities/themes";
import ShoppingList from "./src/screens/ShoppingList";
import {RootStackList} from "./src/screens/stack-lists";
import ShoppingAddItem from "./src/screens/ShoppingAddItem";
import {ShoppingContextProvider} from './src/contexts/ShoppingContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Header from "./src/components/Header";
import { fbInit } from './src/services/firebaseService';
import { useEffect } from 'react';

export const RootStack = createNativeStackNavigator<RootStackList>();

export default function App() {

    const navigationRef = useNavigationContainerRef();

    useEffect(() =>  {
        fbInit();
      }, [])

    return (
        <PaperProvider theme={theme}>
            <SafeAreaProvider>
                <ShoppingContextProvider>
                    <NavigationContainer ref={navigationRef}>
                        <RootStack.Navigator
                            screenOptions={{
                                header: (props) => <Header/>,
                            }}>

                            <RootStack.Screen
                                name={"ShoppingList"}
                                component={ShoppingList}
                                options={{title: "Shopping list screen"}}
                            />

                            <RootStack.Screen
                                name={"ShoppingAddItem"}
                                component={ShoppingAddItem}
                                options={{title: "Add item screen"}}
                            />

                        </RootStack.Navigator>

                    </NavigationContainer>
                </ShoppingContextProvider>
            </SafeAreaProvider>
        </PaperProvider>
    );
}

