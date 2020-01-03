
import React,{Component} from 'react';
interface Person{
  name:string,
  age:number
}
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';              
 class NameStyle extends Component{
  render(){
    return(
      <View style={{flexDirection:"column",flexWrap:"wrap",backgroundColor:"#ff0",height:500
      ,alignItems:"flex-end"}}>
        <View style={{backgroundColor:"darkcyan",width:50,height:50,margin:5}}>
        <Text>
          1
        </Text>
        </View>
        <View style={{backgroundColor:"darkcyan",width:50,height:50,margin:5}}>
        <Text  >
          2
        </Text>
        </View>
        <View style={{backgroundColor:"darkcyan",width:50,height:50,margin:5,flex:1}}>
        <Text  >
          3
        </Text>
        </View>
        <View style={{backgroundColor:"darkcyan",width:50,height:50,margin:5}}>
        <Text  >
          4
        </Text>
        </View>
      </View>
    )
  }
} 

export default NameStyle;