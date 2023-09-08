import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import LanguageSwitcher from '../Languages';
import Videos from '../Videos';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import styled from 'styled-components/native';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = SLIDER_WIDTH;

const CarouselCardItem = ({ item, index, activeIndex }: any) => {
  const language = useSelector((state: RootState) => state.appState.language);

  return (
    <View style={styles.container} key={index}>
      <LanguageSwitcher />
      {item?.language === true ? (
        <>
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
            <StyledBox languages={language === 'vi' ? true : false}>
              <Image source={require('theme/assets/images/US.png')} style={styles.image} />
              <StyledTextFlag languages={language === 'vi' ? true : false}>{item?.textFlagVN}</StyledTextFlag>
            </StyledBox>
            <StyledBox languages={language === 'vi' ? true : false}>
              <Image source={require('theme/assets/images/VN.png')} style={styles.image} />
              <StyledTextFlag languages={language === 'vi' ? true : false}>{item?.textFlagUS}</StyledTextFlag>
            </StyledBox>
          </>
          <Text style={styles.content}>{item?.content}</Text>
        </View>
      ) : null}
      {item?.title === true ? (
        <StyledTextTitle languages={language === 'vi' ? true : false}>
          {item?.title1}
          <Text style={styles.coloredText}>{item?.titleColor}</Text>
          {item?.title2}
        </StyledTextTitle>
      ) : null}
    </View>
  );
};


const StyledBox = styled.View<{ languages: boolean }>`
  flex-direction: row;
  margin-horizontal: 80;
  column-gap: 15;
  margin-top: ${props => props.languages ? '0' : '10'};
  margin-bottom: 20;
  alignItems: center;
`;

const StyledTextFlag = styled.Text<{ languages: boolean }>`
  font-family: Inter;
  font-size: ${props => props.languages ? '14' : '16'};
  font-weight: 600;
  line-height: ${props => props.languages ? '20' : '24'};
  letter-spacing: 0;
  text-align: left;
  color: #FFFFFF;
  width: 80%;
`;

const StyledTextTitle = styled.Text<{ languages: boolean }>`
  font-family: Inter;
  font-size: ${props => props.languages ? '26' : '32'};
  font-weight: 700;
  line-height: ${props => props.languages ? '30' : '38'};
  letter-spacing: 0;
  text-align: left;
  color: #FFFFFF;
  margin-top: 20;
  margin-horizontal: 30;
`;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: ITEM_WIDTH,
    flex: 1,
  },
  imageLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    resizeMode: 'contain',

    width: ITEM_WIDTH - 60,
    flex: 1,
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
  boxContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    width: 32,
    height: 24,
  },
});

export default CarouselCardItem;

