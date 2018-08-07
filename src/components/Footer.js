import React,{Component} from 'react';
import {Text,View,TextInput,Image,TouchableOpacity} from 'react-native';
import Styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class  Footer extends Component{
    static navigationOptions = { header: null,headerStyle:{backgroundColor : '#48AF48'} };  
    constructor(props){
        super(props);
       
    }
    
    render(){
         console.log(this.props);
        return (
            
            <View style={Styles.footerStyle}>
                {this.props.callBack ?
                <TouchableOpacity onPress={event=>{this.props.callBack(1);}} >
                 <Icon name="star-o" size={20} color="#55AE3A"  style={{marginLeft:10,marginRight:120}}/>
                </TouchableOpacity>
                :
                <Icon name="star" size={20} color="#55AE3A"  style={{marginLeft:10,marginRight:120}}/>
                }
            {this.props.callBackHome ?
            <TouchableOpacity onPress={event=>{this.props.callBackHome()}} >
            <Icon name="home" size={20} color="#55AE3A"  style={{marginRight:120}} />
            </TouchableOpacity>
            :
            <Icon name="home" size={20} color="#55AE3A"  style={{marginRight:120}} />
            }
            <Icon name="check-circle-o" size={20} color="#55AE3A" />
            </View>
            
        );
    }
}
