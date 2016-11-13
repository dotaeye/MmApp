import {combineReducers} from 'redux';
import product from './product';
import search from './search';
import category from './category';
import home from './home';
import carCate from './carCate';
import address from './address';
import city from './city'

export default reducers = combineReducers({
  product,
  search,
  category,
  home,
  carCate,
  address,
  city
})