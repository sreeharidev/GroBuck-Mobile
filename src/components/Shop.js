import React,{Component} from 'react';
import {View,Text,Image,Alert,TouchableOpacity} from 'react-native';
import Config from './Config';
import Styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
const Shop =(props)=>{
      return (<View style={Styles.shopContainerStyle}>
            <TouchableOpacity onPress={event=>{props._onHomeReload(props.shop.shopId,props.shop.smallImage)}} >
           <View style={{marginTop:100,marginLeft:5}}>
            <Image style={{width: 150, height: 40}} source={{uri: Config.SERVER_IP+":3000/imgs/"+props.shop.smallImage}} />
            </View>
            </TouchableOpacity>
        </View>);
   
}
export default Shop;