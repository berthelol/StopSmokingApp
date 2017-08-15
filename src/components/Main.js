import React ,{Component} from 'react';
import MyCarousel from './Carousel';
import {View, Text} from 'react-native';
import {Input} from './common';
import styles from '../styles/index.style';
import {Button} from './common';

export default class Main extends Component{
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.colorsContainer}>
          <Button>
            Add cigarette
          </Button>
        </View>
          <View style={styles.colorsContainer}>
              <View style={styles.color1} />
              {//<View style={styles.color2} /> //
              }
          </View>
          <MyCarousel />
      </View>
    );
  }
};
