import React,{Component} from 'react';
import {AppRegistry,View,TabBarIOS} from 'react-native';
import Header from './src/components/Header';
import Home from './src/components/Home';
import {StackNavigator,TabNavigator} from 'react-navigation';
import ProductInfo from './src/components/ProductInfo';
import CategoryList from './src/components/CategoryList';
import ShopList from './src/components/ShopList';
import FavouriteList from './src/components/FavouriteList'
import Cart from './src/components/Cart'
import DeliveryAddress from './src/components/DeliveryAddress'
const App2 = StackNavigator({
  Home: { screen: Home },
  header: { screen: Header },
  productInfo: { screen: ProductInfo},
  categoryList: {screen:CategoryList},
  shopList: {screen:ShopList},
  favouriteList:{screen:FavouriteList},
  cart: {screen:Cart},
  delivery:{screen:DeliveryAddress}
});

export default class grocery extends Component{
  render(){  
    return (
    <View style={{flex:1}}>  
       <App2 />
    </View>
    );
  }
}
AppRegistry.registerComponent('GroBuckMobile',()=>grocery);
