import { connect } from 'react-redux';
import { fetchPizzaData, addPizza, removePizza, removeTopping, makeSubTotal } from '../reducers/home';
import HomeView from '../components/HomeView';
import { showInfoAlert } from '../../../common-ui/Alerts/reducers/alerts';

const makeMapStateToProps = () => {
  const getSubTotal = makeSubTotal();
  return (state, props) => ({
    data: state.home.data,
    isFetching: state.home.isFetching,
    initialized: state.home.initialized,
    pizzas: state.home.pizzas,
    subTotal: getSubTotal(state),
  });
};

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

export default connect(makeMapStateToProps, mapDispatchToProps)(HomeView);
