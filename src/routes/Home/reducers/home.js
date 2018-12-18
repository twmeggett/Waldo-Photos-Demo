import { request } from 'graphql-request'
import { showErrorAlert } from '../../../common-ui/Alerts/reducers/alerts';
import { mapForLocal } from '../../../util/client-server-mappers';

const mappedKeyPairs = {
  /* clientKey: server-key */
  pizzaSizes: 'pizzaSizes',
};

// ------------------------------------
// Constants
// ------------------------------------
const path = 'routes/Home/reducers/home/';
export const FETCHING       = path + 'FETCHING';
export const DONE_FETCHING  = path + 'DONE_FETCHING';
export const LOAD_DATA      = path + 'LOAD_DATA';
export const CLEAR_DATA     = path + 'CLEAR_DATA';
export const INITIALIZED    = path + 'INITIALIZED';
export const ADD_PIZZA      = path + 'ADD_PIZZA';
export const REMOVE_PIZZA   = path + 'REMOVE_PIZZA';
export const ADD_TOPPING    = path + 'ADD_TOPPING';
export const REMOVE_TOPPING = path + 'REMOVE_TOPPING';

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: [],
  isFetching: false,
  initialized: false,
  pizzas: [],
  total: 0,
};

export default function pizzasReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        isFetching: true,
        initialized: true,
      };
    case DONE_FETCHING:
      return {
        ...state,
        isFetching: false,
      };
    case LOAD_DATA:
      return {
        ...state,
        data: mapForLocal(mappedKeyPairs, action.data).pizzaSizes,
        isFetching: false,
      };
    case CLEAR_DATA:
      return {
        ...state,
        data: [],
      };
    case INITIALIZED:
      return {
        ...state,
        initialized: true,
      };
    case ADD_PIZZA:
      return {
        ...state,
        pizzas: [ ...state.pizzas, action.data ],
        total: state.total + action.data.price,
      }
    case REMOVE_PIZZA:
      return {
        ...state,
        pizzas: state.pizzas.filter((pizza, index) => index !== action.index),
        total: state.total - state.pizzas[action.index].price,
      }
    case ADD_TOPPING:
      return {
        ...state,
        pizzas: state.pizzas.map((pizza, index) => {
          if (index === action.index && !pizza.toppings.includes(action.topping.name)) {
            return { ...pizza, toppings: [ ...pizza.topings, action.topping ], price: action.price }
          }

          return pizza;
        }),
      }
    case REMOVE_TOPPING:
      return {
        ...state,
        total: state.total - state.pizzas[action.index].price + action.newPrice,
        pizzas: state.pizzas.map((pizza, index) => {
          if (index === action.index) {
            return { ...pizza, toppings: action.toppings, price: action.newPrice };
          }

          return pizza;
        }),
      }
    default:
      return state;
  }
}

// ------------------------------------
// Actions
// ------------------------------------
export const fetching = () => ({ type: FETCHING });
export const doneFetching = () => ({ type: DONE_FETCHING });
export const load = data => ({ type: LOAD_DATA, data });
export const clearData = () => ({ type: CLEAR_DATA });
export const addPizza = data => ({ type: ADD_PIZZA, data });
export const removePizza = index => ({ type: REMOVE_PIZZA, index });
export const removeTopping = (index, toppings, newPrice) => ({ type: REMOVE_TOPPING, index, toppings, newPrice });

// ------------------------------------
// Thunks (Async Actions)
// ------------------------------------
export function fetchPizzaData() {
  return (dispatch, getState) => {
    const query = /* GraphQL */ `{
      pizzaSizes {
        name,
        maxToppings,
        basePrice,
        toppings {
          topping {
            name,
            price,
          },
          defaultSelected
        }
      }
    }`
    const errorAlert = (msg) => {
      dispatch(doneFetching());
      dispatch(clearData());
      dispatch(showErrorAlert(msg));
    };

    dispatch(fetching());
    return request('http://core-graphql.dev.waldo.photos/pizza', query)
    .then(data => {
      dispatch(load(data))
      console.log(data)
    }).catch(errorAlert)
  };
}
