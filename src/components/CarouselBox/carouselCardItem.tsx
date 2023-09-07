import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import LanguageSwitcher from '../Languages';
import Videos from '../Videos';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = SLIDER_WIDTH;
export const SLIDER_HEIGHT = Dimensions.get('window').height - 220;
export const ITEM_HEIGHT = SLIDER_HEIGHT;

const CarouselCardItem = ({ item, index, activeIndex }: any) => {

  return (
    <View style={styles.container} key={index}>
      {item?.language === true ? (
        <>
          <LanguageSwitcher />
          <Image
            source={item.imgUrl}
            style={styles.imageLogo}
          />
        </>
      ) : null}
      {/* {index === 2 ? <Text style={styles.header}>app</Text> : null} */}
      {item?.videoUrl && activeIndex === index ? (
        <Videos videoUrls={item?.videoUrl}  hasVideo={item?.hasVideo} poster={item?.poster}/>
      ) : null}
      {item?.textFlagVN && item?.content ? (
        <View style={styles.boxContent}>
          <>
            <View style={styles.box}>
              <Image source={require('theme/assets/images/US.png')} style={styles.image} />
              <Text style={styles.textFlag}>{item?.textFlagVN}</Text>
            </View>
            <View style={styles.box}>
              <Image source={require('theme/assets/images/VN.png')} style={styles.image} />
              <Text style={styles.textFlag}>{item?.textFlagUS}</Text>
            </View>
          </>
          <Text style={styles.content}>{item?.content}</Text>
        </View>
      ) : null}
      {item?.title === true ? (
        <Text style={styles.text}>
          {item?.title1}
          <Text style={styles.coloredText}>{item?.titleColor}</Text>
          {item?.title2}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    position: 'relative',
  },
  imageLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 100,

    width: ITEM_WIDTH - 60,
    height: ITEM_HEIGHT - 210,
  },
  text: {
    fontFamily: 'Inter',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#FFFFFF', // Màu chữ mặc định cho phần còn lại

    position: 'absolute',
    bottom: 70,
    left: 30,
    width: '75%',
  },
  coloredText: {
    color: '#4AC0A4', // Màu chữ cho phần "Dr. An"
  },
  content: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#FFFFFF',
    alignSelf: 'center',
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 20,
    paddingBottom: 20,
  },
  textFlag: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#FFFFFF',
  },
  boxContent: {
    position: 'absolute',
    bottom: 160,
  },
  image: {
    width: 32,
    height: 24,
  },
  box: {
    flexDirection: 'row',
    paddingLeft: 70,
    paddingRight: 80,
    columnGap: 15,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default CarouselCardItem;

