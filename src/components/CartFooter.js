import React,{Component} from 'react';
import {Text,View,TextInput,Image,TouchableOpacity} from 'react-native';
import { Button } from 'react-native-elements';
import Styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import GroceryConstants from '../constants/GroceryConstants';
import Utils from './Utils';
import AppDispatcher from '../dispatcher/AppDispatcher';

export default class  Footer extends Component{
    static navigationOptions = { header: null,headerStyle:{backgroundColor : '#48AF48'} };  
    constructor(props){
        super(props);
        this.state={count:1};
        this.onAdd = this.onAdd.bind(this);
        this.onSub = this.onSub.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }
    onAdd(){
        let value = this.state.count+1;
        this.setState({count:value});
    }
    onSub(){
        let value = this.state.count-1;
        if(value < 0){
            value = 0;
        }
        this.setState({count:value});
    }
    addToCart(){
         AppDispatcher.handleAction({
            actionType: GroceryConstants.CART_COUNT_UPDATE,
            data: {}
          });
          Utils.postService('addToCart',{ppId:this.props.ppId, count: this.state.count},GroceryConstants.FAVOURITE_LIST);
          this.props.goBack();
    }
    render(){
        console.log("Product Price Id is:"+this.props.ppId);
        return (
            
            <View style={Styles.footerStyle}>
                <Button
  raised
  buttonStyle={{marginLeft:50,backgroundColor: '#55AE3A', borderRadius: 10,width:20,height:20}}
  textStyle={{textAlign: 'center'}}
  title={` -`} onPress={(evt) => {this.onSub();}}
/>
<Text style={{width:10}}>{this.state.count} </Text>
<Button
  raised
  buttonStyle={{backgroundColor: '#55AE3A', borderRadius: 10,width:20,height:20}}
  textStyle={{textAlign: 'center'}}
  title={` +`} onPress={(evt) => {this.onAdd();}}
/>
<Button
  raised
  buttonStyle={{marginBottom: 3,backgroundColor: '#55AE3A', borderRadius: 10,height:30}}
  textStyle={{textAlign: 'center'}}
  fontSize={12}
  title={` Add To Cart`}  onPress={(evt) => {this.addToCart();}}
/>
            </View>
            
        );
    }
}
