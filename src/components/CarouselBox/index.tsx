import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './carouselCardItem';

const CarouselBox = ({ data, handleLanguageChange }: any ) => {
  const Refcarousel = React.useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  useEffect(() => {
    handleLanguageChange && handleLanguageChange(activeIndex);
  }, [activeIndex]);
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
  const containerStyle =
    {
      paddingVertical: 18,
    };
  const renderCarouselItem = ({ item, index }: any) => {
    return (
      <CarouselCardItem
        item={item}
        index={index}
        activeIndex={activeIndex}
      />
    );
  };

  return (
    <View style={[styles.boxCarousel]}>
      <Carousel
        layout="default"
        ref={Refcarousel}
        data={data}
        renderItem={renderCarouselItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
        onSnapToItem={(i) => setActiveIndex(i)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        dotStyle={dotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        dotContainerStyle={dotContainerStyle}
        containerStyle={containerStyle}
      />
    </View>
  );
};

export default CarouselBox;

const styles = StyleSheet.create({
  boxCarousel: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
