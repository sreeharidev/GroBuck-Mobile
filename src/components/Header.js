import React,{Component} from 'react';
import {Text,View,TextInput,Image,TouchableOpacity} from 'react-native';
import Styles from './Styles';
import Config from './Config';
import Icon from 'react-native-vector-icons/FontAwesome';
import GroceryConstants from '../constants/GroceryConstants';
import CommonStore from '../stores/CommonStore';

export default class  Header extends Component{
   
    constructor(props){
        super(props);
        this.state ={title:props.title,icon: this.props.shopIcon,itemCount:this.props.cartCount};
        this._changeCount = this._changeCount.bind(this);
        this._initCount = this._initCount.bind(this);
    }
    componentWillReceiveProps(nextProps){
        this.props = nextProps;
        this.setState({icon:this.props.shopIcon});
    }
    _changeCount(data){
        if(this.state.itemCount === ""){
            this.state.itemCount = 0;
        }
        this.setState({itemCount:this.state.itemCount+1});
    }
    _initCount(data){
        this.setState({itemCount:data.cartCount});
    }
    componentDidMount() {
        CommonStore.addChangeListener(GroceryConstants.CART_COUNT_UPDATE,this._changeCount);
        CommonStore.addChangeListener(GroceryConstants.CART_COUNT_INIT,this._initCount);
    }
      componentWillUnmount() {
        CommonStore.removeChangeListener(GroceryConstants.CART_COUNT_UPDATE,this._changeCount);
        CommonStore.removeChangeListener(GroceryConstants.CART_COUNT_INIT,this._initCount);
    }
    render(){
        return (
            <View style={Styles.headerStyle}>
             <View style={{paddingTop:5,flexDirection: 'row', justifyContent : 'flex-start', alignItems: 'flex-start',}}>
                <TouchableOpacity onPress={event=>{this.props._shopListCallBack()}} >
                <Image style={{width: 70, height: 20,paddingRight:10,paddingLeft:1,marginTop:5}} source={{uri: Config.SERVER_IP+":3000/imgs/"+this.state.icon}} />
                </TouchableOpacity>
                <TextInput  style={{height: 30,width: 220, borderColor: '#55AE3A',backgroundColor: 'white', borderWidth: 1}} />
                <Icon name="user" size={20} color="#55AE3A" style={{marginLeft:10,marginTop:5}} />
                <TouchableOpacity onPress={event=>{this.props._showCart()}} >
                <Icon name="shopping-cart" size={20} color="#55AE3A" style={{marginLeft:10,marginTop:5}} >
                    <Text style={{fontFamily: 'Arial',color: "red", fontSize: 9}}>{this.state.itemCount}</Text>
                </Icon>
                </TouchableOpacity>
            </View>
            </View>
        );
    }
}
