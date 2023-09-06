import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import LanguageSwitcher from '../Languages';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = SLIDER_WIDTH;
export const SLIDER_HEIGHT = Dimensions.get('window').height - 220;
export const ITEM_HEIGHT = SLIDER_HEIGHT;

const CarouselCardItem = ({ item, index }: any) => {

  return (
    <View style={styles.container} key={index}>
      {index === 0 ? (
        <>
          <LanguageSwitcher />
          <Image
            source={item.imgUrl}
            style={styles.imageLogo}
          />
        </>
      ) : null}
      {index === 1 ? <Text style={styles.header}>the</Text> : null}
      {index === 2 ? <Text style={styles.header}>app</Text> : null}
      {index === 3 ? <Text style={styles.header}>!</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    position: 'relative',
  },
  imageLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 100,

    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
  header: {
    color: '#222',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: '#222',
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default CarouselCardItem;

