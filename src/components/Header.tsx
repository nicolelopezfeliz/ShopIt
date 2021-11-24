import React, {FC, useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Appbar, useTheme} from 'react-native-paper';
import {NavigationContainerRefWithCurrent, useNavigation} from "@react-navigation/native";
import {FunnyGif} from "./FunnyGif";import { RootStackList } from '../screens/stack-lists';

const Header: FC = () => {
    const {styles} = useThemedStyles();
    const [isDisplayingGif, setIsDisplayingGif] = useState(false)
    const navigationRef = useNavigation();

    const toggleGifOnPress = () => {
        setIsDisplayingGif(!isDisplayingGif)
    }
    const handleSignOut = () => {
        //TODO:  //Show dialog => OK => Call sign out function => Navigate to login
    }

    const backButtonVisibility = () => {
        // const cRoute = navigationRef?.current?.getCurrentRoute()
        // return cRoute?.name !== "ShoppingList"
    }

    useEffect(() => {
        // console.log('', navigationRef.getState().routeNames)


        // console.log('', cRoute)
    }, [navigationRef])

    return (
        <Appbar.Header style={styles.header}>
            {navigationRef?.canGoBack() ? <Appbar.BackAction onPress={() => navigationRef?.goBack()}/> : null}
            <Appbar.Content title="The Blairwitch Shop" onPress={toggleGifOnPress}/>
            <FunnyGif isDisplaying={isDisplayingGif} onPress={() => toggleGifOnPress}/>
            <Appbar.Action icon="location-exit" onPress={() => handleSignOut()} />
        </Appbar.Header>
    );
}




const useThemedStyles = () => {
    const theme = useTheme();
    return {
        styles: StyleSheet.create({
            header: {
                backgroundColor: theme.colors.primary,
            }
        }),
    };
};

export default Header;
