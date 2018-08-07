import React,{Component} from 'react';
import {View,Text,Image,Alert,TouchableOpacity} from 'react-native';
import ProductCard from './ProductCard';
import Config from './Config';
import Styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from './Utils';
import GroceryConstants from '../constants/GroceryConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
 //TODO optimize CategoryProduct And Product Details
export default class  CategoryProduct extends Component{
    constructor(props){
        super(props);
        this.state={heart: "heart-o"};
    }
    componentWillReceiveProps(nextProps){
        this.props = nextProps;
        this.forceUpdate();
    }
    addToFavourite(product){
        let productPrice = product.productPriceList[0];
        console.log(product);
        if(product.favourite){
            product.favourite = false;
            Utils.postService('removeFavourite',{shopId:productPrice.shopId,ppId:productPrice.ppId},GroceryConstants.NULL);
        }else{
            product.favourite = true;
            Utils.postService('addFavourite',{shopId:productPrice.shopId,ppId:productPrice.ppId},GroceryConstants.NULL);
        }
        AppDispatcher.handleAction({
            actionType: GroceryConstants.HOME_RENDER,
            data: {categoryId:product.categoryId,product:product}
        });
        this.setState({heart: "heart"});
    }
          
 render(){
     const props = this.props;
        if(props.product.productId){
        let heart = "heart-o";
        if(props.product.favourite){
            heart = "heart";
        }
        return (
            <ProductCard>
                <TouchableOpacity onPress={event=>{props.navigation.navigate('productInfo',{product: props.product,shopId: props.product.productPriceList[0].shopId})}} >
                <Image style={{width: 110, height: 110,paddingLeft:25}} source={{uri: Config.SERVER_IP+":3000/imgs/"+props.product.smallImage}} />
                    <View style={{paddingLeft:20,marginTop:20}}>
                        <Text style={{fontSize:12,fontWeight: "bold"}} key={props.product.productName+props.product.price}>Rs: {props.product.productPriceList[0].price}</Text>
                        <Text style={{fontSize:12,color: "#47494c"}} key={props.product.productName}>{props.product.productName}</Text>
                        <Text style={{fontSize:12,color: "#47494c"}} key={props.product.productDescription}>{props.product.productDescription}</Text>
                        
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={event=>{this.addToFavourite(props.product)}} >
                <View style={{flexDirection: 'row',marginTop:20}}>
                    <Icon name={heart} size={20} color="red" style={{marginLeft:10,marginTop:5, fontSize:12}} />
                </View>
                </TouchableOpacity>
            </ProductCard>
        );
       /* return (<View style={Styles.categoryContainerStyle}>
            <TouchableOpacity onPress={event=>{props.navigation.navigate('productInfo',{product: props.product})}} >
            <Image style={{width: 110, height: 110}} source={{uri: Config.SERVER_IP+":3000/imgs/"+props.product.smallImage}} />
            <View style={{paddingLeft:20,marginTop:20}}>
                <Text style={{fontSize:12,fontWeight: "bold"}} key={props.product.productName+props.product.price}>Rs: {props.product.price}</Text>
                <Text style={{fontSize:12,color: "#47494c"}} key={props.product.productName}>{props.product.productName}</Text>
                <Text style={{fontSize:12,color: "#47494c"}} key={props.product.productDescription}>{props.product.productDescription}</Text>
                
            </View>
             <View style={{flexDirection: 'row',marginTop:20}}>
            <Icon name={heart} size={20} color="red" style={{marginLeft:10,marginTop:5, fontSize:12}} />
            </View>
            </TouchableOpacity>
        </View>);*/
   
} 
    }
}