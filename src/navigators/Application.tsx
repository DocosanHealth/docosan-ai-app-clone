import React, { useEffect } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { useTheme } from '../hooks';
import MainNavigator from './Main';
import { useFlipper } from '@react-navigation/devtools';
import { ApplicationStackParamList } from 'types/navigation';
import { SWelcome, SLogin, SChat, Startup } from '@/screens';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { appStartupAction } from '@/store/appState/AppStateSaga';
import Toast from 'react-native-toast-message';
import { setNavigationRef } from '@/services/navigationService';
import { ActionSheet } from '@/components';

const Stack = createStackNavigator<ApplicationStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme();
  const dispatch = useDispatch();
  const { colors } = NavigationTheme;
  const rehydrated = useSelector(
    (state: RootState) => state._persist.rehydrated || false,
  );

  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);
  useEffect(() => {
    if (rehydrated) {
      dispatch(appStartupAction());
    }
  }, [rehydrated]);

  return (
    <SafeAreaView style={Layout.fill}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[Layout.fill, { backgroundColor: colors.card }]}
        onTouchStart={Keyboard.dismiss}
      >
        <NavigationContainer
          theme={NavigationTheme}
          ref={navigationRef}
          onReady={() => {
            setNavigationRef(navigationRef);
          }}
        >
          <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Startup" component={Startup} />
            <Stack.Screen name="SLogin" component={SLogin} />
            <Stack.Screen name="SWelcome" component={SWelcome} />
            <Stack.Screen name="Main" component={MainNavigator} />
            <Stack.Screen name="SChat" component={SChat} />
          </Stack.Navigator>
        </NavigationContainer>

        <ActionSheet />
      </KeyboardAvoidingView>

      <Toast />
    </SafeAreaView>
  );
};

export default ApplicationNavigator;
