import React from 'react';
import { View, StyleSheet, Pressable, Text, Linking, TouchableOpacity } from 'react-native';
// import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CarouselBox from '../../components/CarouselBox';
import LinearGradient from 'react-native-linear-gradient';

const data = [
  {
    id: 1,
    imgUrl: `${require('theme/assets/images/icon-doctor.png')}`,
    titleGradient: 'AI DOCTOR',
    title: ' IN YOUR POCKET',
    content: 'I’m Dr. An -  trained with advanced AI to answer any of your medical questions!',
  },
  {
    id: 2,
    title: 'Ask Dr. An about any medical issue!',
    videoUrl: 'https://www.youtube.com/watch?v=0uLI6BnVh6w',
  },
  {
    id: 3,
    title: 'Cutting edge AI, tailored for Vietnam!',
    content: 'Dr. An is trained on the latest medical artificial intelligence from the USA, adapted for Vietnamese people using deidentified data from Docosan.',
    textFlagVN: 'Advanced US AI',
    textFlagUS: 'Tailored for Vietnam',
  },
  {
    id: 4,
    title: 'Accurate doctor-approved technology!',
    videoUrl: 'https://www.youtube.com/watch?v=0uLI6BnVh6w',
  },
];

const Welcome = () => {
  const { t } = useTranslation(['welcome']);

  // const dispatch = useDispatch();

  const openLink = (url: string) => {
    Linking.openURL(url);
  };
// background: linear-gradient(167.77deg, #041123 10.7%, #1E516F 44.95%, #041123 75.63%);

  return (
    <View style={styles.container}>  
      <LinearGradient
        colors={['#041123', '#1E516F', '#041123']}
        style={styles.linearGradient}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 1, y: 1 }}
        locations={[0.17, 0.44, 0.75]}
      >
        <CarouselBox data={data} t={t} />
        <LinearGradient
          colors={['#4AC0A4', '#70BDE9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Pressable  onPress={() => console.log('123')}>
            <Text style={styles.buttonText}>Start Chat</Text>
          </Pressable>
        </LinearGradient>
        <View style={styles.boxText}>
          <Text style={[styles.boxText__1, styles.styleText]}>By proceeding, you accept our </Text>
          <TouchableOpacity onPress={() => openLink('https://www.docosan.com')}>
            <Text style={[styles.boxText__link__1, styles.styleText]}> Terms of Use</Text>
          </TouchableOpacity>
          <Text style={[styles.boxText__2, styles.styleText]}> and</Text>
          <TouchableOpacity onPress={() => openLink('https://www.docosan.com')}>
            <Text style={[styles.boxText__link__2, styles.styleText]}>Privacy Policy</Text>
          </TouchableOpacity>
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
    bottom: 10,

  },
  styleText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 24,
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
