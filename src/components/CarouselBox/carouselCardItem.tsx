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
      {item?.language === true && !!item?.imgUrl ? (
        <View style={styles.boxImage}>
          <StyledImage
            source={item?.imgUrl}
            // style={styles.imageLogo}
            resizeMode={item?.resizeMode}
          />
        </View>
      ) : null}
      {item?.imgUrlSlider3 ? (
        <View style={styles.boxImage}>
          <Image source={item.imgUrlSlider3} style={styles.imageLogoSlider3} />
        </View>
      ) : null}
      {item?.videoUrl && activeIndex === index ? (
        <Videos
          videoUrls={item?.videoUrl}
          hasVideo={item?.hasVideo}
          poster={item?.poster}
          controls={false}
          paused={false}
          resizeModeVideo="contain"
        />
      ) : null}
      {item?.textFlagVN && item?.content ? (
        <View style={styles.boxContent}>
          <>
            <StyledBox languages={language === 'vi' ? true : false}>
              <Image source={require('theme/assets/images/US.png')} style={styles.image} />
              <StyledTextFlag languages={language === 'vi'}>{item?.textFlagVN}</StyledTextFlag>
            </StyledBox>
            <StyledBox languages={language === 'vi' ? true : false}>
              <Image source={require('theme/assets/images/VN.png')} style={styles.image} />
              <StyledTextFlag languages={language === 'vi'}>{item?.textFlagUS}</StyledTextFlag>
            </StyledBox>
          </>
          <StyledTextContent languages={language === 'vi' ? true : false}>{item?.content}</StyledTextContent>
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

const StyledImage = styled.Image<{ resizeMode: any }>`
  align-self: center;
  resize-mode: ${props => props.resizeMode ? props.resizeMode : 'cover'};
  width: 100%;
  height: 100%;
`;

const StyledBox = styled.View<{ languages: boolean }>`
  flex-direction: row;
  margin-horizontal: 80px;
  column-gap: 20px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
`;

const StyledTextFlag = styled.Text<{ languages: boolean }>`
  font-family: Inter;
  font-weight: 600;
  line-height: ${props => props.languages ? '18px' : '24px'};
  font-size: 16px;
  letter-spacing: 0;
  text-align: left;
  color: #FFFFFF;
  width: 80%;
`;
const StyledTextContent = styled.Text<{ languages: boolean }>`
  font-family: Inter;
  font-weight: 500;
  line-height: 24px;
  font-size: 17px;
  letter-spacing: 0;
  text-align: center;
  color: #FFFFFF;
  align-self: center;
  justify-content: center;
  padding-horizontal: 30px;
`;

const StyledTextTitle = styled.Text<{ languages: boolean }>`
  font-family: Inter;
  font-size: ${props => props.languages ? '26px' : '32px'};
  font-weight: 700;
  line-height: ${props => props.languages ? '32px' : '38px'};
  letter-spacing: 0;
  text-align: center;
  color: #FFFFFF;
  margin-top: 20px;
  margin-horizontal: 30px;
`;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: ITEM_WIDTH,
    flex: 1,
  },
  imageLogoSlider3: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  boxImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  coloredText: {
    color: '#4AC0A4', // Màu chữ cho phần "Dr. An"
  },
  boxContent: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 32,
    height: 24,
  },
});

export default CarouselCardItem;

