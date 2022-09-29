import {combineReducers} from 'redux';

import dashboard from 'store/reducers/dashboard';
import user from 'store/reducers/user';

export default combineReducers({
  dashboard,
  user,
});
