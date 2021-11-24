import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Appbar, useTheme} from 'react-native-paper';
import {NavigationContainerRefWithCurrent, useNavigation} from "@react-navigation/native";
import {FunnyGif} from "./FunnyGif";import { RootStackList } from '../screens/stack-lists';
import { signOutUser } from '../services/FirebaseServices';
import { AuthContext } from '../contexts/AuthContext';

const Header: FC = () => {

    const {styles} = useThemedStyles();
    const [isDisplayingGif, setIsDisplayingGif] = useState(false);
    const navigationRef = useNavigation();
    const authContext = useContext(AuthContext);

    const toggleGifOnPress = () => {
        setIsDisplayingGif(!isDisplayingGif)
    }
    const handleSignOut = () => {
        authContext?.logOut()
    }

    return (
        <Appbar.Header style={styles.header}>
            {navigationRef?.canGoBack() ? <Appbar.BackAction onPress={() => navigationRef?.goBack()}/> : null}
            <Appbar.Content title="The Blairwitch Shop" onPress={toggleGifOnPress}/>
            <FunnyGif isDisplaying={isDisplayingGif} onPress={() => toggleGifOnPress}/>
            {authContext?.isUserSignedIn ?  <Appbar.Action icon="location-exit" onPress={handleSignOut} /> : null}

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
