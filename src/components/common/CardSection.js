import React from 'react';
import {View} from 'react-native';

const CardSection = (props) => {
  return (
    //the one on the right will overide the rest
    <View style={[styles.containerStyle,props.style]}>
      {props.children}
    </View>
  );
}

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    borderColor: "#FFF",
    justifyContent: 'flex-start',
    flexDirection : 'row',
    borderColor: '#DDD',
    position: 'relative'
  }
};

export {CardSection};
