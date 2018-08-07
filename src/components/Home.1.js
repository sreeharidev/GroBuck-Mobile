import React,{Component} from 'react';
import {View,Text,ListView,Image,ScrollView,Button} from 'react-native';
import Utils from './Utils';
import ProductDetail from './ProductDetail';
import Dimensions from 'Dimensions';
import Header from './Header'; 
import Footer from './Footer';
import GroceryConstants from '../constants/GroceryConstants';
import CommonStore from '../stores/CommonStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
//TODO default shop Id is hardcoded
export default class Home extends Component{
    static navigationOptions = { header: null,headerStyle:{backgroundColor : '#48AF48'} };  
    constructor(props){
        super(props);
        this.init = this.init.bind(this);
        this._onShopData = this._onShopData.bind(this);
        this._onShopClick = this._onShopClick.bind(this);
        this._onShopChange = this._onShopChange.bind(this);
        this._productReRender = this._productReRender.bind(this);
        this.favourites = this.favourites.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
        this.getProductList = this.getProductList.bind(this);
        this.state={shopData: {priority:"",categories:[]},shopId:this.props.shopId,products:[],shopIcon:"Lulu_Logo.png"};
        this.init();
    }
    init(){
        Utils.postService('getProductsByShopHomeForMobile',{shopId:1},GroceryConstants.HOME_INIT);
    }
    _onShopData(data){
       // this.state={shopData: {priority:"",categories:[]},shopId:this.props.shopId,products:[]};

       
       //Appending Last row
        data.data.priority.split(',').map((categoryId) => {
        data.data.products[categoryId].push({categoryId: categoryId,categoryName: data.data.categories[categoryId],shopId:data.data.shopId});
       });
        this.setState({shopData:data.data,categories:data.data.categories,products:data.data.products,shopId:data.data.shopId});
       
      }
    initCartCount(){
       AppDispatcher.handleAction({
        actionType: GroceryConstants.CART_COUNT_INIT,
        data: {cartCount:this.state.shopData.cartCount}
      });
    }
    componentDidMount() {
      CommonStore.addChangeListener(GroceryConstants.HOME_INIT,this._onShopData);
      CommonStore.addChangeListener(GroceryConstants.HOME_RENDER,this._productReRender);
      this.initCartCount();
      
    }
    componentWillUnmount() {
      CommonStore.removeChangeListener(GroceryConstants.HOME_INIT,this._onShopData);
      CommonStore.removeChangeListener(GroceryConstants.HOME_RENDER,this._productReRender);
    }
    _productReRender(data){
       const prod = data.product;
      for(let i =0;i<this.state.products[data.categoryId].length;i++){
        let pd = this.state.products[data.categoryId][i];
        if(prod.productId == pd.productId){
          pd.favourite= prod.favourite;
          this.forceUpdate();
        }
      }
    }
    getProductList(){
       
        const categoryList = this.state.shopData.priority.split(',').map((categoryId) => {
          if(!this.state['ds'+categoryId]){
            let datasource =  new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.state['ds'+categoryId] = datasource;
          }
          let ds = this.state['ds'+categoryId];
          let rows = ds.cloneWithRows(this.state.products[categoryId]);
          return (
            <View key ={categoryId}>
              <View style={{paddingLeft:5,paddingTop:10,backgroundColor:"#F9F8F6",flexDirection: "row"}}>
                <Text style={{height:20,fontWeight:'bold',fontSize:12, color: "#47494c"}}>{this.state.shopData.categories[categoryId]}</Text>
                <Text style={{paddingLeft:30,color: 'green',fontWeight:'bold' ,fontSize:10,alignItems:'flex-end'}} onPress={() => this.onEndReached(categoryId,this.state.shopId)}>View More > </Text>
              </View>
              <ListView
                horizontal={true}
                style={{paddingTop:10,paddingLeft:5,backgroundColor:"#F9F8F6"}}
                showsHorizontalScrollIndicator = {false} 
                dataSource={rows} removeClippedSubviews={false} 
                renderRow={(rowData) => <ProductDetail navigation={this.props.navigation} product={rowData}/>}
              />
            </View>
          );
        });
        return categoryList;
    }
    onEndReached(categoryId,shopId){
      this.props.navigation.navigate('categoryList',{categoryId:categoryId,shopId:shopId,categoryName: this.state.categories[categoryId]});
    }
    favourites(){
      this.props.navigation.navigate('favouriteList');
    }
    _onShopClick(){
      this.props.navigation.navigate('shopList',{_onShopChange:this._onShopChange});
    }
    _onShopChange(shopIcon){
      this.setState({shopIcon:shopIcon});
    }
    render() {
      if(this.state.shopData.priority === ""){
        return <View />;
      }
      
      const window = Dimensions.get('window');
      const { navigate } = this.props.navigation;
      return (
      <View style={{flex: 1}}>
        
        <Header title="GroBuck" _shopListCallBack ={this._onShopClick} shopIcon={this.state.shopIcon} cartCount={this.state.shopData.cartCount} />  
        <ScrollView>
          <Image style={{width: window.width,marginTop:5, height: 200,backgroundColor:"#F9F8F6"}} source={require("../imgs/amazon.jpg")} />
          {this.getProductList()}
        </ScrollView>
        <Footer callBack={this.favourites} />  
      </View>
    );
  }     
}