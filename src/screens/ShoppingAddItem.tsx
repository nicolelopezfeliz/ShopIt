import React, {FC} from 'react';
import {View, StyleSheet,Text} from 'react-native';

const ShoppingAddItem: FC = (props: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Add item screenio</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        backgroundColor: 'blue'
    }
})

export default ShoppingAddItem;
