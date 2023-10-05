import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import CarouselBox from '../../components/CarouselBox';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/theme';
import { Icon } from '@/components/Icon/Icon';
import { faArrowRight } from '@fortawesome/pro-light-svg-icons';
import { navigate } from '@/services';
import LanguageSwitcher from '@/components/Languages';

const SWelcome = () => {
  const { t } = useTranslation(['example', 'welcome']);
  const [indexActive, setIndexActive] = React.useState(0);
  const language = useSelector((state: RootState) => state.appState.language);
  const navigation = useNavigation();

  const data = [
    {
      id: 1,
      imgUrl:
        language === 'en'
          ? require('theme/assets/images/Home-us.png')
          : require('theme/assets/images/Home-vn.png'),
      language: true,
      hasVideo: false,
      resizeMode: 'contain',
    },
    {
      id: 2,
      title1: t('welcome:ask'),
      titleColor: t('welcome:dr_an'),
      title2: t('welcome:about_any_medical_issue'),
      imgUrl: require('theme/assets/images/Onboarding2.png'),
      // language === 'en'
      //   ? `${require('theme/assets/images/Onboarding2_us.png')}`
      //   : `${require('theme/assets/images/Onboarding2_vn.png')}`,
      language: true,
      hasVideo: true,
      title: true,
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
      imgUrlSlider3: require('theme/assets/images/Onboarding3.png'),
    },
    {
      id: 4,
      titleColor: t('welcome:accurate'),
      title2: t('welcome:doctor_approved_technology'),
      videoUrl: 'https://api.docosan.com/images/videos/a8309/video.mp4',
      poster:
        'https://www.docosan.com/_next/image?url=https%3A%2F%2Fapi.docosan.com%2Fimages%2Fvideos%2Fa8309%2Fthumb_vi.jpg&w=3840&q=75',
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

  const onNavigateToChat = () => {
    navigate('SChat');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={
          indexActive === 0
            ? ['#041123', '#1E516F', '#041123']
            : ['#429490', '#1E516F', '#041123']
        }
        style={styles.linearGradient}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 1, y: 1 }}
        locations={indexActive === 0 ? [0.17, 0.44, 0.75] : [0.0556, 0.38, 0.7]}
      >
        <View
          style={{
            alignItems: 'flex-end',
          }}
        >
          <LanguageSwitcher />
        </View>

        <CarouselBox
          data={data}
          t={t}
          handleLanguageChange={handleLanguageChange}
        />
        <View style={styles.containerBoxText}>
          <Pressable onPress={onNavigateToChat}>
            <LinearGradient
              colors={['#4AC0A4', '#70BDE9']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{t('welcome:start_chat')}</Text>
              <Icon
                icon={faArrowRight}
                color={Colors.white}
                size={22}
                style={styles.iconInfo}
              />
            </LinearGradient>
          </Pressable>
          <StyledView languages={language === 'vi'}>
            <Text style={[styles.boxText__1, styles.styleText]}>
              {t('welcome:by_proceeding_you_accept_our')}
            </Text>
            <TouchableOpacity
              onPress={() =>
                openLink('https://www.docosan.com/dieu-khoan-su-dung')
              }
            >
              <Text style={[styles.boxText__link__1, styles.styleText]}>
                {t('welcome:terms_of_use')}
              </Text>
            </TouchableOpacity>
            <Text style={[styles.boxText__2, styles.styleText]}>
              {t('welcome:and')}
            </Text>
            <TouchableOpacity
              onPress={() =>
                openLink(
                  'https://www.docosan.com/en/chinh-sach-bao-ve-thong-tin-ca-nhan',
                )
              }
            >
              <Text style={[styles.boxText__link__2, styles.styleText]}>
                {t('welcome:privacy_policy')}
              </Text>
            </TouchableOpacity>
            <Text style={[styles.boxText__2, styles.styleText]}>
              {t('welcome:our')}
            </Text>
          </StyledView>
        </View>
      </LinearGradient>
    </View>
  );
};

export default SWelcome;

const StyledView = styled.View<{ languages: boolean }>`
  flex-direction: row;
  width: ${props => (props.languages ? '80%' : '60%')};
  align-self: center;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  containerBoxText: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#333333',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    elevation: 3,
    backgroundColor: 'green',
    marginLeft: 30,
    marginRight: 30,
    height: 65,
    padding: 0,
    position: 'relative',
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
  iconInfo: {
    position: 'absolute',
    right: 20,
  },
});
