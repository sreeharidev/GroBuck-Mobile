import React,{Component} from 'react';
import {View,Text,Image,Alert,TouchableOpacity,ListView,ScrollView} from 'react-native';
import ProductCard from './ProductCard';
import Config from './Config';
import Utils from './Utils';
import Dimensions from 'Dimensions';
import CategoryProduct from './CategoryProduct';
import CheckOutFooter from './CheckOutFooter';
import GroceryConstants from '../constants/GroceryConstants';
import CommonStore from '../stores/CommonStore';
import CartProductDetail from './CartProductDetail';
//TODO Add Pagination
export default class Cart extends Component{
    static navigationOptions = { headerStyle:{backgroundColor : 'white'} };

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {dataSource:this.ds};
        this._onCartData = this._onCartData.bind(this);
        this._onHomeTouch = this._onHomeTouch.bind(this);
        this._delivery = this._delivery.bind(this);
        this.init();
    }

    init(){
        //Utils.postService('getMyFavourites',{},GroceryConstants.FAVOURITE_LIST);
        Utils.postService('getCart',{},GroceryConstants.CART_LIST);
    }
    _onCartData(data){
        console.log(data);
        this.setState({shopData:data.data,shops:data.data.shops,products:data.data.products})
    }
    _onHomeTouch(){
        this.props.navigation.goBack();
    }
    componentDidMount() {
      CommonStore.addChangeListener(GroceryConstants.CART_LIST,this._onCartData);
    }
    componentWillUnmount() {
      CommonStore.removeChangeListener(GroceryConstants.CART_LIST,this._onCartData);
    }
    _delivery(){
      this.props.navigation.navigate('delivery');
    }
    getProductList(){
        let shopList =[];
        for (shopId in this.state.products) {
            
           
           let rows = this.ds.cloneWithRows(this.state.products[shopId]);
           shopList.push (
             <View key ={shopId}>
               <View style={{paddingLeft:5,paddingTop:10,backgroundColor:"#F9F8F6",flexDirection: "row"}}>
                 <Image style={{width: 70, height: 20,paddingRight:10,paddingLeft:1,marginTop:5}} source={{uri: Config.SERVER_IP+":3000/imgs/"+this.state.shopData.shops[shopId]}} />
               </View>
               <ListView
                  style={{paddingTop:10,paddingLeft:5,backgroundColor:"#F9F8F6",flex:1,flexDirection:'row'}}
                 showsHorizontalScrollIndicator = {false} 
                 dataSource={rows} removeClippedSubviews={false} 
                 renderRow={(rowData) => <CartProductDetail navigation={this.props.navigation} product={rowData}/>}
               />
             </View>
           );
         }
         return shopList;
     }
    render(){
        
        if(!this.state.shopData){
            return <View />;
          }
          
          const window = Dimensions.get('window');
          const { navigate } = this.props.navigation;
          return (
          <View style={{flex: 1}}>
             
            <ScrollView>
              {this.getProductList()}
            </ScrollView>
            <CheckOutFooter _delivery={this._delivery}/>  
          </View>
        );
    }
}
 