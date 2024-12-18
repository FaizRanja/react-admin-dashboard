// third-party
import { combineReducers } from 'redux';
// project-imports
import authReducier from './User';
// ==============================|| COMBINE REDUCERS ||============================== //
const reducers = combineReducers({
  authReducier
});

export default reducers;
