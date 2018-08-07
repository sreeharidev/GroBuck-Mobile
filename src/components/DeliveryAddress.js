import React,{Component} from 'react';
import {View,Text,Image,Alert,TouchableOpacity,ListView} from 'react-native';
import ProductCard from './ProductCard';
import Config from './Config';
import Utils from './Utils';
import Dimensions from 'Dimensions';
import ProductDetail from './ProductDetail';
import CommonStore from '../stores/CommonStore';
import GroceryConstants from '../constants/GroceryConstants';
import CartFooter from './CartFooter';
import { FormLabel, FormInput,Button ,CheckBox,FormValidationMessage} from 'react-native-elements'
export default class DeliveryAddress extends Component{
    static navigationOptions = { headerStyle:{backgroundColor : 'white'} };

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {dataSource:this.ds};
        this._onProductData = this._onProductData.bind(this);
        this.goBack = this.goBack.bind(this);
        this.changeOption = this.changeOption.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state={storePick:false,cashOnDelivery:true,message:""};
        this.init();
    }

    init(){
         
    }
    _onProductData(data){
         this.setState({dataSource:this.ds.cloneWithRows(data.data)})
    }
    componentDidMount() {
      CommonStore.addChangeListener(GroceryConstants.PRODUCT_INFO,this._onProductData);
    }
    componentWillUnmount() {
      CommonStore.removeChangeListener(GroceryConstants.PRODUCT_INFO,this._onProductData);
    }
    goBack(){
        this.props.navigation.goBack();
    }
    handleChange(name,value) {
        var  val ={};
        val[name] = value;
        this.setState(val);
      }
      placeOrder(){
          console.log("Place Order clicked");
          Utils.postService('placeOrder',{name:this.state.name,address: this.state.address,email:this.state.email,storePick: this.state.storePick,cashOnDelivery:this.state.cashOnDelivery},GroceryConstants.NULL);
        this.setState({message:"Your Order has been placed!!"});
        }
      changeOption(val){
          console.log("Pressed::::"+val);
          if(val === "sp"){
            this.setState({storePick:true,cashOnDelivery:false});
          }else{
            this.setState({storePick:false,cashOnDelivery:true});
          }
      }
    render(){
         
        return (<View  style={{width: window.width,backgroundColor:"white"}}>
                

<FormLabel>Name</FormLabel>
<FormInput  value={this.state.name} onChangeText={(txt) => {this.handleChange("name",txt);}} />
<FormLabel>Address</FormLabel>
<FormInput   value={this.state.address}  onChangeText={(txt) => {this.handleChange("address",txt);}} />
<FormLabel>email</FormLabel>
<FormInput value={this.state.email}  onChangeText={(txt) => {this.handleChange("email",txt);}} />
<CheckBox
  center
  title='Pay On Delivery'
  checked={this.state.cashOnDelivery}
  onPress={(evt) => {this.changeOption("pd");}} 
   
/>
<CheckBox
  center
  title='Stoce Pick Up'
  checked= {this.state.storePick}
  onPress={(evt) => {this.changeOption("sp");}} 
/>
<FormValidationMessage>{this.state.message}</FormValidationMessage>
<Button
  raised
  buttonStyle={{marginBottom: 3,backgroundColor: '#55AE3A', borderRadius: 10,height:30}}
  textStyle={{textAlign: 'center'}}
  fontSize={12}
  title={` Place Order`}  onPress={(evt) => {this.placeOrder();}}
/>
        </View>);
    }
}
 