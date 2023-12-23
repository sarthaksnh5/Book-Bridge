import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './UserStore';
import bookReducer from './BookStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {thunk} from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducers = combineReducers({
  user: userReducer,
  book: bookReducer,
});

const persistedReducers = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducers,
  middleware: getDefaultMiddleware => {
    const middlewares = [thunk];
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
    return middlewares.concat(middleware);
  },
  devTools: process.env.NODE_ENV !== 'production',
  extraReducers: builder => {
    builder.addCase(PURGE, state => {
      userReducer.removeAll(state);
    });
  },
});

export const persistor = persistStore(store);
