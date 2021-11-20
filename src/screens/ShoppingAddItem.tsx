import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ShoppingAddItem: FC = (props: any) => {

    // useEffect(() => {
    //     console.log(props.route.params?.editing)
    //     console.log(props.route.params?.item)
    // })

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
