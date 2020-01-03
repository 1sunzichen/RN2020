
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
  Button,
} from 'react-native';      
// 打开侧边栏吗
import { DrawerActions } from 'react-navigation-drawer';        
 class Login extends Component{
  render(){
    const {navigation}=this.props;
    return(
      <View style={{flexDirection:"column",flexWrap:"wrap",backgroundColor:"#ff0",height:500
      ,alignItems:"flex-end"}}>
        <View style={{backgroundColor:"#080",width:"100%",height:50,margin:5}}>
        <Text
          style={{
            fontSize:30,
            lineHeight:50,
            textAlign:"center"
          }}
         >
          登录页
        </Text>
        <Button title={"登录App"}   onPress={()=>{
            navigation.navigate("App");
          }}/>
        </View>

 
  
     
   
  

      </View>
    )
  }
} 

export default Login;