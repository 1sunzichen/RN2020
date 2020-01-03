
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
  Button
} from 'react-native';              
 class Page1 extends Component{
  render(){

    const {navigation}=this.props;
    console.log(navigation,"1111");
    
    return(
      <View style={{flexDirection:"column",flexWrap:"wrap",backgroundColor:"#ff0",height:500
      ,alignItems:"flex-end"}}>
      
        <Text>
          Page1  
        </Text>
        <Button
          title={'Goback'}
          onPress={()=>{
            navigation.goBack();
          }}
        />
        <Button
          title={'Page2'}
          onPress={()=>{
            navigation.navigate("Page2");
          }}
        />
      </View>
    )
  }
} 

export default Page1;