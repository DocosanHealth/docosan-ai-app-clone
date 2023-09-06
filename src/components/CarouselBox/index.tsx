import React from 'react';
import { View, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH, ITEM_HEIGHT } from './carouselCardItem';

const CarouselBox = ({ data }: any ) => {
  const Refcarousel = React.useRef(null);
  const [index, setIndex] = React.useState(0);

  const dotStyle =
    {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 0,
      backgroundColor: '#fff',
      margin: 0,
    };
  const dotContainerStyle =
    {
      marginHorizontal: 2,
      padding: 0,
      marginBottom: 0,
    };
  return (
    <View style={[styles.boxCarousel]}>
      <Carousel
        layout="stack"
        ref={Refcarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
        onSnapToItem={(i) => setIndex(i)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        dotStyle={dotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        dotContainerStyle={dotContainerStyle}
      />
    </View>
  );
};

export default CarouselBox;

const styles = StyleSheet.create({
  boxCarousel: {
    justifyContent: 'center',
    alignItems: 'center',
    height: ITEM_HEIGHT,
  },
});
