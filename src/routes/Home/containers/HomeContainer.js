import { connect } from 'react-redux';
import { fetchPizzaData, addPizza, removePizza, removeTopping } from '../reducers/home';
import HomeView from '../components/HomeView';
import { showInfoAlert } from '../../../common-ui/Alerts/reducers/alerts';

const mapStateToProps = state => ({
  data: state.home.data,
  isFetching: state.home.isFetching,
  initialized: state.home.initialized,
  pizzas: state.home.pizzas,
  total: state.home.total,
});

const mapDispatchToProps = dispatch => ({
  fetchPizzaData: () => {
    dispatch(fetchPizzaData());
  },
  addPizza: (pizza) => {
    dispatch(addPizza(pizza));
  },
  removePizza: (index) => {
    dispatch(removePizza(index));
  },
  removeTopping: (index, toppings, newPrice) => {
    dispatch(removeTopping(index, toppings, newPrice));
  },
  showInfoAlert: (title, msg) => {
    dispatch(showInfoAlert(title, msg));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
