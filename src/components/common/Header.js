//import lib
import React from 'react';
import {Text, AppRegistry, StyleSheet,View} from 'react-native';

//Making a Component
const Header = (props) =>{
  return (
    <View style={styles.container}>
    <Text style={styles.header} >{props.headertext}</Text>
    </View>
  );
};

//Styles
const styles = StyleSheet.create({
  header:{
    fontSize: 20
  },
  container:{
    backgroundColor:'#F8F8F8',
    //left-right
    alignItems: 'center',
    //up-down
    justifyContent:'center',
    paddingTop:15,
    height:60,
    shadowColor:'#000',
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.2,
    position: 'relative',
    elevation:2
  }
});

//Make the Component available to other part of app
export {Header};
