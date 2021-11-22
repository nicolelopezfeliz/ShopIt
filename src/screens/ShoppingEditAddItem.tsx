import React, {FC, useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ShoppingContext} from '../contexts/ShoppingContext';
import {mCreateUUID} from "../../assets/mock-data/mock-functions";
import {Button, Caption, Card, Dialog, Divider, Portal, Provider, RadioButton, TextInput} from 'react-native-paper';
import ShoppingItemForm from '../components/Form/ShoppingItemForm';

const ShoppingAddEditItem: FC = (props: any) => {

    return (
        <>
            <ShoppingItemForm editing={props?.route?.params?.editing} item={props?.route?.params?.item}/>
        </>
    );

};



export default ShoppingAddEditItem;
