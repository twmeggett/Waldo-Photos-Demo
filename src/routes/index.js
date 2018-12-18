// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout';
import Home from './Home';

/*  Note: react-router PlainRoute objects are used to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home(store),
  childRoutes: [],
});

export default createRoutes;
