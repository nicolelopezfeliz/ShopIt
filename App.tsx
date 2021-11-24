import React, {useContext, useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackList, RootStackList} from "./src/screens/stack-lists";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ShoppingContextProvider} from './src/contexts/ShoppingContext';
import {theme} from "./utilities/themes";
import ShoppingList from "./src/screens/ShoppingList";
import Header from "./src/components/Header";
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

import {AuthContext, AuthContextProvider} from './src/contexts/AuthContext';
import ShoppingItemScreen from './src/screens/ShoppingItemScreen';
import {setI18nConfig} from './src/translation/TranslationConfig';


export const RootStack = createNativeStackNavigator<RootStackList>();
export const AuthStack = createNativeStackNavigator<AuthStackList>();

export default function App() {
    return (
        <AuthContextProvider>
            <Content/>
        </AuthContextProvider>
    )
}

export const Content = () => {

    const navigationRef = useNavigationContainerRef();
    const authContext = useContext(AuthContext);

    useEffect(() => {
        setI18nConfig();
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
                            {!authContext?.isUserSignedIn && (
                                <>
                                    <AuthStack.Screen
                                        name={"LoginScreen"}
                                        component={LoginScreen}
                                        options={{title: "Login screen"}}
                                    />

                                    <AuthStack.Screen
                                        name={"RegisterScreen"}
                                        component={RegisterScreen}
                                        options={{title: "Register screen"}}
                                    />
                                </>
                            )}
                            {authContext?.isUserSignedIn && (
                                <>
                                    <RootStack.Screen
                                        name={"ShoppingList"}
                                        component={ShoppingList}
                                        options={{title: "Shopping list screen"}}
                                    />

                                    <RootStack.Screen
                                        name={"ShoppingEditAddItem"}
                                        component={ShoppingItemScreen}
                                        options={{title: "Add item screen"}}
                                    />
                                </>
                            )}
                        </RootStack.Navigator>
                    </NavigationContainer>
                </ShoppingContextProvider>
            </SafeAreaProvider>
        </PaperProvider>
    );
};


