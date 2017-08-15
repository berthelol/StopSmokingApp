import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import SliderEntry from './SliderEntry';
import styles from '../styles/index.style';
import { ENTRIES1 } from '../static/entries';

export default class MyCarousel extends Component {

    getSlides (entries) {
        if (!entries) {
            return false;
        }

        return entries.map((entry, index) => {
            return (
                <SliderEntry
                  key={`carousel-entry-${index}`}
                  even={(index + 1) % 2 === 0}
                  {...entry}
                />
            );
        });
    }

    get carousel () {
        return (
            <Carousel
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              firstItem={1}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.6}
              enableMomentum={false}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContainer}
              showsHorizontalScrollIndicator={false}
              snapOnAndroid={true}
              removeClippedSubviews={false}
            >
                { this.getSlides(ENTRIES1) }
            </Carousel>
        );
    }

    render () {
        return (
                <ScrollView
                  style={styles.scrollview}
                  indicatorStyle={'white'}
                  scrollEventThrottle={200}
                >
                    <Text style={styles.title}>Example 1</Text>
                    <Text style={styles.subtitle}>No momentum | Scale | Opacity</Text>
                    { this.carousel }
                </ScrollView>
        );
    }
}
