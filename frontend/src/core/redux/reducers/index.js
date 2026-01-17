import { combineReducers } from 'redux';
import headerReducer from '../../../components/HeaderComponent/headerReducer';

const reducer = combineReducers({
  search: headerReducer
});

export default reducer;