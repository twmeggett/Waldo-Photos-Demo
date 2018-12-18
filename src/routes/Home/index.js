import { injectReducer } from '../../store/reducers';
import { HOME_ROUTE as PATH } from './route-constants';

export default (store) => ({
  getComponent(nextState, callback) {
    require.ensure([], (require) => {
      const Home = require('./containers/HomeContainer').default;
      const reducer = require('./reducers/home').default;

      injectReducer(store, { key: 'home', reducer });
      callback(null, Home);
    }, 'home');
  },
});
