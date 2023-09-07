import Reactotron from 'reactotron-react-native';
import appName from '../../app.json';
import { reactotronRedux } from 'reactotron-redux';
// import { MMKV } from 'react-native-mmkv';

declare global {
  interface Console {
    tron: typeof Reactotron;
  }
}
Reactotron.clear!();
// @ts-ignore
const reactotron = Reactotron.configure({
  name: appName.displayName,
})
  .use(reactotronRedux())
  .useReactNative({
    asyncStorage: true,
    networking: {
      ignoreUrls: /symbolicate/,
    },
    editor: false,
    overlay: false,
  })
  .connect();

Reactotron.log!('Reactotron');
console.tron = reactotron;
export default reactotron;
