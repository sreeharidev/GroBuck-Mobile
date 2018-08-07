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
export default class ProductInfo extends Component{
    static navigationOptions = { headerStyle:{backgroundColor : 'white'} };

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {dataSource:this.ds};
        this._onProductData = this._onProductData.bind(this);
        this.goBack = this.goBack.bind(this);
        this.init();
    }

    init(){
         if(this.props.navigation.state.params)
            Utils.postService('getProductsByCategory',{shopId:this.props.navigation.state.params.shopId,categoryId:this.props.navigation.state.params.product.categoryId},GroceryConstants.PRODUCT_INFO);
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
    render(){
         
        let props = this.props.navigation.state.params;
         const { navigate } = this.props.navigation;
         const window = Dimensions.get('window');
         const imgWidth = (window.width)/2;
         const productPrices = props.product.productPriceList[0];
        return (<View  style={{width: window.width,backgroundColor:"white"}}>
            <View style={{width:window.width,backgroundColor:"white"}}>
            <Image style={{width: imgWidth, height: 210}} source={{uri: Config.SERVER_IP+":3000/imgs/"+props.product.smallImage}} />
            </View>
            <View style={{width:window.width,paddingLeft:20,}}>
                <Text style={{fontWeight: "bold"}} key={props.product.productName+props.product.price}>Rs: {productPrices.price}</Text>
                <Text key={props.product.productName}>{props.product.productName}</Text>
                <Text key={props.product.productDescription}>{props.product.productDescription}</Text>
                
            </View>
            <View style={{paddingLeft:5,paddingTop:10,backgroundColor:"#F9F8F6"}}>
             <Text style={{marginLeft:20,height:20,fontWeight:'bold',fontSize:12, color: "#47494c"}}>Related Items</Text>
             <ListView
                horizontal={true}
                style={{paddingTop:10,paddingLeft:5,backgroundColor:"#F9F8F6"}}
                dataSource={this.state.dataSource}
                showsHorizontalScrollIndicator = {false} 
                renderRow={(rowData) => <ProductDetail navigation={this.props.navigation} product={rowData} />}
            />
            </View>
            <CartFooter ppId={productPrices.ppId} goBack={this.goBack} />
        </View>);
    }
}
 