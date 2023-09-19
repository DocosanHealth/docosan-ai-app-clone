import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
  Storage,
} from 'redux-persist';
import { MMKV } from 'react-native-mmkv';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import reactotronConfig from '@/services/reactotronConfig';

import theme from './theme';
import appState from './appState/AppStateRedux';
import user from './user/UserRedux';
import chat from './chat/ChatRedux';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  theme,
  appState,
  user,
  chat,
});

const storage = new MMKV();
export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['theme', 'auth', 'appState', 'user'],
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    })
      // .concat(api.middleware)
      .concat(sagaMiddleware);

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default;
      middlewares.push(createDebugger());
      // middlewares.push(reactotronConfig.createEnhancer());
    }

    return middlewares;
  },
  enhancers: [reactotronConfig.createEnhancer!()],
});

const persistor = persistStore(store);

setupListeners(store.dispatch);
sagaMiddleware.run(rootSaga);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
