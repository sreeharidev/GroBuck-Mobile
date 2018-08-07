import React,{Component} from 'react';
import {View,Text,Image,Alert,TouchableOpacity,ListView} from 'react-native';
import ProductCard from './ProductCard';
import Config from './Config';
import Utils from './Utils';
import Dimensions from 'Dimensions';
import CategoryProduct from './CategoryProduct';
import Footer from './Footer';
import GroceryConstants from '../constants/GroceryConstants';
import CommonStore from '../stores/CommonStore';
//TODO Add Pagination
export default class CategoryList extends Component{
    static navigationOptions = { headerStyle:{backgroundColor : 'white'} };

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {dataSource:this.ds};
        this._onCategoryData = this._onCategoryData.bind(this);
        this._onHomeTouch = this._onHomeTouch.bind(this);
        this.init();
    }

    init(){
        Utils.postService('getProductsByCategory',{categoryId:this.props.navigation.state.params.categoryId,shopId:this.props.navigation.state.params.shopId},GroceryConstants.CATEGORY_LIST);
    }
    _onCategoryData(data){
        console.log(data);
        this.setState({dataSource:this.ds.cloneWithRows(data.data)})
    }
    _onHomeTouch(){
        this.props.navigation.goBack();
    }
    componentDidMount() {
      CommonStore.addChangeListener(GroceryConstants.CATEGORY_LIST,this._onCategoryData);
    }
    componentWillUnmount() {
      CommonStore.removeChangeListener(GroceryConstants.CATEGORY_LIST,this._onCategoryData);
    }

    render(){
        
        let props = this.props.navigation.state.params;
         const { navigate } = this.props.navigation;
         const window = Dimensions.get('window');
         const imgWidth = (window.width)/2;
        const categoryName = this.props.navigation.state.params.categoryName;
         console.log(this.state.dataSource);
        return (<View  style={{flex: 1}}>
            
            <View style={{flex: 1,paddingLeft:5,paddingTop:10,backgroundColor:"white"}}>
             <Text style={{marginLeft:20,height:20,fontWeight:'bold',fontSize:12, color: "#47494c"}}>{categoryName}</Text>
             <ListView
                style={{paddingTop:10,paddingLeft:5,backgroundColor:"white"}}
                contentContainerStyle={{justifyContent: 'center',flexDirection: 'row',flexWrap: 'wrap'}}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => <CategoryProduct navigation={this.props.navigation} product={rowData} />}
            />
            </View>
            <Footer   callBackHome={this._onHomeTouch}/>
        </View>);
    }
}
 