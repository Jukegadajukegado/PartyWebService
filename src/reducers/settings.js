import Constants from '../constants';
import _ from 'lodash';
const defaultState = {
  audio: false,
  patch: "Loading Patch..."
};
export default function settings(state = defaultState, action) {
  state = _.cloneDeep(state);
  switch (action.type) {
    case Constants.settings.TOGGLE_AUDIO:
      state.audio = !state.audio;
      break;
    case Constants.settings.UPDATE_PATCH:
      state.patch = action.payload;
      break;
    case 'DECREMENT':
      return state - 1
  }
  return state;
}