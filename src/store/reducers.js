import { combineReducers } from 'redux';
import locationReducer from './location';
import alertsReducer from '../common-ui/Alerts/reducers/alerts';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    alerts: alertsReducer,
    ...asyncReducers,
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
