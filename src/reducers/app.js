import Constants from '../constants';
import _ from 'lodash';
const defaultState = {
  error: {
      show: false,
      message: ''
  }
};
export default function app(state = defaultState, action) {
  state = _.cloneDeep(state);
  switch (action.type) {
    case Constants.error.SHOW:
      state.error.show = true;
      state.error.message = action.payload;
      break;
    case Constants.error.CLOSE:
      state.error.show = false;
      break;
  }
  return state;
}