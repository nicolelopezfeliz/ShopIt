import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar, useTheme} from 'react-native-paper';

const Header = () => {
    const { styles } = useThemedStyles();
    const _goBack = () => console.log('Go back')
    const _handleMore = () => console.log('Show more')

    return (
        <Appbar.Header style={styles.header}>
            {/*<Appbar.BackAction onPress={_goBack} />*/}
            <Appbar.Content title="The Blairwitch Shop"/>
            {/*<Appbar.Action icon="dots-vertical" onPress={_handleMore} />*/}
        </Appbar.Header>
    );

}

const useThemedStyles = () => {
    const theme = useTheme();
    return {
        styles: StyleSheet.create({
            header: {
                backgroundColor: theme.colors.primary,
                padding: 15
            }
        }),
    };
};

export default Header;
