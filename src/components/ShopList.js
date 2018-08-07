import React,{Component} from 'react';
import {View,Text,Image,Alert,TouchableOpacity,ListView} from 'react-native';
import Config from './Config';
import Utils from './Utils';
import Dimensions from 'Dimensions';
import Shop from './Shop';
import Footer from './Footer';
import GroceryConstants from '../constants/GroceryConstants';
import CommonStore from '../stores/CommonStore';
export default class ShopList extends Component{
    static navigationOptions = { headerStyle:{backgroundColor : '#48AF48'} };

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {dataSource:this.ds};
        this._onShopData = this._onShopData.bind(this);
        this._onHomeTouch = this._onHomeTouch.bind(this);
        this._onHomeReload = this._onHomeReload.bind(this);
        this.init();
    }

    init(){
        console.log("Get All Shop called");
        Utils.postService('getAllShops',{},GroceryConstants.SHOP_LIST);
    }
    _onShopData(data){
        console.log(data);
        this.setState({dataSource:this.ds.cloneWithRows(data.data)})
    }
    _onHomeTouch(){
        this.props.navigation.goBack();
    }
    componentDidMount() {
      CommonStore.addChangeListener(GroceryConstants.SHOP_LIST,this._onShopData);
    }
    componentWillUnmount() {
      CommonStore.removeChangeListener(GroceryConstants.SHOP_LIST,this._onShopData);
    }
    _onHomeReload(shopId,smallImage){
      Utils.postService('getProductsByShopHomeForMobile',{shopId:shopId},GroceryConstants.HOME_INIT);
      this.props.navigation.state.params._onShopChange(smallImage);
      this.props.navigation.goBack();
    }
    render(){
         const window = Dimensions.get('window');
         const imgWidth = (window.width)/2;
         console.log(this.state.dataSource);
        return (<View  style={{flex: 1}}>
            
            <View style={{flex: 1,paddingLeft:5,paddingTop:10,backgroundColor:"white"}}>
             <ListView
                style={{paddingTop:10,paddingLeft:5,backgroundColor:"white"}}
                contentContainerStyle={{justifyContent: 'center',flexDirection: 'row',flexWrap: 'wrap'}}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => <Shop shop={rowData} _onHomeReload={this._onHomeReload} />}
            />
            </View>
            <Footer   callBackHome={this._onHomeTouch}/>
        </View>);
    }
}
 