import React, {FC} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {theme} from "./utilities/themes";
import {Button} from "react-native";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import ShoppingList from "./src/screens/ShoppingList";
import {RootStackList} from "./src/screens/stack-lists";
import ShoppingAddItem from "./src/screens/ShoppingAddItem";
import {ShoppingContextProvider} from './src/contexts/ShoppingContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Header from "./src/components/Header";

export const RootStack = createNativeStackNavigator<RootStackList>();

export interface RootStackProps {
    navigation: NativeStackNavigationProp<any, any>
}

export default function App() {

    const navigationRef = useNavigationContainerRef();

    return (
        <PaperProvider theme={theme}>

            <SafeAreaProvider>
               <Header />
                <ShoppingContextProvider>
                    <NavigationContainer
                        ref={navigationRef}
                    >

                        <RootStack.Navigator>

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


const HomeScreen: FC<RootStackProps> = ({navigation}) => {
    return (
        <Button
            title="Go to Jane's profile"
            onPress={() =>
                navigation.navigate('Profile', {name: 'Jane'})
            }
        />
    );
};
// const ProfileScreen = ({ navigation, route }) => {
//     return <Text>This is {route.params.name}'s profile</Text>;
// };
// const styles = StyleSheet.create({
//     container: {
//         height: 50,
//     }
// });
