import { connect } from 'react-redux';
import { fetchPizzaData, addPizza, removePizza, removeTopping } from '../reducers/home'
import HomeView from '../components/HomeView';

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
    dispatch(removeTopping(index, toppings, newPrice))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
