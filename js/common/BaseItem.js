import React,{Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,TextInput, Button,
Image} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {PropTypes} from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
class BaseItem extends Component{
    static propTypes={
      projectModel:PropTypes.object,
      onSelect:PropTypes.func,
      onFavorite:PropTypes.func,

    }
    constructor(props){
      super(props);
      this.state={
        isFavorite:this.props.projectModel.isFavorite
      }
    }
    static getDerivedStateFromProps(nextProps,prevState){
       const isFavorite=nextProps.projectModel.isFavorite;
       if(prevState.isFavorite!==isFavorite){
         return {
           isFavorite:isFavorite
         };
       }
       return null;
    }

    setFavoriteState(isFavorite){
      this.props.projectModel.isFavorite=isFavorite;
      this.setState({
        isFavorite:isFavorite
      })
    }

    onItemClick() {
      // 子组件跳转 调用 父组件 方法 传过去这个方法
        this.props.onSelect(isFavorite => {
            this.setFavoriteState(isFavorite);
        });
    }

    onPressFavorite(){
    
      
      this.setFavoriteState(!this.state.isFavorite);
      this.props.onFavorite(this.props.projectModel.item,!this.state.isFavorite);
    }

     _favoriteIcon() {
        // const {theme} = this.props;
        return <TouchableOpacity
            style={{padding: 6}}
            underlayColor='transparent'
            onPress={() => this.onPressFavorite()}>
            <FontAwesome
                name={this.state.isFavorite ? 'star' : 'star-o'}
                size={26}
                style={{color:"#678"}}
            />
        </TouchableOpacity>
    }
}
const styles=StyleSheet.create({
  cell_container:{
    backgroundColor:'white',
    marginVertical:3,
    padding:10,
    marginLeft:5,
    borderColor:'#dddddd',
    borderWidth:0.5,
    borderRadius:2,
    shadowColor:'gray',
    shadowOffset:{width:0.5,height:0.5},
    shadowRadius:1,
    elevation:2
  },
  row:{
    justifyContent:"space-between",
    flexDirection:'row',
    alignItems:"center"
  },
  title:{
    fontWeight:"bold"
  },
  metaStyle:{
    color:"orange"
  }
})
export default BaseItem;