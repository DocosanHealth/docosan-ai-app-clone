/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
if (__DEV__) {
  import('@/services/reactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}
AppRegistry.registerComponent(appName, () => App);
