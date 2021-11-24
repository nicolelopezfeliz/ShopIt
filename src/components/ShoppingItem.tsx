import React, { FC } from "react";
import {Caption, Card, Divider, Paragraph, Title, useTheme} from "react-native-paper";
import {StyleSheet, Text, View} from 'react-native'
import { IShoppingCartItem } from "../contexts/ShoppingContext";
import { CustomChip } from "./SharedComponents/CustomChip";
import { translate } from "../translation/TranslationConfig";
import { tokens } from "../translation/AppStrings";
import { Ionicons } from '@expo/vector-icons';

interface IShoppinItem {
    onPress: () => void
    onLongPress: () => void
    item: IShoppingCartItem
}

export const ShoppingItem: FC<IShoppinItem> = ({onPress, onLongPress, item}) => {

    const {styles} = useThemedStyles();

    return (
        <Card style={styles.card}
                 onPress={onPress}
                 onLongPress={onLongPress}>
        <Title style={styles.itemTitle}>{item.title}</Title>
        <Divider/>
        <CustomChip text={
            item.type === "Peripheral" ? translate(tokens.screens.shoppingItemForm.peripheralBtnText) : translate(tokens.screens.shoppingItemForm.integratedBtnText)
        }/>
        <Paragraph style={styles.itemDescription}>
            {item.description}
        </Paragraph>

        <View style={styles.itemAmountContainer}>
            <Ionicons name="md-logo-usd" size={18} color="black" />
            <Text style={styles.itemAmount}>
                {item.amount}.00
            </Text>
        </View>
    </Card>
    );
}


const useThemedStyles = () => {
    const theme = useTheme();
    return {
        styles: StyleSheet.create({
            container: {
                padding: 15,
                height: '100%',
            },
            card: {
                marginBottom: 10,
                height: 200,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 10,
                paddingBottom: 10,
            },
            itemChip: {
                flexDirection: 'column',
                marginTop: 10,
                borderRadius: 3,
                paddingTop: 5,
                paddingBottom: 5,
                width: '100%',
                maxWidth: 75,
                backgroundColor: theme.colors.background
            },
            itemChipText: {
                fontWeight: '500',
                textAlign: 'center',
                color: 'black',
                fontSize: 12,
                paddingLeft: 5,
                paddingRight: 5,
            },
            itemContainer: {
                marginTop: 10,
                height: 150,
            },
            itemTitle: {
                fontWeight: "600",
            },
            itemDescription: {
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 15,
                fontSize: 12,
                minHeight: 30,
                marginBottom: 25,
            },
            itemAmountContainer: {
                alignItems: 'center',
                flexDirection: 'row',
                position: 'absolute',
                bottom: 5,
                right: 5,
                marginTop: 10,
            },
            itemAmount: {
                fontSize: 26,
                fontWeight: "600"
            },
            fab: {
                position: 'absolute',
                backgroundColor: theme.colors.primary,
                margin: 22,
                right: 0,
                bottom: 0,
                zIndex: 100,
            },
        }),
    };
};
