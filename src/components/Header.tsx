import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import { Appbar } from 'react-native-paper';

const Header = () => {

    const _goBack = () => console.log('Went back');
    const _handleSearch = () => console.log('Searching');
    const _handleMore = () => console.log('Shown more');

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={_goBack} />
            <Appbar.Content title="Title" subtitle="Subtitle" />
            <Appbar.Action icon="magnify" onPress={_handleSearch} />
            <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
        </Appbar.Header>
    );

}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#f2f2f2',
        padding: 15
    },
    headerTitle: {
        marginTop: 40,
        textAlign: 'center',
        fontSize: 20
    }
})

export default Header;
