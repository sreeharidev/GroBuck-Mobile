import React from 'react';
import {View} from 'react-native';
import Styles from './Styles';

const ProductCard = (props)=>{
    return <View style={Styles.productContainerStyle}>{props.children}</View>;

}
export default ProductCard;
