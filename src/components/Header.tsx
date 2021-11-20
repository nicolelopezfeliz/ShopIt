import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Appbar, useTheme} from 'react-native-paper';
import {useNavigation} from "@react-navigation/native";

const Header: FC = () => {
    const {styles} = useThemedStyles();
    const navigationRef = useNavigation();

    return (
        <Appbar.Header style={styles.header}>
            {navigationRef.canGoBack() ? <Appbar.BackAction onPress={navigationRef.goBack}/> : null}
            <Appbar.Content title="The Blairwitch Shop"/>
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
