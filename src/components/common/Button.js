import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const Button = (props) => {
  return (
    <TouchableOpacity onPress ={props.onPress} style={styles.buttonStyle}>
      <Text style={styles.textstyle}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const styles= {
  textstyle:{
    alignSelf:'center',
    fontWeight:"600",
    color:"#007aff",
    fontSize:16,
    paddingTop:10,
    paddingBottom:10
  },
  buttonStyle:{
    flex:1,
    alignSelf:'stretch',
    backgroundColor:"#FFF",
    borderColor:"#007aff",
    borderRadius:5,
    borderWidth:1,
    marginLeft:5,
    marginRight:5
  }
}
export {Button};
