import React, {FC} from 'react';
import ShoppingItemForm from '../components/Form/ShoppingItemForm';

const ShoppingItemScreen: FC = (props: any) => {
    return (
        <ShoppingItemForm editing={props?.route?.params?.editing} item={props?.route?.params?.item}/>
    );
};

export default ShoppingItemScreen;
