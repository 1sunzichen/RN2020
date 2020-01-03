
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
 class Page2 extends Component{
  render(){
    return(
      <View style={{flexDirection:"column",flexWrap:"wrap",backgroundColor:"#ff0",height:500
      ,alignItems:"flex-end"}}>
        <View style={{backgroundColor:"darkcyan",width:50,height:50,margin:5}}>
        <Text>
          Page2
        </Text>
        </View>

 
  
     
   
  

      </View>
    )
  }
} 

export default Page2;