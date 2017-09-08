import React, {Component} from 'react';
import { ScrollView,Platform,View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {sliderWidth, itemWidth} from '../styles/SliderEntry.style';
import SliderEntry from './SliderEntry';
import styles from '../styles/index.style';
import {connect} from 'react-redux';
import {Spinner} from './common';
import {AsyncStorage} from 'react-native';
import {Config} from '../Config';

class MyCarousel extends Component {

  getSlides() {
    const {days} = this.props;
    if (days=='') {
      return false;
    }
    return days.map((day, index) => {
      return (<SliderEntry timePerCigarette={Config.lifetimePerCigarette} key={`carousel-entry-${index}`} {...day} />);
    });
  }

  showCarousel(){
    const {days} = this.props;
    if (days=='') {
      return <Spinner size='large' style={{marginTop:50}} />;
    }
    return <Carousel sliderWidth={sliderWidth} itemWidth={itemWidth} firstItem={days.length-1} inactiveSlideScale={0.94} inactiveSlideOpacity={0.6} enableMomentum={false} containerCustomStyle={styles.slider} contentContainerCustomStyle={styles.sliderContainer} showsHorizontalScrollIndicator={false} snapOnAndroid={true} removeClippedSubviews={false}>
      {this.getSlides()}
    </Carousel>;
  }

  render() {
    return (
      <View style={styles.scrollview}>
        <ScrollView scrollEnabled={ false }
       indicatorStyle={'white'} scrollEventThrottle={200}>
       {this.showCarousel()}
        </ScrollView>
      </View>
    );
  }
}
mapStateToProps = (state) => {
  const {days} = state.cigarette;
  const {firstlog} = state.auth;
  return {days};
}

export default connect(mapStateToProps, {})(MyCarousel);
