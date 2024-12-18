// third-party
import { configureStore } from '@reduxjs/toolkit';


// project-imports
import reducers from './reducers';


// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
  reducer: reducers,
  // auth: authReducer,
  
});



export  default store;
