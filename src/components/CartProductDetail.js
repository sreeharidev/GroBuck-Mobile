import React,{Component} from 'react';
import {View,Text,Image,Alert,TouchableOpacity} from 'react-native';
import ProductCard from './ProductCard';
import Config from './Config';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from './Styles';
import GroceryConstants from '../constants/GroceryConstants';
import Utils from './Utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Dimensions from 'Dimensions';
//TODO convert into React component

export default class  CartProductDetail extends Component{
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
        
        const productPrices = props.product.productPriceList[0];
        const window = Dimensions.get('window');
       /* borderWidth: 0.6,
        borderRadius: 1,
        borderColor: "#e7e7e7",
        backgroundColor:"white",
        borderRightWidth:0.2,
        borderLeftWidth:0.4,
        width: 150, 
        height: 250,
        marginRight: 0,
        paddingRight: 3,
        paddingLeft: 3,
        paddingTop:5*/
        return (
            
        <View style={{borderWidth:0.6,borderTopWidth:0.2,borderColor: "#e7e7e7", borderRadius:1,marginRight:5,paddingBottom:10,backgroundColor:"white",height:90,width:window.width-10,flex: 1, flexDirection: 'row'}}>
             <View style={{width: 100}}>
            <Image style={{width: 80, height: 70,paddingLeft:25,marginTop:10}} source={{uri: Config.SERVER_IP+":3000/imgs/"+props.product.smallImage}} />
            </View>
            <View style={{paddingLeft:20,marginTop:20,width: 100}}>
                <Text style={{fontSize:12,fontWeight: "bold"}} key={props.product.productName+props.product.price}>Rs: {productPrices.price}</Text>
                <Text style={{fontSize:12,color: "#47494c"}} key={props.product.productName}>{props.product.productName}</Text>
                <Text style={{fontSize:12,color: "#47494c"}} key={props.product.productDescription}>{props.product.productDescription}</Text>
                
            </View>
             
            
</View >
 );
         
    }
   
}
