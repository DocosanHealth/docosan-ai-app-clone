import React from 'react';
import { View, StyleSheet, Pressable, Text, Linking, TouchableOpacity } from 'react-native';
// import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CarouselBox from '../../components/CarouselBox';
import LinearGradient from 'react-native-linear-gradient';

const Welcome = () => {
  const { t } = useTranslation(['welcome']);
  const [indexActive, setIndexActive] = React.useState(0);

const data = [
  {
    id: 1,
    imgUrl: `${require('theme/assets/images/Home-us.png')}`,
    language: true,
    hasVideo: false,
  },
  {
    id: 2,
    title1: t('welcome:ask'),
    titleColor: t('welcome:dr_an'),
    title2: t('welcome:about_any_medical_issue'),
    videoUrl: 'https://develop.docosan.com/trong/images/videos/b6000/video.mp4',
    poster:'https://dev.docosan.com/_next/image?url=https%3A%2F%2Fdevelop.docosan.com%2Ftrong%2Fimages%2Fvideos%2Fb6000%2Fthumb_vi.jpg&w=1920&q=75',
    title: true,
    hasVideo: true,
  },
  {
    id: 3,
    title1: t('welcome:cutting_edge_ai_tailored_for'),
    titleColor: t('welcome:viet_nam_text'),
    content: t('welcome:content_slider_3'),
    textFlagVN: t('welcome:advanced_ai'),
    textFlagUS: t('welcome:tailored_for_vietnam'),
    title: true,
    hasVideo: false,
  },
  {
    id: 4,
    titleColor: t('welcome:accurate'),
    title2: t('welcome:doctor_approved_technology'),
    videoUrl: 'https://develop.docosan.com/trong/images/videos/b6000/video.mp4',
    poster:'https://dev.docosan.com/_next/image?url=https%3A%2F%2Fdevelop.docosan.com%2Ftrong%2Fimages%2Fvideos%2Fb6000%2Fthumb_vi.jpg&w=1920&q=75',
    title: true,
    hasVideo: true,
  },
];
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const handleLanguageChange = (index: number) => {
    setIndexActive(index);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={indexActive === 0 ? ['#041123', '#1E516F', '#041123'] : ['#429490', '#1E516F', '#041123']}
        style={styles.linearGradient}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 1, y: 1 }}
        locations={indexActive === 0 ? [0.17, 0.44, 0.75] : [0.0556, 0.38, 0.70]}
      >
        <CarouselBox data={data} t={t} handleLanguageChange={handleLanguageChange} />
        <LinearGradient
          colors={['#4AC0A4', '#70BDE9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Pressable  onPress={() => console.log('123')}>
            <Text style={styles.buttonText}>{t('welcome:start_chat')}</Text>
          </Pressable>
        </LinearGradient>
        <View style={styles.boxText}>
          <Text style={[styles.boxText__1, styles.styleText]}>{t('welcome:by_proceeding_you_accept_our')}</Text>
          <TouchableOpacity onPress={() => openLink('https://www.docosan.com/dieu-khoan-su-dung')}>
            <Text style={[styles.boxText__link__1, styles.styleText]}>{t('welcome:terms_of_use')}</Text>
          </TouchableOpacity>
          <Text style={[styles.boxText__2, styles.styleText]}>{t('welcome:and')}</Text>
          <TouchableOpacity onPress={() => openLink('https://www.docosan.com/en/chinh-sach-bao-ve-thong-tin-ca-nhan')}>
            <Text style={[styles.boxText__link__2, styles.styleText]}>{t('welcome:privacy_policy')}</Text>
          </TouchableOpacity>
          <Text style={[styles.boxText__2, styles.styleText]}>{t('welcome:our')}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#333333',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: 'green',
    marginLeft: 30,
    marginRight: 30,
    height: 65,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Inter',
    fontSize: 26,
    fontWeight: '500',
    lineHeight: 30,
    letterSpacing: 0.02,
    textAlign: 'center',
  },
  boxText: {
    flexDirection: 'row',
    width: '60%',
    alignSelf: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
  },
  styleText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: 'center',
  },
  boxText__1: {
    color: '#6C757D',
  },
  boxText__2: {
    color: '#6C757D',
  },
  boxText__link__1: {
    color: '#1E516F',
    textDecorationLine: 'underline',
  },
  boxText__link__2: {
    color: '#1E516F',
    textDecorationLine: 'underline',
  },
});
