import React,{Component} from 'react';
import {Text,View,TextInput,Image,TouchableOpacity} from 'react-native';
import { Button } from 'react-native-elements';
import Styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import GroceryConstants from '../constants/GroceryConstants';
import Utils from './Utils';
import AppDispatcher from '../dispatcher/AppDispatcher';

export default class  CheckOutFooter extends Component{
    static navigationOptions = { header: null,headerStyle:{backgroundColor : '#48AF48'} };  
    constructor(props){
        super(props);
        this.state={count:1};
        this.onAdd = this.onAdd.bind(this);
        this.onSub = this.onSub.bind(this);
        this.delivery = this.delivery.bind(this);
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
    delivery(){
       
          this.props._delivery();
    }
    render(){
        console.log("Product Price Id is:"+this.props.ppId);
        return (
            
            <View style={Styles.footerStyle}>
               
<Button
  raised
  buttonStyle={{marginBottom: 3,backgroundColor: '#55AE3A', borderRadius: 10,height:30}}
  textStyle={{textAlign: 'center'}}
  fontSize={12}
  title={` Checkout`}  onPress={(evt) => {this.delivery();}}
/>
            </View>
            
        );
    }
}
