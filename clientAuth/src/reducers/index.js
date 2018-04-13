import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'
import AuthReducer from './auth_reducer'
const rootReducer = combineReducers({
  form,
  auth: AuthReducer,
});

export default rootReducer;
